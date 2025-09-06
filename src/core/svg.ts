import Watermark from '../watermark';

class SvgWay {
  private readonly watermark: Watermark;

  constructor(watermark: Watermark) {
    this.watermark = watermark;
  }

  public render(): string {
    const { txt, width, height, color, font, fontSize, alpha, angle } = this.watermark;
    const centerX = width / 2;
    const centerY = height / 2;
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
                <text x="${centerX}px" y="${centerY}px"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    stroke="${color}"
                    stroke-opacity="${alpha}"
                    fill="none"
                    transform="rotate(${angle},${centerX} ${centerY})"
                    font-weight="100"
                    font-size="${fontSize}"
                    font-family="${font}"
                    >
                    ${txt}
                </text>
            </svg>`;
    return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
  }
}

export default SvgWay;
