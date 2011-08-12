namespace('Hexwar.UnitStoreDialog');

/**
 * ...
 * @constructor
 * @param {Array} 
 */
Hexwar.UnitStoreDialog = function(unit_store_controller, unit_types) {
	this.unit_store_controller = unit_store_controller;
	this.unit_types = unit_types;
	this.container = $('<div id="unit_store"></div>');
	$('body').append(this.container);
	this.renderer = new Hexwar.jQueryRenderer(this.container);
}

/**
 * ...
 */
Hexwar.UnitStoreDialog.prototype.show = function(x,y, unit_types_available) {
	var html = '', row, img;
	
	this.container.html('');
	var button_set = $('<div id="unit_store_dialog_button_set"></div>');
	$.each(unit_types_available, function(idx, unit_idx){
		unit_idx--;
		
		row = $('<span><input type="radio" value="'+unit_idx+'" name="unit_store_dialog_radio" id="unit_store_dialog_'+unit_idx+'"></span>');
		img = $('<label for="unit_store_dialog_'+unit_idx+'" class="unit_store_row">'+this.unit_types[unit_idx].price+' gold</label>');
		this.renderer._drawItem(this.unit_types[unit_idx], img, 0,0,'toolbox_hex', true);
		row.append(img);
		button_set.append(row);
		
	}.createDelegate(this));
	
	button_set.buttonset();
	this.container.append(button_set);
	this.container.append($('<br /><input type="button" id="unit_store_dialog_buy" value="Buy" class="button" />'));
	this.container.append($('<input type="button" id="unit_store_dialog_cancel" value="Cancel" class="button" />'));
	$('.button').button();
	
	this.container.append('<br /><div id="unit_store_dialog_stats"></div>');

	this.container.dialog({ modal: false, width: 350, position: 'topcenter', beforeClose: this.onClose.createDelegate(this) });
	$('#unit_store_dialog_buy').click(this.onBuyClick.createDelegate(this, [x,y]));
	$('#unit_store_dialog_cancel').click(this.close.createDelegate(this));
	

		
	$('[name=unit_store_dialog_radio]').change(this.updateUnitStats.createDelegate(this));
}

/**
 * ...
 */
Hexwar.UnitStoreDialog.prototype.updateUnitStats = function() {
	var unit_idx = $('[name=unit_store_dialog_radio]:checked').val();
	var stats = 
			'<table>'
		+ '<tr><th>Attack Power</th><td>'+this.unit_types[unit_idx].attack_power + '</td>'	
		+ '<td>&nbsp</td><th>Attack Range</th><td>'+this.unit_types[unit_idx].range + '</td></tr>'
		+ '<tr><th>Defense Power</th><td>'+this.unit_types[unit_idx].defense_power + '</td>'
		+ '<td>&nbsp</td><th>Move Range</th><td>'+this.unit_types[unit_idx].move_range + '</td></tr>'
		+'</table>';
	stats += '<hr />';
	stats += '<table><tr><th>Terrain Type</th><th>Defense Bonus</th><th>Move Cost</th></tr>';
	$.each(this.unit_types[unit_idx].defense_bonuses, function(name, bonus){
		stats += '<tr align="center"><td>'+name+'</td><td>'+bonus+'</td><td>'+this.unit_types[unit_idx].move_costs[name]+'</td></tr>';
	}.createDelegate(this));
	stats += '</table>';
	$('#unit_store_dialog_stats').html(stats);
}

/**
 * ...
 */
Hexwar.UnitStoreDialog.prototype.onClose = function() {
	this.unit_store_controller.onDialogClose();
}

/**
 * ...
 */
Hexwar.UnitStoreDialog.prototype.onBuyClick = function(x,y) {
	var unit_idx = $('[name=unit_store_dialog_radio]:checked').val();

	if (unit_idx != undefined) {
		this.unit_store_controller.buyUnit(x,y, unit_idx);
		this.close();
	}
}

Hexwar.UnitStoreDialog.prototype.close = function() {
	this.container.dialog('close');
}