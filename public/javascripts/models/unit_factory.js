goog.provide('Hexwar.UnitFactory');
/**
 * Class knows how to make units
 * @constructor
 */
Hexwar.UnitFactory = function () {
	this.unit_types = new Array();
}

/**
 * Loads the tile types from server using ajax call
 * @param {String} url
 */
Hexwar.UnitFactory.prototype.loadFromServer = function(url) {
	url = url || '/unit_types';
	
	var successFunction = function(data, textStatus, jqXHR) {
		var obj, move_costs, defense_bonuses;
		for (var n=0; n < data.length; n++) {
			obj = data[n].unit_type;
			move_costs = {
				  bridge_center: parseFloat(obj.move_cost_bridge_center)
				, bridge_left: parseFloat(obj.move_cost_bridge_left )
				, bridge_right: parseFloat(obj.move_cost_bridge_right) 
				, castle: parseFloat(obj.move_cost_castle)
				, city: parseFloat(obj.move_cost_city) 
				, desert: parseFloat(obj.move_cost_desert) 
				, dirt: parseFloat(obj.move_cost_dirt)
				, forest: parseFloat(obj.move_cost_forest)
				, grass: parseFloat(obj.move_cost_grass) 
				, hills: parseFloat(obj.move_cost_hills)
				, mountains: parseFloat(obj.move_cost_mountains)
				, oasis: parseFloat(obj.move_cost_oasis)
				, path: parseFloat(obj.move_cost_path)
				, swamp: parseFloat(obj.move_cost_swamp)
				, water: parseFloat(obj.move_cost_water)
			};
			
			defense_bonuses = {
          bridge_center:obj.defense_bonus_bridge_center
        , bridge_left :obj.defense_bonus_bridge_left
        , bridge_right:obj.defense_bonus_bridge_right
        , castle:obj.defense_bonus_castle
        , city:obj.defense_bonus_city
        , desert:obj.defense_bonus_desert
			  , dirt:obj.defense_bonus_dirt
        , forest:obj.defense_bonus_forest
        , grass:obj.defense_bonus_grass
        , hills:obj.defense_bonus_hills
        , mountains:obj.defense_bonus_mountains
        , oasis:obj.defense_bonus_oasis
        , path:obj.defense_bonus_path
			  , swamp:obj.defense_bonus_swamp
        , water:obj.defense_bonus_water
      };

			this.createUnitType(obj.name, obj.img, parseFloat(obj.img_x), parseFloat(obj.img_y), parseFloat(obj.attack_range)
					, parseFloat(obj.attack_power), parseFloat(obj.defense_power), parseFloat(obj.move_range), move_costs, defense_bonuses)
	 	}
	};
	
	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Something went horribly wrong while loading the unit data!!!", "Loading Failed");
		}
	});
			
}

/**
 * Adds a unit type to the internal types array
 * @param {Hexwar.UnitType} unit_type
 * @return {Number} index of the added type
 */
Hexwar.UnitFactory.prototype.addUnitType = function(unit_type) {
	this.unit_types.push(unit_type);
	return this.unit_types.length-1;
}

/**
 * Adds a unit type to the internal types array
 * @param {String} name
 * @param {String} img
 * @param {Number} img_x
 * @param {Number} img_y
 * @param {Number} attack_range
 * @param {Number} attack_power
 * @param {Number} defense_power
 * @param {Number} move_range
 * @param {!Object} move_costs
 * @param {!Object} defense_bonuses
 *
 * @return {Number} Index of the newly added type
 */
Hexwar.UnitFactory.prototype.createUnitType = function(name, img, img_x, img_y, attack_range, attack_power, defense_power, move_range, move_costs, defense_bonuses) {
	var type = new Hexwar.UnitType(name, img, img_x, img_y, attack_range, attack_power, defense_power, move_range, move_costs, defense_bonuses);
	return this.addUnitType(type);
}

/**
 * Creates a Unit based on Type
 * @param {Number|String|Hexwar.UnitType} type
 * @param {String} team ex. 'red', 'blue', 'green', 'white'
 * @param {Number} x
 * @param {Number} y
 * @param {Number} health
 * @return {Unit}
 */
Hexwar.UnitFactory.prototype.createUnit = function(type, team,x,y,health) {
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
	} else if (type instanceof  Hexwar.UnitType) {
		return this._createUnit(type, team,x,y,health);
	} else {
		throw 'UnitFactory::createUnit() unknown type - '+typeof type;
	}
}

/**
 * Creates an Unit of type
 * @protected
 * @param {Hexwar.UnitType} unit_type
 * @param {String} team
 * @param {Number} x
 * @param {Number} y
 * @param {Number} health
 * @return {Hexwar.Unit}
 */
Hexwar.UnitFactory.prototype._createUnit = function(unit_type, team,x,y,health) {
	var unit = new Hexwar.Unit(unit_type, health);
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