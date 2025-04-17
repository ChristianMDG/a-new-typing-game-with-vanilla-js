import { state } from './state.js';
import { loadNewText } from './loadNewText.js';
import { timerElement, timeModeBtn, wordsModeBtn, quoteModeBtn, easyBtn, mediumBtn, hardBtn, timeOptions } from './domElement.js';

const resetTestAfterSettingsChange = () => {
    clearInterval(state.timerInterval);
    state.isTestRunning = false;

    const activeTimeOption = document.querySelector('.time-option.active');
    state.timer = activeTimeOption ? parseInt(activeTimeOption.dataset.time) : 30;

    state.totalTyped = 0;
    state.correctTyped = 0;
    state.currentWordIndex = 0;
    state.currentCharIndex = 0;

    timerElement.textContent = state.timer;
    document.getElementById('progress-bar').style.width = '0%';

    loadNewText();
}


export const setMode = (mode) => {
    state.currentMode = mode;

    timeModeBtn.classList.toggle('active', mode === 'time');
    wordsModeBtn.classList.toggle('active', mode === 'words');
    quoteModeBtn.classList.toggle('active', mode === 'quote');

    document.getElementById('time-options').classList.toggle('hidden', mode !== 'time');

    resetTestAfterSettingsChange();
}


export const setTime = (seconds) => {
    state.timer = seconds;
    timerElement.textContent = state.timer;

    timeOptions.forEach(option => {
        option.classList.toggle('active', parseInt(option.dataset.time) === seconds);
    });

    resetTestAfterSettingsChange();
}

export const setDifficulty = (difficulty) => {
    state.currentDifficulty = difficulty;

    easyBtn.classList.toggle('easy-active', difficulty === 'easy');
    mediumBtn.classList.toggle('medium-active', difficulty === 'medium');
    hardBtn.classList.toggle('hard-active', difficulty === 'hard');

    resetTestAfterSettingsChange();
}


