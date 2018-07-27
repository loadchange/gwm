export default class CanvasWay {
    constructor(watermark) {
        this.watermark = watermark
        let {width, height, xSpace, ySpace} = watermark
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', width + xSpace);
        this.canvas.setAttribute('height', height + ySpace);
    }

    render() {
        let {txt, x, y, xSpace, ySpace, font, color, fontSize, alpha, angle} = this.watermark
        let ctx = this.canvas.getContext('2d');
        ctx.textAlign = this.watermark.txt;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.font = `${fontSize}px ${font}`
        ctx.rotate(Math.PI / 180 * angle);
        ctx.fillText(txt, x + xSpace / 2, y + ySpace / 2 + fontSize);


        return this.canvas.toDataURL();
    }
}