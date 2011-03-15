
/**
 * Main class for plaing the game
 * @constructor
 * @extends Observable
 */
function Game() {
	this.map = map;
	this.mapview = new MapView($('#hexmap01'));
	this.mapview.drawMap(this.map);
	
	this.returnToNormalMode();
	
	this.unit_controller = new UnitController(this, this.map, this.mapview);
	
	// Call parent c'tors
	this.Observable();
}
Game.DeriveFrom(Observable);

/**
 * ...
 * @param {Number} x
 * @param {Number} y
 */
Game.prototype.onMapClick = function(x,y) {
	this.unit_controller.attemptUnitSelect(x,y);
}

/**
 * ...
 */
Game.prototype.returnToNormalMode = function() {
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
Game.prototype.saveAction = function(x,y, action, target_x, target_y, value) {	
  $.ajax({ 
		  type:'post'
		, url: '/turn_actions'
		, data:{ 
				turn_action: {
					unit_x:x, unit_y:y, action:action, target_x: target_x, target_y: target_y, value: value, game_turn_id: this.current_turn
				}
			 }
		, success: function(data, textStatus, jqXHR) {
			log('Action Save Successful');
		}
		, error: function() {
			modalAlert("Save Failed", "Something went horribly wrong!!!");
		}
	});
}


/**
 * ...
 */
Game.prototype.endTurn = function() {	
	var unit_data = [];
	for (x=0; x < this.map.unit_data.length; x++) {
		var u = this.map.unit_data[x];
		// Set the unit to acted
		u.acted = true;
		// Save it!
		unit_data.push({ x: u.x, y: u.y, type_index: u.type_index , team: u.team, health: u.health });
	}
	
  $.ajax({ 
		  type:'post'
		, url: '/games/end_turn'
		, data:{ 
				  game_turn: { current_unit_data: unit_data }
				, id: this.id
			 }
		, success: function(data, textStatus, jqXHR) {
			log('Turn Ended Successfully');
			this.notifyListeners('turn_ended');
		}.createDelegate(this)
		, error: function() {
			modalAlert("Save Failed", "Something went horribly wrong!!!");
		}
	});
}