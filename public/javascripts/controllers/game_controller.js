goog.provide('Hexwar.GameController');
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

	this.tile_factory = Hexwar.ServiceContainer.get('TileFactory');
	this.unit_factory = Hexwar.ServiceContainer.get('UnitFactory');

	this.loadTurnData();

	this.mapview = new Hexwar.MapView($('#hexmap01'));
	this.mapview.drawMap(this.map);
	
	this.returnToNormalMode();
	
	this.unit_controller = new Hexwar.UnitController(this, this.map, this.mapview, this.current_player);

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
		this.map.clearUnits();

		// First mark all the previously owned tiles
		goog.structs.forEach(data.game_turn.current_tile_owner_data, function(tile_owner){
			x = parseFloat(tile_owner.x);
			y = parseFloat(tile_owner.y);
			tile = this.map.getTile(x, y);
      if (tile.type.ownable) {
        tile.owner = tile_owner.owner;
        this.map.setTile(x,y,tile);
      }
		}, this);

		goog.structs.forEach(data.game_turn.current_unit_data, function(unit) {
			x = parseFloat(unit.x);
			y = parseFloat(unit.y);
			unit = this.unit_factory.createUnit(unit.type_index, unit.team, x, y, parseFloat(unit.health));
			unit.acted = unit.team != data.game_turn.player
			
			tile = this.map.getTile(x, y);

      // Set the tile's new owner
      if (tile.type.ownable /* && unit.team != this.current_player*/) {
        tile.owner = unit.team;
        this.map.setTile(x,y,tile);
      }
    
      // Add the unit to the playfield
			this.map.setUnit(x, y, unit);
		}, this);

	};
	
	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Something went horribly wrong while loading the turn data!!!", "Loading Failed");
		}
	});
}

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 */
Hexwar.GameController.prototype.onMapClick = function(x,y) {
	this.unit_controller.attemptUnitSelect(x,y);
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
  $.ajax({ 
		  type:'post'
		, url: '/turn_actions'
		, data:{ 
				turn_action: {
					unit_x:x, unit_y:y, action:action, target_x: target_x, target_y: target_y, value: value, game_turn_id: this.current_turn_id
				}
			 }
		, success: function(data, textStatus, jqXHR) {
		  debug.log('Action Save Successful');
		}
		, error: function() {
			modalAlert("Save Failed", "Something went horribly wrong!!!");
		}
	});
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
	
	var current_owner = false;
	var all_owned_by_one = true;
	goog.structs.forEach(tile_owners_found, function(owner) {
		if (current_owner == false) {
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

/**
 *
 */
Hexwar.GameController.prototype.markGameOver = function() {
	
}

/**
 * ...
 */
Hexwar.GameController.prototype.endTurn = function() {	
	var unit_data = [];
	var tile_owner_data = [];
	
	goog.structs.forEach(this.map.unit_data, function(unit) {
		// Set the unit to acted
		unit.acted = true;
		// Save it!
		unit_data.push({ x: unit.x, y: unit.y, type_index: unit.type_index , team: unit.team, health: unit.health });
	}, this);
	
	this.map.forEachTile(function(tile,x,y) {
		if (tile.type.ownable && tile.owner != '') {
			tile_owner_data.push({x:x, y:y, owner:tile.owner});
		}
	});
	
	var saveFunction = function() {
		$.ajax({ 
			  type:'post'
			, url: '/games/end_turn'
			, data:{ 
					  game_turn: { 
								current_unit_data: unit_data
							, current_tile_owner_data: tile_owner_data
						}
					, id: this.id
				 }
			, success: function(data, textStatus, jqXHR) {
				debug.log('Turn Ended Successfully');
				this.notifyListeners('turn_ended');
			}.createDelegate(this)
			, error: function() {
				modalAlert("Save Failed", "Something went horribly wrong!!!");
			}
		});
	}.createDelegate(this);

	var game_winner = this.checkForGameWinner();
	
	if (game_winner) {
		modalAlert(game_winner+' Wins!', 'Game Over', function(){saveFunction(); this.markGameOver();}.createDelegate(this));
	} else {
		saveFunction();
	}
}