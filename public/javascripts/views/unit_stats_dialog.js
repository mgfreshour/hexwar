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
	
	var stats = 
			'<table>'
		+ '<tr><th>Attack Power</th><td>'+unit_type.attack_power + '</td>'	
		+ '<td>&nbsp</td><th>Attack Range</th><td>'+unit_type.range + '</td></tr>'
		+ '<tr><th>Defense Power</th><td>'+unit_type.defense_power + '</td>'
		+ '<td>&nbsp</td><th>Move Range</th><td>'+unit_type.move_range + '</td></tr>'
		+'</table>';
	stats += '<hr />';
	stats += '<table><tr><th>Terrain Type</th><th>Defense Bonus</th><th>Move Cost</th></tr>';
	$.each(unit_type.defense_bonuses, function(name, bonus){
		stats += '<tr align="center"><td>'+name+'</td><td>'+bonus+'</td><td>'+unit_type.move_costs[name]+'</td></tr>';
	}.createDelegate(this));
	stats += '</table>';
	
	this.container.append($(stats));
	this.container.dialog({ modal: false, width: 350, position: 'topcenter' });
}