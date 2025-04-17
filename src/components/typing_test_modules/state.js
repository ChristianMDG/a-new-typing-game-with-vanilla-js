export let timer = 30;
export let timerInterval;
export let isTestRunning = false;
export let startTime;
export let endTime;
export let totalTyped = 0;
export let correctTyped = 0;
export let currentWordIndex = 0;
export let currentCharIndex = 0;
export let words = [];
export let currentParagraph = '';
export let currentDifficulty = 'easy';
export let currentMode = 'time';

export function resetState() {
    timer = 30;
    timerInterval = null;
    isTestRunning = false;
    startTime = null;
    endTime = null;
    totalTyped = 0;
    correctTyped = 0;
    currentWordIndex = 0;
    currentCharIndex = 0;
    words = [];
    currentParagraph = '';
    currentDifficulty = 'easy';
    currentMode = 'time';
}