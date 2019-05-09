export const isSupport = (attribute: string): boolean => attribute in document.documentElement.style;

export default (elem: HTMLElement, css: object): Element => {
  Object.keys(css).forEach((key: string) => {
    elem.style[key] = css[key];
  });
  return elem;
};
