/**
 * The Element unit common methods module test-case
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var ElementCommonsTest = TestCase.create({
  name: 'ElementCommonsTest',
  
  setUp: function() {
    this.el = new Element('div');
    this.div = document.createElement('div');
  },
  
  testSetSimple: function() {
    this.assertSame(this.el, this.el.set('id', 'some-id'));
    this.assertEqual('some-id', this.el.id);
  },
  
  testSetSimple_classLevel: function() {
    this.assertSame(this.div, Element.set(this.div, 'id', 'some-id'));
    this.assertEqual('some-id', this.div.id);
    this.assertNull(this.div['set'], "checking that the element was not extended");
  },
  
  testSetHash: function() {
    this.assertSame(this.el, this.el.set({
      id: 'another-id',
      className: 'foo bar'
    }));
    
    this.assertEqual('another-id', this.el.id);
    this.assertEqual('foo bar', this.el.className);
  },
  
  testSetHash_classLevel: function() {
    this.assertSame(this.div, Element.set(this.div, {
      id: 'another-id',
      className: 'foo bar'
    }));
    
    this.assertEqual('another-id', this.div.id);
    this.assertEqual('foo bar', this.div.className);
    
    this.assertNull(this.div['set'], "checking that the element was not extended");
  },
  
  testGet: function() {
    this.el.id = 'something';
    this.assertEqual(this.el.id, this.el.get('id'));
    this.assertNull(this.el.get('title'));
  },
  
  testGet_classLevel: function() {
    this.div.id = 'something';
    this.assertEqual(this.div.id, Element.get(this.div, 'id'));
    this.assertNull(Element.get(this.div, 'title'));
    
    this.assertNull(this.div['get'], "checking that the element was not extended");
  },
  
  testHas: function() {
    this.el.id = 'something';
    this.assert(this.el.has('id'));
    this.assertFalse(this.el.has('title'));
  },
  
  testHas_classLevel: function() {
    this.div.id = 'something';
    this.assert(Element.has(this.div, 'id'));
    this.assertFalse(Element.has(this.div, 'title'));
    
    this.assertNull(this.div['has'], "checking that the element was not extended");
  },
  
  testErase: function() {
    this.el.id = 'somethig';
    this.assertSame(this.el, this.el.erase('id'));
    this.assertFalse(this.el.has('id'));
  },
  
  testErase_classLevel: function() {
    this.div.id = 'somethig';
    this.assertSame(this.div, Element.erase(this.div, 'id'));
    this.assertFalse(Element.has(this.div, 'id'));
    
    this.assertNull(this.div['erase'], "checking that the element was not extended");
  },
  
  testHidden: function() {
    this.assertFalse(this.el.hidden());
    this.el.style.display = 'none';
    this.assert(this.el.hidden());
  },
  
  testHidden_classLevel: function() {
    this.assertFalse(Element.hidden(this.div));
    this.div.style.display = 'none';
    this.assert(Element.hidden(this.div));
    
    this.assertNull(this.div['hidden'], "checking that the element was not extended");
  },
  
  testVisible: function() {
    this.assert(this.el.visible());
    this.el.style.display = 'none';
    this.assertFalse(this.el.visible());
  },
  
  testVisible_classLevel: function() {
    this.assert(Element.visible(this.div));
    this.div.style.display = 'none';
    this.assertFalse(Element.visible(this.div));
    
    this.assertNull(this.div['visible'], "checking that the element was not extended");
  },
  
  testHide: function() {
    this.assertVisible(this.el);
    this.assertSame(this.el, this.el.hide());
    this.assertHidden(this.el);
  },
  
  testHide_classLevel: function() {
    this.assertVisible(this.div);
    this.assertSame(this.div, Element.hide(this.div));
    this.assertHidden(this.div);
    
    this.assertNull(this.div['hide'], "checking that the element was not extended");
  },
  
  testShow: function() {
    this.el.style.display = 'none';
    this.assertHidden(this.el)
    this.assertSame(this.el, this.el.show());
    this.assertVisible(this.el);
  },
  
  testShow_classLevel: function() {
    this.div.style.display = 'none';
    this.assertHidden(this.div)
    this.assertSame(this.div, Element.show(this.div));
    this.assertVisible(this.div);
    
    this.assertNull(this.div['show'], "checking that the element was not extended");
  },
  
  testHideShowPrevDisplayRestoration: function() {
    this.el.style.display = 'inline';
    this.el.hide();
    this.el.show();
    this.assertStyle(this.el, {display: 'inline'});
  },
  
  testHideShowPrevDisplayRestoration_classLevel: function() {
    this.div.style.display = 'inline';
    Element.hide(this.div);
    Element.show(this.div);
    this.assertStyle(this.div, {display: 'inline'});
  },
  
  testToggle: function() {
    this.assertVisible(this.el);
    this.assertSame(this.el, this.el.toggle());
    this.assertHidden(this.el);
    this.assertSame(this.el, this.el.toggle());
    this.assertVisible(this.el);
  },
  
  testToggle_classLevel: function() {
    this.assertVisible(this.div);
    this.assertSame(this.div, Element.toggle(this.div));
    this.assertHidden(this.div);
    this.assertSame(this.div, Element.toggle(this.div));
    this.assertVisible(this.div);
    
    this.assertNull(this.div['toggle'], "checking that the element was not extended");
  }
})