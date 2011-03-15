
/**
 * Definese a class that can draw a RenderableItem
 * @interface
 */
function iRenderer() {

}

/**
 * Adds a drawing layer to the screen
 * @param {String} layer_name
 */
iRenderer.prototype.addLayer = function(layer_name) {}

/**
 * Removes all RenderableItems from a drawing layer
 * @param {String} layer_name
 */
iRenderer.prototype.clearLayer = function(layer_name) {}

/**
 * Removes all RenderableItems from the screen
 * @param {String} layer_name
 */
iRenderer.prototype.clearScreen = function(layer_name) {}

/**
 * Draws a RenderableItem to a layer
 * @param {String} layer_name
 * @param {Number} screen_x
 * @param {Number} screen_y
 * @param {RenderableItem} item
 */
iRenderer.prototype.drawItemToLayer = function(layer_name, x, y, item) {}

/**
 * Hides a RenderableItem without destroying it
 * @param {RenderableItem} item
 */
iRenderer.prototype.hideItem = function(item)  {}

/**
 * Shows a hidden RenderableItem
 * @param {RenderableItem} item
 */
iRenderer.prototype.showItem = function(item)  {}

/**
 * Removes a RenderableItem from the screen
 * @param {RenderableItem} item
 */
iRenderer.prototype.removeItem = function(item)  {}

/**
 * Removes a RenderableItem from the screen after fading it out
 * @param {RenderableItem} item
 * @param {Number} duration (optional) milliseconds to take to fade out. Defaults to 500
 * @param {Number} delay (optional) milliseconds to wait before starting fade.  Defaults to 0
 */
iRenderer.prototype.fadeOutAndRemove = function(item, duration, delay)  {}