
var g_services = null;

function ServiceContainer() {
}

ServiceContainer.get = function(name) {
	if (!g_services) {
		g_services = new goog.structs.Map();
	}
	
	var obj = null;
	
	switch (name) {
		case 'TileFactory':
			if(!g_services.containsKey('TileFactory')) {
				obj = new TileFactory();
				obj.loadFromServer();
				g_services.set('TileFactory', obj);
			}
			return g_services.get('TileFactory');

		case 'UnitFactory':
			if(!g_services.containsKey('UnitFactory')) {
				obj = new UnitFactory();
				obj.loadFromServer();
				g_services.set('UnitFactory', obj);
			}
			return g_services.get('UnitFactory');
	}
}