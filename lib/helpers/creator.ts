import bindCSS, { isSupport } from './bindCSS';
import { CallbackFunction, IGenerateWatermark, IGwmObserver, IGwmObserverEvent } from '../types';

const GWM_ID = `__gwm_${+new Date()}`;
const mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

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
  const target = gwmDom ? gwmDom : document.getElementById(GWM_ID);
  if (target) {
    target.remove();
  }
  const gwmDiv = document.createElement('div');
  if (isSupport('pointerEvents')) {
    css.pointerEvents = 'none';
    css.zIndex = css.zIndex < 0 ? '999999' : css.zIndex;
  }
  bindCSS(gwmDiv, css);
  gwmDiv.id = GWM_ID;
  return gwmDiv;
};
