import bindCSS from '../helpers/bindCSS'

export default class ElementWay {
    constructor(watermark) {
        this.watermark = watermark
    }

    _createItem() {
        let {txt, x, y, font, color, fontSize, alpha, angle, width, height, xSpace, ySpace} = this.watermark
        const item = document.createElement('div');
        bindCSS(item, {
            position: 'relative',
            width, height,
            flex: `0 0 ${width}px`,
            margin: `${xSpace / 2}px ${ySpace / 2}px`,
            overflow: 'hidden'
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
            opacity: alpha,
            transform: `rotate(${angle}deg)`,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        })
        item.appendChild(span)
        return item;
    }

    render() {
        const {width, height, xSpace, ySpace} = this.watermark
        const {clientWidth, clientHeight} = document.documentElement || document.body
        const column = Math.ceil(clientWidth / (width + xSpace))
        const rows = Math.ceil(clientHeight / (height + ySpace))
        const wrap = document.createElement('div');
        bindCSS(wrap, {
            display: 'flex',
            flexWrap: 'wrap',
            width: `${(width + xSpace) * column}px`,
            height: `${(height + ySpace) * rows}px`
        })
        for (let i = 0; i < column * rows; i++) {
            wrap.appendChild(this._createItem());
        }
        return wrap;
    }
}