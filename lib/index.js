import Watermark from './watermark'
import CanvasWay from './core/canvas'
import ElementWay from './core/element'
import SvgWay from './core/svg.js'


const gwmDiv = document.createElement('div');
const gwmStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '158px',
    height: '100px',
    overflow: 'hidden',
    // backgroundImage: `url("${img}")`,
    backgroundRepeat: 'no-repeat'
}
for (let key in gwmStyle) {
    gwmDiv.style[key] = gwmStyle[key]
}

const w = new Watermark({txt: '20180727 内部资料'})
// const img = new CanvasWay(w).render()
const img = new SvgWay(w).render()
gwmDiv.style.backgroundImage = `url("${img}")`
document.body.appendChild(gwmDiv)


// const elementWay = new ElementWay(w)
// gwmDiv.appendChild(elementWay.render())
// document.body.appendChild(gwmDiv)