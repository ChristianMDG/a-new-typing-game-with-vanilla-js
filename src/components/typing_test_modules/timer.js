import { timerElement } from './elements.js';
import { timer } from './state.js';
import { endTest } from './testControl.js';

export function updateTimer() {
    timer--;
    timerElement.textContent = timer;

    if (timer <= 0) {
        endTest();
    }
}