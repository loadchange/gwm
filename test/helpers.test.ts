import bindCSS, { assignStyle, isSupport } from '../src/helpers/bindCSS';
import creator, { observer, disconnect } from '../src/helpers/creator';
import { GenerateWatermark } from '../src/gwm';
import '@jest/globals';

// 测试bindCSS.ts中的函数
describe('bindCSS', () => {
  it('should bind CSS to an element', () => {
    const element = document.createElement('div');
    const css = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '999',
      pointerEvents: 'none',
    } as CSSStyleDeclaration;
    
    bindCSS(element, css);
    
    // 验证样式是否被正确设置
    expect(element.style.position).toBe('absolute');
    expect(element.style.top).toBeTruthy();
    expect(element.style.left).toBeTruthy();
    expect(element.style.width).toBe('100%');
    expect(element.style.height).toBe('100%');
    expect(element.style.zIndex).toBe('999');
    expect(element.style.pointerEvents).toBe('none');
  });
  
  it('should assign styles correctly', () => {
    const defaultStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
    } as CSSStyleDeclaration;
    
    const customStyle = {
      position: 'absolute',
      bottom: '0',
      right: '0',
    } as CSSStyleDeclaration;
    
    const result = assignStyle(defaultStyle, customStyle);
    
    // 验证样式是否被正确合并
    expect(result.position).toBe('absolute'); // 自定义样式覆盖默认样式
    expect(result.top).toBe('0'); // 默认样式保留
    expect(result.left).toBe('0'); // 默认样式保留
    expect(result.bottom).toBe('0'); // 自定义样式添加
    expect(result.right).toBe('0'); // 自定义样式添加
  });
  
  it('should handle undefined customStyle', () => {
    const defaultStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
    } as CSSStyleDeclaration;
    
    const result = assignStyle(defaultStyle, undefined);
    
    // 验证返回的是默认样式
    expect(result).toBe(defaultStyle);
  });

  it('should handle empty style in bindCSS', () => {
    const element = document.createElement('div');
    // 使用空对象而不是undefined
    const emptyStyle = {} as CSSStyleDeclaration;
    // 不抛异常即可
    expect(() => bindCSS(element, emptyStyle)).not.toThrow();
  });
  
  it('should check if a CSS property is supported', () => {
    // 在JSDOM环境中，CSS可能不存在，所以我们需要模拟它
    if (typeof CSS === 'undefined') {
      // 如果CSS不存在，我们需要全局定义它
      (globalThis as any).CSS = {
        supports: jest.fn().mockReturnValue(true)
      };
    } else {
      // 如果CSS存在，我们需要模拟它的supports方法
      jest.spyOn(CSS, 'supports').mockReturnValue(true);
    }
    
    // 测试支持的属性
    expect(isSupport('pointerEvents')).toBe(true);
    
    // 清理模拟
    jest.restoreAllMocks();
    if (typeof CSS !== 'undefined' && !(CSS.supports as any).mockRestore) {
      delete (globalThis as any).CSS;
    }
  });
});

// 测试creator.ts中的函数
describe('creator', () => {
  it('should create a watermark element', () => {
    const gwm = new GenerateWatermark();
    gwm.creation({ txt: 'Test' });
    
    const element = creator(gwm);
    
    // 验证元素是否被创建
    expect(element).toBeInstanceOf(HTMLDivElement);
    
    // 验证元素是否有正确的样式
    expect(element.style.pointerEvents).toBe('none');
    expect(element.style.zIndex).toBe('999999');
  });

  it('should handle existing gwmDom', () => {
    const gwm = new GenerateWatermark();
    gwm.creation({ txt: 'Test' });
    
    // 模拟已存在的gwmDom
    const existingDom = document.createElement('div');
    const removeSpy = jest.spyOn(existingDom, 'remove');
    gwm.gwmDom = existingDom;
    
    creator(gwm);
    
    // 验证remove方法是否被调用
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should create observer with MutationObserver', () => {
    // 模拟MutationObserver
    const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe');
    
    const target = document.createElement('div');
    const container = document.createElement('div');
    const callback = jest.fn();
    
    observer(target, container, callback);
    
    // 验证observe方法是否被调用
    expect(observeSpy).toHaveBeenCalledTimes(2);
    
    // 恢复原始方法
    observeSpy.mockRestore();
  });

  it('should handle observer creation', () => {
    // 直接测试observer函数的正常路径
    const target = document.createElement('div');
    const container = document.createElement('div');
    const callback = jest.fn();
    
    // 调用observer函数
    const result = observer(target, container, callback);
    
    // 验证返回的对象具有预期的结构
    expect(result).toHaveProperty('containerObserver');
    expect(result).toHaveProperty('targetObserver');
    expect(typeof result.containerObserver.disconnect).toBe('function');
    expect(typeof result.targetObserver.disconnect).toBe('function');
  });

  it('should disconnect fallback observer', () => {
    // 构造一个 fallback observer
    const fakeDisconnect = jest.fn();
    const fallbackObserver = {
      containerObserver: { disconnect: fakeDisconnect },
      targetObserver: { disconnect: fakeDisconnect }
    };
    disconnect(fallbackObserver);
    expect(fakeDisconnect).toHaveBeenCalledTimes(2);
  });
});