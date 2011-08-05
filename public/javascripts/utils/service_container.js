namespace('Hexwar.ServiceContainer');
var g_services = null;

/**
 * @constructor
 */
Hexwar.ServiceContainer = function () {
}

Hexwar.ServiceContainer.get = function(name) {
	if (!g_services) {
		g_services = {};
	}
	
	var obj = null;
	
	switch (name) {
		case 'TileFactory':
			if(g_services.TileFactory == undefined) {
				obj = new Hexwar.TileFactory();
				obj.loadFromServer();
				g_services.TileFactory = obj;
			}
			return g_services.TileFactory;

		case 'UnitFactory':
			if(g_services.UnitFactory == undefined) {
				obj = new Hexwar.UnitFactory();
				obj.loadFromServer();
				g_services.UnitFactory = obj;
			}
			return g_services.UnitFactory;
	}
}