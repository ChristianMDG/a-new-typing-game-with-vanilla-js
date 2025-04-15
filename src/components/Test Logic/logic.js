function startTest() {
    // Start the test (timer and focus)
    if (isTestRunning) return;
    
    isTestRunning = true;
    startTime = new Date().getTime();
    
    if (currentMode === 'time') {
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    inputField.focus();
}

function updateTimer() {
    // Update and display the timer
    timer--;
    timerElement.textContent = timer;
    
    if (timer <= 0) {
        endTest();
    }
}

function endTest() {
    // End the test, calculate and display results
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

function resetTest() {
    // Reset the test (state, counters, UI)
    clearInterval(timerInterval);
    isTestRunning = false;
    
    const activeTimeOption = document.querySelector('.time-option.active');
    if (activeTimeOption) {
        timer = parseInt(activeTimeOption.dataset.time);
    } else {
        timer = 30;
    }
    
    totalTyped = 0;
    correctTyped = 0;
    currentWordIndex = 0;
    currentCharIndex = 0;
    
    timerElement.textContent = timer;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0';
    progressBar.style.width = '0%';
    
    inputField.value = '';
    inputField.disabled = false;
    
    loadNewText();
}