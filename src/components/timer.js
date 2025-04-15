document.addEventListener('DOMContentLoaded', function() {
const timeModeBtn = document.getElementById('time-mode');
let timer = 30;
let timerInterval;
let currentMode = 'time';

timeModeBtn.addEventListener('click', () => setMode('time'));
wordsModeBtn.addEventListener('click', () => setMode('words'));
quoteModeBtn.addEventListener('click', () => setMode('quote'));


function setMode(mode) {
    currentMode = mode;
    
    // Update button styles
    timeModeBtn.classList.remove('active');
    wordsModeBtn.classList.remove('active');
    quoteModeBtn.classList.remove('active');
    
    if (mode === 'time') {
        timeModeBtn.classList.add('active');
        document.getElementById('time-options').classList.remove('hidden');
    } else if (mode === 'words') {
        wordsModeBtn.classList.add('active');
        document.getElementById('time-options').classList.add('hidden');
    } else {
        quoteModeBtn.classList.add('active');
        document.getElementById('time-options').classList.add('hidden');
    }
    
    resetTest();
}
})