goog.provide('Hexwar.RenderableItem');
/**
 * Class that represents something that can be drawn on the screen
 * @constructor
 */
Hexwar.RenderableItem = function RenderableItem(img) {
	if (img) {
		if ($.isArray(img)) {
			this.img = img;
		} else {
			this.img = { src: img };
		}
	}
	this.element_id = 0;
	this.gfx_container = null;
}

