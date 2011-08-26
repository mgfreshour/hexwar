module('UnitFactory');
test('UnitFactory::addUnitType() works', function() {
	var testee = new Hexwar.UnitFactory();
	var type = new Hexwar.UnitType({ name:'testtype', price:123, img:'test.png', img_x:12, img_y:13
					, attack_range:2, hard_attack_power:4, soft_attack_power:5
					, defense_type:'soft', defense_power:8
					, move_range:10, move_costs:[1,2,3], defense_bonuses:[4,5,6]});
	var pre_add_count = testee.unit_types.length;
	var idx = testee.addUnitType(type);
	var post_add_count = testee.unit_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of unit types');
	equal(testee.unit_types[idx].name, 'testtype', 'name');
	equal(testee.unit_types[idx].img.src, 'test.png', 'img src');
	equal(testee.unit_types[idx].img.x, 12, 'img x');
	equal(testee.unit_types[idx].img.y, 13, 'img y');
	equal(testee.unit_types[idx].range, 2, 'range');
	equal(testee.unit_types[idx].hard_attack_power, 4, 'hard_attack_power');
	equal(testee.unit_types[idx].soft_attack_power, 5, 'soft_attack_power');
	equal(testee.unit_types[idx].defense_type, 'soft', 'defense_type');
	equal(testee.unit_types[idx].defense_power, 8, 'defense_power');
	equal(testee.unit_types[idx].move_range, 10, 'move range');
	deepEqual(testee.unit_types[idx].move_costs, [1,2,3], 'move costs');
	deepEqual(testee.unit_types[idx].defense_bonuses, [4,5,6], 'def bonus');
});

test('UnitFactory::createUnitType() works', function() {
	var testee = new Hexwar.UnitFactory();
	var pre_add_count = testee.unit_types.length;
	var idx = testee.createUnitType({ name:'testtype', price:123, img:'test.png', img_x:12, img_y:13
					, attack_range:2, hard_attack_power:4, soft_attack_power:5
					, defense_type:'soft', defense_power:8
					, move_range:10, move_costs:[1,2,3], defense_bonuses:[4,5,6]});
	var post_add_count = testee.unit_types.length;
	
	equal(post_add_count, pre_add_count+1, 'number of unit types');
	equal(testee.unit_types[idx].name, 'testtype', 'name');
	equal(testee.unit_types[idx].img.src, 'test.png', 'img src');
	equal(testee.unit_types[idx].img.x, 12, 'img x');
	equal(testee.unit_types[idx].img.y, 13, 'img y');
	equal(testee.unit_types[idx].range, 2, 'range');
	equal(testee.unit_types[idx].hard_attack_power, 4, 'hard_attack_power');
	equal(testee.unit_types[idx].soft_attack_power, 5, 'soft_attack_power');
	equal(testee.unit_types[idx].defense_type, 'soft', 'defense_type');
	equal(testee.unit_types[idx].defense_power, 8, 'defense_power');
	equal(testee.unit_types[idx].move_range, 10, 'move range');
	deepEqual(testee.unit_types[idx].move_costs, [1,2,3], 'move costs');
	deepEqual(testee.unit_types[idx].defense_bonuses, [4,5,6], 'def bonus');
});


test('UnitFactory::createUnit() with number creates correct unit', function() {
	var testee = new Hexwar.UnitFactory();
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType({ name:'testtype', price:123, img:'test.png', img_x:12, img_y:13
					, attack_range:2, hard_attack_power:4, soft_attack_power:5
					, defense_type:'soft', defense_power:8
					, move_range:10, move_costs:[1,2,3], defense_bonuses:[4,5,6]});
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
	var type = new Hexwar.UnitType({ name:'testtype', price:123, img:'test.png', img_x:12, img_y:13
					, attack_range:2, hard_attack_power:4, soft_attack_power:5
					, defense_type:'soft', defense_power:8
					, move_range:10, move_costs:[1,2,3], defense_bonuses:[4,5,6]});
	var idx = testee.addUnitType(type);
	var team='red', x=1, y=2, health=3;

	var unit = testee.createUnit('testtype', team,x,y,health);
	
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
