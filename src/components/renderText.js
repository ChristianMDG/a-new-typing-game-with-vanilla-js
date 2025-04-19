import { state } from "./state.js";
import { textDisplay } from './domElement.js';

export const renderText = () => {
    textDisplay.innerHTML = '';
    state.words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'mr-2';

        if (wordIndex < state.currentWordIndex) {
            wordSpan.className += ' text-gray-500';
        }

        for (let i = 0; i < word.length; i++) {
            const charSpan = document.createElement('span');
            if (wordIndex < state.currentWordIndex) {
                charSpan.className = 'correct';
            } else if (wordIndex === state.currentWordIndex && i < state.currentCharIndex) {
                charSpan.className = 'correct';
            }
             else if (wordIndex === state.currentWordIndex && i === state.currentCharIndex) {
                charSpan.className = 'current';
            }
            charSpan.textContent = word[i];
            wordSpan.appendChild(charSpan);
        }
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = ' ';
        wordSpan.appendChild(spaceSpan);
        textDisplay.appendChild(wordSpan);
    });
}
