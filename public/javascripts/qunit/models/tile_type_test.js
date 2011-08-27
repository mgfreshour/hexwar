module('TileType');
test('TileType::TileType() sets internal values', function() {
	var testee = new Hexwar.TileType('tile name', 'tile image', 43, 57);
	equal(testee.name, 'tile name', 'name');
	equal(testee.img.src, 'tile image', 'image src');
	equal(testee.img.x, 43, 'img x');
	equal(testee.img.y, 57, 'img y');
});


