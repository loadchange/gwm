(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.gwm = factory());
})(this, (function () { 'use strict';

  var Watermark = /** @class */ (function () {
      function Watermark(_a) {
          var _b = _a.txt, txt = _b === void 0 ? new Date().toLocaleDateString() + " Top secret" : _b, _c = _a.x, x = _c === void 0 ? 0 : _c, _d = _a.y, y = _d === void 0 ? 50 : _d, _e = _a.font, font = _e === void 0 ? 'microsoft yahe' : _e, _f = _a.color, color = _f === void 0 ? '#000' : _f, _g = _a.fontSize, fontSize = _g === void 0 ? 12 : _g, _h = _a.alpha, alpha = _h === void 0 ? 0.1 : _h, _j = _a.width, width = _j === void 0 ? 158 : _j, _k = _a.height, height = _k === void 0 ? 100 : _k, _l = _a.angle, angle = _l === void 0 ? -15 : _l;
          this.txt = txt;
          this.width = width;
          this.height = height;
          this.x = x;
          this.y = y;
          this.font = font;
          this.fontSize = fontSize;
          this.color = color;
          this.alpha = alpha;
          this.angle = angle;
      }
      return Watermark;
  }());

  var SvgWay = /** @class */ (function () {
      function SvgWay(watermark) {
          this.watermark = watermark;
      }
      SvgWay.prototype.render = function () {
          var _a = this.watermark, txt = _a.txt, x = _a.x, y = _a.y, width = _a.width, height = _a.height, color = _a.color, font = _a.font, fontSize = _a.fontSize, alpha = _a.alpha, angle = _a.angle;
          var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "px\" height=\"" + height + "px\">\n                <text x=\"" + x + "px\" y=\"" + y + "px\" dy=\"" + fontSize + "px\"\n                    text-anchor=\"start\"\n                    stroke=\"" + color + "\"\n                    stroke-opacity=\"" + alpha + "\"\n                    fill=\"none\"\n                    transform=\"rotate(" + angle + "," + x + " " + y + ")\"\n                    font-weight=\"100\"\n                    font-size=\"" + fontSize + "\"\n                    font-family=\"" + font + "\"\n                    >\n                    " + txt + "\n                </text>\n            </svg>";
          return "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr)));
      };
      return SvgWay;
  }());

  var CanvasWay = /** @class */ (function () {
      function CanvasWay(watermark) {
          this.watermark = watermark;
          var width = watermark.width, height = watermark.height;
          this.canvas = document.createElement('canvas');
          this.canvas.setAttribute('width', "" + width);
          this.canvas.setAttribute('height', "" + height);
      }
      CanvasWay.prototype.render = function () {
          var _a = this.watermark, txt = _a.txt, x = _a.x, y = _a.y, width = _a.width, height = _a.height, font = _a.font, color = _a.color, fontSize = _a.fontSize, alpha = _a.alpha, angle = _a.angle;
          var ctx = this.canvas.getContext('2d');
          if (ctx === null) {
              throw new Error('getContext error');
          }
          ctx.clearRect(0, 0, width, height);
          ctx.textBaseline = 'top';
          ctx.textAlign = 'left';
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.font = fontSize + "px " + font;
          ctx.translate(x, y);
          ctx.rotate((Math.PI / 180) * angle);
          ctx.translate(-x, -y - fontSize);
          ctx.fillText(txt, x, y + fontSize);
          return this.canvas.toDataURL();
      };
      return CanvasWay;
  }());

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  var humpToLine = function (name) {
      return name.replace(/([A-Z])/g, "_$1").toLowerCase();
  };

  var isSupport = function (attribute) { return attribute in document.documentElement.style; };
  var assignStyle = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var _a = args.filter(function (item) { return item; }), oldStyle = _a[0], newStyles = _a.slice(1);
      return Object.assign.apply(null, __spreadArrays([oldStyle], newStyles));
  };
  var bindCSS = (function (elem, css, priority) {
      var mergeStyle = assignStyle(elem.style, css);
      for (var key in mergeStyle) {
          if (priority === 'normal') {
              elem.style[key] = mergeStyle[key];
              continue;
          }
          if (elem.style.setProperty) {
              elem.style.setProperty(key, css[key], 'important');
              continue;
          }
          var oldStyle = elem.getAttribute('style');
          var newStyle = [humpToLine(key), css[key] + "!important;"].join(':');
          elem.setAttribute('style', [oldStyle, newStyle].join(' ').trim());
      }
      return elem;
  });

  var ElementWay = /** @class */ (function () {
      function ElementWay(watermark) {
          this.watermark = watermark;
      }
      ElementWay.prototype.createItem = function () {
          var _a = this.watermark, txt = _a.txt, x = _a.x, y = _a.y, font = _a.font, color = _a.color, fontSize = _a.fontSize, alpha = _a.alpha, angle = _a.angle, width = _a.width, height = _a.height;
          var item = document.createElement('div');
          bindCSS(item, Object.create({
              position: 'relative',
              width: width + 'px',
              height: height + 'px',
              flex: "0 0 " + width + "px",
              overflow: 'hidden',
              pointerEvents: 'none',
          }), 'normal');
          var span = document.createElement('span');
          span.innerHTML = txt;
          bindCSS(span, Object.create({
              position: 'absolute',
              top: y + "px",
              left: x + "px",
              fontFamily: font,
              fontSize: fontSize + "px",
              color: color,
              lineHeight: 1.5,
              opacity: alpha,
              fontWeight: 400,
              transform: "rotate(" + angle + "deg)",
              transformOrigin: '0 0',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
          }), 'normal');
          item.appendChild(span);
          return item;
      };
      ElementWay.prototype.render = function () {
          var i = 0;
          var _a = this.watermark, width = _a.width, height = _a.height;
          var _b = document.documentElement || document.body, clientWidth = _b.clientWidth, clientHeight = _b.clientHeight;
          var column = Math.ceil(clientWidth / width);
          var rows = Math.ceil(clientHeight / height);
          var wrap = document.createElement('div');
          bindCSS(wrap, Object.create({
              display: 'flex',
              flexWrap: 'wrap',
              width: width * column + "px",
              height: height * rows + "px",
          }), 'normal');
          for (; i < column * rows; i++) {
              wrap.appendChild(this.createItem());
          }
          return wrap;
      };
      return ElementWay;
  }());

  var mutationObserver = MutationObserver || WebKitMutationObserver || MozMutationObserver;
  function bindMutationEvent(target, container, callback) {
      var eventList = [
          'DOMAttrModified',
          'DOMAttributeNameChanged',
          'DOMCharacterDataModified',
          'DOMElementNameChanged',
          'DOMNodeInserted',
          'DOMNodeInsertedIntoDocument',
          'DOMNodeRemoved',
          'DOMNodeRemovedFromDocument',
          'DOMSubtreeModified',
      ];
      eventList.map(function (eventName) { return target.addEventListener(eventName, function () { return callback(); }, false); });
      document.body.addEventListener('DOMSubtreeModified', function () { return callback(); }, false);
      return {
          containerObserver: {
              disconnect: function () { return container.removeEventListener('DOMSubtreeModified', function () { return callback(); }, false); },
          },
          targetObserver: {
              disconnect: function () { return eventList.map(function (eventName) { return target.removeEventListener(eventName, function () { return callback(); }, false); }); },
          },
      };
  }
  var observer = function (target, container, callback) {
      if (!mutationObserver) {
          return bindMutationEvent(target, container, callback);
      }
      var containerObserver = new mutationObserver(function (mutationsList) {
          mutationsList.forEach(function (mutation) {
              mutation.removedNodes.forEach(function (item) {
                  if (item === target) {
                      callback();
                  }
              });
          });
      });
      containerObserver.observe(container, { childList: true });
      var targetObserver = new MutationObserver(callback);
      targetObserver.observe(target, {
          characterData: true,
          attributes: true,
          childList: true,
          subtree: true
      });
      return { containerObserver: containerObserver, targetObserver: targetObserver };
  };
  var disconnect = function (currentObserver) {
      var containerObserver = currentObserver.containerObserver, targetObserver = currentObserver.targetObserver;
      containerObserver.disconnect();
      targetObserver.disconnect();
  };
  var creator = (function (gwm) {
      var gwmDom = gwm.gwmDom;
      var css = Object.create(gwm.opts.css);
      if (gwmDom) {
          gwmDom.remove();
      }
      var gwmDiv = document.createElement('div');
      if (isSupport('pointerEvents')) {
          css.pointerEvents = 'none';
          css.zIndex = parseInt("" + css.zIndex, 10) > 0 ? css.zIndex : '999999';
      }
      bindCSS(gwmDiv, css);
      return gwmDiv;
  });

  var DEFAULT_STYLE = Object.create({
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      zIndex: -10,
      backgroundRepeat: 'no-repeat',
      display: 'block',
      opacity: '1',
  });

  var WatermarkType;
  (function (WatermarkType) {
      WatermarkType["CANVAS"] = "canvas";
      WatermarkType["SVG"] = "svg";
      WatermarkType["ELEMENT"] = "element";
  })(WatermarkType || (WatermarkType = {}));

  var wayFactory = function (mode, wm) {
      switch (mode) {
          case WatermarkType.CANVAS:
              return new CanvasWay(wm);
          case WatermarkType.SVG:
              return new SvgWay(wm);
          default:
              return new ElementWay(wm);
      }
  };
  var getElement = function (container) {
      if (typeof container === 'string') {
          var dom = document.querySelector(container);
          if (dom) {
              return dom;
          }
          return document.body;
      }
      return container;
  };
  var GenerateWatermark = /** @class */ (function () {
      function GenerateWatermark() {
      }
      GenerateWatermark.prototype.creation = function (opts) {
          this.opts = opts;
          this.opts.css = assignStyle(DEFAULT_STYLE, opts.css);
          this.cancel();
          var mode = opts.mode, watch = opts.watch, _a = opts.container, container = _a === void 0 ? document.body : _a;
          this.wrap = getElement(container);
          if (this.wrap !== document.body) {
              this.opts.css.position = 'absolute';
              bindCSS(this.wrap, Object.create({ position: 'relative' }));
          }
          this.gwmDom = creator(this);
          var wm = new Watermark(opts);
          var impl = wayFactory(mode || WatermarkType.SVG, wm);
          var result = impl.render();
          if (mode === WatermarkType.ELEMENT) {
              this.gwmDom.appendChild(result);
          }
          else {
              this.gwmDom.style.background = "url(\"" + result + "\")";
          }
          var first = this.wrap.firstChild;
          if (first) {
              this.wrap.insertBefore(this.gwmDom, first);
          }
          else {
              this.wrap.appendChild(this.gwmDom);
          }
          if (typeof watch === 'boolean' && !watch) {
              this.observer = this.observing();
          }
          if (opts.destroy) {
              this.creation = function (f) { return f; };
          }
      };
      GenerateWatermark.prototype.observing = function () {
          var _this = this;
          return observer(this.gwmDom, this.wrap, function () { return _this.creation(_this.opts); });
      };
      GenerateWatermark.prototype.cancel = function () {
          if (this.observer) {
              disconnect(this.observer);
          }
      };
      return GenerateWatermark;
  }());

  var index = new GenerateWatermark();

  return index;

}));
//# sourceMappingURL=gwm.umd.js.map
