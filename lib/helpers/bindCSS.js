function setStyle(elem, key, value) {
    elem.style[key] = value
}

export default (elem, css) => Object.keys(css).forEach(key => setStyle(elem, key, css[key]))