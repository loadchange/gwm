import Watermark from './watermark';
import { CanvasWay, ElementWay, SvgWay } from './core';
import creator, { observer, disconnect } from './helpers/creator';
import bindCSS, { assignStyle } from './helpers/bindCSS';
import { DEFAULT_STYLE } from './constant';
import { Options, GwmObserver, GwmObserverEvent, WatermarkType } from './types';

export const wayFactory = (mode: WatermarkType, wm: Watermark) => {
  switch (mode) {
    case WatermarkType.CANVAS:
      return new CanvasWay(wm);
    case WatermarkType.SVG:
      return new SvgWay(wm);
    default:
      return new ElementWay(wm);
  }
};

export const getElement = (container: HTMLElement | string): HTMLElement => {
  if (typeof container === 'string') {
    const dom = document.querySelector<HTMLElement>(container);
    if (dom) {
      return dom;
    }
    return document.body;
  }
  return container;
};

export class GenerateWatermark {
  opts?: Options;
  wrap?: HTMLElement;
  gwmDom?: HTMLElement;
  observer?: GwmObserver | GwmObserverEvent;

  creation(opts: Options = {
    txt: `${new Date().toLocaleDateString()} Top secret`,
  }) {
    this.opts = opts;
    this.opts.css = assignStyle(DEFAULT_STYLE, opts.css);
    this.cancel();
    const { mode, watch, container = document.body } = opts;
    this.wrap = getElement(container);
    if (this.wrap !== document.body) {
      this.opts.css.position = 'absolute';
      bindCSS(this.wrap, Object.create({ position: 'relative' }) as CSSStyleDeclaration);
    }
    this.gwmDom = creator(this);
    const wm = new Watermark(opts);
    const impl = wayFactory(mode || WatermarkType.SVG, wm);
    const result = impl.render();
    if (mode === WatermarkType.ELEMENT) {
      this.gwmDom.appendChild(result as HTMLDivElement);
    } else {
      this.gwmDom.style.background = `url("${ result }")`;
    }
    const first = this.wrap.firstChild;
    if (first) {
      this.wrap.insertBefore(this.gwmDom, first);
    } else {
      this.wrap.appendChild(this.gwmDom);
    }
    if (typeof watch === 'boolean' && !watch) {
      this.observer = this.observing();
    }
    if (opts.destroy) {
      this.creation = f => f;
    }
  }

  public observing() {
    return observer(this.gwmDom!, this.wrap!, () => this.creation(this.opts!));
  }

  public cancel(): void {
    if (this.observer) {
      disconnect(this.observer);
    }
  }
}

