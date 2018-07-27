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
        x = _ref$x === undefined ? 22 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$xSpace = _ref.xSpace,
        xSpace = _ref$xSpace === undefined ? 20 : _ref$xSpace,
        _ref$ySpace = _ref.ySpace,
        ySpace = _ref$ySpace === undefined ? 20 : _ref$ySpace,
        _ref$font = _ref.font,
        font = _ref$font === undefined ? 'microsoft yahe' : _ref$font,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#000' : _ref$color,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === undefined ? 12 : _ref$fontSize,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === undefined ? 0.1 : _ref$alpha,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 150 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 100 : _ref$height,
        _ref$angle = _ref.angle,
        angle = _ref$angle === undefined ? -15 : _ref$angle;
    classCallCheck(this, Watermark);

    this.txt = txt;
    this.x = x;
    this.y = y;
    this.xSpace = xSpace; // x轴间隔
    this.ySpace = ySpace; // y轴间隔
    this.font = font;
    this.color = color;
    this.fontSize = fontSize; // 字体大小
    this.alpha = alpha; // 透明度
    this.width = width;
    this.height = height;
    this.angle = angle;
};

var CanvasWay = function () {
    function CanvasWay(watermark) {
        classCallCheck(this, CanvasWay);

        this.watermark = watermark;
        var width = watermark.width,
            height = watermark.height,
            xSpace = watermark.xSpace,
            ySpace = watermark.ySpace;

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', width + xSpace);
        this.canvas.setAttribute('height', height + ySpace);
    }

    createClass(CanvasWay, [{
        key: 'render',
        value: function render() {
            var _watermark = this.watermark,
                txt = _watermark.txt,
                x = _watermark.x,
                y = _watermark.y,
                xSpace = _watermark.xSpace,
                ySpace = _watermark.ySpace,
                font = _watermark.font,
                color = _watermark.color,
                fontSize = _watermark.fontSize,
                alpha = _watermark.alpha,
                angle = _watermark.angle;

            var ctx = this.canvas.getContext('2d');
            ctx.textAlign = this.watermark.txt;
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            ctx.font = fontSize + 'px ' + font;
            ctx.rotate(Math.PI / 180 * angle);
            ctx.fillText(txt, x + xSpace / 2, y + ySpace / 2 + fontSize);

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
                height = _watermark.height,
                xSpace = _watermark.xSpace,
                ySpace = _watermark.ySpace;

            var item = document.createElement('div');
            bindCSS(item, {
                position: 'relative',
                width: width, height: height,
                flex: '0 0 ' + width + 'px',
                margin: xSpace / 2 + 'px ' + ySpace / 2 + 'px',
                overflow: 'hidden'
            });
            var span = document.createElement('span');
            span.innerHTML = txt;
            bindCSS(span, {
                position: 'absolute',
                top: x + 'px',
                left: y + 'px',
                fontFamily: font,
                fontSize: fontSize + 'px',
                color: color,
                opacity: alpha,
                transform: 'rotate(' + angle + 'deg)',
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
                height = _watermark2.height,
                xSpace = _watermark2.xSpace,
                ySpace = _watermark2.ySpace;

            var _ref = document.documentElement || document.body,
                clientWidth = _ref.clientWidth,
                clientHeight = _ref.clientHeight;

            var column = Math.ceil(clientWidth / (width + xSpace));
            var rows = Math.ceil(clientHeight / (height + ySpace));
            var wrap = document.createElement('div');
            bindCSS(wrap, {
                display: 'flex',
                flexWrap: 'wrap',
                width: (width + xSpace) * column + 'px',
                height: (height + ySpace) * rows + 'px'
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
                width = _watermark.width,
                height = _watermark.height,
                xSpace = _watermark.xSpace,
                ySpace = _watermark.ySpace,
                fontSize = _watermark.fontSize,
                alpha = _watermark.alpha,
                angle = _watermark.angle;

            var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (width + xSpace) + "\" height=\"" + (height + ySpace) + "\">\n                <text x=\"50%\" y=\"50%\" dy=\"12px\"\n                    text-anchor=\"middle\"\n                    stroke=\"#000000\"\n                    stroke-width=\"1\"\n                    stroke-opacity=\"" + alpha + "\"\n                    fill=\"none\"\n                    transform=\"rotate(" + angle + ", 120 120)\"\n                    style=\"font-size: " + fontSize + ";\">\n                    " + txt + "\n                </text>\n            </svg>";
            return "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr)));
        }
    }]);
    return SvgWay;
}();

var gwmDiv = document.createElement('div');
var gwmStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden'
    // backgroundImage: `url("${img}")`
};
for (var key in gwmStyle) {
    gwmDiv.style[key] = gwmStyle[key];
}

var w = new Watermark({ txt: '20180727 内部资料 请勿外传' });
// const img = new CanvasWay(w).render()
var img = new SvgWay(w).render();
gwmDiv.style.backgroundImage = 'url("' + img + '")';
document.body.appendChild(gwmDiv);

//
// const htmlw = new Watermark({txt: '20180726 王彦民 E084817', x: 22, y: 0,})
// const elementWay = new ElementWay(htmlw)
// gwmDiv.appendChild(elementWay.render())
// document.body.appendChild(gwmDiv)
//# sourceMappingURL=gwm.js.map
