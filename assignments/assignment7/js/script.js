"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220,246.94,277.18,293.66,329.63,369.99,415.30,0.0
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;
// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let pattern = ['x','*','xo*',' ','x','x','xo','*'];
// Which beat of the pattern we're at right now
let patternIndex = 0;
// Disable the actions at mousePressed
let disableMousePressed = false;

let pingPongDelay;
let quadrafuzz;
let flanger;

// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });

  pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.5,
    time: 0.4,
    mix: 0.2
  });

  quadrafuzz = new Pizzicato.Effects.Quadrafuzz({
    lowGain: 0.1,
    midLowGain: 0.8,
    midHighGain: 0.1,
    mix: 1.0
  });

  flanger = new Pizzicato.Effects.Flanger({
    time: 0.1,
    speed: 1.0,
    depth: 1.0,
    feedback: 0.29,
    mix: 1
  });

  synth.addEffect(pingPongDelay);
  // synth.addEffect(quadrafuzz);
  synth.addEffect(flanger);

  // Load the three drum sounds as wav files
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });
  // kick.addEffect(pingPongDelay);

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });
  snare.addEffect(pingPongDelay);

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });
  hihat.addEffect(pingPongDelay);
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  let t = random(0.0,5.0)
  // If the mouse pressed actions are not disabled
  if (!disableMousePressed) {
    // Create a function loop() that will update the random multiples of NOTE_TEMPO
    (function loop() {
      // Get a random value between 0.1 and 3.0
      t = random(0.1,3.0);
      // Start a timeout for the notes with the multiple times the NOTE_TEMPO as a duration
      setTimeout(function(){
        // Call the function playNote()
        playNote();
        // Call the loop to generate a new random multiple
        loop();
      }, t*NOTE_TEMPO);
    }());
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);
    // Disable the mousePressed actions for the futur
    disableMousePressed = true;
  }
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  // Pick a random frequency from the array
  let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
  // Set the synth's frequency
  synth.frequency = frequency;
  // If the frequency is 'stop', stop the sound
  if (frequency === 0.0) {
    synth.stop();
  }
  else {
    // If it's note already play, play the synth
    synth.play();
  }
}

// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
