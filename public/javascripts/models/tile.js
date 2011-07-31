/**
 * Class that represents a map tile
 * @contructor
 * @extends Hexwar.RenderableItem
 * @param {Hexwar.TileType} type
 */
function Tile(type) {
	this.type = type;
	this.RenderableItem();
}
Tile.DeriveFrom(Hexwar.RenderableItem);