import { loadNewText } from './textLoader.js';
import { setupEventListeners } from './events.js';
import { darkModeToggle } from './elements.js';

document.addEventListener('DOMContentLoaded', function () {
    loadNewText();
    setupEventListeners();

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        darkModeToggle.checked = true;
    }
});
