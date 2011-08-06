namespace('Hexwar.StoreController');
/**
 * ...
 * @constructor
 * @param {Game} game
 * @param {Map} map
 * @param {Hexwar.MapView} mapview
 * @param {String} current_player
 */
Hexwar.StoreController = function (game, map, mapview, current_player) {
	this.map = map;
	this.game = game;
	this.mapview = mapview;
	this.current_player = current_player;
}

/**
 * ...
 * @param {Integer} x
 * @param {Integer} y
 * @return {Boolean}
 */
Hexwar.StoreController.prototype.attemptStoreSelect = function(x,y) {
	debug.log('attemptStoreSelect('+x+','+y+')');
}