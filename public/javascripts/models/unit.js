namespace('Hexwar.Unit');

/**
 * Class that represents a unit in the game
 * @contructor
 * @extends Hexwar.RenderableItem
 * @extends Observable
 * @param {Hexwar.UnitType} type
 * @param {Number} health
 */
Hexwar.Unit = function (type, health) {
	this.x = 0;
	this.y = 0;
	this.type = type;
	
	this.team = '';
	this.health = health || type.starting_health;
	this.range = type.range;
	this.alive = true;
	
	// Call parent c'tors
	this.RenderableItem();
	this.Observable();
}
Hexwar.Unit.DeriveFrom(Hexwar.RenderableItem, 'RenderableItem');
Hexwar.Unit.DeriveFrom(Observable);

/**
 * Changes unit's position
 * @param {Number} x
 * @param {Number} y
 */
Hexwar.Unit.prototype.move = function(x,y) {
	this.notifyListeners('move', x,y, this);
	this.x = x;
	this.y = y;
}

/**
 * Changes a unit's health
 * @param {Number} delta the amount to change by
 * @returns {Boolean} true the unit still live, false this change killed it
 */
Hexwar.Unit.prototype.changeHealth = function(delta) {
	this.health += delta;
	this.notifyListeners('health_change', this.health, delta, this);
	
	if (this.health <= 0) {
		this.health = 0;
		this.alive = false;
		
		this.notifyListeners('death', this);
	}
	return this.alive;
}