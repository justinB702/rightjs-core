/**
 * The dom-ready event handling code
 *
 * Credits:
 *   The basic principles of the module are originated from
 *     - MooTools  (http://mootools.net)      Copyright (C) Valerio Proietti
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
[Window, Document].each(function(object) {
  var proto = object[PROTO], old_on = proto.on;
  
  // redefining the observer method to catch up
  proto.on = function(name) {
    if (name == 'ready' && !this._wR) {
      var document = this._, document = document.nodeType == 9 ? document : document.document,
        ready = this.fire.bind(this, 'ready');
      
      // IE and Konqueror browsers
      if ('readyState' in document) {
        (function() {
          ['loaded','complete'].includes(document.readyState) ? ready() : arguments.callee.delay(50);
        })();
      } else {
        document.addEventListener('DOMContentLoaded', ready, false);
      }
      
      this._wR = true;
    }
    return old_on.apply(this, arguments);
  };
  
  Observer_createShortcuts(proto, ['ready']);
});
