const consonantsAndSyllablesFirst = [
    'b', 'c', 'd', 'f', 'g', 'j', 'h', 'k', 'l', 'm', 
    'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z', 
    'bl', 'br', 'cr', 'fl', 'gr', 'pl', 'pr', 'sl', 'sp', 'st', 'tr', 'ch', 'sh', 'th', 'wh', ''
];

const vowels = ['a', 'e', 'i', 'o', 'u', 'ea', 'ai', 'ee', 'oa', 'oo', 'ie', 'oi', 'oy', 'ay', 'y', 'ue', 'aw', 'ow', 'a', ''];

const consonantsAndSyllablesLast = [
    'b', 'ck', 'd', 'g', 'k', 'll', 'l', 'm', 'n', 'p', 
    'r', 's', 'ss', 't', 'w', 'x', 'ce', 'de', 'ke', 'me', 'ne', 
    're', 'te', 've', 'mp', 'nd', 'nk', 'st', 'ng', 'sh', 'nk', 'th', 'ch', 'sh', 'ss', ''
];

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById('card-container');

    // Create first card with consonants/syllables (blue)
    cardContainer.appendChild(createCard(consonantsAndSyllablesFirst, 0, 'blue'));

    // Create middle card with vowels (orange)
    cardContainer.appendChild(createCard(vowels, 0, 'orange'));

    // Create last card with consonants/syllables (blue)
    cardContainer.appendChild(createCard(consonantsAndSyllablesLast, 0, 'blue'));
});

function createCard(array, index, colorClass) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-letter', array[index]);
    card.setAttribute('data-index', index);
    card.setAttribute('onclick', 'voiceCard(this)');

    const upButton = document.createElement('button');
    upButton.className = 'arrow up';
    upButton.innerHTML = '&#9650;';
    upButton.setAttribute('onclick', 'changeCardContent(event, this, 1)');

    const downButton = document.createElement('button');
    downButton.className = 'arrow down';
    downButton.innerHTML = '&#9660;';
    downButton.setAttribute('onclick', 'changeCardContent(event, this, -1)');

    const innerCard = document.createElement('div');
    innerCard.className = 'inner-card';

    const front = document.createElement('div');
    front.className = 'front ' + colorClass; // Add color class here
    front.innerText = array[index];

    const signLanguageImage = document.createElement('img');
    signLanguageImage.className = 'sign-language-image'; 
    signLanguageImage.src = signLanguageImages[array[index]];
    signLanguageImage.alt = 'Sign Language for ' + array[index];

    // Append the sign language image to the card
    card.appendChild(signLanguageImage);

    const back = document.createElement('div');
    back.className = 'back ' + colorClass; // Add color class here
    back.innerText = array[(index + 1) % array.length];

    innerCard.appendChild(front);
    innerCard.appendChild(back);

    card.appendChild(upButton);
    card.appendChild(innerCard);
    card.appendChild(downButton);

    return card;
}

function changeCardContent(event, button, direction) {
    event.stopPropagation(); // Prevent card click event
    const card = button.parentElement;
    let array;
    let newIndex;

    if (card.querySelector('.front').innerText.match(/[aeiou]/i)) {
        array = vowels;
    } else if (card === card.parentElement.firstChild) {
        array = consonantsAndSyllablesFirst;
    } else {
        array = consonantsAndSyllablesLast;
    }

    const currentIndex = parseInt(card.getAttribute('data-index'));
    newIndex = (currentIndex + direction + array.length) % array.length;

    card.querySelector('.front').innerText = array[newIndex];
    card.querySelector('.back').innerText = array[(newIndex + 1) % array.length];
    card.setAttribute('data-index', newIndex);
    card.setAttribute('data-letter', array[newIndex]);

    // Update the sign language image
    const signLanguageImage = card.querySelector('.sign-language-image');
    signLanguageImage.src = signLanguageImages[array[newIndex]];
    signLanguageImage.alt = 'Sign Language for ' + array[newIndex];
}

function voiceCard(card) {
    const letter = card.getAttribute('data-letter');
    const msg = new SpeechSynthesisUtterance(letter);
    window.speechSynthesis.speak(msg);
}

function readWord() {
    const cards = document.querySelectorAll('.card');
    let word = '';
    let utterances = [];

    cards.forEach(card => {
        const letter = card.getAttribute('data-letter');
        word += letter;
        const msg = new SpeechSynthesisUtterance(letter);
        utterances.push(msg);
    });

    const wordUtterance = new SpeechSynthesisUtterance(word);
    utterances.push(wordUtterance);

    // Speak each utterance in sequence
    utterances.reduce((promise, utterance) => {
        return promise.then(() => {
            return new Promise(resolve => {
                utterance.onend = resolve;
                window.speechSynthesis.speak(utterance);
            });
        });
    }, Promise.resolve());
}

const signLanguageImages = {
    'a': 'images/A.png',
    'b': 'images/B.png',
    'c': 'images/C.png',
    'd': 'images/D.png',
    'e': 'images/E.png',
    'f': 'images/F.png',
    'g': 'images/G.png',
    'h': 'images/H.png',
    'i': 'images/I.png',
    'j': 'images/J.png',
    'k': 'images/K.png',
    'l': 'images/L.png',
    'm': 'images/M.png',
    'n': 'images/N.png',
    'o': 'images/O.png',
    'p': 'images/P.png',
    'q': 'images/Q.png',
    'r': 'images/R.png',
    's': 'images/S.png',
    't': 'images/T.png',
    'u': 'images/U.png',
    'v': 'images/V.png',
    'w': 'images/W.png',
    'x': 'images/X.png',
    'y': 'images/Y.png',
    'z': 'images/Z.png',
    'bl': 'images/BL.png',
    'br': 'images/BR.png',
    'cr': 'images/CR.png',
    'fl': 'images/FL.png',
    'gr': 'images/GR.png',
    'pl': 'images/PL.png',
    'pr': 'images/PR.png',
    'sl': 'images/SL.png',
    'sp': 'images/SP.png',
    'st': 'images/ST.png',
    'tr': 'images/RT.png',
    'ch': 'images/CH.png',
    'sh': 'images/SH.png',
    'th': 'images/TH.png',
    'wh': 'images/WH.png',
    'ck': 'images/CK.png',
    'll': 'images/LL.png',
    'ss': 'images/SS.png',
    'ce': 'images/CE.png',
    'de': 'images/DE.png',
    'ke': 'images/KE.png',
    'me': 'images/ME.png',
    'ne': 'images/NE.png',
    're': 'images/RE.png',
    'te': 'images/TE.png',
    've': 'images/VE.png',
    'mp': 'images/MP.png',
    'nd': 'images/ND.png',
    'nk': 'images/NK.png',
    'ng': 'images/NG.png',
    'ea': 'images/EA.png',
    'ai': 'images/AI.png',
    'ee': 'images/EE.png',
    'oa': 'images/OA.png',
    'oo': 'images/OO.png',
    'ie': 'images/IE.png',
    'oi': 'images/OI.png',
    'oy': 'images/OY.png',
    'ay': 'images/AY.png',
    'ue': 'images/UE.png',
    'aw': 'images/AW.png',
    'ow': 'images/OW.png'
}
