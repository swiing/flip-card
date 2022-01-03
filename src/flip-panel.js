// SPDX-License-Identifier: ISC

customElements.define(
  'flip-panel',
  class extends HTMLElement {
    // Don't add children in constructor, hence prefer connectedCallback as per
    // https://stackoverflow.com/a/40181684
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
      content.querySelector('x-card:nth-of-type(2)').classList.toggle('hidden');

      this.appendChild(content);
    }

    flip() {
      const flipper = this.querySelector('[is=flipper]');
      flipper.classList.toggle('flipped');
      setTimeout(() => {
        // hide element so that it does not get focus (e.g. with tabindex)
        flipper
          .querySelectorAll('x-card:nth-of-type(-n+2)')
          .forEach((xcard) => {
            xcard.classList.toggle('hidden');
          });
        // timer value is taken from css transition time. I could do it
        // programmatically with something using
        // getComputedStyle(document.querySelector('x-card')).transition
        // => "all 1s ease 0s". Alternatively, I could use a config var
        // and use it both in the (string) css, and here.
      }, 500);
    }
  }
);
