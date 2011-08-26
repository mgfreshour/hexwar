namespace('Hexwar.UnitType');

/**
 * Class that represents a type of unit
 * @param {Object} params
 */
Hexwar.UnitType = function (params) {
	this.name = params.name;
	this.price = params.price;
	this.img = {src:params.img, x:params.img_x, y:params.img_y};
	this.range = params.attack_range;
	this.hard_attack_power = params.hard_attack_power;
	this.soft_attack_power = params.soft_attack_power;
	this.defense_type = params.defense_type;
	this.defense_power = params.defense_power;
	this.move_range = params.move_range;
	this.move_costs = params.move_costs;
	this.defense_bonuses = params.defense_bonuses;

	this.starting_health = 10;
}




