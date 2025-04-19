export const state = {
    timer: 30,
    timerInterval: null,
    isTestRunning: false,
    startTime: null,
    endTime: null,
    totalTyped: 0,
    correctTyped: 0,
    currentWordIndex: 0,
    currentCharIndex: 0,
    words: [],
    currentParagraph: '',
    currentDifficulty: 'easy',
    currentMode: 'time',
    typedWords: [],
    correctChars: [],      
    isSpaceCorrect: null,  
    

    initErrorTracking: function() {
        this.correctChars = this.words.map(word => new Array(word.length).fill(null));
        this.isSpaceCorrect = null;
    }
};