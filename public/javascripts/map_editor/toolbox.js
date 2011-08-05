goog.provide('Hexwar.Toolbox');

Hexwar.Toolbox = function (container) {
	this.container = container;
	this.renderer = new Hexwar.jQueryRenderer(container);
}

Hexwar.Toolbox.prototype.initHexPalette = function initHexPalette() {
		this.hexPalette.html('');
    for (var n=0; n < tile_types.length; n++) {
        var row = $('<div id="hex_palette_'+n+'" hex_id="'+n+'" class="hex_palette_row"></div');
				this.renderer._drawItem(tile_types[n], row,0,0,'toolbox_hex');
				row.append('<span>'+tile_types[n].name+'</span>');
        this.hexPalette.append(row);
        $('#hex_palette_'+n).click({ me:this }, function(event) {
            $('.hex_palette_row').removeClass('selected_palette_row');
            event.data.me.selectedItem = { type: 'tile', index: $(event.currentTarget).attr('hex_id') };
            $(event.currentTarget).addClass('selected_palette_row');
        })
    }
}

Hexwar.Toolbox.prototype.getTeamSelection = function getTeamSelection() {
	return $('input:radio[name=team_select]:checked').attr('id');
}

Hexwar.Toolbox.prototype.updateTeamOptions = function(number_of_players) {
	$('input:radio#red').click();
	switch(number_of_players) {
		case '2':
			$('input:radio#blue').button('disable');
			$('input:radio#white').button('disable');
			break;
		case '3':	
			$('input:radio#white').button('enable');
			$('input:radio#blue').button('disable');
			break;
		default:
				$('input:radio#blue').button('enable');
				$('input:radio#white').button('enable');
	}
}

Hexwar.Toolbox.prototype.initUnitPalette = function initUnitPalette() {
		var div_html = '<div id="team_select">'+
				'<input type="radio" name="team_select" id="red" name="radio" checked="checked" /><label for="red"><img src="/images/misc/flag-red-icon.png" />Red Team</label>' +
				'<input type="radio" name="team_select" id="green" name="radio" /><label for="green"><img src="/images/misc/flag-green-icon.png" />Green Team</label>' +
				'<input type="radio" name="team_select" id="white" name="radio" /><label for="white"><img src="/images/misc/flag-white-icon.png" />White Team</label>' +
				'<input type="radio" name="team_select" id="blue" name="radio" /><label for="blue"><img src="/images/misc/flag-blue-icon.png" />Blue Team</label>' +
			'</div>'
		this.unitPalette.html(div_html);
	  $( "#team_select" ).buttonset();
		// Create the Eraser
		var row = '<div id="unit_palette_eraser" class="unit_palette_row"><span class="ui-silk ui-silk-cross"></span><div>Erase</div></div>';
    this.unitPalette.append(row);
    $('#unit_palette_eraser').click({ me:this }, function(event) {
        $('.unit_palette_row').removeClass('selected_palette_row');
        event.data.me.selectedItem = { type: 'unit', index: -1 };
        $(event.currentTarget).addClass('selected_palette_row');
    });

		// The Unit List
    for (var n=0; n < unit_types.length; n++) {
	    row = $('<div id="unit_palette_'+n+'" unit_id="'+n+'" class="unit_palette_row"></div>');
			this.renderer._drawItem(unit_types[n], row,0,0,'toolbox_hex');
			row.append('<br /><div>'+unit_types[n].name+'</div>');
       this.unitPalette.append(row);
       $('#unit_palette_'+n).click({ me:this }, function(event) {
           $('.unit_palette_row').removeClass('selected_palette_row');
           event.data.me.selectedItem = { type: 'unit', index: $(event.currentTarget).attr('unit_id') };
           $(event.currentTarget).addClass('selected_palette_row');
       });
    }
}
	
Hexwar.Toolbox.prototype.show = function show() {
	this.container.html('');
	this.hexPalette = $('<div id="hex_palette"></div>');
	this.unitPalette = $('<div id="unit_palette"></div>')
	this.toolboxTabs = $('<div id="toolbox_tabs">' +
		'<ul>' +
			'<li><a href="#hex_palette">Hex Palette</a></li>' +
			'<li><a href="#unit_palette">Unit Palette</a></li>' +
		'</ul>' +
	'</div>')
	this.toolboxTabs.append(this.hexPalette);
	this.toolboxTabs.append(this.unitPalette);
	this.container.append(this.toolboxTabs);

	this.initHexPalette();
	this.initUnitPalette();
	this.toolboxTabs.tabs();
	
	this.container.dialog({ modal: false, width: 460, position: 'right' });
}
