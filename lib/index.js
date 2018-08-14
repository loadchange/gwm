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
        this.opts = opts
        this.cancel()
        const {mode, watch} = opts
        this.gwmDom = creator(this)
        const wm = new Watermark(opts)
        const impl = wayFactory(mode, wm)
        let result = impl.render()
        if (mode === ELEMENT) {
            this.gwmDom.appendChild(result)
        } else {
            this.gwmDom.style.background = `url("${result}")`
        }
        const first = document.body.firstChild;
        if (first) {
            document.body.insertBefore(this.gwmDom, first);
        } else {
            document.body.appendChild(this.gwmDom)
        }
        if (watch !== false) {
            this.observer = this.observing()
        }
    }

    observing() {
        return observer(this.gwmDom, () => this.creation(this.opts))
    }

    cancel() {
        if (!this.observer) return
        disconnect(this.observer.bodyObserver)
        disconnect(this.observer.observer)
    }
}

export default new GenerateWatermark()
