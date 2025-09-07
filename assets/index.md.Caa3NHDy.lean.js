import { v as onMounted, c as createElementBlock, o as openBlock, ae as createStaticVNode } from "./chunks/framework.CBN8mWGN.js";
const __pageData = JSON.parse(`{"title":"gwm.js","titleTemplate":"Generate Watermark for Web Applications","description":"","frontmatter":{"layout":"home","title":"gwm.js","titleTemplate":"Generate Watermark for Web Applications","hero":{"name":"gwm.js","text":"Generate Watermark for Web Applications","tagline":"A lightweight, flexible watermark library for your web applications","image":{"src":"/logo.png","alt":"gwm.js"},"actions":[{"theme":"brand","text":"Get Started","link":"/guide/"},{"theme":"alt","text":"View on GitHub","link":"https://github.com/loadchange/gwm"}]},"features":[{"icon":"🎨","title":"Multiple Watermark Types","details":"Support for Canvas, SVG, and Element watermarks to suit different needs and scenarios."},{"icon":"🔒","title":"Anti-Tampering Protection","details":"Built-in monitoring to prevent watermark tampering, ensuring security for sensitive information."},{"icon":"🛠️","title":"Highly Customizable","details":"Extensive configuration options for text, style, position, and more to match your application's design."},{"icon":"🚀","title":"Lightweight & Fast","details":"Minimal footprint with optimized performance for smooth user experience."}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}`);
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    onMounted(() => {
      const script = document.createElement("script");
      script.src = "/gwm/gwm.umd.js";
      script.onload = () => {
        if (window.gwm) {
          window.gwm.creation({
            txt: "gwm.js Demo",
            fontSize: 16,
            color: "#000000",
            alpha: 0.05,
            angle: -20,
            width: 200,
            height: 150
          });
        }
      };
      document.head.appendChild(script);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
        createStaticVNode("", 5)
      ])]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};
