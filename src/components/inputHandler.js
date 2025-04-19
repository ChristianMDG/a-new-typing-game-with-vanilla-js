import { state } from './state.js';
import { renderText } from './renderText.js';
import { endTest } from './testControl.js';
import { progressBar, wpmElement, accuracyElement, timerElement } from './domElement.js';

export const setupInputHandlers = (inputField) => {
    inputField.addEventListener('input', (e) => {
        if (!state.isTestRunning) {
            startTest();
        }

        handleInput(e);
    });
};

const startTest = () => {
    state.isTestRunning = true;
    state.startTime = new Date().getTime();
    state.timerInterval = setInterval(updateTimer, 1000);
    state.initErrorTracking();
};

const handleInput = (e) => {
    const inputValue = e.target.value;
    const currentChar = inputValue[inputValue.length - 1];

    if (e.inputType === 'deleteContentBackward') {
        handleBackspace();
    } else if (currentChar === ' ') {
        handleSpace();
        e.target.value = '';
    } else {
        handleCharacter(currentChar);
    }

    updateProgress();
    renderText();
};

const handleCharacter = (char) => {
    const currentWord = state.words[state.currentWordIndex];
    
    if (!state.correctChars[state.currentWordIndex]) {
        state.correctChars[state.currentWordIndex] = new Array(currentWord.length).fill(null);
    }


    const isCorrect = char === currentWord[state.currentCharIndex];
    state.correctChars[state.currentWordIndex][state.currentCharIndex] = isCorrect;

    state.currentCharIndex++;
    state.totalTyped++;
    if (isCorrect) state.correctTyped++;


    if (state.currentWordIndex >= state.words.length - 1 && 
        state.currentCharIndex >= currentWord.length) {
        endTest();
    }
};

const handleSpace = () => {
    const currentWord = state.words[state.currentWordIndex];
    const isAtWordEnd = state.currentCharIndex >= currentWord.length;

    state.isSpaceCorrect = isAtWordEnd;

    if (isAtWordEnd) {
        state.currentWordIndex++;
        state.currentCharIndex = 0;
        state.totalTyped++;
        state.correctTyped++;
    } else {
        state.totalTyped++;
    }
};

const handleBackspace = () => {
    if (state.currentCharIndex > 0) {
        state.currentCharIndex--;
        state.totalTyped--;
    }
};

const updateProgress = () => {
    const progress = (state.currentWordIndex / state.words.length) * 100;
    progressBar.style.width = `${progress}%`;

    const timeElapsed = (new Date().getTime() - state.startTime) / 60000;
    const wpm = Math.round((state.correctTyped / 5) / timeElapsed) || 0;
    const accuracy = Math.round((state.correctTyped / state.totalTyped) * 100) || 0;

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
};

const updateTimer = () => {
    state.timer--;
    timerElement.textContent = state.timer;

    if (state.timer <= 0) {
        endTest();
    }
};