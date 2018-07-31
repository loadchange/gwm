import Watermark from './watermark'
import CanvasWay from './core/canvas'
import ElementWay from './core/element'
import SvgWay from './core/svg.js'
import creator from './helpers/creator'

(function () {
    const CANVAS = 'canvas'
    const SVG = 'svg'
    const ELEMENT = 'element'

    const creation = opts => {
        const way = [CANVAS, SVG, ELEMENT]
        const gwm = creator()
        const wm = new Watermark(opts)
        let impl = null
        let result = null
        let {mode} = opts
        if (mode) {
            mode = mode.toLowerCase()
            mode = way.indexOf(mode) >= 0 ? mode : ''
        }
        if (!mode) {
            mode = 'canvas'
        }
        switch (mode) {
            case CANVAS:
                impl = new CanvasWay(wm)
                break
            case SVG:
                impl = new SvgWay(wm)
                break
            default:
                impl = new ElementWay(wm)
        }
        result = impl.render()
        if (mode === ELEMENT) {
            gwm.appendChild(result)
        } else {
            gwm.style.background = `url("${result}")`
        }
        document.body.appendChild(gwm)
    }

    window.gwm = creation
})()