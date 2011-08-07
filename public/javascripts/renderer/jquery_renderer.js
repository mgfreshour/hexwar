namespace('Hexwar.jQueryRenderer');

/**
 * Class that handles drawing stuff on the screen.
 * @constructor
 * @implements {Hexwar.iRenderer}
 * @param {jQueryObject} screen the main container to render to
 */
Hexwar.jQueryRenderer = function (screen) {
	this.screen = screen
	this.repos = new Hexwar.RenderablesRepository();
	this.layers = {};
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.drawItemToLayer = function(layer_name, x, y, item)  {
	layer = this._getLayer(layer_name);
	this._drawItem(item, layer, x, y);
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.hideItem = function(item) {
	if (item.gfx_container) {
		item.gfx_container.hide();
	}
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.showItem = function(item) {
	if (item.gfx_container) {
		item.gfx_container.show();
	}
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.removeItem = function(item) {
	if (item.gfx_container) {
		item.gfx_container.remove();
	}
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.addLayer = function(layer_name) {
	this.layers[layer_name] = $('<div id="rendering_layer_'+layer_name+'" class="rendering_layer"></div>');
	this.screen.append(this.layers[layer_name]);
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.clearLayer = function(layer_name) {
	if (this.layers[layer_name] != undefined) {
		this.layers[layer_name].html('');
	}
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.clearScreen = function(layer_name) {
	$.each(this.layers, function(key, val) {
		this.clearLayer(key);
	}.createDelegate(this));
	// for (layer in this.layers) {
	// 	this.clearLayer(layer);
	// }
}

/** 
 * @inheritDoc 
 */
Hexwar.jQueryRenderer.prototype.fadeOutAndRemove = function(item, duration, delay) {
	delay = delay !== undefined ? delay : 0;
	duration = duration !== undefined ? duration : 500;
	if (item.gfx_container) {
		item.gfx_container.delay(delay).fadeOut(duration, function() { $(this).remove(); });
	}
}

/**
 * Gets or creates a layer of name
 * @private
 * @param {String} layer_name
 * @return {jQueryObject}
 */
Hexwar.jQueryRenderer.prototype._getLayer = function(layer_name) {
	if (this.layers[layer_name] == undefined) {
		this.addLayer(layer_name);
	}
	
	return this.layers[layer_name];
}

/**
 * Draw a RenderableItem to the screen
 * @private
 * @param {Hexwar.RenderableItem} item
 * @param {jQueryObject} container the jquery item to draw into
 * @param {Number} screen_x
 * @param {Number} screen_y
 * @param {Boolean} force_redraw
 */
Hexwar.jQueryRenderer.prototype._drawItem = function(item, container, screen_x, screen_y, force_redraw) {
	if (item.gfx_container && !force_redraw) {
		item.gfx_container.animate({left: screen_x, top: screen_y}, 100);
	} else {	
		// --- Style values to position hex image in the right location
		var pos_style = 'left:'+Math.round(screen_x)+'px; top:'+Math.round(screen_y)+'px;';
		var n = 0;
		var css_class = item.gfx_css_class;
		
		// Create the graphic container
		item.gfx_container = $('<div style="'+pos_style+'" class="'+css_class+'"></div>');
		var img = null;

		// Draw the images
		if (item.img) {
			if ($.isArray(item.img)) {
				for (n=0; n<item.img.length; n++) {
					this._drawImgDiv(item.img[n].src, item.gfx_container, item.img[n].x, item.img[n].y);
				}
			} else {
				this._drawImgDiv(item.img.src, item.gfx_container, item.img.x, item.img.y);
			}
		}
		
		// Draw the text
		if (item.text) {
			if ($.isArray(item.text)) {
				for (n=0; n<item.text.length; n++) {
					item[n].text.div = this._drawText(item.text[n].text, item.gfx_container, item.text[n].css_class);
				}
			} else {	
				item.text.div = this._drawText(item.text.text, item.gfx_container, item.text.css_class);
			}
		}

		// Flip the buffer... sort of :P
		container.append(item.gfx_container);
	}
}

/**
 * Draws an image to the screen as a BG image on a div
 * @private
 * @param {String} img_src 
 * @param {jQueryObject} container where to add elements
 * @param {Number} img_x the position in the background image to start drawing from
 * @param {Number} img_y the position in the background image to start drawing from
 * @param {Number} screen_x
 * @param {Number} screen_y
 * @return {jQueryObject} the jquery element that now represents the image
 */
Hexwar.jQueryRenderer.prototype._drawImgDiv = function(img_src, container, img_x, img_y, screen_x, screen_y) {
	var pos_style = '',
			bg_pos = '';
	if (screen_x != undefined && screen_y != undefined) {
		pos_style = 'left:'+Math.round(screen_x)+'px; top:'+Math.round(screen_y)+'px;';
	}
	if (img_x != undefined && img_y != undefined) {
		bg_pos = img_x+'px '+img_y*-1+'px';
	}
	var img = $('<div alt="" class="img" style="background: url('+img_src+') '+bg_pos+' no-repeat;'+pos_style+'"></div>');
	//var img = $('<img src="'+img_src+'" alt="" style="'+pos_style+'" />');
	container.append(img);
	return img;
}

/**
 * Draws an image to the screen as a BG image on a div
 * @private
 * @param {String} img_src 
 * @param {jQueryObject} container where to add elements
 * @param {Number} screen_x
 * @param {Number} screen_y
 * @return {jQueryObject} the jquery element that now represents the image
 */
Hexwar.jQueryRenderer.prototype._drawImg = function(img_src, container, screen_x, screen_y) {
	var pos_style = '',
			bg_pos = '';
	if (screen_x != undefined && screen_y != undefined) {
		pos_style = 'left:'+Math.round(screen_x)+'px; top:'+Math.round(screen_y)+'px;';
	}
	var img = $('<img src="'+img_src+'" alt="" class="img" style="'+pos_style+'" />');
	//var img = $('<img src="'+img_src+'" alt="" style="'+pos_style+'" />');
	container.append(img);
	return img;
}

/**
 * Draws an image to the screen as a BG image on a div
 * @private
 * @param {String} text 
 * @param {jQueryObject} container where to add elements
 * @param {String} css_class the CSS class to apply to element
 * @param {Number} screen_x
 * @param {Number} screen_y
 * @return {jQueryObject} the jquery element that now represents the image
 */
Hexwar.jQueryRenderer.prototype._drawText = function(text, container, css_class, screen_x, screen_y) {
	if (screen_x && screen_y) {
		var pos_style = 'left:'+Math.round(screen_x)+'px; top:'+Math.round(screen_y)+'px;';
	}
	var div = $('<div class="'+css_class+'" style="'+pos_style+'">'+text+'</div>');
	container.append(div);
	return div;
}