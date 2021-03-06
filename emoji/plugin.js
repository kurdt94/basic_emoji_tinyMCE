// emoticons plugin transformed to emojis
// variable names adjusted to keep logic
// 12-12-2018
// Erwin Graanstra 2018

(function () {

var defs = {}; 

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_5973 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(ids[i]);
  callback.apply(null, instances);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minification when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.plugins.emoji.Plugin","tinymce.core.PluginManager","tinymce.plugins.emoji.ui.Buttons","global!tinymce.util.Tools.resolve","tinymce.plugins.emoji.ui.PanelHtml","tinymce.core.util.Tools"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * PanelHtml.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.emoji.ui.PanelHtml',
  [
    'tinymce.core.util.Tools'
  ],
  function (Tools) {
    
    //2010 list from: https://unicode.org/emoji/charts/emoji-versions.html#2010
    var emojis = [
      ["😃", "😄", "😁", "😆", "😅", "😂", "😉", "😊", "😇", "😍", "😘", "😚",],
      ["😀", "😙", "😛", "😑", "😬", "😴", "😕", "😟", "😮", "😯", "😦", "😧",],
      ["😋", "😜", "😝", "😐", "😶", "😏", "😒", "😌", "😔", "😪", "😷", "😵",],
      ["😎", "😲", "😳", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞",], 
      ["😓", "😩", "😫", "😤", "😡", "😠", "😈", "👿", "💀", "💩", "👻", "👽",],
      ["👾", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉",],
      ["💋", "💯", "💬", "💭", "💤", "👌", "👆", "👇", "👍", "👎", "✊", "👊",],
    ];
    
    var getHtml = function (pluginUrl) {
      var emojiHtml;
      emojiHtml = '<style>.emoji-grid a:hover{outline:0; background: #eee; text-decoration: none;}</style><table role="list" class="mce-grid emoji-grid">';
      
      Tools.each(emojis, function (row) {
        emojiHtml += '<tr>';

        Tools.each(row, function (icon) {
            emojiHtml += '<td><a href="#" data-mce-url="' + icon + '" data-mce-alt="' + icon + '" tabindex="-1" ' +
            'role="option" aria-label="' + icon + '">' + icon + '</a></td>';
        });
        emojiHtml += '</tr>';
      });

      emojiHtml += '</table>';
     
      return emojiHtml;
    };

    return {
      getHtml: getHtml
    };
  }
);
/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.emoji.ui.Buttons',
  [
    'tinymce.plugins.emoji.ui.PanelHtml'
  ],
  function (PanelHtml) {
    var insertEmoticon = function (editor, src, alt) {
      editor.insertContent(src);
    };

    var register = function (editor, pluginUrl) {
      var panelHtml = PanelHtml.getHtml(pluginUrl);

      editor.addButton('emoji', {
        type: 'panelbutton',
        text: '😀',
        icon: false,
        panel: {
          role: 'application',
          autohide: true,
          html: panelHtml,
          onclick: function (e) {
            var linkElm = editor.dom.getParent(e.target, 'a');
            if (linkElm) {
                insertEmoticon(editor, linkElm.getAttribute('data-mce-url'), linkElm.getAttribute('data-mce-alt'));
              this.hide();
            }
          }
        },
        tooltip: 'Emoji'
      });
    };

    return {
      register: register
    };
  }
);
/**
 * Plugin.js
 * 
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the emoji plugin.
 *
 * @class tinymce.emoji.Plugin
 * @private
 */
define(
  'tinymce.plugins.emoji.Plugin',
  [
    'tinymce.core.PluginManager',
    'tinymce.plugins.emoji.ui.Buttons'
  ],
  function (PluginManager, Buttons) {
    PluginManager.add('emoji', function (editor, pluginUrl) {
      Buttons.register(editor, pluginUrl);
    });

    return function () { };
  }
);
dem('tinymce.plugins.emoji.Plugin')();
})();
