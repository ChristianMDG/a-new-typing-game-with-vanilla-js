import { state } from "./state.js";
import { sampleTexts, techQuotes } from './dataText.js';
import { renderText } from "./renderText.js";
export const loadNewText = () => {
    if (state.currentMode === 'quote') {
        const randomIndex = Math.floor(Math.random() * techQuotes.length);
        state.currentParagraph = techQuotes[randomIndex];
    } else {
        const texts = sampleTexts[state.currentDifficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        state.currentParagraph = texts[randomIndex];
    }
    state.words = state.currentParagraph.split(' ');
    renderText();
}