/**
 * Creates a style message box.  Replacement for window.alert()
 * @param {String} msg is the message to display
 * @param {String} title (optional) title of alert to use.  Defaulsts to 'Message'
 */
function modalAlert(msg, title) {
	title = title || 'Alert';
	var dlg = $('<div title="'+title+'">'+msg+'</div>');
	dlg.dialog({
		modal: true,
		buttons: { Ok: function() { $( this ).dialog( "close" ); } }
	});
}

/**
 * Creates a printable string from the rails
 *  ActiveRecord error json object
 * @param {Object} obj json object returned from rails
 * @return {String} a printable string representing the object
 */
function activeRecordErrorsToString(obj) {
	var out = '';
	for (prop in obj) {
		out += prop + ' : ' + obj[prop];
	}
	return out;
}

/**
 * Implements inheritance from one class to another
 * @param {Function} 
 * @usage
 *    function A()  {      // Define super class
 *        this.x = 1;
 *    }
 *     
 *    A.prototype.DoIt = function() {      // Define Method
 *        this.x += 1;
 *    }
 *     
 *    B.DeriveFrom(A);                    // Define sub-class
 *    function B() {
 *        this.A();                        // Call super-class constructor (if desired)
 *        this.y = 2;
 *    }
*/
Function.prototype.DeriveFrom = function (fnSuper) {
    var prop;
    if (this == fnSuper) {
        alert("Error - cannot derive from self");
        return;
    }
    for (prop in fnSuper.prototype) {
        if (typeof fnSuper.prototype[prop] == "function" &&
            !this.prototype[prop]) {
            this.prototype[prop] = fnSuper.prototype[prop];
        }
    }
    this.prototype[fnSuper.StName()] = fnSuper;
}

/**
 * Simply returns to the name of a function as a string
 * @return {String}
 */
Function.prototype.StName = function () {
    var st;
    st = this.toString();
    st = st.substring(st.indexOf(" ") + 1, st.indexOf("("));
    if (st.charAt(0) == "(") {
        st = "function ...";
    }
    return st;
}


/**
 * Creates a delegate (callback) that sets the scope to obj.
 * Call directly on any function. Example: this.myFunction.createDelegate(this, [arg1, arg2])
 * Will create a function that is automatically scoped to obj so that the this variable inside the
 * callback points to obj. Example usage:
 * 
 * var sayHi = function(name){
 *     // Note this use of "this.text" here.  This function expects to
 *     // execute within a scope that contains a text property.  In this
 *     // example, the "this" variable is pointing to the btn object that
 *     // was passed in createDelegate below.
 *     alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
 * }
 * 
 * var btn = new Ext.Button({
 *     text: 'Say Hi',
 *     renderTo: Ext.getBody()
 * });
 * 
 * // This callback will execute in the scope of the
 * // button instance. Clicking the button alerts
 * // "Hi, Fred. You clicked the "Say Hi" button."
 * btn.on('click', sayHi.createDelegate(btn, ['Fred']));
 * 
 * 
 * @param {Object} obj (optional) The object for which the scope is set
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * @return {Function} The new function
 */
Function.prototype.createDelegate = function(obj, args, appendArgs) {
	var method = this;
	return function() {
	    var callArgs = args || arguments;
	    if (appendArgs === true){
	        callArgs = Array.prototype.slice.call(arguments, 0);
	        callArgs = callArgs.concat(args);
	    }
	    return method.apply(obj || window, callArgs);
  };
}

/**
 * Returns the sign of the passed param
 * @param {Number} x the number to find sign of
 * @return {Number} exclusively 1,-1, or 0
 */
Math.signum = function(x){
  if(x>0)return 1;
  else if(x<0)return -1;
  else return 0;
}

/**
 * A temporary method for logging to a #log html element
 * @param {String} str string to log
 */
function log(str) {
	$('#log').val($('#log').val()+str+"\n");
}

//  IE doesn't have Array.indexOf(), so define a version here.
if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}
