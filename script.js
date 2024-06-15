const consonantsAndSyllablesFirst = [
    'B', 'C', 'D', 'F', 'G', 'J', 'H', 'K', 'L', 'M', 
    'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y', 'Z', 
    'BL', 'BR', 'CR', 'FL', 'GR', 'PL', 'PR', 'SL', 'SP', 'ST', 'TR', 'CH', 'SH', 'TH', 'WH', ''
];

const vowels = ['A', 'E', 'I', 'O', 'U', 'EA' , 'AI', 'EE' , 'OA', 'OO', 'IE', 'OI', 'OY', 'AY', 'Y', 'UE', 'AW', 'OW', 'A', ''];

const consonantsAndSyllablesLast = [
    'B', 'CK', 'D', 'G', 'K', 'LL', 'L', 'M', 'N', 'P', 
    'R', 'S', 'SS', 'T', 'W', 'X', 'CE', 'DE', 'KE', 'ME', 'NE', 
    'RE', 'TE', 'VE', 'MP', 'ND', 'NK', 'ST', 'NG', 'SH', 'NK', 'TH', 'CH', 'SH', 'SS', ''
];

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById('card-container');

    // Create first card with consonants/syllables
    cardContainer.appendChild(createCard(consonantsAndSyllablesFirst, 0));

    // Create middle card with vowels
    cardContainer.appendChild(createCard(vowels, 0));

    // Create last card with consonants/syllables
    cardContainer.appendChild(createCard(consonantsAndSyllablesLast, 0));
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

<<<<<<< HEAD
=======
    const frontImage = document.createElement('img');
    frontImage.className = 'sign-image';
    frontImage.src = `images/${array[index]}.png`; // Ensure the images are named correctly
>>>>>>> e7de8f2295fa8fca25fd442ec6382d2838bfad4b

    const back = document.createElement('div');
    back.className = 'back';
    back.innerText = array[(index + 1) % array.length];

    const backImage = document.createElement('img');
    backImage.className = 'sign-image';
    backImage.src = `images/${array[(index + 1) % array.length]}.png`; // Ensure the images are named correctly

    front.appendChild(frontImage);
    back.appendChild(backImage);

    innerCard.appendChild(front);
    
    innerCard.appendChild(back);

    card.appendChild(upButton);
    card.appendChild(innerCard);
    card.appendChild(downButton);

    return card;
}

function changeCardContent(button, direction) {
    const card = button.parentElement;
    let array;

    if (card.querySelector('.front').innerText.match(/[AEIOU]/i)) {
        array = vowels;
    } else if (card === card.parentElement.firstChild) {
        array = consonantsAndSyllablesFirst;
    } else {
        array = consonantsAndSyllablesLast;
    }

    let index = parseInt(card.getAttribute('data-index'));
    index = (index + direction + array.length) % array.length;
    card.setAttribute('data-index', index);

    const front = card.querySelector('.front');
    const back = card.querySelector('.back');
    front.innerText = array[index];
    back.innerText = array[(index + 1) % array.length];

    const frontImage = front.querySelector('img');
    const backImage = back.querySelector('img');
    frontImage.src = `images/${array[index]}.png`;
    backImage.src = `images/${array[(index + 1) % array.length]}.png`;

    actionsTaken = true;
}

let actionsTaken = false;

function readWord() {
   

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
            await speakLetter(word[i], 100); // 100ms delay between each letter
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
