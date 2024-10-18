let analyser;
let isPlaying = false;
let soprano = ["C5", "F4", "F4", "F4", "Db5", "Bb4", "E4", "E4", "E4", "F4", "G4", "Ab4", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "Db5", "C5", "Bb4", "Ab4", "G4", "F4", "G4", "Ab4", "Bb4", "C5", "D5", "Eb5", "D5", "C5", "D5", "Eb5", "G5", "F5", "Eb5", "D5", "C5", "B4", "A4", "G4", "A4", "B4", "C5", "D5", "F5", "Ab5", "B4", "C5", "Eb5", "G5", "C6", "Db5", "C6", "Bb5","Db5", "C5", "Eb5", "Ab5", "C5", "Bb4", "Ab5", "G5", "Bb4", "Ab4", "C5", "F5", "Eb5", "Db5", "C5", "Bb4", "Ab4", "G4", "Db5", "C5", "Db5", "C5", "Db5", "C5", "C5", "C5", "Ab5", "Bb4", "C5", "Db5", "C5", "Bb4", "C5", "Db5", "C5", "Bb4", "Bb4", "Bb4", "G5", "Ab4", "Bb4", "C5", "Bb4", "Ab4", "Bb4", "C5", "Bb4", "Ab4", "Ab4", "Ab4", "Db5", "F4", "G4", "Ab4", "Bb4", "C5", "Db5", "Bb4", "C5", "Db5", "Bb4", "C5", "Db5", "C5", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "G4", ["Eb4", "Db4"]];//24
let alto = ["F4", "C4", "C4", "C4", "Ab4", "F4", "B3", "B3", "B3", "C4", "D4", "Eb4", "F4", "Eb4", "D4", "Eb4", "F4", "Ab4", "G4", "F4", "Eb4", "D4", "C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "Ab4", "G4", "F4", "G4", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "C5", "Bb4", "Ab4", "G4", "F4", "Eb4", "D4", "F4", "E4", "D4", "E4", "G4", "F4", "E4", "F4", null, "C5", "Bb4", "Ab4", "G4", null, "F4", "E4", "D4", "E4", "E4", "F4", "Ab4", "G4", "F4", "E4", "G4", "Bb4", "G4", "F4", "E4", "Ab4", "Ab4", "Ab4", "G4", "G4", "G4", "F4", "F4", "F4", "Eb4"];//22
let tenor = ["C4", "F3", "F3", "F3", "Db4", "Bb3", "E3", "E3", "E3", "F3", "G3", "Ab3", "Bb3", "Ab3", "G3", "Ab3", "Bb3", "Db4", "C4", "Bb3", "Ab3", "G3", "F3", "G3", "Ab3", "C4", "Bb3", "Ab3", "G3", "F3", "E3", "F3", "G3", "Bb3", "Ab3", "G3", "F3", "Ab3", "C4", "Ab4", "C4", "Ab3", "F3", "Ab3", "Db3", "F3", "Db3", "Bb2", "Eb3", "G3", "Bb3", "Eb4", "Bb3", "G3", "Eb3", "G3", "C3", "Eb3", "C3", "Ab2", "Db3", "Eb3", "F3", "Eb3", "Db3", "C3", "Bb2", "Ab2", "G2", "Bb2", "G2", "Eb2", "Ab2", "G2", "F2", "D3", "Eb3", "Eb2"];//24
let durations1 = ["8n", "8n", "8n", "8n", "16n", "16n", "8n", "8n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "16n", "16n", "16n", "16n", "4n + 16n", "16n", "16n", "16n", "4n + 8n", "8n", "4n + 8n", "8n", "4n + 8n", "8n", "4n + 8n", "8n", "8n", "8n", "16n","16n", "16n", "16n", "16n","16n", "16n", "16n", "8n", "8n", "8n", "8n", "16n","16n", "16n", "16n", "16n","16n", "16n", "16n", "8n", "8n", "8n", "8n + 16n", "16n","16n", "16n", "16n", "16n","16n", "16n", "16n", "16n","16n", "16n", "16n", "16n","16n", "16n", "16n", "16n","16n", "16n", "4n"];//24
let durations2 = ["8n", "8n", "8n", "8n", "16n", "16n", "8n", "8n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "16n", "16n","16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "8n", "8n + 16n", "16n", "16n", "16n", "4n", "16n", "16n", "16n", "16n", "4n + 8n", "8n", "4n + 16n", "16n", "16n", "16n", "16n", "16n", "8n + 16n", "16n", "16n", "16n", "8n", "8n", "4n + 2n", "8n", "8n", "4n + 2n", "8n", "8n", "4n", "8n"]; //22
let durations3 = ["8n", "8n", "8n", "8n", "16n", "16n", "8n", "8n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "8n", "8n", "8n", "8n",  "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "8n", "8n", "8n", "8n", "16n", "16n", "16n", "16n", "16n", "16n", "16n","16n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "4n"]; //24
let currentNote = 0;
let piano;
let pedalInterval;
let sopranoPart;
let altoPart;
let tenorPart;

window.addEventListener("load", () => {
  preload();
  setupAudio();
  setup();
});

function preload() {
  piano = new Tone.Sampler({
    urls: {
      "A0": "A0.mp3",
      "C1": "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      "A1": "A1.mp3",
      "C2": "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      "A2": "A2.mp3",
      "C3": "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      "A3": "A3.mp3",
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
      "C5": "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      "A5": "A5.mp3",
      "C6": "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      "A6": "A6.mp3",
      "C7": "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      "A7": "A7.mp3",
      "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
}

function setupAudio() {
  Tone.Transport.bpm.value = 68;

  function parseDuration(duration) {
    return duration.split(" + ").reduce((total, dur) => total + Tone.Time(dur).toSeconds(), 0);
  }

  let cumulativeTimeSoprano = 0;
  sopranoPart = new Tone.Part((time, note) => {
    piano.triggerAttackRelease(note.pitch, note.duration, time);
  }, soprano.map((note, index) => {
    let duration = durations1[index];
    let noteEvent = {
      time: cumulativeTimeSoprano,
      pitch: note,
      duration: duration,
    };
    cumulativeTimeSoprano += parseDuration(duration);
    return noteEvent;
  }));
  sopranoPart.loop = false;

  let cumulativeTimeAlto = Tone.Time("8n").toSeconds() * 16;
  altoPart = new Tone.Part((time, note) => {
    if (note.pitch !== null) {
      piano.triggerAttackRelease(note.pitch, note.duration, time);
    }
  }, alto.map((note, index) => {
    let duration = durations2[index];
    let noteEvent = {
      time: cumulativeTimeAlto,
      pitch: note,
      duration: duration,
    };
    cumulativeTimeAlto += parseDuration(duration);
    return noteEvent;
  }));
  altoPart.loop = false;
  
  let cumulativeTimeTenor = Tone.Time("8n").toSeconds() * 44;
  tenorPart = new Tone.Part((time, note) => {
    piano.triggerAttackRelease(note.pitch, note.duration, time);
  }, tenor.map((note, index) => {
    let duration = durations3[index];
    let noteEvent = {
      time: cumulativeTimeTenor,
      pitch: note,
      duration: duration,
    };
    cumulativeTimeTenor += parseDuration(duration);
    return noteEvent;
  }));
  tenorPart.loop = false;

  window.addEventListener("click", async () => {
    await Tone.start();
    if (!isPlaying) {
      isPlaying = true;
      Tone.Transport.start();
      sopranoPart.start(0); 
      altoPart.start(0);    
      tenorPart.start(0);   
    } else {
      isPlaying = false;
      Tone.Transport.stop();
      sopranoPart.stop();
      altoPart.stop();
      tenorPart.stop();
    }
  });
}
