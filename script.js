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
    upButton.setAttribute('onclick', 'changeCardContent(this, 1)');

    const downButton = document.createElement('button');
    downButton.className = 'arrow down';
    downButton.innerHTML = '&#9660;';
    downButton.setAttribute('onclick', 'changeCardContent(this, -1)');

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
    cards.forEach(card => {
        word += card.getAttribute('data-letter');
    });
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
}

const signLanguageImages = {
    'A': 'images/a.png',
    'B': 'images/b.png',
    'C': 'images/c.png',
    'D': 'images/d.png',
    'E': 'images/e.png',
    'F': 'images/f.png',
    'G': 'images/g.png',
    'H': 'images/h.png',
    'I': 'images/i.png',
    'J': 'images/j.png',
    'K': 'images/k.png',
    'L': 'images/l.png',
    'M': 'images/m.png',
    'N': 'images/n.png',
    'O': 'images/o.png',
    'P': 'images/p.png',
    'Q': 'images/q.png',
    'R': 'images/r.png',
    'S': 'images/s.png',
    'T': 'images/t.png',
    'U': 'images/u.png',
    'V': 'images/v.png',
    'W': 'images/w.png',
    'X': 'images/x.png',
    'Y': 'images/y.png',
    'Z': 'images/z.png',
    'BL': 'images/bl.png',
    'BR': 'images/br.png',
    'CR': 'images/cr.png',
    'FL': 'images/fl.png',
    'GR': 'images/gr.png',
    'PL': 'images/pl.png',
    'PR': 'images/pr.png',
    'SL': 'images/sl.png',
    'SP': 'images/sp.png',
    'ST': 'images/st.png',
    'TR': 'images/tr.png',
    'CH': 'images/ch.png',
    'SH': 'images/sh.png',
    'TH': 'images/th.png',
    'WH': 'images/wh.png',
    'CK': 'images/ck.png',
    'LL': 'images/ll.png',
    'SS': 'images/ss.png',
    'CE': 'images/ce.png',
    'DE': 'images/de.png',
    'KE': 'images/ke.png',
    'ME': 'images/me.png',
    'NE': 'images/ne.png',
    'RE': 'images/re.png',
    'TE': 'images/te.png',
    'VE': 'images/ve.png',
    'MP': 'images/mp.png',
    'ND': 'images/nd.png',
    'NK': 'images/nk.png',
    'ST': 'images/st.png',
    'NG': 'images/ng.png',
    'EA': 'images/ea.png',
    'AI': 'images/ai.png',
    'EE': 'images/ee.png',
    'OA': 'images/oa.png',
    'OO': 'images/oo.png',
    'IE': 'images/ie.png',
    'OI': 'images/oi.png',
    'OY': 'images/oy.png',
    'AY': 'images/ay.png',
    'UE': 'images/ue.png',
    'AW': 'images/aw.png',
    'OW': 'images/ow.png',
    'UE': 'images/ue.png',
    'AW': 'images/aw.png',
    'OW': 'images/ow.png'
};
