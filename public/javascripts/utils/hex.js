goog.provide('Hexwar.Hex');
/**
 * Class that contains functions for working with a hex map
 * @constructor
 */
Hexwar.Hex = function() {
	
}
/**
 * The height of a hex in pixels
 * @const
 * @type {Number}
 */
Hexwar.Hex.HEX_HEIGHT = 72;
/**
 * The length of one of the sides of a hex in pixels (all 6 sides should be equal).
 * @const
 * @type {Number}
 */
Hexwar.Hex.HEX_SIDE = Hexwar.Hex.HEX_HEIGHT / 2;

/**
 * Returns the X,Y coordinates of all valid adjacent hexii
 * @param {Number} x
 * @param {Number} y
 * @param {Number} height is the height of 2d array representing the hex map
 * @param {Number} width is the width of 2d array representing the hex
 * @return {Array.<{x: number, y: number}>} array of {x, y} objects representing adjacent coordinates
 */
Hexwar.Hex.getAdjacentCoords = function(x,y, height, width) {
	var possible = null;
	if(x%2) {
		possible = [
			//{x:x+1, y:y-1},
			{x:x+1, y:y},
			{x:x+1, y:y+1},
			{x:x, y:y-1},
			{x:x, y:y},
			{x:x, y:y+1},
			//{x:x-1, y:y-1},
			{x:x-1, y:y},
			{x:x-1, y:y+1}
		];
	} else {
		possible = [
			{x:x+1, y:y-1},
			{x:x+1, y:y},
			//{x:x+1, y:y+1},
			{x:x, y:y-1},
			{x:x, y:y},
			{x:x, y:y+1},
			{x:x-1, y:y-1},
			{x:x-1, y:y}
			//{x:x-1, y:y+1}
		];
	}
	var ret = [];

	for (var n=0; n<possible.length; n++)  {
		if (possible[n].x >= 0 && possible[n].x < width && possible[n].y >= 0 && possible[n].y < height) {
			ret.push(possible[n]);
		}
	}

	return ret;
}

/**
 * Recursively walks a hex map starting from x,y and iterating through adjacent hexii.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} max_depth (optional) how far from the starting hex to walk.  Defaults to 1.
 * @param {Function} callback (optional) function to call with each step
 * @param {Number} height is the height of 2d bitmap representing the hex map
 * @param {Number} width is the height of 2d bitmap representing the hex map
 * @param {Number} current_depth (used on recursion only!) how far we've recursed from original point
 * @param {Array2d} bitmap (used on recursion only!) contains info about which hex's we've visited
 * @param {Number} prev_x coordinate of the hex we're recursing from
 * @param {Number} prev_y coordinate of the hex we're recursing from
 */
Hexwar.Hex.walkAdjacent = function(x,y,max_depth, callback, height, width, current_depth, bitmap, prev_x, prev_y) {
	current_depth = current_depth || 1;
	max_depth = max_depth || 1;
	prev_x = prev_x == undefined ? -1 : prev_x;
	prev_y = prev_y == undefined ? -1 : prev_y;
	
	if (!bitmap) {
		bitmap = new Array2d(height, width);
	}
	
	if (current_depth-1 == max_depth) {
		return;
	}
	var coords = Hexwar.Hex.getAdjacentCoords(x,y,height, width);

	// Walk thru the adjacent squares and recurse into their neighbors
	for (var n=0; n < coords.length; n++) {
		if (bitmap.get(coords[n].x,coords[n].y) >= current_depth-max_depth || bitmap.get(coords[n].x,coords[n].y) == 0) {
			bitmap.set(coords[n].x,coords[n].y, current_depth);
			callback(coords[n].x, coords[n].y, current_depth, prev_x, prev_y);
			Hexwar.Hex.walkAdjacent(coords[n].x, coords[n].y, max_depth, callback, height, width, current_depth+1, bitmap, coords[n].x, coords[n].y);
		}
	}
}

/**
 * Converts from screen coordinates to map coordinates
 * @param {Number} screenX
 * @param {Number} screenY
 * @return {x: number, y: number} an {x,y} object of the coordinates containing screen point
 */
Hexwar.Hex.convertScreenToMapCoords = function(screenX, screenY) {
	// ----------------------------------------------------------------------
 	// --- Determine coordinate of map div as we want the click coordinate as
	// --- we want the mouse click relative to this div.
	// ----------------------------------------------------------------------
	var posx = screenX;
	var posy = screenY;

	// ----------------------------------------------------------------------
	// --- Convert mouse click to hex grid coordinate
	// --- Code is from http://www-cs-students.stanford.edu/~amitp/Articles/GridToHex.html
	// ----------------------------------------------------------------------
	x = (posx - (Hexwar.Hex.HEX_HEIGHT/2)) / (Hexwar.Hex.HEX_HEIGHT * 0.75);
	y = (posy - (Hexwar.Hex.HEX_HEIGHT/2)) / Hexwar.Hex.HEX_HEIGHT;
	z = -0.5 * x - y;
	y = -0.5 * x + y;

	ix = Math.floor(x+0.5);
	iy = Math.floor(y+0.5);
	iz = Math.floor(z+0.5);
	s = ix + iy + iz;
	if (s) {
		abs_dx = Math.abs(ix-x);
		abs_dy = Math.abs(iy-y);
		abs_dz = Math.abs(iz-z);
		if (abs_dx >= abs_dy && abs_dx >= abs_dz) {
			ix -= s;
		} else if (abs_dy >= abs_dx && abs_dy >= abs_dz) {
			iy -= s;
		} else {
			iz -= s;
		}
	}

	// Done!
	return {
		x: ix,
		y: (iy - iz + (1 - ix % 2 ) ) / 2 - 0.5
	}

}

/**
 * Calculates where to start drawing a hex
 * @param {Number} mapX
 * @param {Number} mapY
 * @return {x: number, y: number} an {x,y} object of the coordinates containing screen point
 */
Hexwar.Hex.calculateHexPosition = function(mapX, mapY) {	
	return {
		x: (mapX * Hexwar.Hex.HEX_SIDE * 1.5),
	 	y: (mapY * Hexwar.Hex.HEX_HEIGHT + (mapX % 2) * Hexwar.Hex.HEX_HEIGHT / 2)
	};
}
