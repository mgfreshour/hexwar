namespace('Hexwar.UnitStatsTable');

Hexwar.UnitStatsTable = function(unit_type) {
	var stats = '<table>'
						+ '<tr>'
						+ '<th>Move Range</th><td>'+unit_type.move_range + '</td>'	
						+ '<td>&nbsp</td>'
						+ '<th>Attack Range</th><td>'+unit_type.range + '</td>'
						+ '</tr>'
						+ '<tr>'
						+ '<th>Attack Power/Hard</th><td>'+unit_type.hard_attack_power + '</td>'	
						+ '<td>&nbsp</td>'
						+ '<th>Attack Power/Soft</th><td>'+unit_type.soft_attack_power + '</td>'
						+ '</tr>'
						+ '<tr>'
						+ '<th>Defense Type</th><td>'+unit_type.defense_type + '</td>'
						+ '<td>&nbsp</td>'
						+ '<th>Defense Power</th><td>'+unit_type.defense_power + '</td>'
						+ '</tr>'
						+ '</table>';
				stats += '<hr />';
				stats += '<table><tr><th>Terrain Type</th><th>Defense Bonus</th><th>Move Cost</th></tr>';
				$.each(unit_type.defense_bonuses, function(name, bonus){
				stats += '<tr align="center"><td>'+name+'</td><td>'+bonus+'</td><td>'+unit_type.move_costs[name]+'</td></tr>';
				}.createDelegate(this));
				stats += '</table>';

		return stats;
}