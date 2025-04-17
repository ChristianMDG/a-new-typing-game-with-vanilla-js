import { textDisplay } from './elements.js';
import { words, currentWordIndex, currentCharIndex } from './state.js';

export function renderText() {
    textDisplay.innerHTML = '';

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'mr-2';

        if (wordIndex < currentWordIndex) {
            wordSpan.className += ' text-gray-500';
        }

        for (let i = 0; i < word.length; i++) {
            const charSpan = document.createElement('span');

            if (wordIndex < currentWordIndex) {
                charSpan.className = 'correct';
            } else if (wordIndex === currentWordIndex && i < currentCharIndex) {
                charSpan.className = 'correct';
            } else if (wordIndex === currentWordIndex && i === currentCharIndex) {
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