let carImage, car, track;

function preload (){
	carImage = loadImage('auto.png');
	track = loadImage('strecke1.png');
}

function setup (){
	createCanvas(
		min(windowWidth, windowHeight),
		min(windowWidth, windowHeight),
	);
	background(20);
	imageMode(CENTER);
	angleMode(DEGREES);
	noSmooth();
	car = new Car(250, 550, 180, carImage);
}

function draw (){
	loadPixels();
	image(
		track,
		width / 2,
		height / 2,
		width,
		height,
	);
	car.update();
	car.show();
}

function getVectorFromMagnitudeAndDirection ( // this is needed for the car movement.
	mag,
	dir,
){
	return createVector(
		mag * cos(dir),
		mag * sin(dir),
	);
}

function arraysEqual (a, b){
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
