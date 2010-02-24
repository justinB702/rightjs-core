/**
 * The old browsers support patch loading script
 * will be included in the core file when it's built
 * with the no-olds option
 *
 * Basically it just checks all the script tags on the page
 * finds the core inclusion tag and uses it's src attribute
 * to dynamically load the olds patch
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
if (!document.querySelector) {
  (function() {
    var rigth_src_re = /(^|\/)(right)([^\/]+)$/,
        core_src = $A(document.getElementsByTagName('script')).map('src').compact().first('match', rigth_src_re);
    if (core_src)
      document.write('<scr'+'ipt src="'+core_src.replace(rigth_src_re, '$1$2-olds$3')+'"></scr'+'ipt>');
  })();
}
 