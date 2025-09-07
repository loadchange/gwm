// Jest测试环境设置文件

// 模拟浏览器环境中的全局对象
(globalThis as any).MutationObserver = class {
  callback: (...args: any[]) => void;
  constructor(callback: (...args: any[]) => void) {
    this.callback = callback;
  }
  disconnect() {}
  observe(_element: Element, _options: object) {}
};

// 模拟DOM元素方法
Element.prototype.appendChild = jest.fn().mockImplementation(function(child) {
  return child;
});

Element.prototype.insertBefore = jest.fn().mockImplementation(function(newChild, _refChild) {
  return newChild;
});

// 模拟HTMLCanvasElement和2D context
class MockCanvasRenderingContext2D {
  clearRect = jest.fn();
  fillText = jest.fn();
  strokeText = jest.fn();
  translate = jest.fn();
  rotate = jest.fn();
  save = jest.fn();
  restore = jest.fn();
  textAlign = 'left';
  textBaseline = 'alphabetic';
  fillStyle = '#000000';
  globalAlpha = 1;
  font = '10px sans-serif';
}

class MockHTMLCanvasElement {
  width = 300;
  height = 150;
  
  getContext = jest.fn().mockImplementation((type: string) => {
    if (type === '2d') {
      return new MockCanvasRenderingContext2D();
    }
    return null;
  });
  
  toDataURL = jest.fn().mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  
  setAttribute = jest.fn();
  getAttribute = jest.fn();
}

// 模拟document.createElement for canvas
const originalCreateElement = document.createElement;
document.createElement = jest.fn().mockImplementation((tagName: string) => {
  if (tagName === 'canvas') {
    return new MockHTMLCanvasElement() as any;
  }
  return originalCreateElement.call(document, tagName);
});

// 清除所有模拟函数
beforeEach(() => {
  jest.clearAllMocks();
});

export {};