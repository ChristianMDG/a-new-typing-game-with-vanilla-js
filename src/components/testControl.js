import { state } from "./state.js";
import { loadNewText } from "./loadNewText.js";
import { inputField, timerElement, wpmElement, accuracyElement, progressBar, resultsModal, resultWpm, resultAccuracy, resultCorrect, resultWrong } from './domElement.js';

export const resetTest = () => {
    clearInterval(state.timerInterval);
    state.isTestRunning = false;

    const activeTimeOption = document.querySelector('.time-option.active');
    state.timer = activeTimeOption ? parseInt(activeTimeOption.dataset.time) : 30;

    state.totalTyped = 0;
    state.correctTyped = 0;
    state.currentWordIndex = 0;
    state.currentCharIndex = 0;

    timerElement.textContent = state.timer;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0';
    progressBar.style.width = '0%';

    inputField.value = '';
    inputField.disabled = false;

    resultsModal.classList.add('hidden');
    loadNewText();
}

export const endTest = () => {
    clearInterval(state.timerInterval);
    state.isTestRunning = false;
    inputField.disabled = true;

    const timeInMinutes = (new Date().getTime() - state.startTime) / 60000;
    const wpm = Math.round((state.correctTyped / 5) / timeInMinutes);
    const accuracy = Math.round((state.correctTyped / state.totalTyped) * 100);

    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + '%';
    resultCorrect.textContent = state.correctTyped;
    resultWrong.textContent = state.totalTyped - state.correctTyped;

    resultsModal.classList.remove('hidden');
}
