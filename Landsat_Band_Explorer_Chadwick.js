// Old setup
/* function setup() {
  redImage = loadImage('data/B2_Small.png');
  greenImage = loadImage('data/B3_Small.png');
  blueImage = loadImage('data/B4_Small.png'); */

// Global variables
let landsatBands = [];
let numBands = 7;
let selectedBands = { red: 4, green: 3, blue: 2 }; // Default to natural color composite
let composite;

// Preload the images
function preload() {
  for (let i = 1; i <= numBands; i++) {
    landsatBands[i] = loadImage('data/B'+i+'.png');
  }
}

// Create the canvas and UI elements
function setup() {
  createCanvas(landsatBands[1].width, landsatBands[1].height);
  composite = createImage(width, height);

  createSpan("Red: ");
  let redDropdown = createSelect();
  createSpan("Green: ");
  let greenDropdown = createSelect();
  createSpan("Blue: ");
  let blueDropdown = createSelect();

  for (let i = 1; i <= numBands; i++) {
    redDropdown.option('Band '+i, i);
    greenDropdown.option('Band '+i, i);
    blueDropdown.option('Band '+i, i);
  }

  redDropdown.selected(selectedBands.red);
  greenDropdown.selected(selectedBands.green);
  blueDropdown.selected(selectedBands.blue);

  redDropdown.changed(() => {
    selectedBands.red = parseInt(redDropdown.value());
    updateComposite();
  });

  greenDropdown.changed(() => {
    selectedBands.green = parseInt(greenDropdown.value());
    updateComposite();
  });

  blueDropdown.changed(() => {
    selectedBands.blue = parseInt(blueDropdown.value());
    updateComposite();
  });

  updateComposite();
}

// Draw the composite image
function draw() {
  background(0);
  image(composite, 0, 0);
}

// Update the composite image based on selected bands
function updateComposite() {
  composite.loadPixels();
  let redBand = landsatBands[selectedBands.red];
  let greenBand = landsatBands[selectedBands.green];
  let blueBand = landsatBands[selectedBands.blue];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let red = redBand.get(x, y)[0];
      let green = greenBand.get(x, y)[0];
      let blue = blueBand.get(x, y)[0];
      let index = (x + y * width) * 4;

      composite.pixels[index] = red;
      composite.pixels[index + 1] = green;
      composite.pixels[index + 2] = blue;
      composite.pixels[index + 3] = 255;
    }
  }
  composite.updatePixels();
}
