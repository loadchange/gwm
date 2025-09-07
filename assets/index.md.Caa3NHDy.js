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
        createStaticVNode('<h2 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-label="Permalink to &quot;Quick Start&quot;">​</a></h2><h3 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gwm</span></span></code></pre></div><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Import the library</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gwm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gwm&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Create a watermark with default options</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gwm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">creation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Create a watermark with custom options</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gwm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">creation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  txt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Confidential Document&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  fontSize: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">14</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#ff0000&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  alpha: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  angle: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>', 5)
      ])]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};
