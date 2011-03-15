module('Map');
test('Map::Map() sets internal values', function() {
	var testee = new Map(5, 6, 'Test Map', 43);
	equal(testee.height, 5, 'height');
	equal(testee.width, 6, 'width');
	equal(testee.name, 'Test Map');
	equal(testee.id, 43, 'ID');
});