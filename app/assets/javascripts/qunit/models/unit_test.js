module('Unit');
test('Unit constructor should set correct internal values', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	var health=3;
	
	var testee = new Hexwar.Unit(type, health);
	
	deepEqual(testee.type, type, 'type');
	equal(testee.health, health, 'health');
	equal(testee.alive, true, 'alive');
});

test('Unit constructor sets type health (hard-coded to 10) when health is not provided', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type);
	
	deepEqual(testee.type, type, 'type');
	equal(testee.health, 10, 'health');
	equal(testee.alive, true, 'alive');
});

test('move() sets internal values', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type);
	
	testee.move(12,47);
	equal(testee.x, 12, 'x');
	equal(testee.y, 47, 'y');
});

test('move() notifies listeners correctly', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type);
	var listener = function(x,y,unit) {
		equal(x,12,'x');
		equal(y,47,'y');
		deepEqual(unit,testee, 'unit');
	}
	testee.bindEvent('move',listener);
	
	expect(3);
	testee.move(12,47);
});

test('changeHealth() sets internal values', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type, 10);
	
	testee.changeHealth(-2);
	equal(testee.health, 8);
	
	testee.changeHealth(3);
	equal(testee.health, 11);
	
	testee.changeHealth(-47);
	equal(testee.health,0);
	equal(testee.alive, false);
});

test('changeHealth() notifies listeners correctly', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type,10);
	var listener = function(health, delta, unit) {
		equal(health,7);
		equal(delta,-3);
		deepEqual(unit,testee, 'unit');
	}
	testee.bindEvent('health_change',listener);
	
	expect(3);
	testee.changeHealth(-3);
});

test('changeHealth() notifies death listeners correctly', function() {
	var name='type name', img='type image', img_x=13, img_y=24, range=7, move_range=8, move_costs=[1,2,3], defense_bonuses=[4,5,6];
	var type = new Hexwar.UnitType(name, img, img_x, img_y, range, move_range, move_costs, defense_bonuses);
	
	var testee = new Hexwar.Unit(type,10);
	var listener = function(unit) {
		deepEqual(unit,testee, 'unit');
		equal(unit.alive, false);
	}
	testee.bindEvent('death',listener);
	
	expect(2);
	testee.changeHealth(-10);
});