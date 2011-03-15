/**
 * Class that represents a map tile
 * @contructor
 * @extends RenderableItem
 * @param {TileType} type
 */
function Tile(type) {
	this.type = type;
	this.RenderableItem();
}
Tile.DeriveFrom(RenderableItem);