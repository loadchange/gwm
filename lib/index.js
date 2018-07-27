import Watermark from './entity.js'
import CanvasWay from './core/canvas.js'
import ElementWay from './core/element.js'
import SvgWay from './core/svg.js'


const gwmDiv = document.createElement('div');
const gwmStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    // backgroundImage: `url("${img}")`
}
for (let key in gwmStyle) {
    gwmDiv.style[key] = gwmStyle[key]
}

const w = new Watermark({txt: '20180727 内部资料 请勿外传'})
// const img = new CanvasWay(w).render()
const img = new SvgWay(w).render()
gwmDiv.style.backgroundImage = `url("${img}")`
document.body.appendChild(gwmDiv)

//
// const htmlw = new Watermark({txt: '20180726 王彦民 E084817', x: 22, y: 0,})
// const elementWay = new ElementWay(htmlw)
// gwmDiv.appendChild(elementWay.render())
// document.body.appendChild(gwmDiv)