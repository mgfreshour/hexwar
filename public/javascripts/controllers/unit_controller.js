namespace('Hexwar.UnitController');
/**
 * ...
 * @constructor
 * @param {Game} game
 * @param {Map} map
 * @param {Hexwar.MapView} mapview
 * @param {String} current_player
 */
Hexwar.UnitController = function (game, map, mapview, current_player) {
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
Hexwar.UnitController.prototype.attemptUnitAttack = function(unit) {
		mask = new Hexwar.MapViewMask(this.map);

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
 * @param {Hexwar.MapViewMask} mask
 * @param {Unit} unit
 * @return {Number} number of enemies that are attackable by unit
 */
Hexwar.UnitController.prototype.maskForAttack = function(mask, unit) {
	var attack_mask = new Hexwar.MapViewMask(this.map);
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
 * @param {Hexwar.MapViewMask} mask
 */
Hexwar.UnitController.prototype.onUnitMoveClick = function(x,y, unit, mask) {
	this.mapview.hideCursor();

	if (mask.get(x,y) == mask.mask_clear) {
		// They clicked a movable location
		unit.move(x,y);
		unit.setActed(true);
	
		// See if they can attack now.
		if (this.attemptUnitAttack(unit)) {
			return;
		}
	}
	else if (mask.get(x,y) == mask.mask_red) {
		// The're attacking!
		enemy = this.map.getUnit(x,y);
		this.battle(unit, enemy);
		unit.setActed(true);
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
Hexwar.UnitController.prototype.battle = function(attacker, defender) {
	var mask = new Hexwar.MapViewMask(this.map);
	var max_attack_range = Math.max(attacker.range, defender.range);
	mask.generateDistanceMap(attacker.x, attacker.y, max_attack_range);
	
	//((Attack Strength + All bonuses) * HP of Attacker)*.05  - Defense Strength * 0.14  = Amount of HP lost
	debug.log(attacker);
	debug.log(defender);

	var distance = mask.get(defender.x, defender.y);
	var defender_bonus = defender.type.defense_bonuses[this.map.getTile(defender.x, defender.y).type.name];
	var attacker_bonus = attacker.type.defense_bonuses[this.map.getTile(attacker.x, attacker.y).type.name];
	var attacker_health_loss = 0;
	var defender_health_loss = 0;

	if (distance <= defender.range) {
		attacker_health_loss = (attacker_bonus + attacker.type.defense_power)*.14 - defender.type.attack_power*defender.health*.05;
		attacker_health_loss = attacker_health_loss * (Math.random()*.5+.75); // random chance to damage 75% - 125% of calc
		attacker_health_loss = Math.round(attacker_health_loss);
		attacker_health_loss = (attacker_health_loss > 0) ? 0 : attacker_health_loss;
	}
	if (distance <= attacker.range) {
		defender_health_loss = (defender_bonus + defender.type.defense_power)*.14 - (attacker.type.attack_power+defender.getTimesAttacked()*2)*attacker.health*.05;
		defender_health_loss = defender_health_loss * (Math.random()*.5+.75);
		defender_health_loss = Math.round(defender_health_loss);
		defender_health_loss = (defender_health_loss > 0) ? 0 : defender_health_loss;
	} else {
		modalAlert('How the heck did you attack a unit out of range?');
	}
	defender.incrementTimesAttacked();
	defender.changeHealth(defender_health_loss);
	attacker.changeHealth(attacker_health_loss);
}

/**
 * ...
 * @param {Unit} unit
 * @return {Hexwar.MapViewMask}
 */
Hexwar.UnitController.prototype.generateMoveMask = function(unit) {
	var viewmask = new Hexwar.MapViewMask(this.map);	
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
	Hexwar.Hex.walkAdjacent(unit.x,unit.y,  unit.type.move_range, callback.createDelegate(this), this.map.height, this.map.width);
	
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
Hexwar.UnitController.prototype.generateZocMap = function(team) {
	var zoc_map = new Array2d(this.map.height, this.map.width);
	
	for (var n=0; n<this.map.unit_data.length; n++) {
		if (this.map.unit_data[n].team != team) {
			var x = this.map.unit_data[n].x,
					y = this.map.unit_data[n].y;
			var coords = Hexwar.Hex.getAdjacentCoords(x,y, this.map.height, this.map.width);
			zoc_map.setMulti(coords, 1);
		}
	}	
	for (n=0; n<this.map.unit_data.length; n++) {
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
Hexwar.UnitController.prototype.attemptUnitSelect = function(x,y) {
	var unit = this.map.getUnit(x,y);
	if (unit && unit.team == this.current_player && !unit.getActed()) {
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
Hexwar.UnitController.prototype.addEventsToAllUnits = function() {
	for (var n=0; n < this.map.unit_data.length; n++) {
		var unit = this.map.unit_data[n];
		
		this.addEventsToUnit(unit);
	}
}

/**
 * ...
 * @todo this belongs in UnitFactory
 */
Hexwar.UnitController.prototype.addEventsToUnit = function(unit) {
	unit.bindEvent('death', this.onUnitDeath, this);
	unit.bindEvent('health_change', this.onUnitChangeHealth, this);
	unit.bindEvent('move', this.onUnitMove, this);
	unit.bindEvent('unit_acted', this.onUnitActed, this);
	unit.setActed(unit.getActed());
	
	unit.bindEvent('death', this.logUnitDeath, this);
	unit.bindEvent('health_change', this.logUnitChangeHealth, this);
	unit.bindEvent('move', this.logUnitMove, this);
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.logUnitMove = function (x,y, unit) {
	debug.log("Unit Move ("+unit.x+','+unit.y+") -> ("+x+','+y+')');
	this.game.saveAction(unit.x, unit.y, 'move', x, y, 0);
}

/**
 * ...
 * @param {Number} new_health
 * @param {Number} delta
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.logUnitChangeHealth = function(new_health, delta, unit) {
	debug.log("Unit Health ("+unit.x+','+unit.y+") -> ("+delta+')');
	this.game.saveAction(unit.x, unit.y, 'health_change', 0, 0, delta);
}

/**
 * ...
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.logUnitDeath = function(unit) {
	debug.log("Unit Death ("+unit.x+','+unit.y+")");
	this.game.saveAction(unit.x, unit.y, 'death', 0, 0, 0);
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.onUnitMove = function (x,y, unit) {
		this.mapview.drawUnit(x,y, unit);
}

/**
 * ...
 * @param {Number} new_health
 * @param {Number} delta
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.onUnitChangeHealth = function(new_health, delta, unit) {
	unit.text[0].div.html(new_health);
	this.mapview.drawDamages([{x:unit.x,y:unit.y, text:delta}]);
}

/**
 * ...
 * @todo this shouldn't be doing the fade!
 * @param {Unit} unit
 */
Hexwar.UnitController.prototype.onUnitDeath = function(unit) {
	unit.gfx_container.fadeOut(500, function() { $(unit).remove(); });
	// take this unit out of the unit list
	idx = this.map.unit_data.indexOf(unit);
	this.map.unit_data.splice(idx,1);
}

/**
 *
 * @param {Boolean} acted
 * @param {Hexwar.Unit} unit
 */
Hexwar.UnitController.prototype.onUnitActed = function(acted, unit) {
	if (acted) {
		unit.text[1].div.html('');
	} else {
		unit.text[1].div.html('*');		
	}
}