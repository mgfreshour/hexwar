goog.provide('Hexwar.TileType');
/**
 * Represents a type of map tile
 * @constructor
 */
Hexwar.TileType = function (name, img, img_x, img_y) {
	this.name = name;
	this.img = { src: img, x: img_x, y:img_y };
}
