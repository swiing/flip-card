// SPDX-License-Identifier: ISC

import FlipCard from './flip-card.js';
import sheet from './flip-card.css' assert { type: 'css' };

document.adoptedStyleSheets = [sheet];

customElements.define('flip-card', FlipCard);
