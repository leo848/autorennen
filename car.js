class Car {
	constructor (x, y, angle, image) {
		this.pos = createVector(x, y);
		this.angle = angle;
		this.image = image;

		this.acc = 0;
		this.vel = createVector(0, 0);
	}

	show () {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);

		image(this.image, 0, 0, 100, 100);
		pop();
	}

	update () {
		if (keyIsDown(87)) {
			// 87 is key code for 'w'
			if (
				arraysEqual(
					this.getCurrentColor(),
					[ 88, 88, 88 ],
				)
			)
				this.acc += 0.1;
			else if (
				arraysEqual(
					this.getCurrentColor(),
					[ 255, 255, 255 ],
				)
			) {
				this.acc += 0.2;
			} else if (
				arraysEqual(
					this.getCurrentColor(),
					[ 14, 209, 69 ],
				)
			) {
				document.body.innerHTML =
					'Geschafft!';
			} else {
				this.acc = 0.2;
			}
		} else {
			if (this.acc - 0.1 >= 0) {
				this.acc -= 0.1;
			} else {
				this.acc = 0;
			}
		}

		this.vel = getVectorFromMagnitudeAndDirection(
			this.acc,
			(this.angle + 90) % 360, // this is needed because in p5 0° is right.
		).limit(10);
		if (keyIsDown(65)) {
			//a
			this.angle -= 3;
		}

		if (keyIsDown(68)) {
			//s
			this.angle += 3;
		}

		this.pos.add(this.vel);
	}

	getCurrentColor () {
		let x = Math.floor(this.pos.x);
		let y = Math.floor(this.pos.y);
		let index = (x + y * width) * 4;
		return [
			pixels[index],
			pixels[index + 1],
			pixels[index + 2],
		];
	}
}
