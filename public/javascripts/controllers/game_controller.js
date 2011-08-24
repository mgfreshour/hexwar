namespace('Hexwar.GameController');
/**
 * Main class for plaing the game
 * @constructor
 * @extends Observable
 */
Hexwar.GameController = function (map, id, current_turn_id, current_player) {
	this.map = map;
	this.current_turn_id = current_turn_id;
	this.id = id;
	this.current_player= current_player;
	this.resource_data = null;

	this.tile_factory = Hexwar.ServiceContainer.get('TileFactory');
	this.unit_factory = Hexwar.ServiceContainer.get('UnitFactory');

	this.loadTurnData();

	this.mapview = new Hexwar.MapView($('#hexmap01'));
	this.mapview.drawMap(this.map);
	
	this.returnToNormalMode();
	
	this.unit_controller = new Hexwar.UnitController(this, this.map, this.mapview, this.current_player);
	this.unit_store_controller = new Hexwar.UnitStoreController(this, this.map, this.mapview, this.current_player);
	
	this.turn_actions = [];

	// Call parent c'tors
	this.Observable();
}
Hexwar.GameController.DeriveFrom(Observable);

/**
 *
 */
Hexwar.GameController.prototype.loadTurnData = function(url) {
	url = url || '/games/get_turn?id='+this.id;
	
	var successFunction = function(data, textStatus, jqXHR) {
		var x,y, unit, tile;

		// First mark all the previously owned tiles
		if (data.game_turn.current_tile_owner_data) {
			$.each(data.game_turn.current_tile_owner_data, function(idx, tile_owner){
				x = parseFloat(tile_owner.x);
				y = parseFloat(tile_owner.y);
				tile = this.map.getTile(x, y);
	      if (tile.type.ownable) {
	        tile.owner = tile_owner.owner;
	        this.map.setTile(x,y,tile);
	      }
			}.createDelegate(this));
		}

		// Load the unit data if this is not a new game
		if (data.game_turn.current_unit_data) {
			this.map.clearUnits();
			$.each(data.game_turn.current_unit_data, function(idx, unit) {
				x = parseFloat(unit.x);
				y = parseFloat(unit.y);
				unit = this.unit_factory.createUnit(unit.type_index, unit.team, x, y, parseFloat(unit.health));
				unit.setActed(unit.team != data.game_turn.player);
			
				tile = this.map.getTile(x, y);

	      // Set the tile's new owner
	      if (tile.type.ownable && unit.team != this.current_player) {
	        tile.owner = unit.team;
	        this.map.setTile(x,y,tile);
	      }
    
	      // Add the unit to the playfield
				this.map.setUnit(x, y, unit);
			}.createDelegate(this));
		}

		this.updateGold(data.game_turn.resource_data);
	}; // end successFunction()
	
	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Something went horribly wrong while loading the turn data!!!", "Loading Failed", function(){top.location='/';});
		}
	});
}

/**
 * ...
 * @param {Object} resource_data
 */
Hexwar.GameController.prototype.updateGold = function(resource_data) {
	this.resource_data = resource_data || {};

	if (!this.resource_data[this.current_player]) {
		this.resource_data[this.current_player] = 0;
	}
	// It come across as a string, let's fix that
	else {
		this.resource_data[this.current_player] = parseFloat(this.resource_data[this.current_player]);
	}

	// now, loop through all the ownable tiles and give current player
	//  more based on what they own
	this.map.forEachTile(function(tile,x,y) {
    if (tile.type.ownable && tile.owner == this.current_player) {
			this.resource_data[this.current_player] += 100;
		}
	}.createDelegate(this));
	
	// Update the UI
	this.updateResourceCounter();
}

/**
 * ...
 * @return {Integer}
 */
Hexwar.GameController.prototype.getGold = function() {
	return this.resource_data[this.current_player];
}

/**
 * ...
 * @return {Integer}
 */
Hexwar.GameController.prototype.setGold = function(gold) {
	this.resource_data[this.current_player] = gold;
	
	// Update the UI
	this.updateResourceCounter();
}

/**
 *
 */
