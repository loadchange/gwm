export default class SvgWay {
    constructor(watermark) {
        this.watermark = watermark
    }

    render() {
        const {txt, x, y, width, height, color, xSpace, ySpace, font, fontSize, alpha, angle} = this.watermark
        const svgStr =
            `<svg xmlns="http://www.w3.org/2000/svg" width="${(width + xSpace)}px" height="${(height + ySpace)}px">
                <text x="${x}px" y="${y}px" dy="12px"
                    text-anchor="start"
                    stroke="${color}"
                    stroke-width="1"
                    stroke-opacity="${alpha}"
                    fill="none"
                    transform="rotate(${angle}, ${x} ${y})"
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