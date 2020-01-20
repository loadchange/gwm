class Watermark {
  public txt: string;
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public font: string;
  public fontSize: number;
  public color: string;
  public alpha: number;
  public angle: number;

  constructor({
    txt = `${new Date().toLocaleDateString()} Top secret`,
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
