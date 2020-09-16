let carImage,
	car,
	tracks = [],
	currentIndex = 0;

const MAX_LEVELS = 2;

let h1;

function preload() {
	carImage = loadImage('auto.png');
	for (let i = 0; i < TRACKS.length; i++) {
		TRACKS[i].image = loadImage(TRACKS[i].src)
	}
}

function setup() {
	createCanvas(
		min(600, min(windowWidth, windowHeight)),
		min(600, min(windowWidth, windowHeight)),
	);
	h1 = createDiv("0,0")
	noSmooth();
	pixelDensity(1);
	background(20);
	imageMode(CENTER);
	angleMode(DEGREES);

	car = new Car(tracks[0].spawn[0], tracks[0].spawn[1], 180, carImage);
}

function draw() {
	// main draw loop
	loadPixels();
	image(
		tracks[currentIndex],
		width / 2,
		height / 2,
		width,
		height,
	);
	car.update();
	car.show();
	h1.html(`${mouseX}, ${mouseY}`)
}

function getVectorFromMagnitudeAndDirection( // this is needed for the car movement.
	mag,
	dir,
) {
	return createVector(
		mag * cos(dir),
		mag * sin(dir),
	);
}

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function nextLevel(car) {
	car.teleport(); //FIXME
	++currentIndex;
	currentIndex %= MAX_LEVELS;
}