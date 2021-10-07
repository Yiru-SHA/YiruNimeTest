let Musicready = false;

document.getElementById('play').addEventListener('click', async () => {
  await Tone.start();
  console.log("audio is ready");
  initializeAudio();
});



// function preload() {
//   myImage = loadImage("Shanghai-shopping-street-night-1000x667.jpeg");
// }


function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent('myContainer');
 // image(myImage, 0, 0);

  // document.getElementById('play').addEventListener('click',()=>{
  //   background('red');
  // })
  // let button = createButton('play')
  // button.mousePressed();

}

function draw() {

}

function initializeAudio() {
  console.log("Initialization is ready");
}