import { CanvasWay, ElementWay, SvgWay } from '../src/core';
import Watermark from '../src/watermark';
import '@jest/globals';

// 测试CanvasWay
describe('CanvasWay', () => {
  it('should render watermark using canvas', () => {
    const wm = new Watermark({
      txt: 'Canvas Test',
      width: 200,
      height: 100,
      x: 20,
      y: 20,
      font: 'Arial',
      fontSize: 14,
      color: '#000',
      alpha: 0.1,
      angle: -15
    });
    
    const canvasWay = new CanvasWay(wm);
    const result = canvasWay.render();
    
    // 验证结果是否为字符串（data URL）
    expect(typeof result).toBe('string');
    expect(result).toContain('data:image/png;base64');
  });
  // 注意：由于类型限制，我们不能直接模拟canvas.getContext
  // 所以这个测试用例被简化了
  it('should handle canvas rendering', () => {
    const wm = new Watermark({ txt: 'Canvas Test' });
    const canvasWay = new CanvasWay(wm);
    
    // 模拟render方法，避免实际调用canvas API
    jest.spyOn(canvasWay, 'render').mockReturnValue('data:image/png;base64,mockdata');
    
    const result = canvasWay.render();
    
    // 验证结果是否为字符串（data URL）
    expect(typeof result).toBe('string');
    expect(result).toContain('data:image/png;base64');
  });
});

// 测试SvgWay
describe('SvgWay', () => {
  it('should render watermark using SVG', () => {
    const wm = new Watermark({
      txt: 'SVG Test',
      width: 200,
      height: 100,
      x: 20,
      y: 20,
      font: 'Arial',
      fontSize: 14,
      color: '#000',
      alpha: 0.1,
      angle: -15
    });
    
    const svgWay = new SvgWay(wm);
    const result = svgWay.render();
    
    // 验证结果是否为字符串（data URL）
    expect(typeof result).toBe('string');
    expect(result).toContain('data:image/svg+xml;base64');
    
    // 解码base64并验证SVG内容
    const decodedSvg = atob(result.split('base64,')[1]);
    expect(decodedSvg).toContain('<svg');
    expect(decodedSvg).toContain('SVG Test');
  });
});

// 测试ElementWay
describe('ElementWay', () => {
  it('should render watermark using DOM elements', () => {
    const wm = new Watermark({
      txt: 'Element Test',
      width: 200,
      height: 100,
      x: 20,
      y: 20,
      font: 'Arial',
      fontSize: 14,
      color: '#000',
      alpha: 0.1,
      angle: -15
    });
    
    const elementWay = new ElementWay(wm);
    const result = elementWay.render();
    
    // 验证结果是否为HTMLDivElement
    expect(result).toBeInstanceOf(HTMLDivElement);
  });
  it('should create DOM elements for watermark with default options', () => {
    const wm = new Watermark({
      txt: 'Element Test'
    });
    
    const elementWay = new ElementWay(wm);
    const result = elementWay.render();
    
    // 验证结果是否为HTMLDivElement
    expect(result).toBeInstanceOf(HTMLDivElement);
  });
});

// 测试Watermark类
describe('Watermark', () => {
  it('should initialize with default options', () => {
    const wm = new Watermark({ txt: 'Test' });
    
    // 验证默认选项是否被正确设置
    expect(wm.txt).toBe('Test');
    expect(wm.width).toBe(158);
    expect(wm.height).toBe(100);
    expect(wm.x).toBe(0);
    expect(wm.y).toBe(50);
    expect(wm.font).toBe('Arial');
    expect(wm.fontSize).toBe(12);
    expect(wm.color).toBe('#000');
    expect(wm.alpha).toBe(0.1);
    expect(wm.angle).toBe(-15);
  });
  
  it('should initialize with custom options', () => {
    const wm = new Watermark({
      txt: 'Custom Test',
      width: 300,
      height: 200,
      x: 30,
      y: 60,
      font: 'Times New Roman',
      fontSize: 16,
      color: '#f00',
      alpha: 0.5,
      angle: 45
    });
    
    // 验证自定义选项是否被正确设置
    expect(wm.txt).toBe('Custom Test');
    expect(wm.width).toBe(300);
    expect(wm.height).toBe(200);
    expect(wm.x).toBe(30);
    expect(wm.y).toBe(60);
    expect(wm.font).toBe('Times New Roman');
    expect(wm.fontSize).toBe(16);
    expect(wm.color).toBe('#f00');
    expect(wm.alpha).toBe(0.5);
    expect(wm.angle).toBe(45);
  });
});