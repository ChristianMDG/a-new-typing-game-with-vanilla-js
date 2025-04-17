import {
    timer, timerInterval, isTestRunning, startTime, endTime,
    totalTyped, correctTyped, currentWordIndex, currentCharIndex,
    words, currentMode, currentDifficulty,
    setWords, resetTypingState
} from './state.js';
import {
    inputField, timerElement, wpmElement, accuracyElement, progressBar,
    resultsModal, resultWpm, resultAccuracy, resultCorrect, resultWrong,
    easyBtn, mediumBtn, hardBtn, timeModeBtn, wordsModeBtn, quoteModeBtn, timeOptions, timeOptionsContainer
} from './elements.js';
import { updateTimer } from './timer.js';
import { loadNewText } from './textLoader.js';

export function startTest() {
    if (isTestRunning) return;
    isTestRunning = true;
    startTime = new Date().getTime();

    if (currentMode === 'time') {
        timerInterval = setInterval(updateTimer, 1000);
    }

    inputField.focus();
}

export function endTest() {
    clearInterval(timerInterval);
    isTestRunning = false;
    endTime = new Date().getTime();
    inputField.disabled = true;

    const timeInMinutes = (endTime - startTime) / 60000;
    const wpm = Math.round((correctTyped / 5) / timeInMinutes);
    const accuracy = Math.round((correctTyped / totalTyped) * 100);

    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + '%';
    resultCorrect.textContent = correctTyped;
    resultWrong.textContent = totalTyped - correctTyped;

    resultsModal.classList.remove('hidden');
}

export function resetTest() {
    clearInterval(timerInterval);
    isTestRunning = false;

    const activeTimeOption = document.querySelector('.time-option.active');
    timer = activeTimeOption ? parseInt(activeTimeOption.dataset.time) : 30;

    resetTypingState();

    timerElement.textContent = timer;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0';
    progressBar.style.width = '0%';

    inputField.value = '';
    inputField.disabled = false;

    loadNewText();
}

export function setDifficulty(difficulty) {
    currentDifficulty = difficulty;

    easyBtn.classList.remove('easy-active', 'active');
    mediumBtn.classList.remove('medium-active', 'active');
    hardBtn.classList.remove('hard-active', 'active');

    if (difficulty === 'easy') easyBtn.classList.add('easy-active', 'active');
    if (difficulty === 'medium') mediumBtn.classList.add('medium-active', 'active');
    if (difficulty === 'hard') hardBtn.classList.add('hard-active', 'active');

    resetTest();
}

export function setMode(mode) {
    currentMode = mode;

    timeModeBtn.classList.remove('active');
    wordsModeBtn.classList.remove('active');
    quoteModeBtn.classList.remove('active');

    if (mode === 'time') {
        timeModeBtn.classList.add('active');
        timeOptionsContainer.classList.remove('hidden');
    } else {
        timeOptionsContainer.classList.add('hidden');
        if (mode === 'words') wordsModeBtn.classList.add('active');
        if (mode === 'quote') quoteModeBtn.classList.add('active');
    }

    resetTest();
}

export function setTime(seconds) {
    timer = seconds;
    timerElement.textContent = timer;

    timeOptions.forEach(option => {
        option.classList.remove('active');
        if (parseInt(option.dataset.time) === seconds) {
            option.classList.add('active');
        }
    });
}
