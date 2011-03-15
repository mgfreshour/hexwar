
var mapview = null;
var tb = null;

function onMapClick(x, y) {
	if (!tb.selectedItem) { return; }
	
	var index = tb.selectedItem.index;
	// Draw a tile or a unit?
	if (tb.selectedItem.type == 'tile') {
	  if (index < 0 || index > tile_types.length) {
	      return;
	  } 
    map.setTile(x,y, tile_types[index].createTile());
	}
	
	else {
	  if (index != -1 && index < 0 || index > unit_types.length) {
	      return;
	  }
		if (index == -1) {
			// The eraser
			map.removeUnit(map.getUnit(x,y));
		} else {
    	map.setUnit(x,y, unit_types[index].createUnit(tb.getTeamSelection()));
		}
	}
	
  mapview.drawLocation(x,y);
}

$(function() {
		mapview = new MapView($('#hexmap01'));
		mapview.setDelegateClick(onMapClick);

		$("button").button();
		
    $("#btn_save").click(function(){ map.save(); });

		$("#btn_undo").click(function(){
			modalAlert("LOL!!  Did you really think I made an undo function in a javascript program? LOL!!", "You're an Idiot!");
		});

    tb = new Toolbox($('#toolbox'));
		tb.show();
		$("#btn_toolbox").click(function(){tb.show()});
		$("#map_number_of_players").change(function(){
			tb.updateTeamOptions($(this).val());
			map.number_of_players = $(this).val();
			});
		tb.updateTeamOptions($("#map_number_of_players").val());

		if (!map) {
			var newDlg = new NewMapDialog(); 
			newDlg.show(function() { $('#map_name').val(map.name); });
		} else {
    	mapview.drawMap(map);
			$('#map_name').val(map.name);
		}	

		$('#map_name').change(function(){ 
			map.name = $(this).val(); 
		});
});