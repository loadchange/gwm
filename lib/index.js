import Watermark from './watermark'
import CanvasWay from './core/canvas'
import ElementWay from './core/element'
import SvgWay from './core/svg.js'


function getGwm() {
    const gwmDiv = document.createElement('div');
    const gwmStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '178px',
        height: '120px',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat'
    }
    for (let key in gwmStyle) {
        gwmDiv.style[key] = gwmStyle[key]
    }
    return gwmDiv
}


const w = new Watermark({
    width: 178,
    height: 120,
    txt: '20180727 内部资料 请勿外传', angle: -15,
    x: 10, y: 60,
    color: '#ff0000'
})
//
const img = new CanvasWay(w).render()
const gwm1 = getGwm()
gwm1.style.backgroundImage = `url("${img}")`
document.body.appendChild(gwm1)

// success
w.color = '#2196f3'
w.txt = '20180727 内部资料 请勿'
const img2 = new SvgWay(w).render()
const gwm2 = getGwm()
gwm2.style.backgroundImage = `url("${img2}")`
document.body.appendChild(gwm2)


w.color = '#000'
w.txt = '20180727 内部资料'
const elementWay = new ElementWay(w)
const gwm3 = getGwm()
gwm3.appendChild(elementWay.render())
document.body.appendChild(gwm3)