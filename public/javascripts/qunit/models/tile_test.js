module('Tile');
test('Tile constructor sets correct internal values', function() {
	var type = { a:1, b:2, c:3 };
	var testee = new Tile(type);
	
	deepEqual(testee.type, type, 'type');
});