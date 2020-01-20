import Watermark from '../watermark';
import bindCSS from '../helpers/bindCSS';

class ElementWay {
  private readonly watermark: Watermark;

  constructor(watermark: Watermark) {
    this.watermark = watermark;
  }

  private _createItem(): HTMLDivElement {
    const { txt, x, y, font, color, fontSize, alpha, angle, width, height } = this.watermark;
    const item: HTMLDivElement = document.createElement('div');
    bindCSS(item, {
      position: 'relative',
      width,
      height,
      flex: `0 0 ${width}px`,
      overflow: 'hidden',
      pointerEvents: 'none',
    }, 'normal');
    const span: HTMLSpanElement = document.createElement('span');
    span.innerHTML = txt;
    bindCSS(span, {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      fontFamily: font,
      fontSize: `${fontSize}px`,
      color,
      lineHeight: 1.5,
      opacity: alpha,
      fontWeight: 400,
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }, 'normal');
    item.appendChild(span);
    return item;
  }

  public render(): HTMLDivElement {
    let i = 0;
    const { width, height } = this.watermark;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column: number = Math.ceil(clientWidth / width);
    const rows: number = Math.ceil(clientHeight / height);
    const wrap: HTMLDivElement = document.createElement('div');
    bindCSS(wrap, {
      display: 'flex',
      flexWrap: 'wrap',
      width: `${width * column}px`,
      height: `${height * rows}px`,
    }, 'normal');
    for (; i < column * rows; i++) {
      wrap.appendChild(this._createItem());
    }
    return wrap;
  }
}

export default ElementWay;