Hexwar.GameController.prototype.updateResourceCounter = function() {	
	$('#gold').html(this.resource_data[this.current_player]);
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 */
Hexwar.GameController.prototype.onMapClick = function(x,y) {
	if (this.unit_controller.attemptUnitSelect(x,y)) {
		return;
	}
	if (this.unit_store_controller.attemptStoreSelect(x,y)) {
		return;
	}
}

/**
 * ...
 */
Hexwar.GameController.prototype.returnToNormalMode = function() {
	this.mapview.clearMask();
	this.mapview.setDelegateClick(this.onMapClick.createDelegate(this));
}


/**
 * ...
 * @param {Number} x
 * @param {Number} y
 * @param {String} action
 * @param {Number} target_x
 * @param {Number} target_y
 * @param {String} value
 */
Hexwar.GameController.prototype.saveAction = function(x,y, action, target_x, target_y, value) {
	this.turn_actions.push({ unit_x:x, unit_y:y, action:action, target_x: target_x, target_y: target_y, value: value });
}

/**
 * 
 * @todo - improve this algorithm
 */
Hexwar.GameController.prototype.checkForGameWinner = function() {
	var tile_owners_found = [];
	var ownable_tiles_found = 0;
	
	
	this.map.forEachTile(function(tile,x,y) {
		if (tile.type.ownable) {
			ownable_tiles_found++;
			tile_owners_found.push(tile.owner);
		}
	});
	
	var current_owner;
	var all_owned_by_one = true;
	$.each(tile_owners_found, function(idx, owner) {
		if (current_owner == undefined) {
			current_owner = owner;
		}
		if (current_owner != owner) {
			all_owned_by_one = false;
		}
	});
	
	if (all_owned_by_one) {
		return current_owner;
	}
	
	return false;
}

Hexwar.GameController.prototype.healNonActedUnits = function() {
	$.each(this.map.unit_data, function(idx, unit) {
		// Heal the unit if they haven't acted
		if (!unit.getActed() && unit.getHealth() < unit.type.starting_health) {
			var heal_amt = unit.getHealth()+2 > unit.type.starting_health ? 1 : 2;
			this.map.unit_data[idx].changeHealth(heal_amt);
		}
		// Set the unit to acted
		this.map.unit_data[idx].setActed(true);
	}.createDelegate(this));
}

/**
 * ...
 */
Hexwar.GameController.prototype.endTurn = function(game_winner) {
	this.healNonActedUnits();

	// give some time for the healed unit animation to happen
	setTimeout(this._saveTurn.createDelegate(this,[game_winner]), 1000);
}

/**
 * ...
 */
Hexwar.GameController.prototype._saveTurn = function(game_winner) {
	var unit_data = [];
	var tile_owner_data = [];
	
	$('#loading').show();

	$.each(this.map.unit_data, function(idx, unit) {
		// Save it!
		unit_data.push({ x: unit.x, y: unit.y, type_index: unit.type_index , team: unit.team, health: unit.health });
	}.createDelegate(this));
	
	this.map.forEachTile(function(tile,x,y) {
		if (tile.type.ownable && tile.owner != '') {
			tile_owner_data.push({x:x, y:y, owner:tile.owner});
		}
	});
	
	game_winner = !game_winner ? this.checkForGameWinner() : game_winner;

	var saveFunction = function() {
		$.ajax({ 
			  type:'post'
			, url: '/games/end_turn'
			, data:{ 
					  game_turn: { 
								current_unit_data: unit_data
							, current_tile_owner_data: tile_owner_data
							, resource_data: this.resource_data
						}
					, game_winner: game_winner ? game_winner : ''
					, id: this.id
				 }
			, success: function(data, textStatus, jqXHR) {
				debug.log('Turn Ended Successfully');
				this.notifyListeners('turn_ended');
			}.createDelegate(this)
			, error: function() {
				modalAlert("Save Failed", "Something went horribly wrong!!!", function(){top.location = '/'});
			}
		});
	}.createDelegate(this);
	
	if (game_winner) {
		modalAlert(game_winner+' Wins!', 'Game Over', saveFunction);
	} else {
		saveFunction();
	}
}