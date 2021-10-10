//varibles
let ready = false;

let synth;
let scale;
let volume;
let distortion;
let noteNumber;
let note = [];
let volumeLevel = -9;
let distortionLevel = 0.8;

let img;
let c = [];
let R;
let totalC;
//let URL = "";

function preload() {
  //initializedAudio
  document.getElementById('play').addEventListener('click', async () => {
    await Tone.start();
    console.log("audio is ready");
    initializeAudio();
  });

  //myImage = loadImage("Shanghai-shopping-street-night-1000x667.jpeg");
  myImage = loadImage("image02_hori.jpeg");

}

function setup() {
  let cnv = createCanvas(1100, 720);
  cnv.parent('myContainer');
  // img.resize(windowWidth, windowHeight);
  image(myImage, 0, 0);



  scale = Tonal.Scale.get("C4 major").notes;
  //create slider
  volSlider = createSlider(-30, 0, volumeLevel, 1);
  
  //assign #id to index.html
  volSlider.parent('volume_control')
  //volSlider.style("width", "230px"); 
  //when slider is change, update function(updateVolume);
  volSlider.input(updateVolume);

  //create slider

  distortSlider = createSlider(0, 1, distortionLevel, 0.01);
  // distortSlider.style("width", "150px");
  distortSlider.input(updateDistortion);
  distortSlider .parent('distort_control')


}

function draw() {
  image(myImage, 0, 0); // background(myImage)

  //mouse move and change
  if (mouseX > 0 && mouseX < width) {
    // c is getting the color of mouseX and mouseY
    c = myImage.get(mouseX, mouseY);
    fill(c);
    stroke(0, 0, 0);
    circle(mouseX, mouseY, 30)

    //get color value
    R = c[0];
    G = c[1];
    B = c[2];
  } else {
    R = 0;
    G = 0;
    B = 0;
  }

  if (ready) {
    if (frameCount % 20 == 0) {
      // R,G,B value
      let noteNumber = G % 6;
      let note = mapNote(noteNumber, scale);

      //////THIS DOESN'T WORK, Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'triggerAttackRelease')

      //synth.envelope.decay = 0.5;
      synth.triggerAttackRelease(note, 0.5);
    }
  }
}

function initializeAudio() {
  console.log("Initialization is ready");

  //autoPanner = new Tone.AutoPanner("4n").toMaster().start();
 // autoPanner = new Tone.AutoPanner(distortionLevel).toDestination();

  // synth = new Tone.AMSynth({
  //   harmonicity: 1 / 2,
  //   detune: 0,
  //   oscillator: {
  //     type: "square"
  //   },
  //   envelope: {
  //     attack: 0.01,
  //     decay: 0.01,
  //     sustain: 0.5,
  //     release: 0.5
  //   },
  //   modulation: {
  //     type: "square"
  //   },
  //   modulationEnvelope: {
  //     attack: 0.05,
  //     decay: 0,
  //     sustain: 1,
  //     release: 0.5
  //   }
  // })

  //pingPong = new Tone.PingPongDelay("6n", 0.6)

  // //create distortion effect
  // distortion = new Tone.Distortion(distortionLevel)//.toDestination();

  // //New Effect:
  // chorus = new Tone.Chorus(20, 2.5, 0.5).toDestination();
  // synth.connect(distortion);
  // distortion.connect(pingPong);
  // pingPong.connect(chorus);

  Tone.loaded().then(() => {
    console.log("Tone is loaded")
    synth.triggerAttackRelease('C3', 0.5);
   
    Tone.Master.volume.value = volumeLevel;
    //when loading is finish, ready is true
    ready = true;
  });
}

function mousePressed() {
  if (ready && mouseY < height) {
    // trigger the basic sample
    let noteNumber = 3;
    let note = mapNote(noteNumber, scale);
    synth.triggerAttackRelease(note, 0.5);
  }
}

//helper function for working with notes
function modulo(n, m) {
  return ((n % m) + m) % m;
}

//helper function for working with notes
function mapNote(noteNumber, scale) {
  let numNotes = scale.length;
  let i = modulo(noteNumber, numNotes);
  let note = scale[i];
  let octaveTranspose = floor(noteNumber / numNotes);
  let interval = Tonal.Interval.fromSemitones(octaveTranspose * 12);

  return Tonal.Note.transpose(note, interval);
}

//function for sending socket data
function sendData(data) {
  console.log("data sent: " + data);
  receiveData(data);
}

//function for receiving socket data
function receiveData(data) {
  console.log("data received: " + data);
  if (data.notes) {
    synth.triggerAttackRelease(data.note, 0.5);
  }
  if (data.volume) {
    Tone.Master.volume.value = volumeLevel;
  }
  if (data.distortion) {
    distortion.distortion = data.distortion;
  }
}

//function for updating volume based on slider (using master volume)
function updateVolume() {
  volumeLevel = volSlider.value();
  let data = {
    name: "adam",
    notes: null,
    volume: volumeLevel,
    distortion: null,
  };
  sendData(data);
}

function updateDistortion() {
  distortionLevel = distortSlider.value();
  let data = {
    name: "adam",
    notes: null,
    volume: null,
    distortion: distortionLevel,
  };
  sendData(data);
}