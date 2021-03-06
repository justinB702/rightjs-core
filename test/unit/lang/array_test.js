/**
 * The Array unit test-case
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var ArrayTest = TestCase.create({
  name: 'ArrayTest',

  testIndexOf: function() {
    this.assertEqual(0, [1,2].indexOf(1));
    this.assertEqual(1, [1,2].indexOf(2));
    this.assertEqual(-1, [1,2].indexOf(3));
  },

  testLastIndexOf: function() {
    this.assertEqual(2, [1,2,1,2].lastIndexOf(1));
    this.assertEqual(3, [1,2,1,2].lastIndexOf(2));
    this.assertEqual(-1, [1,2,1,2].lastIndexOf(3));
  },

  testFirst: function() {
    this.assertEqual(1, [1,2,3].first());
    this.assert([].first() === undefined);
  },

  testFirstWithCallback: function() {
    this.assertEqual(2, [1,2,3].first(function(i) { return i > 1; }));
    this.assertEqual({a:1}, [{a:0}, {a:1}, {a:2}].first('a'));
  },

  testLast: function() {
    this.assertEqual(4, [1,2,3,4].last());
    this.assert([].last() === undefined);
  },

  testLastWithCallback: function() {
    this.assertEqual(2, [3,2,1].last(function(i) { return i > 1; }));
    this.assertEqual({a:1}, [{a:2}, {a:1}, {a:0}].last('a'));
  },

  testRandom: function() {
    var rands = [null,null];
    for (var i=0; i < 100; i++) {
      var rand = [2,3,4,5].random();
      rands[rand] = rand;
    }
    this.assertEqual([null,null,2,3,4,5], rands);
  },

  testSize: function() {
    this.assertEqual(2, [1,2].size());
    this.assertEqual(4, [1,2,3,4].size());
  },

  testClean: function() {
    this.assertEqual([], [1,2,3,4].clean());
  },

  testEmpty: function() {
    this.assert([].empty());
    this.assertFalse([null].empty());
  },

  testClone: function() {
    var a = [1,2,3,4];
    var b = a.clone();

    this.assertEqual(a,b);
    this.assertNotSame(a,b);
  },

  testEach: function() {
    this.assertEqual([2,4,6,8], [1,2,3,4].each(function(value, i, list) {
      list[i] = value * 2;
    }));
  },

  testEachWithBreak: function() {
    this.assertEqual([2,2,3,4], [1,2,3,4].each(function(value, i, list) {
      list[i] = value * 2;
      RightJS.$break();
    }));
  },

  testEachByName: function() {
    var Dummy = new Class({
      initialize: function(number) {
        this.number = number;
      },

      kick: function() {
        this.args = $A(arguments);
        this.context = this;
      }
    });

    var dummies = [
      new Dummy(1),
      new Dummy(2),
      new Dummy(3)
    ];

    dummies.each('kick', 1, 2, 3);

    dummies.each(function(dummy) {
      this.assertEqual([1,2,3], dummy.args);
      this.assertSame(dummy, dummy.context);
    }, this);
  },

  testMap: function() {
    var a = [1,2,3,4];
    this.assertEqual([2,4,6,8], a.map(function(item) { return item * 2; }));
    this.assertEqual([1,2,3,4], a);
  },

  testMapByName: function() {
    var a = $w('1 12 123 1234');
    this.assertEqual([1,2,3,4], a.map('length'));
    this.assertEqual([false, false, true, true], a.map('includes', '3'));
    this.assertEqual($w('1 12 125 1254'), a.map('replace', /3/, '5'));
  },

  testFilter: function() {
    var a = [1,2,3,4];
    var b = a.filter(function(i) { return i%2==0; });
    this.assertEqual([2,4], b);
    this.assertNotSame(a,b);
  },

  testFilterByName: function() {
    var a = ['', ' ', 'a'];

    this.assertEqual([''],      a.filter('empty'));
    this.assertEqual(['', ' '], a.filter('blank'));
    this.assertEqual([' ', 'a'], a.filter('length'));

    var a = $w('banana orange lime apple');
    this.assertEqual($w('banana orange apple'), a.filter('includes', 'a'));
  },

  testReject: function() {
    var a = [1,2,3,4];
    var b = a.reject(function(i) { return i % 2 == 0; });

    this.assertEqual([1,3], b);
    this.assertNotSame(a,b);
  },

  testRejectByName: function() {
    var a = $w('banana orange lime apple');

    this.assertEqual($w('lime apple'), a.reject('includes', 'an'));
  },

  testSome: function() {
    this.assert([0,false,null,1].some());
    this.assertFalse([0,false,null].some());

    this.assert($w('1 12 123 1234').some(function(string) { return string.length > 3;}));
    this.assertFalse($w('1 12 123 1234').some(function(string) { return string.length > 4;}));

    this.assert($w('anny manny poop').some('match', /oo/));
    this.assertFalse($w('anny manny poop').some('match', /robot/));
  },

  testEvery: function() {
    this.assert([1, true, ' '].every());
    this.assertFalse([true, ' ', 0].every());

    this.assert($w('1 12 123 1234').every(function(string) { return string.length > 0; }));
    this.assertFalse($w('1 12 123 1234').every(function(string) { return string.length > 1; }));

    this.assert($w('anny manny banny').every('match', /a/));
    this.assertFalse($w('anny manny banny').every('match', /m/));
  },

  testWalk: function() {
    var a = [1,2,3,4];
    var b = a.walk(function(i) { return i * 2;});

    this.assertEqual([2,4,6,8], b);
    this.assertSame(a,b);
  },

  testWalkByName: function() {
    var s = 'Mary Linda Anna Sandy';

    var a = $w(s);
    var b = a.walk('toLowerCase');
    this.assertSame(b, a);
    this.assertEqual($w(s.toLowerCase()), b);

    var a = $w(s);
    var b = a.walk('replace', /a/g, 'u');
    this.assertEqual($w(s.replace(/a/g, 'u')), b);

    var a = $w(s);
    var b = a.walk('length');
    this.assertEqual([4, 5, 4, 5], b);
  },

  testConcat: function() {
    var a = [1,2];
    var b = a.concat([3],[4],5);
    this.assertEqual([1,2,3,4,5], b);
    this.assertNotSame(b,a);
  },

  testMerge: function() {
    var a = [1,2];
    var b = a.merge([2,3],[3,4],4,5);
    this.assertEqual([1,2,3,4,5], b);
    this.assertNotSame(b,a);
  },

  testFlatten: function() {
    var a = [1,[2,3],[4,[5,6],[7,8]]];
    var b = a.flatten();
    this.assertEqual([1,2,3,4,5,6,7,8], b);
    this.assertNotSame(b,a);
  },

  testCompact: function() {
    var a = [1,null, null,2,undefined,3,4];
    var b = a.compact();
    this.assertEqual([1,2,3,4], b);
    this.assertNotSame(b,a);
  },

  testUnique: function() {
    var a = [1,2,1,2,3,1,2,3,4,1,2,3,4];
    var b = a.uniq();
    this.assertEqual([1,2,3,4], b);
    this.assertNotSame(b,a);
  },

  testIncludes: function() {
    this.assert([true].includes(true));
    this.assert([1,2,3,4,5].includes(2,4));

    this.assertFalse([true].includes(false));
    this.assertFalse([1,2,3,4,5].includes(6));
    this.assertFalse([1,2,3,4,5].includes(2, 6));
  },

  testWithout: function() {
    var a = [1,2,3,4];
    var b = a.without(2,3);
    this.assertEqual([1,4], b);
    this.assertNotSame(b,a);
  },

  testShuffle: function() {
    var a = [1,2,3,4,5,6,7,8,9];
    var b = a.shuffle();

    this.assertNotSame(a, b);
    this.assertNotEqual(a, b);
    this.assertEqual(a.sort(), b.sort());
  },

  testSort: function() {
    var a = [225, 100, 22];
    var as = a.sort();
    this.assertSame(a, as);
    this.assertEqual([22, 100, 225], as);

    var b = ['as', 'bc', 'ad'];
    var bs = b.sort();

    this.assertSame(b, bs);
    this.assertEqual(['ad', 'as', 'bc'], bs);
  },

  testSortBy: function() {
    var a = [{t:3}, {t:1}, {t:2}];
    var b = a.sortBy(function(item) { return item.t; });
    var c = a.sortBy('t');

    this.assertEqual([{t:1}, {t:2}, {t:3}], b);
    this.assertEqual(b, c);
  },

  testMin: function() {
    this.assertEqual(22, [225, 100, 22].min());
  },

  testMax: function() {
    this.assertEqual(225, [225, 100, 22].max());
  },

  testSum: function() {
    this.assertEqual(127.7, [25.5, 100, 2.2].sum());
  }
});
