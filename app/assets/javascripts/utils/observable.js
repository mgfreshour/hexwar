/**
 * Implements the Observer pattern
 * @constructor
 */
function Observable() {
	this.listeners = [];
}

/**
 * Registers an observer for an event
 * @param {String} event_name is the name of the event to bind for
 * @param {Function} callback is the function to call when event fires
 * @param {Object} scope (optional) is the object to which the scope will be set on fire.  Defaults to the object raising the event.
 */
Observable.prototype.bindEvent = function(event_name, callback, scope){
	event_name = event_name.toLowerCase();
	if (!$.isFunction(callback)) {
		throw 'Invalid callback provided for '+event;
	}
	if (!this.listeners[event_name]) {
		this.listeners[event_name] = new Array();
	}
	scope = scope || this;
	this.listeners[event_name].push({fn:callback, scope:scope});
}

/**
 * Removes an observer from an event
 * @param {String} event_name is the name of the event to remove binding from.
 * @param {Function} call_back is the function to remove.
 */
Observable.prototype.unbindEvent = function(event_name, call_back){
	event_name = event_name.toLowerCase();
	for(var i=0;i<=this.listeners[event_name].length;i++){
	   if(this.listeners[event_name][i].fn == call_back){
	        this.listeners[event_name].splice(i,1);
			break;
	   }
	}
}

// fire an event
/**
 * Fires an event and calls all the listeners callbacks
 * First param is the name of the event, all other params
 *  are arguments to be passed to the callbacks
 * @param {string} event_name name of the event the listenters are tied to
 * @param {...object}
 */
Observable.prototype.notifyListeners = function() {
	var a = Array.prototype.slice.call(arguments, 0),
      event_name = a[0].toLowerCase(),
			event_args = a.slice(1);

	if (this.listeners[event_name]) {
		for (var i=0; i < this.listeners[event_name].length; i++) {
			try {
				var scope = this.listeners[event_name][i].scope;
				this.listeners[event_name][i].fn.apply(scope, event_args);
			} catch(e) { };
		}
	}
}
