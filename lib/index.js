import Watermark from './watermark'
import CanvasWay from './core/canvas'
import ElementWay from './core/element'
import SvgWay from './core/svg'
import creator, {observer, disconnect} from './helpers/creator'

const CANVAS = 'canvas'
const SVG = 'svg'
const ELEMENT = 'element'

const wayFactory = (mode, wm) => {
    let impl = null
    const way = [CANVAS, SVG, ELEMENT]
    if (mode) {
        mode = mode.toLowerCase()
        mode = way.indexOf(mode) >= 0 ? mode : ''
    }
    if (!mode) {
        mode = 'svg'
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

class GenerateWatermark {

    creation(opts = {}) {
        if (!opts.css) {
            opts.css = {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: -10,
                backgroundRepeat: 'no-repeat'
            }
        }
        this.opts = opts
        this.cancel()
        const {mode, watch, container = document.body} = opts
        this.gwmDom = creator(this)
        const wm = new Watermark(opts)
        const impl = wayFactory(mode, wm)
        const result = impl.render()
        if (mode === ELEMENT) {
            this.gwmDom.appendChild(result)
        } else {
            this.gwmDom.style.background = `url("${result}")`
        }
        const first = container.firstChild;
        if (first) {
            container.insertBefore(this.gwmDom, first);
        } else {
            container.appendChild(this.gwmDom)
        }
        if (watch !== false) {
            this.observer = this.observing()
        }
    }

    observing() {
        const {container = document.body} = this.opts
        return observer(this.gwmDom, container, () => this.creation(this.opts))
    }

    cancel() {
        if (this.observer) disconnect(this.observer)
    }
}

export default new GenerateWatermark()
