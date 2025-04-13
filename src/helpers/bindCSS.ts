import { humpToLine } from './util';

export const isSupport = (attribute: string): boolean => attribute in document.documentElement.style;

export const assignStyle = (...args: Array<CSSStyleDeclaration | undefined>): CSSStyleDeclaration => {
  const [ oldStyle, ...newStyles ] = (args.filter(item => item) as CSSStyleDeclaration[]);
  return Object.assign.apply(null, [ oldStyle, ...newStyles ]) as CSSStyleDeclaration;
};

export default (elem: HTMLElement, css: CSSStyleDeclaration, priority?: string | null): HTMLElement => {
  const mergeStyle = assignStyle(elem.style, css);
  for (const key in mergeStyle) {
    if (key === 'position' && elem.style.position) {
      // If position property exists, preserve the original value
      continue;
    }
    if (priority === 'normal') {
      elem.style.setProperty(key, mergeStyle[key]);
      continue;
    }
    if (elem.style.setProperty) {
      elem.style.setProperty(key, css[key], 'important');
      continue;
    }
    const oldStyle = elem.getAttribute('style');
    const newStyle = [ humpToLine(key), `${ css[key] }!important;` ].join(':');
    elem.setAttribute('style', [ oldStyle, newStyle ].join(' ').trim());
  }
  return elem;
};
