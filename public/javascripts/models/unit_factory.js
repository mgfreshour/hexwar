/**
 * Class knows how to make units
 * @constructor
 */
function UnitFactory() {
	this.unit_types = new Array();
}

/**
 * Loads the tile types from server using ajax call
 * @param {String} url
 */
UnitFactory.prototype.loadFromServer = function(url) {
	url = url || '/unit_types';
	
	var successFunction = function(data, textStatus, jqXHR) {
		var obj, move_costs, defense_bonuses;
		for (var n=0; n < data.length; n++) {
			obj = data[n].unit_type;
			move_costs = [obj.move_cost_bridge_center , obj.move_cost_bridge_left , obj.move_cost_bridge_right , obj.move_cost_castle , obj.move_cost_city , obj.move_cost_desert , obj.move_cost_dirt
			 , obj.move_cost_forest , obj.move_cost_grass , obj.move_cost_hills , obj.move_cost_mountains , obj.move_cost_oasis , obj.move_cost_path , obj.move_cost_swamp , obj.move_cost_water];
			
			defense_bonuses = [obj.defense_bonus_bridge_center , obj.defense_bonus_bridge_left , obj.defense_bonus_bridge_right , obj.defense_bonus_castle , obj.defense_bonus_city , obj.defense_bonus_desert
			 , obj.defense_bonus_dirt , obj.defense_bonus_forest , obj.defense_bonus_grass , obj.defense_bonus_hills , obj.defense_bonus_mountains , obj.defense_bonus_oasis , obj.defense_bonus_path
			 , obj.defense_bonus_swamp , obj.defense_bonus_water ];

			this.createUnitType(obj.name, obj.img, obj.img_x, obj.img_y, obj.attack_range, obj.move_range, move_costs, defense_bonuses)
	 	}
	};
	
	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Loading Failed", "Something went horribly wrong while loading the tile data!!!");
		}
	});
			
}

/**
 * Adds a unit type to the internal types array
 * @param {UnitType} unit_type
 * @return {Number} index of the added type
 */
UnitFactory.prototype.addUnitType = function(unit_type) {
	this.unit_types.push(unit_type);
	return this.unit_types.length-1;
}

/**
 * Adds a unit type to the internal types array
 * @param {String} name
 * @param {String} img
 * @param {Number} img_x
 * @param {Number} img_y
 * @return {Number} index of the added type
 */
UnitFactory.prototype.createUnitType = function(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses) {
	var type = new UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	return this.addUnitType(type);
}

/**
 * Creates a Unit based on Type
 * @param {Number|String|UnitType} type
 * @param {String} name ex. 'red', 'blue', 'green', 'white'
 * @param {Number} x
 * @param {Number} y
 * @param {Number} health
 * @return {Unit}
 */
UnitFactory.prototype.createUnit = function(type, team,x,y,health) {
	if (typeof type == 'string') {
		var n=0;
		// Is this really a number in a string?
		if (!isNaN(parseFloat(type)) && isFinite(type)) {
			n = parseFloat(type);
		} else {
			for (n=this.unit_types.length-1; n >= 0; n--) {
				if (this.unit_types[n].name == type) {
					break;
				}
			}
		}
		if (n >= 0) {
			return this._createUnit(this.unit_types[n], team,x,y,health);
		}
		throw 'UnitFactory::createUnit() unable to find unit type - '+type;
	} else if (typeof type == 'number') {
		return this._createUnit(this.unit_types[type], team,x,y,health);
	} else if (type instanceof  UnitType) {
		return this._createUnit(type, team,x,y,health);
	} else {
		throw 'UnitFactory::createUnit() unknown type - '+typeof type;
	}
}

/**
 * Creates an Unit of type
 * @protected
 * @param {UnitType} unit_type
 * @return {Unit}
 */
UnitFactory.prototype._createUnit = function(unit_type, team,x,y,health) {
	var unit = new Unit(unit_type, health);
	unit.type_index = this.unit_types.indexOf(unit_type);
	unit.img = new Array();
	unit.img.push(unit_type.img);
	unit.img.push({src:'/images/misc/flag-'+team+'.png', x:0, y:0 });
	unit.gfx_css_class = 'hex';
	unit.text = { text: unit.health, css_class: 'unit_health' };
	
	unit.team = team;
	unit.x = x;
	unit.y = y;
	return unit;
}