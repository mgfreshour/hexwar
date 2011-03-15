
/**
 * Represents a mask to be drawn over a map
 * @param {Map} map
 */
function MapViewMask(map) {
	this.map = map;
	this.mask = null;
	
	this.mask_black = 0;
	this.mask_clear = 1;
	this.mask_red   = 2;
	
	this.generateMask([]);
}

/**
 * The image for a black masked tile
 * @type {String}
 */
MapViewMask.prototype.mask_img_black = '/images/misc/mask.png';
/**
 * The image for a red masked tile
 * @type {String}
 */
MapViewMask.prototype.mask_img_red = '/images/misc/mask-red.png';

/**
 * Gets the value for a position
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 */
MapViewMask.prototype.get = function(x,y) {
	return this.mask.get(x,y);
}

/**
 * Sets the value for a position
 * @param {Number} x
 * @param {Number} y
 * @param {Number} val
 */
MapViewMask.prototype.set = function(x,y, val) {
	this.mask.set(x,y,val);
}

/**
 * Gets the value for a position
 * @param {Number} x
 * @param {Number} y
 * @param {Number} max_depth
 * @param {Function} mask_callback
 * @return {Number} the number of hexes masked
 */
MapViewMask.prototype.unmaskAdjacent = function(x,y,max_depth, mask_callback) {
	this.generateDistanceMap(x,y,max_depth);
	mask_callback = mask_callback || (function(x,y,val) { return this.mask_clear; }).createDelegate(this);
	this.filterByCallback(mask_callback);
	
	// count the number of unmasked
	count = 0;
	for (var y=0; y < this.map.height; y++) {
		for (var x=0; x < this.map.width; x++) {
			if(this.mask.get(x,y)) { count++; }
		}
	}

	return count;
}

/**
 * Generates a distance map inside the maskview
 * @param {Number} x
 * @param {Number} y
 * @param {Number} max_depth
 * @param {Number} current_depth
 */
MapViewMask.prototype.generateDistanceMap = function(x,y,max_depth, current_depth) {
	var callback = function(x,y,current_depth) {
		this.mask.set(x,y, current_depth);
	}
	Hex.walkAdjacent(x,y,max_depth, callback.createDelegate(this), this.map.height, this.map.width);
}

/**
 * Iterates through each value in the array and passes it to callback function, then sets the value to what the callback returned.
 * @param {Function}
 */
MapViewMask.prototype.filterByCallback = function(callback) {
	this.mask.filterByCallback(callback);
}

/**
 * Merges two another mask into this one
 * @param {MapViewMask} merger
 * @param {Array} values (optional) the values to merge over. Defaults to [ this.mask_clear, this.mask_red ].
 */
MapViewMask.prototype.merge = function(merger, values) {
	values = values || [ this.mask_clear, this.mask_red ];
	
	for (var y=0; y < this.map.height; y++) {
		for (var x=0; x < this.map.width; x++) {
			if (values.indexOf(merger.get(x,y)) > -1) {
				this.set(x,y, merger.get(x,y));
			}
		}
	}
}

/**
 * Masks all hexes with a unit on it
 * @param {Number} value (optional) the value to mask with.  Defaults to this.mask_black
 */
MapViewMask.prototype.maskOccupied = function(value) {
	value = value !== undefined ? value : this.mask_black;
	for (n=0; n< this.map.unit_data.length; n++) {
		this.mask.set(this.map.unit_data[n].x, this.map.unit_data[n].y, value);
	}
}

/**
 * Generates a new mask
 * @param {Array.<{x: number, y: number}>} coordinates (optional) to set as fill
 * @param {Number} fill (optional) Defaults to this.mask_clear
 * @param {Number} pad (optional) Defaults to this.mask_black
 */
MapViewMask.prototype.generateMask = function(coords, fill, pad) {
	if(fill == undefined) { fill = this.mask_clear; }
	if(pad == undefined) { pad = this.mask_black; }
	if(coords == null) { coords = []; }
	
	this.mask = new Array2d(this.map.height, this.map.width, pad);

	this.mask.setMulti(coords, this.mask, fill)
}