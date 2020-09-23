class Car {
	constructor(x, y, angle, image) {
		this.pos = createVector(x, y);
		this.angle = angle;
		this.image = image;

		this.acc = 0;
		this.vel = createVector(0, 0);
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);

		image(this.image, 0, 0, 100, 100);
		pop();
	}

	update() {
		if (keyIsDown(87)) {
			// 87 is key code for 'w'
			timerShouldRun = true;
			if (this.gccEquals([88, 88, 88]))
				this.acc += 0.1;
			else if (
				this.gccEquals([255,
					255,
					255,
				])
			) {
				this.acc += 0.2;
			} else if (
				this.gccEquals([14, 209, 69]) // green
			) {
				timerShouldRun = false;
				this.teleport(200, 200)
				nextLevel(this);
			} else if (this.gccEquals([
					236, 28, 36
				])) {
				this.teleport(TRACKS[currentIndex].spawn[0], TRACKS[currentIndex].spawn[1], TRACKS[currentIndex].spawn[2])
			} else {
				this.acc = 0.2;
			}
		} else {
			if (this.gccEquals([88, 88, 88]) || this.gccEquals([255, 255, 255])) {
				if (this.acc - 0.1 >= 0) {
					this.acc -= 0.1;
				} else {
					this.acc = 0;
				}
			} else {
				if (this.acc - 0.4 >= 0) {
					this.acc -= 0.4;
				} else {
					this.acc = 0;

				}
			}
		}

		this.vel = getVectorFromMagnitudeAndDirection(
			this.acc,
			(this.angle + 90) % 360, // this is needed because in p5 0° is right.
		).limit(10);
		if (keyIsDown(65)) {
			//a
			setTimeout(
				() => {
					this.angle -= 3;
				}, 100
			)

		}

		if (keyIsDown(68)) {
			//s
			setTimeout(
				() => {
					this.angle += 3;
				}, 100
			)

		}

		this.pos.add(this.vel);
	}

	getCurrentColor() {
		let x = Math.floor(this.pos.x);
		let y = Math.floor(this.pos.y);
		let index = (x + y * width) * 4;
		return [
			pixels[index],
			pixels[index + 1],
			pixels[index + 2],
		];
	}

	gccEquals(arr) {
		return arraysEqual(this.getCurrentColor(), arr)
	}

	changePosition(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}

	teleport(x, y, angle) {
		setTimeout(() => {
			this.changePosition(x, y);
			this.vel = createVector(0, 0);
			this.acc = 0;
			this.angle = angle;
		}, 30);

	}
}