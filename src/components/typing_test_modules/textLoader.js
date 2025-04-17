import { sampleTexts, techQuotes } from './texts.js';
import { currentMode, currentDifficulty, currentParagraph, words } from './state.js';
import { renderText } from './renderer.js';

export function loadNewText() {
    if (currentMode === 'quote') {
        const randomIndex = Math.floor(Math.random() * techQuotes.length);
        currentParagraph = techQuotes[randomIndex];
    } else {
        const texts = sampleTexts[currentDifficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        currentParagraph = texts[randomIndex];
    }

    words.length = 0;
    currentParagraph.split(' ').forEach(word => words.push(word));
    renderText();
}