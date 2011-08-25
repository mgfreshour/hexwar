module('UnitFactory');
test('UnitFactory::addUnitType() works', function() {
	var testee = new Hexwar.UnitFactory();
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var pre_add_count = testee.unit_types.length;
	var idx = testee.addUnitType(type);
	var post_add_count = testee.unit_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of unit types');
	equal(testee.unit_types[idx].range, range, 'range');
	equal(testee.unit_types[idx].move_range, move_range, 'move range');
	deepEqual(testee.unit_types[idx].move_costs, move_costs, 'move costs');
	deepEqual(testee.unit_types[idx].defense_bonuses, defense_bonuses, 'def bonus');
	equal(testee.unit_types[idx].name, name, 'name');
	equal(testee.unit_types[idx].img.src, img, 'image src');
	equal(testee.unit_types[idx].img.x, img_x, 'img x');
	equal(testee.unit_types[idx].img.y, img_y, 'img y');
});

test('UnitFactory::createUnitType() works', function() {
	var testee = new Hexwar.UnitFactory();
	var pre_add_count = testee.unit_types.length;
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var idx = testee.createUnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var post_add_count = testee.unit_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of unit types');
	equal(testee.unit_types[idx].range, range, 'range');
	equal(testee.unit_types[idx].move_range, move_range, 'move range');
	deepEqual(testee.unit_types[idx].move_costs, move_costs, 'move costs');
	deepEqual(testee.unit_types[idx].defense_bonuses, defense_bonuses, 'def bonus');
	equal(testee.unit_types[idx].name, name, 'name');
	equal(testee.unit_types[idx].img.src, img, 'image src');
	equal(testee.unit_types[idx].img.x, img_x, 'img x');
	equal(testee.unit_types[idx].img.y, img_y, 'img y');
});


test('UnitFactory::createUnit() with number creates correct unit', function() {
	var testee = new Hexwar.UnitFactory();
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var idx = testee.addUnitType(type);
	var team='red', x=1, y=2, health=3;

	var unit = testee.createUnit(idx, team,x,y,health);
	
	deepEqual(unit.img[0], type.img, 'image');
	equal(unit.gfx_css_class, 'hex', 'gfx_css_class');
	equal(unit.x, x, 'x');
	equal(unit.y, y, 'y');
	equal(unit.team, team, 'team');
	equal(unit.health, health, 'health');
	equal(unit.type_index, idx, 'type_index');
});

test('UnitFactory::createUnit() with name creates correct unit', function() {
	var testee = new Hexwar.UnitFactory();
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var idx = testee.addUnitType(type);
	var team='red', x=1, y=2, health=3;

	var unit = testee.createUnit('type name', team,x,y,health);
	
	deepEqual(unit.img[0], type.img, 'image');
	equal(unit.gfx_css_class, 'hex', 'gfx_css_class');
	equal(unit.x, x, 'x');
	equal(unit.y, y, 'y');
	equal(unit.team, team, 'team');
	equal(unit.health, health, 'health');
	equal(unit.type_index, idx, 'type_index');
});

test('UnitFactory::createUnit() with name throws exception when unknown name', function() {
	var testee = new Hexwar.UnitFactory();

	raises(function() {
		testee.createUnit('bad name');
	});
});

test('UnitFactory::createUnit() with UnitType creates correct unit', function() {
	var testee = new Hexwar.UnitFactory();
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var idx = testee.addUnitType(type);
	var team='red', x=1, y=2, health=3;

	var unit = testee.createUnit(type, team,x,y,health);
	
	deepEqual(unit.img[0], type.img, 'image');
	equal(unit.gfx_css_class, 'hex', 'gfx_css_class');
	equal(unit.x, x, 'x');
	equal(unit.y, y, 'y');
	equal(unit.team, team, 'team');
	equal(unit.health, health, 'health');
	equal(unit.type_index, idx, 'type_index');
});

test('UnitFactory::createUnit() with name throws exception when unknown type passed', function() {
	var testee = new Hexwar.UnitFactory();

	raises(function() {
		testee.createUnit(new Array());
	});
});
