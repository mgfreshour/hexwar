module('UnitType');
test('Constructor sets internal values', function() {
	var testee = new UnitType('type name', 'image', 13, 24, 7, 8, [1,2,3], [4,5,6]);
	
	equal(testee.range, 7, 'range');
	equal(testee.move_range, 8, 'move range');
	deepEqual(testee.move_costs, [1,2,3], 'move costs');
	deepEqual(testee.defense_bonuses, [4,5,6], 'def bonus');
	equal(testee.name, 'type name', 'name');
	equal(testee.img.src, 'image', 'image src');
	equal(testee.img.x, 13, 'img x');
	equal(testee.img.y, 24, 'img y');	
});