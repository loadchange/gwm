export const isSupport = (attribute: string): boolean => attribute in document.documentElement.style;

export default (elem: HTMLElement, css: object, priority?: string | null): Element => {
  Object.keys(css).forEach((key: string) => {
    if (priority === 'normal') {
      elem.style[key] = css[key];
      return;
    }
    if (elem.style.setProperty) {
      elem.style.setProperty(key, css[key], 'important');
    } else if (elem.setAttribute) {
      const styleText = elem.getAttribute('style');
      let text = '';
      if (styleText !== null) {
        text = `${text} ${key}: ${css[key]}!important`;
      }
      elem.setAttribute('style', text);
    } else {
      elem.style[key] = css[key];
    }
  });
  return elem;
};
