backup for test sketch

let value=0;


function setup() {
  let cnv = createCanvas(800, 800);
  cnv.parent('myContainer');
}

function draw() {
  // if buttonRed value == 1, background is red, else if buttonRedvalue == 0, background is xxx
  if(value ==1){
      background('red');
  }
  // if buttonBlue value == 1, background is blue, else if xxxxxxxx
  if(value==2){
          background('black');
  }
  
  if(value==3){
    background('blue');
  }
}

// if arduino send value to P5, read the value
function mousePressed() {
  if (value >= 0){
  value++;
  }
  
  if(value >3){
     value=0;
  }
    console.log("value"+value);
}