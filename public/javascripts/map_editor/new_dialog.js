goog.provide('Hexwar.NewMapDialog');

Hexwar.NewMapDialog = function() {
	this.html = '<div id="new_map_dialog" title="Create new map" class="dialog">' +
		'<p class="validateTips">All form fields are required.</p>' +
		//'<form>' +
		'<fieldset>' +
			'<label for="dlg_map_height">Height</label>' +
			'<select id="dlg_map_height" class="text ui-widget-content ui-corner-all" >' +
				'<option>2<option>3<option>4<option>5<option>6<option>7<option>8<option>9' +
				'<option>10<option>11<option>12<option>13<option>14<option>15<option>16<option>17<option>18<option>19' +
				'<option>20' +
			'</select>' +
			'<label for="dlg_map_width">Width</label>' +
			'<select id="dlg_map_width" class="text ui-widget-content ui-corner-all" >' +
				'<option>2<option>3<option>4<option>5<option>6<option>7<option>8<option>9' +
				'<option>10<option>11<option>12<option>13<option>14<option>15<option>16<option>17<option>18<option>19' +
				'<option>20<option>21<option>22<option>23<option>24<option>25' +
			'</select>' +
			'<br />' +
			'<label for="dlg_map_name">Name</label>' +
			'<input type="text" id="dlg_map_name" class="text ui-widget-content ui-corner-all" />' +
		'</fieldset>' +
		//'</form>' +
	'</div>';
	this.container = $(this.html);
}

Hexwar.NewMapDialog.prototype.show = function show(cbFn) {
	this.container.dialog({
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			Create: function() {
				if ($('#dlg_map_name').val() == '') {
					$('#dlg_map_name').addClass("ui-state-error");
					return;
				}
				var map = new Hexwar.Map($('#dlg_map_height').val(),  $('#dlg_map_width').val(), $('#dlg_map_name').val(), null);

				if (cbFn) { cbFn(map); }
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
}
