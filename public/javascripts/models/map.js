/**
 * Represents a game map
 * @constructor
 * @param {Number} height
 * @param {Number} width
 * @param {String} name
 * @param {Number} id is the id to be passed on saving
 */
function Map(height, width, name, id) {
	if (height != undefined) {
		this.initialize(height, width, name, id);
	}
	
	this.tile_factory = ServiceContainer.get('TileFactory');
	this.unit_factory = ServiceContainer.get('UnitFactory');
}

/**
 * ...
 * @param {Number} height
 * @param {Number} width
 * @param {String} name
 * @param {Number} id is the id to be passed on saving
 */
Map.prototype.initialize = function(height, width, name, id) {
	this.width = width;
	this.height = height;
	this.name = name;
	this.id = id;
	this.tile_data = new Array2d(this.height, this.width);
	this.unit_data = [];
}

/**
 * Fills all the tile positions in the map with a single tile
 * @param {Tile} tile
 */
Map.prototype.fill = function(tile) {
	this.tile_data = new Array2d(this.height, this.width, tile);
}

/**
 * ...
 * @param {Number} id
 */
Map.prototype.loadFromServer = function(id) {
	var url = '/maps/'+id;
	var successFunction = function(data, textStatus, jqXHR) {
		this.initialize(data.map.height, data.map.width, data.map.name, data.map.id);

		goog.structs.forEach(data.map.tile_data, function(row, y) {
			goog.structs.forEach(row, function(col, x) {
				this.setTile(parseFloat(x), parseFloat(y), this.tile_factory.createTile(col.type_index));
			}, this);
		}, this);
		
		goog.structs.forEach(data.map.unit_data, function(unit) {
			this.setUnit(parseFloat(unit.x), parseFloat(unit.y), this.unit_factory.createUnit(unit.type_index, unit.team));
		},this);
	};

	$.ajax({ 
		  type:'GET'
		, async: false // I don't like this, but it's the quickest solution
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			modalAlert("Something went horribly wrong while loading the map data!!!", "Loading Failed");
		}
	});
}

/**
 * ...
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @return {Tile}
 */
Map.prototype.getTile = function(x,y) {
	return this.tile_data.get(x,y);
}

/**
 * ...
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @param {Tile} value
 */	
Map.prototype.setTile = function(x,y, value) {
	this.tile_data.set(x,y, value);
}

/**
 * ...
 * @todo this shouldn't know how units store their position
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @return {Unit|Boolean} the unit if found or FALSE
 */
Map.prototype.getUnit = function(x,y) {
	for (var n=0; n<this.unit_data.length; n++) {
		if (this.unit_data[n].x == x && this.unit_data[n].y == y) {
			return this.unit_data[n];
		}
	}
	return false;
}

/**
 *
 */
Map.prototype.clearUnits = function() {
	this.unit_data = [];
}

/**
 * Removes a unit from the map and destroys its reference
 * @todo this shouldn't know how to remove the graphics container
 * @param {Unit}
 */
Map.prototype.removeUnit = function(unit) {
	var index = this.unit_data.indexOf(unit);
	unit.gfx_container.remove();
	this.unit_data.splice(index,1);
}

/**
 * ...
 * @todo this shouldn't know how units store their position
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @param {Unit} unit
 */
Map.prototype.setUnit = function(x,y, value) {
	var old_unit = this.getUnit(x,y);
	if (old_unit) { this.removeUnit(old_unit); }
	value.x = x;
	value.y = y;
	this.unit_data.push(value);
}

/**
 * Saves the map to the server
 */
Map.prototype.save = function() { 
	var method = 'POST';
	var url = '/maps';
	if (this.id) {
		url += '/'+this.id;
		method = 'PUT';
  }

	var tile_data = [];
	for (var y=0; y < this.height; y++) {
		var tile_row = [];
		for (var x=0; x < this.width; x++) {
			tile_row.push({ type_index: this.getTile(x,y).type_index });
		}
		tile_data.push(tile_row);
	}
	
	var unit_data = [];
	for (x=0; x < this.unit_data.length; x++) {
		var u = this.unit_data[x];
		unit_data.push({ x: u.x, y: u.y, type_index: u.type_index , team: u.team });
	}
	
  $.ajax({ 
		  type:method
		, url:url
		, data:{ map: { number_of_players: this.number_of_players, name: this.name, tile_data:tile_data, unit_data:unit_data, width:this.width, height:this.height } } 
		, success: function(data, textStatus, jqXHR) {
			if (!data.map) {
				modalAlert(activeRecordErrorsToString(data));
			} else {
				this.id = data.map.id;
				modalAlert("Save Completed Successfully", "Save Complete");
			}
		}
		, error: function() {
			modalAlert("Save Failed", "Something went horribly wrong!!!");
		}
	});
}	
