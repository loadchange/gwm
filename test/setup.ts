// Jest测试环境设置文件

// 模拟浏览器环境中的全局对象
(globalThis as any).MutationObserver = class {
  constructor(callback: Function) {}
  disconnect() {}
  observe(element: Element, options: object) {}
};

// 模拟DOM元素方法
Object.defineProperty(Element.prototype, 'appendChild', {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

Object.defineProperty(Element.prototype, 'insertBefore', {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

// 清除所有模拟函数
beforeEach(() => {
  jest.clearAllMocks();
});

export {};