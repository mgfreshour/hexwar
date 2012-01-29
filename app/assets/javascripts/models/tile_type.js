namespace('Hexwar.TileType');

/**
 * Represents a type of map tile
 * @constructor
 */
Hexwar.TileType = function (name, img, img_x, img_y, ownable, is_store, unit_types_available) {
	this.name = name;
	this.ownable = ownable;
	this.img = { src: img, x: img_x, y:img_y };
	this.is_store = is_store
	this.unit_types_available = unit_types_available;
}
