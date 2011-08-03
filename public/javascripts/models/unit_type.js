goog.provide('Hexwar.UnitType');
/**
 * Class that represents a type of unit
 * @param {String} name
 * @param {String} img
 * @param {Number} img_x
 * @param {Number} img_y
 * @param {Number} attack_range
 * @param {Number} attack_power
 * @param {Number} defense_power
 * @param {Number} move_range
 * @param {Array} move_costs
 * @param {Array} defense_bonuses
 */
Hexwar.UnitType = function (name, img, img_x, img_y, attack_range, attack_power, defense_power, move_range, move_costs, defense_bonuses) {
	this.name = name;
	this.img = {src:img, x:img_x, y:img_y};
	this.range = attack_range;
	this.attack_power = attack_power;
	this.defense_power = defense_power;
	this.move_range = move_range;
	this.move_costs = move_costs;
	this.defense_bonuses = defense_bonuses;

	this.starting_health = 10;
}




