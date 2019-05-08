# gwm.js

[![](https://img.shields.io/npm/v/gwm.svg)](https://www.npmjs.com/package/gwm)
[![](https://img.shields.io/npm/dm/gwm.svg)](https://www.npmjs.com/package/gwm)

> Generate Watermark

用于内部系统生成水印，可提示信息安全与责任追踪。安全问题不容忽视，对于内部人员敏感操作有一定的提示作用。

### 特性
+ 支持生成 canvas、svg、element 三种类型水印
+ 支持元素监控，防止篡改
+ 可扩展性强

### 截图
<p align="center"><img src="https://raw.githubusercontent.com/loadchange/gwm/master/images/demo.png" width="700"></p>

## 示例
点击这里查看效果→：[Demo示例](https://loadchange.github.io/gwm/index.html)


## 使用说明
**1、引入 JS 文件**
```javascript
<script src="../js/gwm.js"></script>
```
或者使用 npm 安装
```
npm install gwm
```

**2、构建水印**
```
gwm.creation()
```

## 参数
<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>默认值</th>
            <th>说明</th>
        </tr>                           
    </thead>
    <tbody>
        <tr>
            <td>txt</td>
            <td>date 内部资料 请勿外传</td>
            <td>水印文字内容</td>
        </tr>
        <tr>
            <td>width</td>
            <td>158</td>
            <td>水印画布宽度</td>
        </tr>
        <tr>
            <td>height</td>
            <td>100</td>
            <td>水印画布高度</td>
        </tr>
        <tr>
            <td>x</td>
            <td>0</td>
            <td>水印坐标x</td>
        </tr>
        <tr>
            <td>y</td>
            <td>50</td>
            <td>水印坐标y</td>
        </tr>
        <tr>
            <td>font</td>
            <td>'microsoft yahe'</td>
            <td>设置水印字体</td>
        </tr>
        <tr>
            <td>fontSize</td>
            <td>12</td>
            <td>水印字体大小</td>
        </tr>
        <tr>
            <td>color</td>
            <td>#000</td>
            <td>水印字体颜色</td>
        </tr>
        <tr>
            <td>alpha</td>
            <td>0.1</td>
            <td>水印字体透明度</td>
        </tr>
        <tr>
            <td>angle</td>
            <td>-15</td>
            <td>水印文字倾斜角度</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>canvas</td>
            <td>可选参数[canvas, svg, element]</td>
        </tr>
        <tr>
            <td>watch</td>
            <td>true</td>
            <td>监控水印元素是否被篡改<br>篡改后触发重绘</td>
        </tr>
        <tr>
            <td>css</td>
            <td>null</td>
            <td>设置水印元素样式</td>
        </tr>
        <tr>
            <td>destroy</td>
            <td>true</td>
            <td>值为 `true` 时，不能重复调用 `creation`</td>
        </tr>
        <tr>
            <td>container</td>
            <td>body</td>
            <td>传入一个包裹容器，可以是一个`string`类型的选择器，也可以是一个DOM对象，默认为body</td>
        </tr>
    </tbody>
</table>


## 方法
| 方法            | 说明  |
| :--------       | :----  |
| gwm.creation | 创建水印。 |
| gwm.observing | 手动开启观察者，当水印元素被篡改视，重新渲染水印元素。 |
| gwm.cancel | 取消观察者，水印可以被隐藏或删除。 |


## 开发环境使用方法
**1、安装**
```
npm install
```

**2、在本地运行项目**
```
npm run dev
```
打开 index.html 预览效果

**3、build 命令**
```
npm run build
```
