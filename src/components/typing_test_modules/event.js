import {
    inputField, restartBtn, restartTypingBtn, timeModeBtn, wordsModeBtn,
    quoteModeBtn, easyBtn, mediumBtn, hardBtn, timeOptions,
    shareBtn, darkModeToggle, resultWpm, resultAccuracy, resultsModal, progressBar,
    wpmElement, accuracyElement
} from './elements.js';

import {
    currentCharIndex, currentWordIndex, words,
    totalTyped, correctTyped, startTime, isTestRunning
} from './state.js';

import { startTest, endTest, resetTest, setMode, setDifficulty, setTime } from './testControl.js';
import { renderText } from './renderer.js';
import { toggleDarkMode } from './utils.js';

export function setupEventListeners() {
    inputField.addEventListener('input', (e) => {
        if (!isTestRunning) startTest();

        const inputValue = e.target.value;
        const currentChar = inputValue[inputValue.length - 1];

        if (e.inputType === 'deleteContentBackward') {
            if (currentCharIndex > 0) {
                currentCharIndex--;
                totalTyped--;
                if (currentCharIndex < 0 && currentWordIndex > 0) {
                    currentWordIndex--;
                    currentCharIndex = words[currentWordIndex].length - 1;
                }
            }
        } else {
            totalTyped++;
            if (currentChar === words[currentWordIndex][currentCharIndex]) {
                correctTyped++;
            }
            currentCharIndex++;

            if (currentCharIndex >= words[currentWordIndex].length) {
                currentWordIndex++;
                currentCharIndex = 0;
                e.target.value = '';
                if (currentWordIndex >= words.length) {
                    endTest();
                    return;
                }
            }
        }

        const progress = (currentWordIndex / words.length) * 100;
        progressBar.style.width = `${progress}%`;

        const timeElapsed = (new Date().getTime() - startTime) / 60000;
        const wpm = Math.round((correctTyped / 5) / timeElapsed) || 0;
        const accuracy = Math.round((correctTyped / totalTyped) * 100) || 0;

        wpmElement.textContent = wpm;
        accuracyElement.textContent = accuracy;

        renderText();
    });

    restartBtn.addEventListener('click', () => {
        resultsModal.classList.add('hidden');
        resetTest();
    });

    restartTypingBtn.addEventListener('click', resetTest);
    timeModeBtn.addEventListener('click', () => setMode('time'));
    wordsModeBtn.addEventListener('click', () => setMode('words'));
    quoteModeBtn.addEventListener('click', () => setMode('quote'));

    timeOptions.forEach(option => {
        option.addEventListener('click', () => setTime(parseInt(option.dataset.time)));
    });

    easyBtn.addEventListener('click', () => setDifficulty('easy'));
    mediumBtn.addEventListener('click', () => setDifficulty('medium'));
    hardBtn.addEventListener('click', () => setDifficulty('hard'));

    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'NeonType Results',
                text: `I just scored ${resultWpm.textContent} WPM with ${resultAccuracy.textContent} accuracy on NeonType!`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert('Web Share API not supported in your browser. WPM: ' + resultWpm.textContent);
        }
    });

    darkModeToggle.addEventListener('change', toggleDarkMode);
}
