goog.provide('Hexwar.MapView');
/**
 * Renders a map to a container
 * @constructor
 * @param {jQueryObject} container
 */
Hexwar.MapView = function (container) {
	this.container = container;
	this.container.click(this.onClick.createDelegate(this));
	this.container.mapview = this;
	this.delegateClick = function(x, y) {};
	this.selected = null;
	this.renderer = new Hexwar.jQueryRenderer(container);
	this.renderer.addLayer('map');
	this.renderer.addLayer('units');
	this.renderer.addLayer('mask');
	this.renderer.addLayer('text');
	this.showCoords = false;
	this.cursor = new Hexwar.RenderableItem('/images/misc/hex-highlight.png');
	this.cursor.gfx_css_class = 'hex';
}

/**
 * Sets the function to delegate a map click to
 * @param {Function} fn
 */
Hexwar.MapView.prototype.setDelegateClick = function(fn) {
	this.delegateClick = fn;
}

/**
 * Handles a click to the map container, translating it to map coordinates and passing it on to the delegate
 * @param {jQuery.event} event
 */
Hexwar.MapView.prototype.onClick = function(event) {
	var mapCoords = Hexwar.Hex.convertScreenToMapCoords(
			  event.pageX - this.container.offset().left
			, event.pageY - this.container.offset().top);
	
	if (mapCoords.x < 0 || mapCoords.x >= this.map.width || mapCoords.y < 0 || mapCoords.y >= this.map.height) {
		return;
	}

	// Move the cursor to the clicked hex
	this.setCursor(mapCoords.x, mapCoords.y);
	
	this.delegateClick(mapCoords.x, mapCoords.y);
}

/**
 * Draws a Tile object
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @param {Tile} tile
 */
Hexwar.MapView.prototype.drawTile = function(x, y, tile) {
	var hex_pos = this.calculateHexPosition(x,y);

	this.renderer.drawItemToLayer('map', hex_pos.x, hex_pos.y, tile);
	if (this.showCoords) {
		var hex_space = new Hexwar.RenderableItem();
		var array_space = new Hexwar.RenderableItem();
		hex_space.gfx_css_class = 'hex';
		array_space.gfx_css_class = 'hex';
		var coords = Hexwar.Hex.convertArrayToHexCoords(x,y);
		hex_space.text = { text:coords.x+','+coords.y, css_class:'coord' };
		array_space.text = { text:x+','+y, css_class:'sub_coord' };
		this.renderer.drawItemToLayer('text', hex_pos.x, hex_pos.y, hex_space);
		this.renderer.drawItemToLayer('text', hex_pos.x, hex_pos.y, array_space);
	}
}

/**
 * Draws a Unit object
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 * @param {Unit} unit
 */
Hexwar.MapView.prototype.drawUnit = function(x, y, unit) {
	var hex_pos = this.calculateHexPosition(x,y);
	this.renderer.drawItemToLayer('units', hex_pos.x, hex_pos.y, unit);	
}

/**
 * Draws fading text to represent damages to units
 * @param {Array.<{x: number, y: number, text:string}>} array
 */
Hexwar.MapView.prototype.drawDamages = function(array) {
	for (n=0; n < array.length; n++) {
		var hex_pos = this.calculateHexPosition(array[n].x,array[n].y);
		var text = new Hexwar.RenderableItem();
		text.gfx_css_class = 'hex';
		text.text = {text:array[n].text, css_class: 'damage'};
		this.renderer.drawItemToLayer('text', hex_pos.x, hex_pos.y, text);
		this.renderer.fadeOutAndRemove(text, 500, 1000);
	}
}

/**
 * Draws the Tile and Unit for a map hex
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 */
Hexwar.MapView.prototype.drawLocation = function(x,y) {
	this.drawTile(x, y, this.map.getTile(x,y));
	this.drawUnit(x, y, this.map.getUnit(x,y));
}

/**
 * Draws all hexes and units from the map
 * @param {Map} map
 */
Hexwar.MapView.prototype.drawMap = function(map) {
	this.map = map;
	
	for (var y=0; y < this.map.height; y++) {
		for (var x=0; x < this.map.width; x++) {
			this.drawLocation(x,y);
		}
	}

	// Resize the container
	this.container.css('width', this.map.width*Hexwar.Hex.HEX_HEIGHT*0.75+Hexwar.Hex.HEX_HEIGHT*0.25);
	this.container.css('height', this.map.height*Hexwar.Hex.HEX_HEIGHT + Hexwar.Hex.HEX_HEIGHT/2)
}

/**
 * uh... think about the name
 */
Hexwar.MapView.prototype.hideCursor = function() {
	this.renderer.hideItem(this.cursor);
}

/**
 * uh... think about the name
 */
Hexwar.MapView.prototype.showCursor = function() {
	this.renderer.showItem(this.cursor);
}

/**
 * Moves the cursor to a particular map hex
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 */
Hexwar.MapView.prototype.setCursor = function(x,y) {
	var hexPos = this.calculateHexPosition(x, y);
	this.showCursor();
	this.renderer.drawItemToLayer('cursor', hexPos.x, hexPos.y, this.cursor);
	this.selected = { x: x, y: y };
}

/**
 * Clears all MapViewMasks currently showing
 */
Hexwar.MapView.prototype.clearMask = function() {
	this.renderer.clearLayer('mask');
}

/**
 * Draws a MapViewMask.  This also clears any previous masks
 * @param {Hexwar.MapViewMask} mask
 */
Hexwar.MapView.prototype.drawMask = function(mask) {
	this.clearMask();
	for (var y=0; y < this.map.height; y++) {
		for (var x=0; x < this.map.width; x++) {
			var hex_pos = this.calculateHexPosition(x,y);
			var mask_hex = null;
			switch(mask.get(x,y)) {
				case mask.mask_black:
					mask_hex = new Hexwar.RenderableItem(mask.mask_img_black);
					mask_hex.gfx_css_class = 'hex';
					this.renderer.drawItemToLayer('mask', hex_pos.x, hex_pos.y, mask_hex);
					break;
				case mask.mask_red:
					mask_hex = new Hexwar.RenderableItem(mask.mask_img_red);
					mask_hex.gfx_css_class = 'hex';
					this.renderer.drawItemToLayer('mask', hex_pos.x, hex_pos.y, mask_hex);
					break;
			}
		}
	}
}

/**
 * Draws all text from an array
 * @todo needs to use Array2d
 * @param {Array} bitmap
 */
Hexwar.MapView.prototype.drawTextBitmap = function(bitmap) {
	for (var y=0; y < this.map.height; y++) {
		for (var x=0; x < this.map.width; x++) {
			var hex_pos = this.calculateHexPosition(x,y);
			
			var text = new Hexwar.RenderableItem();
			text.gfx_css_class = 'hex';
			text.text = { text: bitmap[y][x]+'', css_class: 'coord' };
			this.renderer.drawItemToLayer('text', hex_pos.x, hex_pos.y, text);			
		}
	}
}

/**
 * Calculates the actual screen position of a hex
 * @param {Number} x the map coordinate
 * @param {Number} y the map coordinate
 */
Hexwar.MapView.prototype.calculateHexPosition = function(x,y) {
	hex_pos = Hexwar.Hex.calculateHexPosition(x,y);
	hex_pos.x += this.container.offset().left;
	hex_pos.y += this.container.offset().top;
	return hex_pos;
}

/**
 * Clears all drawings
 */
Hexwar.MapView.prototype.clear = function clear() {
	this.renderer.clearScreen();
}

