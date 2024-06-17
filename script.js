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
    'a': 'images/a.png',
    'b': 'images/b.png',
    'c': 'images/c.png',
    'd': 'images/d.png',
    'e': 'images/e.png',
    'f': 'images/f.png',
    'g': 'images/g.png',
    'h': 'images/h.png',
    'i': 'images/i.png',
    'j': 'images/j.png',
    'k': 'images/k.png',
    'l': 'images/l.png',
    'm': 'images/m.png',
    'n': 'images/n.png',
    'o': 'images/o.png',
    'p': 'images/p.png',
    'q': 'images/q.png',
    'r': 'images/r.png',
    's': 'images/s.png',
    't': 'images/t.png',
    'u': 'images/u.png',
    'v': 'images/v.png',
    'w': 'images/w.png',
    'x': 'images/x.png',
    'y': 'images/y.png',
    'z': 'images/z.png',
    'bl': 'images/bl.png',
    'br': 'images/br.png',
    'cr': 'images/cr.png',
    'fl': 'images/fl.png',
    'gr': 'images/gr.png',
    'pl': 'images/pl.png',
    'pr': 'images/pr.png',
    'sl': 'images/sl.png',
    'sp': 'images/sp.png',
    'st': 'images/st.png',
    'tr': 'images/tr.png',
    'ch': 'images/ch.png',
    'sh': 'images/sh.png',
    'th': 'images/th.png',
    'wh': 'images/wh.png',
    'ck': 'images/ck.png',
    'll': 'images/ll.png',
    'ss': 'images/ss.png',
    'ce': 'images/ce.png',
    'de': 'images/de.png',
    'ke': 'images/ke.png',
    'me': 'images/me.png',
    'ne': 'images/ne.png',
    're': 'images/re.png',
    'te': 'images/te.png',
    've': 'images/ve.png',
    'mp': 'images/mp.png',
    'nd': 'images/nd.png',
    'nk': 'images/nk.png',
    'ng': 'images/ng.png',
    'ea': 'images/ea.png',
    'ai': 'images/ai.png',
    'ee': 'images/ee.png',
    'oa': 'images/oa.png',
    'oo': 'images/oo.png',
    'ie': 'images/ie.png',
    'oi': 'images/oi.png',
    'oy': 'images/oy.png',
    'ay': 'images/ay.png',
    'ue': 'images/ue.png',
    'aw': 'images/aw.png',
    'ow': 'images/ow.png'
};
