module('Array2d');
test('Array2d::constructor() sets height and width', function() {
    var height=5, width=6;
    var testee = new Array2d(height, width);
    equals(testee.height, 5, 'Height set correctly');
    equals(testee.width, 6, 'Width set correctly');
});

test('Array2d::generate() creates correct sized data', function() {
    var testee = new Array2d();
    var height=5, width=6;
    testee.generate(height, width)
    equals(testee.data.length, height, 'Correct height');
    for (var y=0; y < testee.data.length; y++) {
        equals(testee.data[y].length, width, 'Correct width');
    }
});


test('Array2d::generate() creates correct data values', function() {
    var testee = new Array2d();
    var height=5, width=6;
    testee.generate(height, width, 'hello');
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
            equals(testee.data[y][x], 'hello', '('+x+','+y+')');
        }
    }
});


test('Array2d::each() iterates through each', function() {
    var height=5, width=6;
    var testee = new Array2d(height, width);
    var cnt = 0;
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
            testee.data[y][x] = cnt++;
        }
    }
    cnt = 0;
    var callback = function(item) { equals(item, cnt++); }
    testee.each(callback);
});

test('Array2d::filterByCallback() actually changes everything', function() {
	var height=5, width=6;
    var testee = new Array2d(height, width);
	var cnt = 0;
	var callback = function(x,y,item) { 
	return cnt++; 
	};
	testee.filterByCallback(callback);
	cnt = 0;
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
            equals(testee.data[y][x],cnt++, '('+x+','+y+')');
        }
    }
});

test('Array2d::setMulti() works', function() {
	var height=5, width=6;
    var testee = new Array2d(height, width);
	var coords = [{ x:0, y:0 }, { x: 1, y: 1 }, { x: 2, y: 2 } ];
	testee.setMulti(coords, 'hello');
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
			if (x==y && (y==0 || y==1 || y==2)) {
				equals(testee.data[y][x], 'hello',  '('+x+','+y+')');
			} else {
				equals(testee.data[y][x], 0,  '('+x+','+y+')');
			}
		}
	}
});

test('Array2d::set() works', function() {
	var height=5, width=6;
    var testee = new Array2d(height, width);
	testee.set(0,0, 'hello');
	testee.set(1,1, 'hello');
	testee.set(2,2, 'hello');
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
			if (x==y && (y==0 || y==1 || y==2)) {
				equals(testee.data[y][x], 'hello',  '('+x+','+y+')');
			} else {
				equals(testee.data[y][x], 0,  '('+x+','+y+')');
			}
		}
	}
});

test('Array2d::get() works', function() {
	var height=5, width=6;
    var testee = new Array2d(height, width);
	testee.data[0][0] = 'hello';
	testee.data[1][1] = 'hello';
	testee.data[2][2] = 'hello';
    for (var y=0; y < testee.data.length; y++) {
        for (var x=0; x < testee.data[0].length; x++) {
			if (x==y && (y==0 || y==1 || y==2)) {
				equals(testee.get(x,y), 'hello',  '('+x+','+y+')');
			} else {
				equals(testee.get(x,y), 0,  '('+x+','+y+')');
			}
		}
	}
});

test('Array2d::toString() works', function() {
	var height=3, width=3;
    var testee = new Array2d(height, width);
	var expected = "[9][0][0]\n[0][9][0]\n[0][0][9]\n";
	testee.data[0][0] = 9;
	testee.data[1][1] = 9;
	testee.data[2][2] = 9;
	same(testee.toString(), expected);
});