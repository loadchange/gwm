# gwm.js

[![](https://img.shields.io/npm/v/gwm.svg)](https://www.npmjs.com/package/gwm)
[![](https://img.shields.io/npm/dm/gwm.svg)](https://www.npmjs.com/package/gwm)

> Generate Watermark

It can be used to generate watermarking in internal system, which can prompt information security and responsibility tracking. Safety issues can not be ignored, which has a certain role in prompting the sensitive operation of internal personnel.

### Characteristic
+ Support the generation of three types of watermarking: canvas, SVG and element
+ Supporting element monitoring to prevent tampering
+ Extensibility

## Example
Click here to see the effect →：[Demo](https://loadchange.github.io/gwm/index.html)


## Instructions
**1、Introducing JS files**
```javascript
<script src="../js/gwm.js"></script>
```
Or install with NPM
```
npm install gwm
```

**2、Building watermark**
```
gwm.creation()
```

## Parameter
<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Default value</th>
            <th>Explain</th>
        </tr>                           
    </thead>
    <tbody>
        <tr>
            <td>txt</td>
            <td>date 内部资料 请勿外传</td>
            <td>Watermarking text content</td>
        </tr>
        <tr>
            <td>width</td>
            <td>158</td>
            <td>Watermark Canvas Width</td>
        </tr>
        <tr>
            <td>height</td>
            <td>100</td>
            <td>Watermark canvas height</td>
        </tr>
        <tr>
            <td>x</td>
            <td>0</td>
            <td>Watermarking coordinate X</td>
        </tr>
        <tr>
            <td>y</td>
            <td>50</td>
            <td>Watermarking coordinate y</td>
        </tr>
        <tr>
            <td>font</td>
            <td>'microsoft yahe'</td>
            <td>Setting Watermark Font</td>
        </tr>
        <tr>
            <td>fontSize</td>
            <td>12</td>
            <td>Watermark font size</td>
        </tr>
        <tr>
            <td>color</td>
            <td>#000</td>
            <td>Watermark font color</td>
        </tr>
        <tr>
            <td>alpha</td>
            <td>0.1</td>
            <td>Watermark font transparency</td>
        </tr>
        <tr>
            <td>angle</td>
            <td>-15</td>
            <td>Watermarking Text Tilt Angle</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>canvas</td>
            <td>Optional parameters[canvas, svg, element]</td>
        </tr>
        <tr>
            <td>watch</td>
            <td>true</td>
            <td>Monitoring whether watermarking elements have been tampered with<br>Tampering triggers redrawing</td>
        </tr>
        <tr>
            <td>css</td>
            <td>null</td>
            <td>Setting Watermark Element Styles</td>
        </tr>
        <tr>
            <td>destroy</td>
            <td>false</td>
            <td>If `true`, prevents multiple calls to `creation` to protect against tampering</td>
        </tr>
        <tr>
            <td>container</td>
            <td>body</td>
            <td>Pass in a package container, which can be a `string` Type selector, or a DOM object, defaults to body</td>
        </tr>
        <tr>
            <td>count</td>
            <td>null</td>
            <td>Optional parameter, used to directly set the number of watermarks generated</td>
        </tr>
    </tbody>
</table>

## Custom Font Example
To use a custom font, you can specify the desired font through the `font` parameter when creating the watermark. For example, to change the font to `Arial`, you can do it like this:

```javascript
gwm.creation({
  font: 'Arial'
})
```

## Method
| Method            | Explain  |
| :--------       | :----  |
| gwm.creation | Create a watermarking. |
| gwm.observing | Manually open the observer, when the watermarking element is tampered with, re-render the watermarking element. |
| gwm.cancel | Cancel the observer, the watermark can be hidden or deleted. |

## Development Guide

### Requirements
- Node.js >= 20.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/loadchange/gwm.git
cd gwm

# Install dependencies
npm install
```

### Development
```bash
# Start development server with hot reload
npm run dev
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Building
```bash
# Build for production (includes type declarations)
npm run build
```
构建将使用 [Vite](https://vitejs.dev/) 完成，产物和类型声明均输出到 dist 目录。

### Documentation
```bash
# Generate documentation
npm run deploy-docs
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
