import Watermark from '../watermark';
import bindCSS from '../helpers/bindCSS';

class ElementWay {
  private readonly watermark: Watermark;

  constructor(watermark: Watermark) {
    this.watermark = watermark;
  }

  private createItem(): HTMLDivElement {
    const { txt, x, y, font, color, fontSize, alpha, angle, width, height } = this.watermark;
    const item: HTMLDivElement = document.createElement('div');
    bindCSS(item, Object.create({
      position: 'relative',
      width: width + 'px',
      height: height + 'px',
      flex: `0 0 ${ width }px`,
      overflow: 'hidden',
      pointerEvents: 'none',
    }) as CSSStyleDeclaration, 'normal');
    const span = document.createElement('span') as HTMLSpanElement;
    span.innerHTML = txt;
    bindCSS(span, Object.create({
      position: 'absolute',
      top: `${ y }px`,
      left: `${ x }px`,
      fontFamily: font,
      fontSize: `${ fontSize }px`,
      color,
      lineHeight: 1.5,
      opacity: alpha,
      fontWeight: 400,
      transform: `rotate(${ angle }deg)`,
      transformOrigin: '0 0',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }) as CSSStyleDeclaration, 'normal');
    item.appendChild(span);
    return item;
  }

  public render(count?: number): HTMLDivElement {
    let i = 0;
    const { width, height } = this.watermark;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column = Math.ceil(clientWidth / width);
    const rows = Math.ceil(clientHeight / height);
    const total = count || column * rows;
    const wrap = document.createElement('div') as HTMLDivElement;
    bindCSS(wrap, Object.create({
      display: 'flex',
      flexWrap: 'wrap',
      width: `${ width * column }px`,
      height: `${ height * rows }px`,
    }) as CSSStyleDeclaration, 'normal');
    for (; i < total; i++) {
      wrap.appendChild(this.createItem());
    }
    return wrap;
  }
}

export default ElementWay;
