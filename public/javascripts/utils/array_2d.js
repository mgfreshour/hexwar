
/**
 * Class that represents a 2d array
 * @constructor
 * @param {Number} height (optional)
 * @param {Number} width (optional)
 * @param {Object} value (optional) the value to fill the array with on creation. Defaults to 0.
 */
function Array2d(height, width, value) {
    value = value || 0;
    if (height && width) {
        this.generate(height, width, value);
    }
}

/**
 * Creates the internal structure for the 2d array
 * @param {Number} height 
 * @param {Number} width
 * @param {Object} value (optional) the value to fill the array with on creation. Defaults to 0.
 */
Array2d.prototype.generate = function(height, width, value) {
    value = value || 0;
    this.data = new Array();
    this.height = height;
    this.width = width;
    for (var sy=0; sy < height; sy++) {
			var row = [];
			for (var sx=0; sx < width; sx++) {
				if (typeof value == 'object') {
					row.push($.extend(true, {}, value));
				} else { // primitive.. hopefully  :)
					row.push(value);
				}
			}
			this.data.push(row);
    }
}

/**
 * Iterates through each value in the array and passes it to callback function.
 * @param {Function}
 */
Array2d.prototype.each = function(callback) {
    for (var y=0; y < this.height; y++) {
        for (var x=0; x < this.width; x++) {
            callback(this.data[y][x]);
        }

    }
}

/**
 * Iterates through each value in the array and passes it to callback function, then sets the value to what the callback returned.
 * @param {Function}
 */
Array2d.prototype.filterByCallback = function(callback) {
    for (var y=0; y < this.height; y++) {
        for (var x=0; x < this.width; x++) {
            this.data[y][x] = callback(x, y, this.data[y][x]);
        }
    }
}

/**
 * Sets multiple coordinate values at once
 * @param {Array.<{x: number, y: number}>} coords the array of {x,y} objects that represent the coordinates.
 * @param {Object} value to set all the places as.
 */
Array2d.prototype.setMulti = function(coords, value) {
    for (var n=0; n < coords.length; n++) {
        this.data[coords[n].y][coords[n].x] = value;
    }
}

/**
 * Sets the value at a coordinate
 * @param {Number} x
 * @param {Number} y
 * @param {Object} value to set
 */
Array2d.prototype.set = function(x,y, value) {
    this.data[y][x] = value;
}

/**
 * Gets the value at a coordinate
 * @param {Number} x
 * @param {Number} y
 */
Array2d.prototype.get = function(x,y) {
    return this.data[y][x];
}

/**
 * Creates a printable string representation of the 2d array
 * @return {String}
 */
Array2d.prototype.toString = function() {
    var out = '';
    for (var y=0; y < this.height; y++) {
        for (var x=0; x < this.width; x++) {
            out += '[' + this.data[y][x] + ']';
        }
        out += "\n";
    }

    return out;
}