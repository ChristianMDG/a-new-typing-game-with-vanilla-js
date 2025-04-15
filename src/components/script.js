document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const textDisplay = document.getElementById('text-display');
    const inputField = document.getElementById('input-field');
    const timerElement = document.getElementById('timer');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const progressBar = document.getElementById('progress-bar');
    const resultsModal = document.getElementById('results-modal');
    const resultWpm = document.getElementById('result-wpm');
    const resultAccuracy = document.getElementById('result-accuracy');
    const resultCorrect = document.getElementById('result-correct');
    const resultWrong = document.getElementById('result-wrong');
    const restartBtn = document.getElementById('restart-btn');
    const restartTypingBtn = document.getElementById('restart-typing');
    const timeModeBtn = document.getElementById('time-mode');
    const wordsModeBtn = document.getElementById('words-mode');
    const quoteModeBtn = document.getElementById('quote-mode');
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    const timeOptions = document.querySelectorAll('.time-option');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // State
    let timer = 30;
    let timerInterval;
    let isTestRunning = false;
    let startTime;
    let endTime;
    let totalTyped = 0;
    let correctTyped = 0;
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let words = [];
    let currentParagraph = '';
    let currentDifficulty = 'easy'; // 'easy', 'medium', 'hard'
    let currentMode = 'time'; // 'time', 'words', 'quote'
    
    // Sample texts by difficulty
    const sampleTexts = {
        easy: [
            "The quick brown fox jumps over the lazy dog. Simple sentences help beginners practice typing. Keep going and improve your speed.",
            "Learning to type quickly takes practice. Start slow and focus on accuracy. Speed will come with time and regular practice.",
            "Typing is an essential skill in today's digital world. Everyone should learn to type properly. It makes computer work much easier."
        ],
        medium: [
            "Artificial intelligence is transforming every walk of life. The future belongs to those who learn, unlearn and relearn. Technology is best when it brings people together.",
            "Neon lights flicker in the cyberpunk cityscape as rain falls endlessly. Hackers type furiously in dark rooms illuminated only by screen glow. The digital frontier awaits.",
            "Quantum computing harnesses the phenomena of quantum mechanics to deliver processing power unimaginable with today's computers. The future is quantum."
        ],
        hard: [
            "Pneumonoultramicroscopicsilicovolcanoconiosis is allegedly the longest word in English. Typing such complex words challenges even experienced typists. The supercalifragilisticexpialidocious typing test continues.",
            "The antidisestablishmentarianism movement was particularly strong in 19th century England. This sesquipedalian word demonstrates the complexity of the English lexicon and challenges typing proficiency.",
            "Floccinaucinihilipilification, meaning the estimation of something as worthless, is another example of an extraordinarily long word. Typing such terms requires both skill and patience from the typist."
        ]
    };
    
    // Tech quotes for quote mode
    const techQuotes = [
        "The computer was born to solve problems that did not exist before. - Bill Gates",
        "Software is a great combination between artistry and engineering. - Bill Gates",
        "The best way to predict the future is to invent it. - Alan Kay",
        "The most dangerous phrase in the language is, 'We've always done it this way.' - Grace Hopper",
        "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
        "The Internet is becoming the town square for the global village of tomorrow. - Bill Gates",
        "First, solve the problem. Then, write the code. - John Johnson",
        "Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them. - Steve Jobs",
        "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life. - Bill Gates",
        "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past. - Tim Berners-Lee"
    ];
    
    // Initialize
    function init() {
        loadNewText();
        setupEventListeners();
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            darkModeToggle.checked = true;
        }
    }
    
    // Toggle dark/light mode
    function toggleDarkMode() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }
    
    // Load new text based on current difficulty
    function loadNewText() {
        if (currentMode === 'quote') {
            const randomIndex = Math.floor(Math.random() * techQuotes.length);
            currentParagraph = techQuotes[randomIndex];
        } else {
            const texts = sampleTexts[currentDifficulty];
            const randomIndex = Math.floor(Math.random() * texts.length);
            currentParagraph = texts[randomIndex];
        }
        
        words = currentParagraph.split(' ');
        renderText();
    }
    
    // Render text
    function renderText() {
        textDisplay.innerHTML = '';
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'mr-2';
            
            if (wordIndex < currentWordIndex) {
                wordSpan.className += ' text-gray-500';
            }
            
            // Add each character
            for (let i = 0; i < word.length; i++) {
                const charSpan = document.createElement('span');
                
                if (wordIndex < currentWordIndex) {
                    charSpan.className = 'correct';
                } else if (wordIndex === currentWordIndex && i < currentCharIndex) {
                    charSpan.className = 'correct';
                } else if (wordIndex === currentWordIndex && i === currentCharIndex) {
                    charSpan.className = 'current';
                }
                
                charSpan.textContent = word[i];
                wordSpan.appendChild(charSpan);
            }
            
            // Add space after word
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = ' ';
            wordSpan.appendChild(spaceSpan);
            
            textDisplay.appendChild(wordSpan);
        });
    }
    
    // Start test
    function startTest() {
        if (isTestRunning) return;
        
        isTestRunning = true;
        startTime = new Date().getTime();
        
        if (currentMode === 'time') {
            timerInterval = setInterval(updateTimer, 1000);
        }
        
        inputField.focus();
    }
    
    // Update timer
    function updateTimer() {
        timer--;
        timerElement.textContent = timer;
        
        if (timer <= 0) {
            endTest();
        }
    }
    
    // End test
    function endTest() {
        clearInterval(timerInterval);
        isTestRunning = false;
        endTime = new Date().getTime();
        inputField.disabled = true;
        
        // Calculate results
        const timeInMinutes = (endTime - startTime) / 60000;
        const wpm = Math.round((correctTyped / 5) / timeInMinutes);
        const accuracy = Math.round((correctTyped / totalTyped) * 100);
        
        // Display results
        resultWpm.textContent = wpm;
        resultAccuracy.textContent = accuracy + '%';
        resultCorrect.textContent = correctTyped;
        resultWrong.textContent = totalTyped - correctTyped;
        
        // Show modal
        resultsModal.classList.remove('hidden');
    }
    
    // Reset test
    function resetTest() {
        clearInterval(timerInterval);
        isTestRunning = false;
        
        // Reset timer based on selected time option
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
    
    // Set difficulty
    function setDifficulty(difficulty) {
        currentDifficulty = difficulty;
        
        // Update button styles
        easyBtn.classList.remove('easy-active', 'active');
        mediumBtn.classList.remove('medium-active', 'active');
        hardBtn.classList.remove('hard-active', 'active');
        
        if (difficulty === 'easy') {
            easyBtn.classList.add('easy-active', 'active');
        } else if (difficulty === 'medium') {
            mediumBtn.classList.add('medium-active', 'active');
        } else {
            hardBtn.classList.add('hard-active', 'active');
        }
        
        resetTest();
    }
    
    // Set mode
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
    
    // Set time
    function setTime(seconds) {
        timer = seconds;
        timerElement.textContent = timer;
        
        // Update active time option
        timeOptions.forEach(option => {
            option.classList.remove('active');
            if (parseInt(option.dataset.time) === seconds) {
                option.classList.add('active');
            }
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Input field
        inputField.addEventListener('input', (e) => {
            if (!isTestRunning) {
                startTest();
            }
            
            const inputValue = e.target.value;
            const currentChar = inputValue[inputValue.length - 1];
            
            // Check if backspace was pressed
            if (e.inputType === 'deleteContentBackward') {
                if (currentCharIndex > 0) {
                    currentCharIndex--;
                    totalTyped--;
                    
                    // If we're at the start of a word, move to previous word
                    if (currentCharIndex < 0 && currentWordIndex > 0) {
                        currentWordIndex--;
                        currentCharIndex = words[currentWordIndex].length - 1;
                    }
                }
            } else {
                totalTyped++;
                
                // Check if character is correct
                if (currentChar === words[currentWordIndex][currentCharIndex]) {
                    correctTyped++;
                }
                
                currentCharIndex++;
                
                // Move to next word if we've reached the end of current word
                if (currentCharIndex >= words[currentWordIndex].length) {
                    currentWordIndex++;
                    currentCharIndex = 0;
                    
                    // Clear input field for next word
                    e.target.value = '';
                    
                    // Check if test is complete
                    if (currentWordIndex >= words.length) {
                        endTest();
                        return;
                    }
                }
            }
            
            // Update progress
            const progress = (currentWordIndex / words.length) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Update WPM and accuracy in real-time
            const timeElapsed = (new Date().getTime() - startTime) / 60000;
            const wpm = Math.round((correctTyped / 5) / timeElapsed) || 0;
            const accuracy = Math.round((correctTyped / totalTyped) * 100) || 0;
            
            wpmElement.textContent = wpm;
            accuracyElement.textContent = accuracy;
            
            renderText();
        });
        
        // Restart button
        restartBtn.addEventListener('click', () => {
            resultsModal.classList.add('hidden');
            resetTest();
        });
        
        // Restart typing button
        restartTypingBtn.addEventListener('click', () => {
            resetTest();
        });
        
        // Mode buttons
        timeModeBtn.addEventListener('click', () => setMode('time'));
        wordsModeBtn.addEventListener('click', () => setMode('words'));
        quoteModeBtn.addEventListener('click', () => setMode('quote'));
        
        // Time options
        timeOptions.forEach(option => {
            option.addEventListener('click', () => {
                setTime(parseInt(option.dataset.time));
            });
        });
        
        // Difficulty buttons
        easyBtn.addEventListener('click', () => setDifficulty('easy'));
        mediumBtn.addEventListener('click', () => setDifficulty('medium'));
        hardBtn.addEventListener('click', () => setDifficulty('hard'));
        
        // Share button
        document.getElementById('share-btn').addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'NeonType Results',
                    text: `I just scored ${resultWpm.textContent} WPM with ${resultAccuracy.textContent} accuracy on NeonType!`,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                alert('Web Share API not supported in your browser. WPM: ' + resultWpm.textContent);
            }
        });
        
        // Dark mode toggle
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
    
    // Start the app
    init();
});