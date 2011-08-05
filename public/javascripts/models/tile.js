namespace('Hexwar.Tile');

/**
 * Class that represents a map tile
 * @contructor
 * @extends Hexwar.RenderableItem
 * @param {Hexwar.TileType} type
 */
Hexwar.Tile = function(type) {
	this.type = type;
	this.RenderableItem();
	this.owner = '';
}
Hexwar.Tile.DeriveFrom(Hexwar.RenderableItem, 'RenderableItem');