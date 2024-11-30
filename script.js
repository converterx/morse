const morseCodeMap = {
  'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
  'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
  'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
  'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
  'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
  'Y': '-.--',  'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const textInput = document.getElementById('textInput');
const morseOutput = document.getElementById('morseOutput');
const textOutput = document.getElementById('textOutput');
const toMorse = document.getElementById('toMorse');
const toText = document.getElementById('toText');
const playSound = document.getElementById('playSound');
const playLight = document.getElementById('playLight');

function textToMorse(text) {
  return text.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
}

function morseToText(morse) {
  const reversedMap = Object.fromEntries(Object.entries(morseCodeMap).map(([k, v]) => [v, k]));
  return morse.split(' ').map(code => reversedMap[code] || code).join('');
}

toMorse.addEventListener('click', () => {
  morseOutput.value = textToMorse(textInput.value);
});

toText.addEventListener('click', () => {
  textOutput.value = morseToText(morseOutput.value);
});

function playMorseSound(morse) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let time = audioContext.currentTime;
  morse.split('').forEach(symbol => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, time);
    oscillator.connect(audioContext.destination);
    if (symbol === '.') {
      oscillator.start(time);
      oscillator.stop(time + 0.1);
      time += 0.2;
    } else if (symbol === '-') {
      oscillator.start(time);
      oscillator.stop(time + 0.3);
      time += 0.4;
    } else {
      time += 0.3;
    }
  });
}

playSound.addEventListener('click', () => {
  playMorseSound(morseOutput.value);
});

playLight.addEventListener('click', () => {
  let light = document.body;
  let symbols = morseOutput.value.split('');
  let i = 0;

  function flashLight() {
    if (i < symbols.length) {
      if (symbols[i] === '.') {
        light.style.backgroundColor = 'yellow';
        setTimeout(() => { light.style.backgroundColor = '#1a1a2e'; flashLight(); }, 200);
      } else if (symbols[i] === '-') {
        light.style.backgroundColor = 'yellow';
        setTimeout(() => { light.style.backgroundColor = '#1a1a2e'; flashLight(); }, 400);
      } else {
        setTimeout(flashLight, 200);
      }
      i++;
    }
  }
  flashLight();
});
