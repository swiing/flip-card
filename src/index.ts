// SPDX-License-Identifier: MIT

import sheet from '../src/style.css' assert { type: 'css' };

// adoptedStyleSheets not supported yet by typescript
type NodeExtend = Node & {adoptedStyleSheets: CSSStyleSheet[]}

export default class FlipCardElement extends HTMLElement {
  connectedCallback() {
    const content = document
      .createRange()
      .createContextualFragment('<div is="flipper"></div>');

    // populate the template with children from the custom element
    while (this.firstElementChild) {
      content!
        .querySelector('[is=flipper]')!
        .appendChild(this.removeChild(this.firstElementChild));
    }

    // make back-side unfocusable (un-tab-able)
    content.querySelector('back-face')!.classList.toggle('hidden');

    this.appendChild(content);

    const root = this.getRootNode() as NodeExtend;
    if (!root.adoptedStyleSheets.includes(sheet))
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }

  flip() {
    const flipper = this.querySelector('[is=flipper]');
    flipper!.classList.toggle('flipped');
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
  window.customElements.define('flip-card', FlipCardElement)
}
