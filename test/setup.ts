// Jest测试环境设置文件

// 模拟浏览器环境中的全局对象
(globalThis as any).MutationObserver = class {
  callback: Function;
  constructor(callback: Function) {
    this.callback = callback;
  }
  disconnect() {}
  observe(element: Element, options: object) {}
};

// 模拟DOM元素方法
Element.prototype.appendChild = jest.fn().mockImplementation(function(child) {
  return child;
});

Element.prototype.insertBefore = jest.fn().mockImplementation(function(newChild, refChild) {
  return newChild;
});

// 清除所有模拟函数
beforeEach(() => {
  jest.clearAllMocks();
});

export {};