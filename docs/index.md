---
layout: home
title: gwm.js
titleTemplate: Generate Watermark for Web Applications

hero:
  name: gwm.js
  text: Generate Watermark for Web Applications
  tagline: A lightweight, flexible watermark library for your web applications
  image:
    src: /logo.png
    alt: gwm.js
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/loadchange/gwm

features:
  - icon: 🎨
    title: Multiple Watermark Types
    details: Support for Canvas, SVG, and Element watermarks to suit different needs and scenarios.
  
  - icon: 🔒
    title: Anti-Tampering Protection
    details: Built-in monitoring to prevent watermark tampering, ensuring security for sensitive information.
  
  - icon: 🛠️
    title: Highly Customizable
    details: Extensive configuration options for text, style, position, and more to match your application's design.
  
  - icon: 🚀
    title: Lightweight & Fast
    details: Minimal footprint with optimized performance for smooth user experience.
---

## Quick Start

### Installation

```bash
npm install gwm
```

### Basic Usage

```javascript
// Import the library
import gwm from 'gwm';

// Create a watermark with default options
gwm.creation();

// Create a watermark with custom options
gwm.creation({
  txt: 'Confidential Document',
  fontSize: 14,
  color: '#ff0000',
  alpha: 0.2,
  angle: -20
});
```
