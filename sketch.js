let carImage,
	car,
	tracks = [],
	currentLevel = 0,
	timer = 0,
	timerInterval,
	timerShouldRun = false;

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

	car = new Car(TRACKS[0].spawn[0], TRACKS[0].spawn[1], TRACKS[0].spawn[2], carImage);

	timerInterval = window.setInterval(() => {
		if (timerShouldRun) {
			timer += 0.1;
		}

		timer = Number(timer.toFixed(2));
	}, 100)
}

function draw() {
	// main draw loop
	loadPixels();
	image(
		TRACKS[currentLevel].image,
		width / 2,
		height / 2,
		width,
		height,
	);
	car.update();
	car.show();
	textSize(40)
	text(timer.toString(), 20, 560)
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
	car.teleport(TRACKS[currentLevel + 1].spawn[0], TRACKS[currentLevel + 1].spawn[1], TRACKS[currentLevel + 1].spawn[2]); //FIXME
	++currentLevel;
	currentLevel %= TRACKS.length;
	setCookie(`highscoreLevel${currentLevel}`, timer, 1000)
	resetTimer()
}

function resetTimer() {
	timer = 0;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}