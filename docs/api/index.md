# API Reference

This section provides detailed documentation for the gwm.js API.

## Overview

gwm.js exposes a global `gwm` object with the following methods:

| Method | Description |
|--------|-------------|
| `creation(options)` | Creates a watermark with the specified options. |
| `observing()` | Manually starts observing the watermark for tampering. |
| `cancel()` | Cancels observation and allows the watermark to be removed. |

## Basic Usage

```javascript
// Create a watermark with default options
gwm.creation();

// Create a watermark with custom options
gwm.creation({
  txt: 'Confidential',
  fontSize: 14,
  color: '#ff0000'
});

// Manually observe the watermark
const observer = gwm.observing();

// Cancel observation
gwm.cancel();
```

## Options

The `creation` method accepts an options object with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `txt` | string | Current date + "Top secret" | The text content of the watermark. |
| `width` | number | 158 | The width of the watermark canvas. |
| `height` | number | 100 | The height of the watermark canvas. |
| `x` | number | 0 | The x-coordinate of the watermark text. |
| `y` | number | 50 | The y-coordinate of the watermark text. |
| `font` | string | 'Arial' | The font family for the watermark text. |
| `fontSize` | number | 12 | The font size for the watermark text. |
| `color` | string | '#000' | The color of the watermark text. |
| `alpha` | number | 0.1 | The transparency of the watermark (0-1). |
| `angle` | number | -15 | The rotation angle of the watermark text. |
| `mode` | string | 'canvas' | The rendering mode ('canvas', 'svg', or 'element'). |
| `watch` | boolean | true | Whether to monitor for tampering. |
| `css` | object | null | Custom CSS styles for the watermark container. |
| `destroy` | boolean | true | If true, prevents multiple calls to `creation`. |
| `container` | string \| HTMLElement | document.body | The container element for the watermark. |
| `count` | number | null | Optional parameter to set the number of watermarks. |

For more detailed information about each option, see the table above. (Options page link removed)

## Return Values

### creation()

Returns: `undefined`

The `creation` method does not return a value. It creates a watermark and adds it to the DOM.

### observing()

Returns: `GwmObserver | GwmObserverEvent`

The `observing` method returns an observer object that can be used to manually control the observation.

### cancel()

Returns: `void`

The `cancel` method does not return a value. It cancels the current observation.

## Type Definitions

(Types page link removed)