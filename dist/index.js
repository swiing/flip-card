let sheet;
try {
  sheet = new CSSStyleSheet();
  sheet.replaceSync(`/* SPDX-License-Identifier: MIT */

flip-card { display: block; perspective: 1000px; }

[is=flipper] { display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
}

[is=flipper].flipped {
  transform: translateX(-100%) rotateY(-180deg);
}

front-face, back-face { display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

back-face {
  transform: rotateY(180deg);
}
`);
} catch(err) {
  console.error('Constructable Stylesheets are not supported in your environment. Please consider a polyfill, e.g. https://www.npmjs.com/package/construct-style-sheets-polyfill');
}
var sheet$1 = sheet;

// SPDX-License-Identifier: MIT
class FlipCardElement extends HTMLElement {
    connectedCallback() {
        const content = document
            .createRange()
            .createContextualFragment('<div is="flipper"></div>');
        // populate the template with children from the custom element
        while (this.firstElementChild) {
            content
                .querySelector('[is=flipper]')
                .appendChild(this.removeChild(this.firstElementChild));
        }
        // make back-side unfocusable (un-tab-able)
        content.querySelector('back-face').classList.toggle('hidden');
        this.appendChild(content);
        const root = this.getRootNode();
        if (!root.adoptedStyleSheets.includes(sheet$1))
            root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet$1];
    }
    flip() {
        const flipper = this.querySelector('[is=flipper]');
        flipper.classList.toggle('flipped');
        // setTimeout(() => {
        //   // hide element so that it does not get focus (e.g. with tabindex)
        //   flipper
        //     .querySelectorAll('back-face')
        //     .forEach((xcard) => {
        //       xcard.classList.toggle('hidden');
        //     });
        //   // timer value is taken from css transition time. I could do it
        //   // programmatically with something using
        //   // getComputedStyle(document.querySelector('x-card')).transition
        //   // => "all 1s ease 0s". Alternatively, I could use a config var
        //   // and use it both in the (string) css, and here.
        // }, 1000);
    }
}
if (!window.customElements.get('flip-card')) {
    window.customElements.define('flip-card', FlipCardElement);
}

export { FlipCardElement as default };
