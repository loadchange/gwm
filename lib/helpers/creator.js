import bindCSS, {isSupport} from './bindCSS'

const _id = `__gwm_${+new Date()}`
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

function bindMutationEvent(target, container, callback) {
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
        containerObserver: {
            disconnect: () => container.removeEventListener('DOMSubtreeModified', () => callback(), false)
        },
        observer: {
            disconnect: () => eventList.map(eventName => target.removeEventListener(eventName, () => callback(), false))
        }
    }
}

export const observer = (target, container, callback) => {
    if (!MutationObserver) return bindMutationEvent(target, container, callback)
    const containerObserver = new MutationObserver(
        mutationsList => mutationsList.forEach(mutation =>
            mutation.removedNodes.forEach(_target => _target === target && callback())
        )
    )
    containerObserver.observe(container, {childList: true});
    const observer = new MutationObserver(callback);
    observer.observe(target, {characterData: true, attributes: true, childList: true, subtree: true});
    return {containerObserver, observer}
}

export const disconnect = ({containerObserver, observer}) => containerObserver.disconnect() && observer.disconnect()

export default (gwm = {}) => {
    const {gwmDom} = gwm
    const {css} = gwm.opts
    const target = gwmDom ? gwmDom : document.getElementById(_id)
    if (target) target.remove()
    const gwmDiv = document.createElement('div')
    if (isSupport('pointerEvents')) {
        css.pointerEvents = 'none'
        css.zIndex = 999999
    }
    bindCSS(gwmDiv, css)
    gwmDiv.id = _id
    return gwmDiv
}
