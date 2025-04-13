# Examples

This section provides practical examples of using gwm.js in different scenarios.

## Basic Example

The simplest way to create a watermark is to call the `creation` method without any parameters:

```javascript
// Create a watermark with default options
gwm.creation();
```

This will create a watermark with the current date and "Top secret" text, using default styling.

## Custom Text

You can customize the watermark text:

```javascript
// Create a watermark with custom text
gwm.creation({
  txt: 'CONFIDENTIAL - DO NOT SHARE'
});
```

## Styling the Watermark

You can customize the appearance of the watermark:

```javascript
// Create a styled watermark
gwm.creation({
  txt: 'CONFIDENTIAL',
  fontSize: 16,
  color: '#ff0000',
  alpha: 0.2,
  angle: -20
});
```

## Positioning

Control the position and size of the watermark:

```javascript
// Create a positioned watermark
gwm.creation({
  txt: 'CONFIDENTIAL',
  width: 200,
  height: 150,
  x: 20,
  y: 60
});
```

## Custom Container

By default, the watermark is added to the document body. You can specify a different container:

```javascript
// Create a watermark in a specific container
gwm.creation({
  txt: 'CONFIDENTIAL',
  container: '#my-container'
});
```

Or using a DOM element:

```javascript
const container = document.getElementById('my-container');
gwm.creation({
  txt: 'CONFIDENTIAL',
  container: container
});
```

## Disabling Anti-Tampering

By default, gwm.js monitors the watermark for tampering attempts. You can disable this feature:

```javascript
// Create a watermark without anti-tampering
gwm.creation({
  txt: 'CONFIDENTIAL',
  watch: false
});
```

## Custom CSS

You can apply custom CSS to the watermark container:

```javascript
// Create a watermark with custom CSS
gwm.creation({
  txt: 'CONFIDENTIAL',
  css: {
    pointerEvents: 'none',
    zIndex: 1000
  }
});
```

## Multiple Watermarks

You can specify the number of watermarks to generate:

```javascript
// Create multiple watermarks
gwm.creation({
  txt: 'CONFIDENTIAL',
  count: 5
});
```

## Manually Managing Observation

You can manually control the observation of the watermark:

```javascript
// Create a watermark
gwm.creation({
  txt: 'CONFIDENTIAL',
  watch: false
});

// Start observing later
const observer = gwm.observing();

// Cancel observation when needed
gwm.cancel();
```

## Complete Example

Here's a more complete example that combines multiple options:

```javascript
// Create a fully customized watermark
gwm.creation({
  txt: 'CONFIDENTIAL - ' + new Date().toLocaleDateString(),
  width: 200,
  height: 150,
  x: 20,
  y: 60,
  font: 'Arial',
  fontSize: 16,
  color: '#ff0000',
  alpha: 0.2,
  angle: -20,
  mode: 'svg',
  watch: true,
  css: {
    pointerEvents: 'none',
    zIndex: 1000
  },
  container: '#content-area'
});
```

For more specific examples, check out the following pages:
(Placeholder for future links)