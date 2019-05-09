type CallbackFunction = () => void;
type ObserverEventDisconnectFunction = () => void;

interface IOptions {
  txt: string;
  width: number;
  height: number;
  x: number;
  y: number;
  font: string;
  fontSize: number;
  color: string;
  alpha: number;
  angle: number;
  mode: string;
  watch: boolean;
  css: CSSStyleDeclaration;
  destroy: boolean;
  container: string | HTMLElement;
}

interface IGenerateWatermark {
  gwmDom: HTMLElement;
  wrap: HTMLElement;
  opts: IOptions;
}

interface IGwmObserverItemEvent {
  disconnect: ObserverEventDisconnectFunction;
}

interface IGwmObserverEvent {
  containerObserver: IGwmObserverItemEvent;
  targetObserver: IGwmObserverItemEvent;
}

interface IGwmObserver {
  containerObserver: MutationObserver;
  targetObserver: MutationObserver;
}

export { CallbackFunction, IGenerateWatermark, IOptions, IGwmObserver, IGwmObserverEvent };
