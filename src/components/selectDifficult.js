document.addEventListener('DOMContentLoaded', () => {
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    const textDisplay = document.getElementById('text-display')

    // les contenu à afficher
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

    const setDifficulty = (difficulty) => {
        // currentDifficulty = difficulty;

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
    }


    // make background for difficul button
    easyBtn.addEventListener('click', () => setDifficulty('easy'));
    mediumBtn.addEventListener('click', () => setDifficulty('medium'));
    hardBtn.addEventListener('click', () => setDifficulty('hard'));


})