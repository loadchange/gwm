import bindCSS, {isSupport} from './bindCSS'

const _id = `__gwm_${+new Date()}`
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

function bindMutationEvent(target, callback) {
    const eventList = [
        'DOMAttrModified',
        'DOMAttributeNameChanged',
        'DOMCharacterDataModified',
        'DOMElementNameChanged',
        'DOMNodeInserted',
        'DOMNodeInsertedIntoDocument',
        'DOMNodeRemoved',
        'DOMNodeRemovedFromDocument',
        'DOMSubtreeModified'
    ]
    eventList.map(eventName => target.addEventListener(eventName, () => callback(), false))
    document.body.addEventListener('DOMSubtreeModified', () => callback(), false)
    return {
        bodyObserver: {
            disconnect: () => document.body.removeEventListener('DOMSubtreeModified', () => callback(), false)
        },
        observer: {
            disconnect: () => eventList.map(eventName => target.removeEventListener(eventName, () => callback(), false))
        }
    }
}

export const observer = (target, callback) => {
    if (!MutationObserver) return bindMutationEvent(target, callback)
    let bodyObserver = new MutationObserver(
        mutationsList => mutationsList.forEach(mutation =>
            mutation.removedNodes.forEach(_target => _target === target && callback())
        )
    )
    bodyObserver.observe(document.body, {childList: true});
    let observer = new MutationObserver(callback);
    observer.observe(target, {characterData: true, attributes: true, childList: true, subtree: true});
    return {bodyObserver, observer};
}

export const disconnect = (observer) => observer.disconnect()

export default (gwm = {}) => {
    const target = gwm.gwmDom ? gwm.gwmDom : document.getElementById(_id);
    if (target) {
        document.body.removeChild(target)
    }
    const gwmDiv = document.createElement('div');
    let css = {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: -10,
        backgroundRepeat: 'no-repeat'
    }
    if (isSupport('pointerEvents')) {
        css = Object.assign(css, {pointerEvents: 'none', zIndex: 999999})
    }
    bindCSS(gwmDiv, css)
    gwmDiv.id = _id
    return gwmDiv
}
