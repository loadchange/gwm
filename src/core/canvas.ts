import Watermark from '../watermark';

class CanvasWay {
  private readonly watermark: Watermark;
  private canvas: HTMLCanvasElement;

  constructor(watermark: Watermark) {
    this.watermark = watermark;
    const { width, height } = watermark;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', `${ width }`);
    this.canvas.setAttribute('height', `${ height }`);
  }

  public render(): string {
    const { txt, x, y, width, height, font, color, fontSize, alpha, angle } = this.watermark;
    const ctx = this.canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('getContext error');
    }
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.font = `${ fontSize }px ${ font }`;
    ctx.translate(x, y);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.translate(-x, -y - fontSize);
    ctx.fillText(txt, x, y + fontSize);
    return this.canvas.toDataURL();
  }
}

export default CanvasWay;
