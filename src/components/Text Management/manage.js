function loadNewText() {
    // Load new text based on mode (quote or difficulty)
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

function renderText() {
    // Display text with formatting (correct/current characters)
    textDisplay.innerHTML = '';
    
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'mr-2';
        
        if (wordIndex < currentWordIndex) {
            wordSpan.className += ' text-gray-500';
        }
        
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
        
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = ' ';
        wordSpan.appendChild(spaceSpan);
        
        textDisplay.appendChild(wordSpan);
    });
}