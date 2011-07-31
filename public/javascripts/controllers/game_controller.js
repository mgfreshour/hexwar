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
		var x,y, obj;
		this.map.clearUnits();

		goog.structs.forEach(data.game_turn.current_unit_data, function(unit) {
			x = parseFloat(unit.x);
			y = parseFloat(unit.y);
			obj = this.unit_factory.createUnit(unit.type_index, unit.team, x, y, parseFloat(unit.health));
			obj.acted = unit.team != data.game_turn.player
			this.map.setUnit(x, y, obj);
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
	//this.unit_controller.attemptUnitSelect(x,y);
	
	distance_map = new Hexwar.MapViewMask(this.map);
	distance_map.generateDistanceMap(x, y, 4);
	this.mapview.renderer.clearLayer('text');
	this.mapview.drawTextBitmap(distance_map.mask.data);
	return;
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
Hexwar.GameController.prototype.endTurn = function() {	
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