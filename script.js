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

    const signLanguageImage = document.createElement('img');
    signLanguageImage.className = 'sign-language-image'; 
    signLanguageImage.src = signLanguageImages[array[index]];
    signLanguageImage.alt = 'Sign Language for ' + array[index];

    // Append the sign language image to the card
    card.appendChild(signLanguageImage);

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
    let array;
    let newIndex;

    if (card.querySelector('.front').innerText.match(/[AEIOU]/i)) {
        array = vowels;
    } else if (card === card.parentElement.firstChild) {
        array = consonantsAndSyllablesFirst;
    } else {
        array = consonantsAndSyllablesLast;
    }

    let index = parseInt(card.getAttribute('data-index'));
    newIndex = (index + direction + array.length) % array.length;
    card.setAttribute('data-index', newIndex);
    card.querySelector('.front').innerText = array[newIndex];
    card.querySelector('.back').innerText = array[(newIndex + 1) % array.length];

    // Find and update the sign language image
    const signLanguageImage = card.querySelector('.sign-language-image');
    if (signLanguageImage) {
        if (signLanguageImages[array[newIndex]]) {
            signLanguageImage.src = signLanguageImages[array[newIndex]];
            signLanguageImage.alt = 'Sign Language for ' + array[newIndex];
        } else {
            // Optional: Handle missing images
            signLanguageImage.src = 'path/to/placeholder.png'; // Path to a generic or placeholder image
        }
    }

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
            await speakLetter(word[i], 200); // 500ms delay between each letter
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

const signLanguageImages = {
    'A': './images/A.png',
    'B': './images/B.png',
    'C': './images/C.png',
    'D': './images/D.png',
    'E': './images/E.png',
    'F': './images/F.png',
    'G': './images/G.png',
    'H': './images/H.png',
    'I': './images/I.png',
    'J': './images/J.png',
    'K': './images/K.png',
    'L': './images/L.png',
    'M': './images/M.png',
    'N': './images/N.png',
    'O': './images/O.png',
    'P': './images/P.png',
    'Q': './images/Q.png',
    'R': './images/R.png',
    'S': './images/S.png',
    'T': './images/T.png',
    'U': './images/U.png',
    'V': './images/V.png',
    'W': './images/W.png',
    'X': './images/X.png',
    'Y': './images/Y.png',
    'Z': './images/Z.png',
    'AI': './images/AI.png',
    'AW': './images/AW.png',
    'AY': './images/AY.png',
    'BL': './images/BL.png',
    'BR': './images/BR.png',
    'CE': './images/CE.png',
    'CH': './images/CH.png',
    'CK': './images/CK.png',
    'CR': './images/CR.png',
    'DE': './images/DE.png',
    'EA': './images/EA.png',
    'EE': './images/EE.png',
    'FL': './images/FL.png',
    'GR': './images/GR.png',
    'IE': './images/IE.png',
    'KE': './images/KE.png',
    'LL': './images/LL.png',
    'ME': './images/ME.png',
    'MP': './images/MP.png',
    'ND': './images/ND.png',
    'NG': './images/NG.png',
    'NE': './images/NE.png',
    'NK': './images/NK.png',
    'OA': './images/OA.png',
    'OI': './images/OI.png',
    'OO': './images/OO.png',
    'OY': './images/OY.png',
    'PL': './images/PL.png',
    'PR': './images/PR.png',
    'QU': './images/QU.png',
    'RE': './images/RE.png',
    'SH': './images/SH.png',
    'SL': './images/SL.png',
    'SP': './images/SP.png',
    'SS': './images/SS.png',
    'ST': './images/ST.png',
    'TE': './images/TE.png',
    'TH': './images/TH.png',
    'TR': './images/TR.png',
    'UE': './images/UE.png',
    'VE': './images/VE.png',
    'WH': './images/WH.png'
};
