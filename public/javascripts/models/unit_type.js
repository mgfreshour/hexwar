/**
 * Class that represents a type of unit
 * @param {String} name
 * @param {String} img
 * @param {Number} img_x
 * @param {Number} img_y
 * @param {Number} range
 * @param {Number} move_range
 * @param {Array} move_costs
 * @param {Array} defense_bonuses
 */
function UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses) {
	this.name = name;
	this.img = {src:img, x:img_x, y:img_y};
	this.starting_health = 10;
	this.move_range = move_range;
	this.range = range;
	this.move_costs = move_costs;
	this.defense_bonuses = defense_bonuses;
}




