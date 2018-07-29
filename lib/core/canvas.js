export default class CanvasWay {
    constructor(watermark) {
        this.watermark = watermark
        let {width, height, xSpace, ySpace} = watermark
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', width + xSpace);
        this.canvas.setAttribute('height', height + ySpace);
    }

    render() {
        let {txt, x, y, width, height, xSpace, ySpace, font, color, fontSize, alpha, angle} = this.watermark
        let ctx = this.canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left'
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.font = `${fontSize}px ${font}`
        ctx.rotate(Math.PI / 180 * angle);
        ctx.translate(-15, ySpace / 2 + y /2 );
        ctx.fillText(txt, xSpace / 2 + x, ySpace / 2 + y);
        return this.canvas.toDataURL();
    }
}