export default class SvgWay {
    constructor(watermark) {
        this.watermark = watermark
    }

    render() {
        const {txt, width, height, xSpace, ySpace, font, fontSize, alpha, angle} = this.watermark
        const svgStr =
            `<svg xmlns="http://www.w3.org/2000/svg" width="${(width + xSpace)}" height="${(height + ySpace)}">
                <text x="50%" y="0" dy="12px"
                    text-anchor="middle"
                    stroke="#000000"
                    stroke-width="1"
                    stroke-opacity="${alpha}"
                    fill="none"
                    transform="rotate(${angle}, 0 0)"
                    style="font-size: ${fontSize};font-weight: ${font}">
                    ${txt}
                </text>
            </svg>`;
        return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
    }
}