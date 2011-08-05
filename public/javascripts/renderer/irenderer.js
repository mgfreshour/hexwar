namespace('Hexwar.iRenderer');

/**
 * Definese a class that can draw a RenderableItem
 * @interface
 */
Hexwar.iRenderer = function () {

}

/**
 * Adds a drawing layer to the screen
 * @param {String} layer_name
 */
Hexwar.iRenderer.prototype.addLayer = function(layer_name) {}

/**
 * Removes all RenderableItems from a drawing layer
 * @param {String} layer_name
 */
Hexwar.iRenderer.prototype.clearLayer = function(layer_name) {}

/**
 * Removes all RenderableItems from the screen
 * @param {String} layer_name
 */
Hexwar.iRenderer.prototype.clearScreen = function(layer_name) {}

/**
 * Draws a RenderableItem to a layer
 * @param {String} layer_name
 * @param {Number} x
 * @param {Number} y
 * @param {Hexwar.RenderableItem} item
 */
Hexwar.iRenderer.prototype.drawItemToLayer = function(layer_name, x, y, item) {}

/**
 * Hides a RenderableItem without destroying it
 * @param {Hexwar.RenderableItem} item
 */
Hexwar.iRenderer.prototype.hideItem = function(item)  {}

/**
 * Shows a hidden RenderableItem
 * @param {Hexwar.RenderableItem} item
 */
Hexwar.iRenderer.prototype.showItem = function(item)  {}

/**
 * Removes a RenderableItem from the screen
 * @param {Hexwar.RenderableItem} item
 */
Hexwar.iRenderer.prototype.removeItem = function(item)  {}

/**
 * Removes a RenderableItem from the screen after fading it out
 * @param {Hexwar.RenderableItem} item
 * @param {Number} duration (optional) milliseconds to take to fade out. Defaults to 500
 * @param {Number} delay (optional) milliseconds to wait before starting fade.  Defaults to 0
 */
Hexwar.iRenderer.prototype.fadeOutAndRemove = function(item, duration, delay)  {}
