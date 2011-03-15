/**
 * Represents a type of map tile
 * @constructor
 */
function TileType(name, img, img_x, img_y) {
	this.name = name;
	this.img = { src: img, x: img_x, y:img_y };
}
