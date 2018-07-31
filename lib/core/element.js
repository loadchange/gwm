import bindCSS from '../helpers/bindCSS'

export default class ElementWay {
    constructor(watermark) {
        this.watermark = watermark
    }

    _createItem() {
        let {txt, x, y, font, color, fontSize, alpha, angle, width, height} = this.watermark
        const item = document.createElement('div');
        bindCSS(item, {
            position: 'relative',
            width, height,
            flex: `0 0 ${width}px`,
            overflow: 'hidden',
            pointerEvents: 'none'
        })
        let span = document.createElement('span');
        span.innerHTML = txt
        bindCSS(span, {
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
            fontFamily: font,
            fontSize: `${fontSize}px`,
            color: color,
            lineHeight: 1.5,
            opacity: alpha,
            fontWeight: 400,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        })
        item.appendChild(span)
        return item;
    }

    render() {
        const {width, height} = this.watermark
        const {clientWidth, clientHeight} = document.documentElement || document.body
        const column = Math.ceil(clientWidth / width)
        const rows = Math.ceil(clientHeight / height)
        const wrap = document.createElement('div');
        bindCSS(wrap, {
            display: 'flex',
            flexWrap: 'wrap',
            width: `${width * column}px`,
            height: `${height * rows}px`
        })
        for (let i = 0; i < column * rows; i++) {
            wrap.appendChild(this._createItem());
        }
        return wrap;
    }
}