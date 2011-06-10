/**
 * Is responsible for creating Tile objects
 * @constructor
 */
function TileFactory() {
	this.tile_types = new Array();
}

/**
 * Loads the tile types from server using ajax call
 * @param {String} url
 */
TileFactory.prototype.loadFromServer = function(url) {
	url = url || '/tile_types';
	
	var successFunction = function(data, textStatus, jqXHR) {
		var obj;
		for (var n=0; n < data.length; n++) {
			obj = data[n].tile_type;
			this.createTileType(obj.name, obj.img, obj.img_x, obj.img_y);
	 	}
	};
	
	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Loading Failed", "Something went horribly wrong while loading the tile data!!!");
		}
	});
			
}

/**
 * Adds a tile type to the internal types array
 * @param {TileType} tile_type
 * @return {Number} index of the added type
 */
TileFactory.prototype.addTileType = function(tile_type) {
	this.tile_types.push(tile_type);
	return this.tile_types.length-1;
}

/**
 * Adds a tile type to the internal types array
 * @param {String} name
 * @param {String} img
 * @param {Number} img_x
 * @param {Number} img_y
 * @return {Number} index of the added type
 */
TileFactory.prototype.createTileType = function(name, img, img_x, img_y) {
	var type = new TileType(name, img, img_x, img_y);
	return this.addTileType(type);
}

/**
 * Creates a Tile based on Type
 * @param {Number|String|TileType} type
 * @return {Tile}
 */
TileFactory.prototype.createTile = function(type) {
	if (typeof type == 'string') {
		var n=0;
		// Is this really a number in a string?
		if (!isNaN(parseFloat(type)) && isFinite(type)) {
			n = parseFloat(type);
		} else {
			for (n=this.tile_types.length-1; n >= 0; n--) {
				if (this.tile_types[n].name == type) {
					break;
				}
			}
		}
		if (n >= 0) {
			return this._createTile(this.tile_types[n]);
		}
		throw 'TileFactory::createTile() unable to find tile type - '+type;
	} else if (typeof type == 'number') {
		return this._createTile(this.tile_types[type]);
	} else if (type instanceof  TileType) {
		return this._createTile(type);
	} else {
		throw 'TileFactory::createTile() unknown type - '+typeof type;
	}
}

/**
 * Creates an Tile of type
 * @protected
 * @param {TileType} tile_type
 * @return {Tile}
 */
TileFactory.prototype._createTile = function(tile_type) {
	var tile = new Tile(tile_type);
	tile.img = tile_type.img;
	tile.gfx_css_class = 'hex';
	tile.type_index = this.tile_types.indexOf(tile_type);
	return tile;
}
