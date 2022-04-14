// SPDX-License-Identifier: ISC

import FlipPanel from './flip-panel.js';
import sheet from './flip-panel.css' assert { type: 'css' };

document.adoptedStyleSheets = [sheet];

customElements.define('flip-panel', FlipPanel);
