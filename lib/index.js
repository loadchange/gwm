import Watermark from './watermark'
import CanvasWay from './core/canvas'
import ElementWay from './core/element'
import SvgWay from './core/svg.js'
import creator, {observer, disconnect} from './helpers/creator'

const CANVAS = 'canvas'
const SVG = 'svg'
const ELEMENT = 'element'

const wayFactory = (mode, wm) => {
    const way = [CANVAS, SVG, ELEMENT]
    let impl = null
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
    return impl
}

(function () {
    const gwm = {num: 1}

    gwm.creation = (opts = {}) => {
        gwm.opts = opts
        let {mode, watch} = opts
        const gwmDom = creator()
        const wm = new Watermark(opts)
        const impl = wayFactory(mode, wm)
        let result = null
        result = impl.render()
        if (mode === ELEMENT) {
            gwmDom.appendChild(result)
        } else {
            gwmDom.style.background = `url("${result}")`
        }
        const first = document.body.firstChild;
        if (first) {
            document.body.insertBefore(gwmDom, first);
        } else {
            document.body.appendChild(gwmDom)
        }
        if (watch !== false) {
            gwm.observer = gwm.observing()
        }
        return gwm
    }

    gwm.observing = () => observer(() => {
        gwm.cancel()
        gwm.creation(gwm.opts)
    })

    gwm.cancel = () => {
        disconnect(gwm.observer.bodyObserver)
        disconnect(gwm.observer.observer)
        gwm.observer.bodyObserver = null
        gwm.observer.observer = null
    }

    window.gwm = gwm
})()