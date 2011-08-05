namespace('Hexwar.MapEditor');

/**
 * 
 * @param {Hexwar.Map} map
 */
Hexwar.MapEditor = function (map) {
	this.map = map;
	
	this.tile_factory = Hexwar.ServiceContainer.get('TileFactory');
	this.unit_factory = Hexwar.ServiceContainer.get('UnitFactory');
	
	this.mapview = new Hexwar.MapView($('#hexmap01'));
	this.mapview.setDelegateClick(this.onMapClick.createDelegate(this));
	
	$("button").button();

	$("#btn_save").click(function(){ this.map.save(); }.createDelegate(this));

	$("#btn_undo").click(function(){
		modalAlert("LOL!!  Did you really think I made an undo function in a javascript program? LOL!!", "You're an Idiot!");
	});

	this.tb = new Hexwar.Toolbox($('#toolbox'));
	this.tb.show();
	$("#btn_toolbox").click(function(){ this.tb.show() }.createDelegate(this));
	$("#map_number_of_players").change(function(){
		this.tb.updateTeamOptions($("#map_number_of_players").val());
		this.map.number_of_players = $("#map_number_of_players").val();
	}.createDelegate(this));
	
	this.tb.updateTeamOptions($("#map_number_of_players").val());

	if (!this.map) {
		var newDlg = new Hexwar.NewMapDialog(); 
		newDlg.show(function(map) { 
			this.map = map;
			this.map.fill(this.tile_factory.createTile(0));
			$('#map_name').val(this.map.name);
			this.mapview.clear();
			this.mapview.drawMap(map);
		}.createDelegate(this));
	} else {
		this.mapview.drawMap(map);
		$('#map_name').val(this.map.name);
	}	

	$('#map_name').change(function(){ 
		map.name = $('#map_name').val(); 
	}.createDelegate(this));
}

Hexwar.MapEditor.prototype.onMapClick = function(x, y) {
	if (!this.tb.selectedItem) { return; }
	
	var index = this.tb.selectedItem.index;
	// Draw a tile or a unit?
	if (this.tb.selectedItem.type == 'tile') {
	  if (index < 0 /*|| index > tile_types.length*/) {
	      return;
	  } 
    this.map.setTile(x,y, this.tile_factory.createTile(index));
	}
	
	else {
	  if (index != -1 && index < 0 /*|| index > unit_types.length*/) {
	      return;
	  }
		if (index == -1) {
			// The eraser
			this.map.removeUnit(this.map.getUnit(x,y));
		} else {
    	this.map.setUnit(x,y, this.unit_factory.createUnit(index, this.tb.getTeamSelection(), x, y));
		}
	}
	
  this.mapview.drawLocation(x,y);
}
