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

  private escapeSpecialCharacters(txt: string): string {
    return txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  public render(): string {
    const { width, height, font, color, fontSize, alpha, angle } = this.watermark;
    const txt = this.escapeSpecialCharacters(this.watermark.txt);
    const ctx = this.canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('getContext error');
    }
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.font = `${ fontSize }px ${ font }`;
    // 将旋转中心设置为画布中心，这样可以最大化利用画布空间，避免文字被裁剪
    ctx.translate(width / 2, height / 2);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.fillText(txt, 0, 0);
    return this.canvas.toDataURL();
  }
}

export default CanvasWay;
