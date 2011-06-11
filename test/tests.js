// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

// below are some general tests but feel free to delete them.

module("example tests");
test('HTML5 Boilerplate is sweet',function(){
  expect(1);
  equals('boilerplate'.replace('boilerplate','sweet'),'sweet','Yes. HTML5 Boilerplate is, in fact, sweet');
  
})

// these test things from plugins.js
test('Environment is good',function(){
  expect(3);
  ok( !!window.log, 'log function present');
  
  var history = log.history && log.history.length || 0;
  log('logging from the test suite.')
  equals( log.history.length - history, 1, 'log history keeps track' )
  
  ok( !!window.Modernizr, 'Modernizr global is present')
})

module("search tests");
var search = CS.search,
	can_make = CS.can_make;
test('search of no drinks returns an empty array', function() {
	var results = search([], [], 0);
	ok(results.length === 0);
});

var ingrediants = {
	'bourbon': true, 
	'bitters': true,
	'orange': true,
	'cherry': true,
	'sugar': true
}

var old_fashioned = {
	"name": "Old Fashioned",
	"ingrediants": [
		{"name": "Bourbon"},
		{"name": "Bitters"},
		{"name": "Orange"},
		{"name": "Cherry"},
		{"name": "Sugar"}
	],
	"container": {"name": "Old Fashioned"}
}

var martini = {
	"name": "Martini",
	"ingrediants": [
		{"name": "Vodka"},
		{"name": "Olives"},
		{"name": "Vermouth"}
	],
	"container": {"name": "Martini"}
}

test('search of drinks with no ingrediants returns all drinks', function() {
	var empty_glass = {
		"name": "Disappointment",
		"ingrediants": [],
		"container": "Pint"
	}
	var results = search(ingrediants, [empty_glass], 0);
	ok(results.length === 1);
});

test('can make old_fashioned', function() {
	var results = can_make(ingrediants, old_fashioned, 0);
	ok(results);
});

test('can not make martini', function() {
	var results = can_make(ingrediants, martini, 0);
	ok(!results);
});

test('search of only one drink which has exact ingrediants returns that drink', function() {
	var results = search(ingrediants, [old_fashioned], 0);
	ok(results.length === 1);
});

test('search of two drinks one of which mathches returns a single drink',
function() {
	var results = search(ingrediants, [old_fashioned, martini], 0);
	console.log(results);
	ok(results.length === 1);
});
