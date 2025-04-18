// import { state } from './state.js';
// import { renderText } from './renderText.js';

// export const handleKeyPress = (e) => {
//     if (!state.isTestRunning) return;

//     const currentWord = state.words[state.currentWordIndex];
//     let typedWord = state.typedWords[state.currentWordIndex] || '';

//     if (e.key === ' ') {
//         // Fin d’un mot
//         state.currentWordIndex++;
//         state.currentCharIndex = 0;
//         state.typedWords[state.currentWordIndex] = state.typedWords[state.currentWordIndex] || '';
//     } else if (e.key === 'Backspace') {
//         // Supprimer un caractère
//         typedWord = typedWord.slice(0, -1);
//         state.typedWords[state.currentWordIndex] = typedWord;
//         state.currentCharIndex = Math.max(0, state.currentCharIndex - 1);
//     } else if (e.key.length === 1) {
//         // Ajouter un caractère
//         typedWord += e.key;
//         state.typedWords[state.currentWordIndex] = typedWord;
//         state.currentCharIndex++;
//     }

//     renderText(); // Met à jour l'affichage après chaque touche
// };
