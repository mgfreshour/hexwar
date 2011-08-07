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
}

/**
 * ...
 */
Hexwar.UnitStoreDialog.prototype.show = function(x,y, unit_types_available) {
	var html = '', name;
	$.each(unit_types_available, function(idx, unit_idx){
		unit_idx--;
		name = this.unit_types[unit_idx].name;
		
		html += '<input type="radio" value="'+unit_idx+'" name="unit_store_dialog_radio" id="unit_store_dialog_'+unit_idx+'">';
		html += '<label for="unit_store_dialog_'+unit_idx+'">'+name+'</lable><br />';
	}.createDelegate(this));
	html += '<input type="button" id="unit_store_dialog_buy" value="Buy" />';
	this.container.html(html);
	this.container.dialog({ modal: false, width: 200, position: 'center' });
	$('#unit_store_dialog_buy').click(this.onBuyClick.createDelegate(this, [x,y]));
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