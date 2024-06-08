const consonantsAndSyllables = [
    'B', 'CH', 'D', 'SH', 'T', 'TH', 'G', 'GH', 'K', 'PH', 
    'R', 'WH', 'P', 'NG', 'L', 'F', 'S', 'Z', 'V', 'J', 
    'M', 'N', 'QU', 'X', 'Y'
];
const vowels = ['A', 'E', 'I', 'O', 'U', 'AE', 'EE', 'IE', 'OA', 'OO'];

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById('card-container');

    // Create first card with consonants/syllables
    cardContainer.appendChild(createCard(consonantsAndSyllables, 0));

    // Create middle card with vowels
    cardContainer.appendChild(createCard(vowels, 0));

    // Create last card with consonants/syllables
    cardContainer.appendChild(createCard(consonantsAndSyllables, 1));
});

function createCard(array, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-letter', array[index]);
    card.setAttribute('data-index', index);
    card.setAttribute('onclick', 'voiceCard(this)');

    const upButton = document.createElement('button');
    upButton.className = 'arrow up';
    upButton.innerHTML = '&#9650;';
    upButton.setAttribute('onclick', 'changeCardContent(this, 1)');

    const downButton = document.createElement('button');
    downButton.className = 'arrow down';
    downButton.innerHTML = '&#9660;';
    downButton.setAttribute('onclick', 'changeCardContent(this, -1)');

    const innerCard = document.createElement('div');
    innerCard.className = 'inner-card';

    const front = document.createElement('div');
    front.className = 'front';
    front.innerText = array[index];

    const back = document.createElement('div');
    back.className = 'back';
    back.innerText = array[(index + 1) % array.length];

    innerCard.appendChild(front);
    innerCard.appendChild(back);

    card.appendChild(upButton);
    card.appendChild(innerCard);
    card.appendChild(downButton);

    return card;
}

function changeCardContent(button, direction) {
    const card = button.parentElement;
    const array = card.querySelector('.front').innerText.match(/[AEIOU]/i) ? vowels : consonantsAndSyllables;
    let index = parseInt(card.getAttribute('data-index'));
    index = (index + direction + array.length) % array.length;
    card.setAttribute('data-index', index);
    card.querySelector('.front').innerText = array[index];
    card.querySelector('.back').innerText = array[(index + 1) % array.length];
    actionsTaken = true;
}

let actionsTaken = false;

function readWord() {
    // if (!actionsTaken) {
    //     alert("Please interact with the cards before reading the word.");
    //     return;
    // }
    
    const cards = document.querySelectorAll('.card');
    let word = '';

    // Collect the word from the visible side of the cards
    cards.forEach(card => {
        const front = card.querySelector('.front');
        const back = card.querySelector('.back');
        word += card.classList.contains('flipped') ? back.textContent : front.textContent;
    });

    // Function to speak a letter
    function speakLetter(letter, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(letter);
                utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google UK English Female"));
                utterance.onend = resolve;
                speechSynthesis.speak(utterance);
            }, delay);
        });
    }

    // Speak each letter individually with a delay between each
    async function speakLettersAndWord() {
        for (let i = 0; i < word.length; i++) {
            await speakLetter(word[i], 300); // 500ms delay between each letter
        }
        
        // After speaking all letters, speak the whole word
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google UK English Female"));
        speechSynthesis.speak(utterance);
    }

    speakLettersAndWord();
}

function flipCard(button) {
    const card = button.parentElement;
    card.classList.toggle('flipped');
    actionsTaken = true;
}

function voiceCard(card) {
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');
    const letter = card.classList.contains('flipped') ? back.textContent : front.textContent;
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google UK English Female"));
    speechSynthesis.speak(utterance);
    actionsTaken = true;
}
