import bindCSS, { isSupport } from './bindCSS';
import { CallbackFunction, IGenerateWatermark, IGwmObserver, IGwmObserverEvent } from '../types';

declare var WebKitMutationObserver: any;
declare var MozMutationObserver: any;

const mutationObserver = MutationObserver || WebKitMutationObserver || MozMutationObserver;

function bindMutationEvent(target: HTMLElement, container: HTMLElement, callback: CallbackFunction): IGwmObserverEvent {
  const eventList = [
    'DOMAttrModified',
    'DOMAttributeNameChanged',
    'DOMCharacterDataModified',
    'DOMElementNameChanged',
    'DOMNodeInserted',
    'DOMNodeInsertedIntoDocument',
    'DOMNodeRemoved',
    'DOMNodeRemovedFromDocument',
    'DOMSubtreeModified',
  ];
  eventList.map(eventName => target.addEventListener(eventName, () => callback(), false));
  document.body.addEventListener('DOMSubtreeModified', () => callback(), false);
  return {
    containerObserver: {
      disconnect: () => container.removeEventListener('DOMSubtreeModified', () => callback(), false),
    },
    targetObserver: {
      disconnect: () => eventList.map(eventName => target.removeEventListener(eventName, () => callback(), false)),
    },
  };
}

export const observer = (
  target: HTMLElement,
  container: HTMLElement,
  callback: CallbackFunction,
): IGwmObserver | IGwmObserverEvent => {
  if (!mutationObserver) {
    return bindMutationEvent(target, container, callback);
  }
  const containerObserver: MutationObserver = new mutationObserver((mutationsList: MutationRecord[]) => {
    mutationsList.forEach(mutation => {
      mutation.removedNodes.forEach(item => {
        if (item === target) {
          callback();
        }
      });
    });
  });
  containerObserver.observe(container, { childList: true });
  const targetObserver: MutationObserver = new MutationObserver(callback);
  targetObserver.observe(target, { characterData: true, attributes: true, childList: true, subtree: true });
  return { containerObserver, targetObserver };
};

export const disconnect = (currentObserver: IGwmObserver | IGwmObserverEvent) => {
  const { containerObserver, targetObserver } = currentObserver;
  containerObserver.disconnect();
  targetObserver.disconnect();
};

export default (gwm: IGenerateWatermark) => {
  const { gwmDom } = gwm;
  const { css } = gwm.opts;
  if (gwmDom) {
    gwmDom.remove();
  }
  const gwmDiv = document.createElement('div');
  if (isSupport('pointerEvents')) {
    css.pointerEvents = 'none';
    css.zIndex = parseInt(`${css.zIndex}`, 10) > 0 ? css.zIndex : '999999';
  }
  bindCSS(gwmDiv, css);
  return gwmDiv;
};
