import dateConvert from './helpers/dateConvert';

class Watermark {
  txt: string;
  width: number;
  height: number;
  x: number;
  y: number;
  font: string;
  fontSize: number;
  color: string;
  alpha: number;
  angle: number;

  constructor({
    txt = `${dateConvert()} Top secret`,
    x = 0,
    y = 50,
    font = 'microsoft yahe',
    color = '#000',
    fontSize = 12,
    alpha = 0.1,
    width = 158,
    height = 100,
    angle = -15,
  }) {
    this.txt = txt;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.font = font;
    this.fontSize = fontSize;
    this.color = color;
    this.alpha = alpha;
    this.angle = angle;
  }
}

export default Watermark;
