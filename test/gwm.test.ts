import { GenerateWatermark } from '../src/gwm';
import { WatermarkType, Options } from '../src/types';
import '@jest/globals';

// 扩展Element类型以包含style属性
declare global {
  interface Element {
    style: CSSStyleDeclaration;
  }
}

describe('GenerateWatermark', () => {
  let gwm: GenerateWatermark;
  let originalAppendChild: any;
  let originalInsertBefore: any;

  beforeEach(() => {
    gwm = new GenerateWatermark();
    
    // 保存原始方法
    originalAppendChild = Element.prototype.appendChild;
    originalInsertBefore = Element.prototype.insertBefore;
    
    // 清除DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // 恢复原始方法
    Element.prototype.appendChild = originalAppendChild;
    Element.prototype.insertBefore = originalInsertBefore;
    
    // 取消观察者
    gwm.cancel();
  });

  it('should be instantiable', () => {
    expect(gwm).toBeInstanceOf(GenerateWatermark);
  });

  it('should create watermark with default options', () => {
    gwm.creation();
    
    // 验证DOM中是否存在水印元素
    const watermarkElement = document.querySelector('.gwm');
    expect(watermarkElement).not.toBeNull();
  });

  it('should create watermark with custom text', () => {
    const customText = 'Custom Watermark';
    gwm.creation({ txt: customText });
    
    // 验证水印选项是否正确设置
    expect(gwm.opts?.txt).toBe(customText);
  });

  it('should create watermark with canvas mode', () => {
    gwm.creation({ mode: WatermarkType.CANVAS, txt: 'Canvas Watermark' });
    
    // 验证水印模式是否正确设置
    expect(gwm.opts?.mode).toBe(WatermarkType.CANVAS);
    
    // 验证DOM中是否存在水印元素
    const watermarkElement = document.querySelector('.gwm');
    expect(watermarkElement).not.toBeNull();
    
    // 验证背景样式是否设置
    expect(watermarkElement?.style.background).toContain('url');
  });

  it('should create watermark with svg mode', () => {
    gwm.creation({ mode: WatermarkType.SVG, txt: 'SVG Watermark' });
    
    // 验证水印模式是否正确设置
    expect(gwm.opts?.mode).toBe(WatermarkType.SVG);
    
    // 验证DOM中是否存在水印元素
    const watermarkElement = document.querySelector('.gwm');
    expect(watermarkElement).not.toBeNull();
    
    // 验证背景样式是否设置
    expect(watermarkElement?.style.background).toContain('url');
  });

  it('should create watermark with element mode', () => {
    gwm.creation({ mode: WatermarkType.ELEMENT, txt: 'Element Watermark' });
    
    // 验证水印模式是否正确设置
    expect(gwm.opts?.mode).toBe(WatermarkType.ELEMENT);
    
    // 验证DOM中是否存在水印元素
    const watermarkElement = document.querySelector('.gwm');
    expect(watermarkElement).not.toBeNull();
    
    // 验证是否有子元素
    expect(watermarkElement?.childElementCount).toBeGreaterThan(0);
  });

  it('should create watermark in custom container', () => {
    // 创建自定义容器
    const container = document.createElement('div');
    container.id = 'custom-container';
    document.body.appendChild(container);
    gwm.creation({ container: '#custom-container', txt: 'Container Test' });
    
    // 验证水印是否在自定义容器中
    const watermarkElement = container.querySelector('.gwm');
    expect(watermarkElement).not.toBeNull();
  });

  it('should observe watermark when watch is true', () => {
    // 模拟MutationObserver
    const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe');
    gwm.creation({ watch: true, txt: 'Watch Test' });
    
    // 验证观察者是否被调用
    expect(observeSpy).toHaveBeenCalled();
    
    observeSpy.mockRestore();
  });

  it('should not observe watermark when watch is false', () => {
    // 模拟MutationObserver
    const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe');
    gwm.creation({ watch: false, txt: 'No Watch Test' });
    
    // 验证观察者是否未被调用
    expect(observeSpy).not.toHaveBeenCalled();
    
    observeSpy.mockRestore();
  });

  it('should cancel observation', () => {
    // 模拟MutationObserver
    const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');
    
    gwm.creation();
    gwm.cancel();
    
    // 验证disconnect是否被调用
    expect(disconnectSpy).toHaveBeenCalled();
    
    disconnectSpy.mockRestore();
  });
});
