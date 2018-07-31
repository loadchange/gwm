'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Watermark = function Watermark(_ref) {
    var _ref$txt = _ref.txt,
        txt = _ref$txt === undefined ? '' : _ref$txt,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 50 : _ref$y,
        _ref$font = _ref.font,
        font = _ref$font === undefined ? 'microsoft yahe' : _ref$font,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#000' : _ref$color,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === undefined ? 12 : _ref$fontSize,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === undefined ? 1 : _ref$alpha,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 158 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 100 : _ref$height,
        _ref$angle = _ref.angle,
        angle = _ref$angle === undefined ? -15 : _ref$angle;
    classCallCheck(this, Watermark);

    this.txt = txt || '内部资料 请勿外传';
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.font = font;
    this.fontSize = fontSize;
    this.color = color;
    this.alpha = alpha;
    this.angle = angle;
};

var CanvasWay = function () {
    function CanvasWay(watermark) {
        classCallCheck(this, CanvasWay);

        this.watermark = watermark;
        var width = watermark.width,
            height = watermark.height;

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
    }

    createClass(CanvasWay, [{
        key: 'render',
        value: function render() {
            var _watermark = this.watermark,
                txt = _watermark.txt,
                x = _watermark.x,
                y = _watermark.y,
                width = _watermark.width,
                height = _watermark.height,
                font = _watermark.font,
                color = _watermark.color,
                fontSize = _watermark.fontSize,
                alpha = _watermark.alpha,
                angle = _watermark.angle;

            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            ctx.font = fontSize + 'px ' + font;
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * angle);
            ctx.translate(-x, -y - fontSize);
            ctx.fillText(txt, x, y + fontSize);
            return this.canvas.toDataURL();
        }
    }]);
    return CanvasWay;
}();

function setStyle(elem, key, value) {
    elem.style[key] = value;
}

var bindCSS = (function (elem, css) {
    return Object.keys(css).forEach(function (key) {
        return setStyle(elem, key, css[key]);
    });
});

var ElementWay = function () {
    function ElementWay(watermark) {
        classCallCheck(this, ElementWay);

        this.watermark = watermark;
    }

    createClass(ElementWay, [{
        key: '_createItem',
        value: function _createItem() {
            var _watermark = this.watermark,
                txt = _watermark.txt,
                x = _watermark.x,
                y = _watermark.y,
                font = _watermark.font,
                color = _watermark.color,
                fontSize = _watermark.fontSize,
                alpha = _watermark.alpha,
                angle = _watermark.angle,
                width = _watermark.width,
                height = _watermark.height;

            var item = document.createElement('div');
            bindCSS(item, {
                position: 'relative',
                width: width, height: height,
                flex: '0 0 ' + width + 'px',
                overflow: 'hidden',
                pointerEvents: 'none'
            });
            var span = document.createElement('span');
            span.innerHTML = txt;
            bindCSS(span, {
                position: 'absolute',
                top: y + 'px',
                left: x + 'px',
                fontFamily: font,
                fontSize: fontSize + 'px',
                color: color,
                lineHeight: 1.5,
                opacity: alpha,
                fontWeight: 400,
                transform: 'rotate(' + angle + 'deg)',
                transformOrigin: '0 0',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            });
            item.appendChild(span);
            return item;
        }
    }, {
        key: 'render',
        value: function render() {
            var _watermark2 = this.watermark,
                width = _watermark2.width,
                height = _watermark2.height;

            var _ref = document.documentElement || document.body,
                clientWidth = _ref.clientWidth,
                clientHeight = _ref.clientHeight;

            var column = Math.ceil(clientWidth / width);
            var rows = Math.ceil(clientHeight / height);
            var wrap = document.createElement('div');
            bindCSS(wrap, {
                display: 'flex',
                flexWrap: 'wrap',
                width: width * column + 'px',
                height: height * rows + 'px'
            });
            for (var i = 0; i < column * rows; i++) {
                wrap.appendChild(this._createItem());
            }
            return wrap;
        }
    }]);
    return ElementWay;
}();

var SvgWay = function () {
    function SvgWay(watermark) {
        classCallCheck(this, SvgWay);

        this.watermark = watermark;
    }

    createClass(SvgWay, [{
        key: "render",
        value: function render() {
            var _watermark = this.watermark,
                txt = _watermark.txt,
                x = _watermark.x,
                y = _watermark.y,
                width = _watermark.width,
                height = _watermark.height,
                color = _watermark.color,
                font = _watermark.font,
                fontSize = _watermark.fontSize,
                alpha = _watermark.alpha,
                angle = _watermark.angle;

            var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "px\" height=\"" + height + "px\">\n                <text x=\"" + x + "px\" y=\"" + y + "px\" dy=\"" + fontSize + "px\"\n                    text-anchor=\"start\"\n                    stroke=\"" + color + "\"\n                    stroke-opacity=\"" + alpha + "\"\n                    fill=\"none\"\n                    transform=\"rotate(" + angle + "," + x + " " + y + ")\"\n                    font-weight=\"100\"\n                    font-size=\"" + fontSize + "\"\n                    font-family=\"" + font + "\"\n                    >\n                    " + txt + "\n                </text>\n            </svg>";
            return "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr)));
        }
    }]);
    return SvgWay;
}();

function getGwm() {
    var gwmDiv = document.createElement('div');
    var gwmStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '178px',
        height: '120px',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat'
    };
    for (var key in gwmStyle) {
        gwmDiv.style[key] = gwmStyle[key];
    }
    return gwmDiv;
}

var w = new Watermark({
    width: 178,
    height: 120,
    txt: '20180727 内部资料 请勿外传', angle: -15,
    x: 10, y: 60,
    color: '#ff0000'
});
//
var img = new CanvasWay(w).render();
var gwm1 = getGwm();
gwm1.style.backgroundImage = 'url("' + img + '")';
document.body.appendChild(gwm1);

// success
w.color = '#2196f3';
w.txt = '20180727 内部资料 请勿';
var img2 = new SvgWay(w).render();
var gwm2 = getGwm();
gwm2.style.backgroundImage = 'url("' + img2 + '")';
document.body.appendChild(gwm2);

w.color = '#000';
w.txt = '20180727 内部资料';
var elementWay = new ElementWay(w);
var gwm3 = getGwm();
gwm3.appendChild(elementWay.render());
document.body.appendChild(gwm3);
//# sourceMappingURL=gwm.js.map
