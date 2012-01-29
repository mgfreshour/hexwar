namespace('Hexwar.UnitStatsDialog');

/**
 * ...
 * @constructor
 */
Hexwar.UnitStatsDialog = function() {
	//this.unit_types = unit_types;
	this.container = $('<div id="unit_store"></div>');
	$('body').append(this.container);
	this.renderer = new Hexwar.jQueryRenderer(this.container);
}

/**
 * ...
 * @param {Hexwar.UnitType} unit_type
 */
Hexwar.UnitStatsDialog.prototype.show = function(unit_type) {
	this.container.html('');
	
	var img = $('<div class="unit_store_row"></div>');
	this.renderer._drawItem(unit_type, img, 0,0,'toolbox_hex', true);
	this.container.append(img);
	
	var stats = Hexwar.UnitStatsTable(unit_type);
	
	this.container.append($(stats));
	this.container.dialog({ modal: false, width: 350, position: 'topcenter' });
}