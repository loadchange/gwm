import bindCSS from './bindCSS'

const _id = `__gwm_${+new Date()}`
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

export const observer = (target, callback) => {
    if (!MutationObserver) return false
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

    bindCSS(gwmDiv, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -100,
        backgroundRepeat: 'no-repeat'
    })
    gwmDiv.id = _id
    return gwmDiv
}