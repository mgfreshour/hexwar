module('Hex');
test('Hex::getAdjacentCoords() works from the middle', function() {
	var height = 4, width = 4;
	var expected = [{x: 2,y: 1},
				    {x: 2,y: 2},
				    {x: 1,y: 0},
				    {x: 1,y: 1},
				    {x: 1,y: 2},
				    {x: 0,y: 1},
				    {x: 0,y: 2}];
	same(Hex.getAdjacentCoords(1,1,height, width), expected);
});

test('Hex::getAdjacentCoords() works from the edge', function() {
	var height = 4, width = 4;
	var expected = [{x: 2,y: 0},
					{x: 2,y: 1},
					{x: 1,y: 0},
					{x: 1,y: 1},
					{x: 0,y: 0},
					{x: 0,y: 1}];
	same(Hex.getAdjacentCoords(1,0,height, width), expected);
});

test('Hex::getAdjacentCoords() works from the corner', function() {
	var height = 4, width = 4;
	var expected = [{x: 1,y: 0},
					{x: 0,y: 0},
					{x: 0,y: 1}];
	same(Hex.getAdjacentCoords(0,0,height, width), expected);
});

test('Hex::walkAdjacent() works from corner', function() {
	var height=5, width=5;
	var expected = [[1,1,2,3,4],
					[1,2,2,3,4],
					[2,3,3,4,4],
					[3,4,4,5,5],
					[4,5,5,6,6]];
	var test_values = new Array2d(height,width, 'h');
	var max_depth=8;
	var callback = function(x, y, current_depth, prev_x, prev_y) { 
		if (test_values.get(x,y) == 'h' || test_values.get(x,y) > current_depth) {
			test_values.set(x,y, current_depth);
		}
	};
	Hex.walkAdjacent(0,0,max_depth, callback, height,width)
	same(test_values.data, expected);
});