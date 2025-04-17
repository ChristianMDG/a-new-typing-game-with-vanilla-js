import { 
    inputField, timerElement, wpmElement, accuracyElement, progressBar,
    restartBtn, restartTypingBtn, timeModeBtn, wordsModeBtn, quoteModeBtn,
    easyBtn, mediumBtn, hardBtn, timeOptions, darkModeToggle 
} from './domElement.js';
import { state } from "./state.js";
import { loadNewText } from "./loadNewText.js";
import { renderText } from "./renderText.js";
import { setDifficulty, setTime, setMode } from "./settings.js";
import { resetTest, endTest } from "./testControl.js";

document.addEventListener('DOMContentLoaded', () => {

    const init = () => {
        loadNewText();
        setupEventListeners();

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            darkModeToggle.checked = true;
        }
    }

    const setupEventListeners = () => {
        inputField.addEventListener('input', (e) => {
            if (!state.isTestRunning) {
                state.isTestRunning = true;
                state.startTime = new Date().getTime();
                state.timerInterval = setInterval(updateTimer, 1000);
            }

            const inputValue = e.target.value;
            const currentChar = inputValue[inputValue.length - 1];

            if (e.inputType === 'deleteContentBackward') {
                if (state.currentCharIndex > 0) {
                    state.currentCharIndex--;
                    state.totalTyped--;
                }
            } else {
                state.totalTyped++;
                if (currentChar === state.words[state.currentWordIndex][state.currentCharIndex]) {
                    state.correctTyped++;
                }

                state.currentCharIndex++;
                if (state.currentCharIndex >= state.words[state.currentWordIndex].length) {
                    state.currentWordIndex++;
                    state.currentCharIndex = 0;
                    e.target.value = '';
                    if (state.currentWordIndex >= state.words.length) {
                        endTest();
                        return;
                    }
                }
            }

            const progress = (state.currentWordIndex / state.words.length) * 100;
            progressBar.style.width = `${progress}%`;

            const timeElapsed = (new Date().getTime() - state.startTime) / 60000;
            const wpm = Math.round((state.correctTyped / 5) / timeElapsed) || 0;
            const accuracy = Math.round((state.correctTyped / state.totalTyped) * 100) || 0;

            wpmElement.textContent = wpm;
            accuracyElement.textContent = accuracy;

            renderText();
        });

        restartBtn.addEventListener('click', resetTest);
        restartTypingBtn.addEventListener('click', resetTest);

        timeModeBtn.addEventListener('click', () => setMode('time'));
        wordsModeBtn.addEventListener('click', () => setMode('words'));
        quoteModeBtn.addEventListener('click', () => setMode('quote'));

        timeOptions.forEach(option => option.addEventListener('click', () => setTime(parseInt(option.dataset.time))));

        easyBtn.addEventListener('click', () => setDifficulty('easy'));
        mediumBtn.addEventListener('click', () => setDifficulty('medium'));
        hardBtn.addEventListener('click', () => setDifficulty('hard'));
    }

    const updateTimer = () => {
        state.timer--;
        timerElement.textContent = state.timer;

        if (state.timer <= 0) {
            endTest();
        }
    }

    init();
});
