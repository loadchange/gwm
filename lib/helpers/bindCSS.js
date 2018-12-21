const setStyle = (elem, key, value) => {
    elem.style[key] = value
}

export const isSupport = attribute => attribute in document.documentElement.style

export default (elem, css) => Object.keys(css).forEach(key => setStyle(elem, key, css[key]))
