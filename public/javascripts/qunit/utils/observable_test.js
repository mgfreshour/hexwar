module('Observable');
test('Observable::bindEvent() only accepts functions as callback', function() {
	var testee = new Observable();
	try {
		testee.bindEvent('test event', 'not a function');
		ok(false, 'We needed an exception here!');
	} catch (e) {
		ok(true, 'Exception thrown');
	}
	try {
		testee.bindEvent('test event', 18);
		ok(false, 'We needed an exception here!');
	} catch (e) {
		ok(true, 'Exception thrown');
	}
	try {
		testee.bindEvent('test event', { function: true });
		ok(false, 'We needed an exception here!');
	} catch (e) {
		ok(true, 'Exception thrown');
	}
	try {
		testee.bindEvent('test event', [1,2,3]);
		ok(false, 'We needed an exception here!');
	} catch (e) {
		ok(true, 'Exception thrown');
	}
});

test('Observable::notifyListeners() calls each function', function() {
	expect(3);
	var cb1 = function(){ ok(true,'cb1'); },
	    cb2 = function(){ ok(true,'cb2'); },
	    cb3 = function(){ ok(true,'cb3'); };
	var testee = new Observable();
	testee.bindEvent('test', cb1);
	testee.bindEvent('test', cb2);
	testee.bindEvent('test', cb3);
	testee.notifyListeners('test');
});

test('Observable::notifyListeners() calls each function even they throw exceptions', function() {
	expect(3);
	var cb1 = function(){ ok(true,'cb1'); throw 'cb1 error!'; },
	    cb2 = function(){ ok(true,'cb2'); throw 'cb2 error!'; },
	    cb3 = function(){ ok(true,'cb3'); throw 'cb3 error!'; };
	var testee = new Observable();
	testee.bindEvent('test', cb1);
	testee.bindEvent('test', cb2);
	testee.bindEvent('test', cb3);
	testee.notifyListeners('test');
});

test('Observable::unbindEvent() works', function() {
	var cb1 = function(){ ok(true,'cb1'); },
	    cb2 = function(){ ok(false,'cb2 should not have been called!'); },
	    cb3 = function(){ ok(true,'cb3'); },
	    cb4 = function(){ ok(true,'cb4'); };
	var testee = new Observable();
	testee.bindEvent('test', cb1);
	testee.bindEvent('test', cb2);
	testee.bindEvent('test', cb3);
	testee.bindEvent('test', cb4);
	testee.unbindEvent('test', cb2);
	testee.notifyListeners('test');
});

test('Observable::bindEvent() scope works', function() {
	var obj = { test_value: 'hello' };
	var s_cb = function() { equal(this.test_value, 'hello'); }
	var cb = function() { equal(this.test_value, undefined); }
	expect(2);
	var testee = new Observable();
	testee.bindEvent('test', s_cb, obj);
	testee.bindEvent('test', cb);
	testee.notifyListeners('test');
});