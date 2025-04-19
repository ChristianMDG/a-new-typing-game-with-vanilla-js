import { state } from "./state.js";
import { textDisplay } from './domElement.js';

const applyCharStyle = (charSpan, isCorrect, isCurrent = false) => {
    if (isCurrent) {
        charSpan.className = 'underline current';
    } else if (isCorrect === true) {
        charSpan.className = 'text-green-500';
    } else if (isCorrect === false) {
        charSpan.className = 'text-red-500';
    }
};

export const renderText = () => {
    textDisplay.innerHTML = '';

    state.words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'mr-2';

        for (let i = 0; i < word.length; i++) {
            const charSpan = document.createElement('span');
            const isCurrent = wordIndex === state.currentWordIndex && i === state.currentCharIndex;
            let isCorrect = null;

            if (wordIndex < state.currentWordIndex) {

                isCorrect = state.correctChars[wordIndex]?.[i];
            } else if (wordIndex === state.currentWordIndex && i < state.currentCharIndex) {
             
                isCorrect = state.correctChars[wordIndex]?.[i];
            }

            applyCharStyle(charSpan, isCorrect, isCurrent);
            charSpan.textContent = word[i];
            wordSpan.appendChild(charSpan);
        }

      
        if (wordIndex < state.words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = ' ';

            if (wordIndex < state.currentWordIndex) {
              
                spaceSpan.className = 'text-green-500';
            } else if (wordIndex === state.currentWordIndex && 
                      state.currentCharIndex >= word.length) {
              
                spaceSpan.className = state.isSpaceCorrect ? 'text-green-500' : 'text-red-500';
            }

            wordSpan.appendChild(spaceSpan);
        }

        textDisplay.appendChild(wordSpan);
    });
};