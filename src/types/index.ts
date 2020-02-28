type CallbackFunction = () => void;
type ObserverEventDisconnectFunction = () => void;

export enum WatermarkType {
  CANVAS = 'canvas',
  SVG = 'svg',
  ELEMENT = 'element',
}

interface Options {
  txt: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  font?: string;
  fontSize?: number;
  color?: string;
  alpha?: number;
  angle?: number;
  mode?: WatermarkType;
  watch?: boolean;
  css?: CSSStyleDeclaration;
  destroy?: boolean;
  container?: string | HTMLElement;
}

interface IGwmObserverItemEvent {
  disconnect: ObserverEventDisconnectFunction;
}

interface GwmObserverEvent {
  containerObserver: IGwmObserverItemEvent;
  targetObserver: IGwmObserverItemEvent;
}

interface GwmObserver {
  containerObserver: MutationObserver;
  targetObserver: MutationObserver;
}

export { CallbackFunction, Options, GwmObserver, GwmObserverEvent };
