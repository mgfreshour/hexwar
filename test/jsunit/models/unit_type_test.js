module('UnitType');
test('Constructor sets internal values', function() {
	var testee = new Hexwar.UnitType({ name:'testtype', price:123, img:'test.png', img_x:12, img_y:13
					, attack_range:2, hard_attack_power:4, soft_attack_power:5
					, defense_type:'soft', defense_power:8
					, move_range:10, move_costs:[1,2,3], defense_bonuses:[4,5,6]});
	
	equal(testee.name, 'testtype', 'name');
	equal(testee.img.src, 'test.png', 'img src');
	equal(testee.img.x, 12, 'img x');
	equal(testee.img.y, 13, 'img y');
	equal(testee.range, 2, 'range');
	equal(testee.hard_attack_power, 4, 'hard_attack_power');
	equal(testee.soft_attack_power, 5, 'soft_attack_power');
	equal(testee.defense_type, 'soft', 'defense_type');
	equal(testee.defense_power, 8, 'defense_power');
	equal(testee.move_range, 10, 'move range');
	deepEqual(testee.move_costs, [1,2,3], 'move costs');
	deepEqual(testee.defense_bonuses, [4,5,6], 'def bonus');	
});