import bindCSS from './bindCSS'

export default () => {
    const gwmDiv = document.createElement('div');
    bindCSS(gwmDiv, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat'
    })
    return gwmDiv
}