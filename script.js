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
    'a': 'Images/a.png',
    'b': 'Images/b.png',
    'c': 'Images/c.png',
    'd': 'Images/d.png',
    'e': 'Images/e.png',
    'f': 'Images/f.png',
    'g': 'Images/g.png',
    'h': 'Images/h.png',
    'i': 'Images/i.png',
    'j': 'Images/j.png',
    'k': 'Images/k.png',
    'l': 'Images/l.png',
    'm': 'Images/m.png',
    'n': 'Images/n.png',
    'o': 'Images/o.png',
    'p': 'Images/p.png',
    'q': 'Images/q.png',
    'r': 'Images/r.png',
    's': 'Images/s.png',
    't': 'Images/t.png',
    'u': 'Images/u.png',
    'v': 'Images/v.png',
    'w': 'Images/w.png',
    'x': 'Images/x.png',
    'y': 'Images/y.png',
    'z': 'Images/z.png',
    'bl': 'Images/bl.png',
    'br': 'Images/br.png',
    'cr': 'Images/cr.png',
    'fl': 'Images/fl.png',
    'gr': 'Images/gr.png',
    'pl': 'Images/pl.png',
    'pr': 'Images/pr.png',
    'sl': 'Images/sl.png',
    'sp': 'Images/sp.png',
    'st': 'Images/st.png',
    'tr': 'Images/tr.png',
    'ch': 'Images/ch.png',
    'sh': 'Images/sh.png',
    'th': 'Images/th.png',
    'wh': 'Images/wh.png',
    'ck': 'Images/ck.png',
    'll': 'Images/ll.png',
    'ss': 'Images/ss.png',
    'ce': 'Images/ce.png',
    'de': 'Images/de.png',
    'ke': 'Images/ke.png',
    'me': 'Images/me.png',
    'ne': 'Images/ne.png',
    're': 'Images/re.png',
    'te': 'Images/te.png',
    've': 'Images/ve.png',
    'mp': 'Images/mp.png',
    'nd': 'Images/nd.png',
    'nk': 'Images/nk.png',
    'ng': 'Images/ng.png',
    'ea': 'Images/ea.png',
    'ai': 'Images/ai.png',
    'ee': 'Images/ee.png',
    'oa': 'Images/oa.png',
    'oo': 'Images/oo.png',
    'ie': 'Images/ie.png',
    'oi': 'Images/oi.png',
    'oy': 'Images/oy.png',
    'ay': 'Images/ay.png',
    'ue': 'Images/ue.png',
    'aw': 'Images/aw.png',
    'ow': 'Images/ow.png'
}
