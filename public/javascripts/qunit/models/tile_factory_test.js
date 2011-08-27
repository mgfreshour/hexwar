module('TileFactory');
test('TileFactory::addTileType() works', function() {
	var testee = new TileFactory();
	var type = new TileType('tile name', 'tile image', 43, 57);
	var pre_add_count = testee.tile_types.length;
	var idx = testee.addTileType(type);
	var post_add_count = testee.tile_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of tile types');
	equal(testee.tile_types[idx].name, 'tile name', 'name');
	equal(testee.tile_types[idx].img.src, 'tile image', 'image src');
	equal(testee.tile_types[idx].img.x, 43, 'img x');
	equal(testee.tile_types[idx].img.y, 57, 'img y');
});

test('TileFactory::createTileType() works', function() {
	var testee = new TileFactory();
	var pre_add_count = testee.tile_types.length;
	var idx = testee.createTileType('tile name', 'tile image', 43, 57);
	var post_add_count = testee.tile_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of tile types');
	equal(testee.tile_types[idx].name, 'tile name', 'name');
	equal(testee.tile_types[idx].img.src, 'tile image', 'image src');
	equal(testee.tile_types[idx].img.x, 43, 'img x');
	equal(testee.tile_types[idx].img.y, 57, 'img y');
});


test('TileFactory::createTile() with number creates correct tile', function() {
	var testee = new TileFactory();
	var type = new TileType('tile name', 'tile image', 43, 57);
	var idx = testee.addTileType(type);

	var tile = testee.createTile(idx);
	deepEqual(tile.img, type.img, 'image');
	equal(tile.gfx_css_class, 'hex', 'gfx_css_class');
});

test('TileFactory::createTile() with name creates correct tile', function() {
	var testee = new TileFactory();
	var type = new TileType('tile name', 'tile image', 43, 57);
	var idx = testee.addTileType(type);

	var tile = testee.createTile('tile name');
	deepEqual(tile.img, type.img, 'image');
	equal(tile.gfx_css_class, 'hex', 'gfx_css_class');
});

test('TileFactory::createTile() with name throws exception when unknown name', function() {
	var testee = new TileFactory();

	raises(function() {
		testee.createTile('bad name');
	});
});

test('TileFactory::createTile() with object creates correct tile', function() {
	var testee = new TileFactory();
	var type = new TileType('tile name', 'tile image', 43, 57);
	var idx = testee.addTileType(type);

	var tile = testee.createTile(type);
	deepEqual(tile.img, type.img, 'image');
	equal(tile.gfx_css_class, 'hex', 'gfx_css_class');
});


test('TileFactory::createTile() with name throws exception when unknown type passed', function() {
	var testee = new TileFactory();

	raises(function() {
		testee.createTile(new Array());
	});
});

