export default class Watermark {
    constructor({
                    txt = '',
                    x = 22,
                    y = 0,
                    xSpace = 20,
                    ySpace = 20,
                    font = 'microsoft yahe',
                    color = '#000',
                    fontSize = 12,
                    alpha = 0.1,
                    width = 150,
                    height = 100,
                    angle = -15
                }) {
        this.txt = txt
        this.x = x
        this.y = y
        this.xSpace = xSpace // x轴间隔
        this.ySpace = ySpace // y轴间隔
        this.font = font
        this.color = color
        this.fontSize = fontSize // 字体大小
        this.alpha = alpha // 透明度
        this.width = width
        this.height = height
        this.angle = angle
    }
}