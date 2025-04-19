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
import { setupInputHandlers } from './inputHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const init = () => {
        loadNewText();
        setupInputHandlers(inputField); // Utilisation du nouveau gestionnaire d'input
        setupEventListeners();

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            darkModeToggle.checked = true;
        }
    };

    const setupEventListeners = () => {
        // Gardez seulement les listeners qui ne concernent pas la saisie directe
        restartBtn.addEventListener('click', resetTest);
        restartTypingBtn.addEventListener('click', resetTest);

        timeModeBtn.addEventListener('click', () => setMode('time'));
        wordsModeBtn.addEventListener('click', () => setMode('words'));
        quoteModeBtn.addEventListener('click', () => setMode('quote'));

        timeOptions.forEach(option => 
            option.addEventListener('click', () => setTime(parseInt(option.dataset.time))));

        easyBtn.addEventListener('click', () => setDifficulty('easy'));
        mediumBtn.addEventListener('click', () => setDifficulty('medium'));
        hardBtn.addEventListener('click', () => setDifficulty('hard'));
    };

    init();
});