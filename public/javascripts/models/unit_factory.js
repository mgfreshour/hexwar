/**
 * Class knows how to make units
 * @constructor
 */
function UnitFactory() {
	this.unit_types = new Array();
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
		for (var n=this.unit_types.length-1; n >= 0; n--) {
			if (this.unit_types[n].name == type) {
				break;
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