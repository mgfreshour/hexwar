/**
 * ...
 * @constructor
 * @param {Game} game
 * @param {Map} map
 * @param {MapView} mapview
 */
function UnitController(game, map, mapview, current_player) {
	this.map = map;
	this.game = game;
	this.mapview = mapview;
	this.current_player = current_player;
	
	this.addEventsToAllUnits();
}

/**
 * ...
 * @param {Unit} unit
 * @return {Boolean}
 */
UnitController.prototype.attemptUnitAttack = function(unit) {
		mask = new MapViewMask(this.map);

		if (this.maskForAttack(mask, unit)) {
			mask.set(unit.x, unit.y, mask.mask_clear);
			this.mapview.drawMask(mask);
			this.mapview.setDelegateClick(this.onUnitMoveClick.createDelegate(this, [unit, mask], true));
			return true;
		}
		return false;
}

/**
 * ...
 * @param {MapViewMask} mask
 * @param {Unit} unit
 * @return {Number} number of enemies that are attackable by unit
 */
UnitController.prototype.maskForAttack = function(mask, unit) {
	var attack_mask = new MapViewMask(this.map);
	var enemy_found = false;
	
	var mask_callback = function(x,y, val) {
		var enemy = this.map.getUnit(x,y);
		if (val) {
			if (enemy && enemy.team != unit.team) {
				enemy_found = true;
				return mask.mask_red;
			} else if (enemy) {
				return mask.mask_black;
			}
		}
		return 0;
	}
	attack_mask.unmaskAdjacent(unit.x,unit.y, unit.range, mask_callback.createDelegate(this));
	mask.merge(attack_mask,[2]);
	
	return enemy_found;
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {Unit} unit
 * @param {MapViewMask} mask
 */
UnitController.prototype.onUnitMoveClick = function(x,y, unit, mask) {
	this.mapview.hideCursor();

	if (mask.get(x,y) == mask.mask_clear) {
		// They clicked a movable location
		unit.move(x,y);
		unit.acted = true;
	
		// See if they can attack now.
		if (this.attemptUnitAttack(unit)) {
			return;
		}
	}
	else if (mask.get(x,y) == mask.mask_red) {
		// The're attacking!
		enemy = this.map.getUnit(x,y);
		this.battle(unit, enemy);
		unit.acted = true;
	} 
	else if (mask.get(x,y) == mask.mask_black) {
		if (this.attemptUnitSelect(x,y)) {
			return;
		}
	}

	// Return control
	this.mapview.setCursor(x,y);
	this.game.returnToNormalMode();
}

/**
 * ...
 * @param {Unit} attacker
 * @param {Unit} defender
 */
UnitController.prototype.battle = function(attacker, defender) {
	var mask = new MapViewMask(this.map);
	max_attack_range = Math.max(attacker.range, defender.range);
	mask.generateDistanceMap(attacker.x, attacker.y, max_attack_range);
	
	var distance = mask.get(defender.x, defender.y);
	if (distance <= defender.range) {
		attacker.changeHealth(-2);
	}
	if (distance > attacker.range) {
		modalAlert('How the heck did you attack a unit out of range?');
		return;
	}
	defender.changeHealth(-2);
}

/**
 * ...
 * @param {Unit} unit
 * @return {MapViewMask}
 */
UnitController.prototype.generateMoveMask = function(unit) {
	var viewmask = new MapViewMask(this.map);	
	var mask = new Array2d(this.map.height, this.map.width);
	var move_mask = new Array2d(this.map.height, this.map.width);
	var zoc_map = this.generateZocMap(unit.team);
	
	var callback = function(x,y,current_depth, prev_x, prev_y) {
		mask.set(x,y,current_depth);
		var hex_cost = unit.type.move_costs[this.map.getTile(x,y).type.name];
		var zoc = zoc_map.get(x,y);
		
		
		if (prev_y == -1 && prev_x == -1) {
				move_mask.set(x,y,hex_cost);
				if (zoc && hex_cost < unit.type.move_range) {
					if (zoc == 1) {
						move_mask.set(x,y, unit.type.move_range);
					} else {
						move_mask.set(x,y, unit.type.move_range+99);
					}
				}
				
		} else {
			if (mask.get(prev_x,prev_y) <= mask.get(x,y)) {
				if (move_mask.get(prev_x,prev_y) + hex_cost < move_mask.get(x,y) || move_mask.get(x,y) == 0) {
					hex_cost +=  move_mask.get(prev_x,prev_y);
					move_mask.set(x,y, hex_cost);
					
					if (zoc && hex_cost < unit.type.move_range) {
						if (zoc == 1) {
							move_mask.set(x,y, unit.type.move_range);
						} else {
							move_mask.set(x,y, unit.type.move_range+99);
						}
					}
				}
			} // end from correct prev
		} // end if/else no prev
	};
	Hex.walkAdjacent(unit.x,unit.y,  unit.type.move_range, callback.createDelegate(this), this.map.height, this.map.width);
	
	callback = function(x,y, value) {
		if (value > unit.type.move_range || value == 0) {
			return viewmask.mask_black;
		}
		return viewmask.mask_clear;
	};
	
	
	// DEBUG (comment out drawMask below)
	//this.mapview.drawTextBitmap(move_mask.data);
	//this.mapview.drawTextBitmap(zoc_map.data);
	
	viewmask.mask = move_mask;
	viewmask.filterByCallback(callback);
	viewmask.maskOccupied();
	this.maskForAttack(viewmask, unit);

	// DEBUG (comment out drawMask below)
	//this.mapview.drawTextBitmap(viewmask.mask.data);

	// Draw the mask!
	this.mapview.drawMask(viewmask);
	
	return viewmask;
}

/**
 * ...
 * @param {String} team
 * @return {Array2d}
 */
UnitController.prototype.generateZocMap = function(team) {
	var zoc_map = new Array2d(this.map.height, this.map.width);
	
	for (var n=0; n<this.map.unit_data.length; n++) {
		if (this.map.unit_data[n].team != team) {
			var x = this.map.unit_data[n].x,
					y = this.map.unit_data[n].y;
			var coords = Hex.getAdjacentCoords(x,y, this.map.height, this.map.width);
			zoc_map.setMulti(coords, 1);
		}
	}	
	for (var n=0; n<this.map.unit_data.length; n++) {
			if (this.map.unit_data[n].team != team) {
				x = this.map.unit_data[n].x;
				y = this.map.unit_data[n].y;
				zoc_map.set(x,y, 2);
			}
		}
	
	return zoc_map;
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @return {Boolean}
 */
UnitController.prototype.attemptUnitSelect = function(x,y) {
	var unit = this.map.getUnit(x,y);
	if (unit && unit.team == this.current_player && !unit.acted) {
		var mask = this.generateMoveMask(unit);
		
		this.mapview.setDelegateClick(this.onUnitMoveClick.createDelegate(this, [unit, mask], true));
		this.mapview.setCursor(x,y);
		return true;
	}
	return false;
}

/**
 * ...
 * @todo this belongs in UnitFactory
 */
UnitController.prototype.addEventsToAllUnits = function() {
	for (var n=0; n < this.map.unit_data.length; n++) {
		var unit = this.map.unit_data[n];
		
		unit.bindEvent('death', this.onUnitDeath, this);
		unit.bindEvent('health_change', this.onUnitChangeHealth, this);
		unit.bindEvent('move', this.onUnitMove, this);
		
		unit.bindEvent('death', this.logUnitDeath, this);
		unit.bindEvent('health_change', this.logUnitChangeHealth, this);
		unit.bindEvent('move', this.logUnitMove, this);
	}
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {Unit} unit
 */
UnitController.prototype.logUnitMove = function (x,y, unit) {
	log("Unit Move ("+unit.x+','+unit.y+") -> ("+x+','+y+')');
	this.game.saveAction(unit.x, unit.y, 'move', x, y, 0);
}

/**
 * ...
 * @param {Number} new_health
 * @param {Number} delta
 * @param {Unit} unit
 */
UnitController.prototype.logUnitChangeHealth = function(new_health, delta, unit) {
	log("Unit Health ("+unit.x+','+unit.y+") -> ("+delta+')');
	this.game.saveAction(unit.x, unit.y, 'health_change', 0, 0, delta);
}

/**
 * ...
 * @param {Unit} unit
 */
UnitController.prototype.logUnitDeath = function(unit) {
	log("Unit Death ("+unit.x+','+unit.y+")");
	this.game.saveAction(unit.x, unit.y, 'death', 0, 0, 0);
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {Unit} unit
 */
UnitController.prototype.onUnitMove = function (x,y, unit) {
		this.mapview.drawUnit(x,y, unit);
}

/**
 * ...
 * @param {Number} new_health
 * @param {Number} delta
 * @param {Unit} unit
 */
UnitController.prototype.onUnitChangeHealth = function(new_health, delta, unit) {
	unit.text.div.html(new_health);
	this.mapview.drawDamages([{x:unit.x,y:unit.y, text:delta}]);
}

/**
 * ...
 * @todo this shouldn't be doing the fade!
 * @param {Unit} unit
 */
UnitController.prototype.onUnitDeath = function(unit) {
	unit.gfx_container.fadeOut(500, function() { $(unit).remove(); });
	// take this unit out of the unit list
	idx = this.map.unit_data.indexOf(unit);
	this.map.unit_data.splice(idx,1);
}