
define(['./Wheel', './Hand', './config'], function (Wheel, Hand, config) {
	var Interface = class {
		constructor(sk) {
			this.sk = sk
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			this.wheel_amt = config.wheels.amount
			this.baseRadius = config.wheels.baseRadius
			this.stepRadius = config.wheels.stepRadius
			this.rpm = config.hand.defaultRpm
			this.createHand();
			this.createWheels();
		}

		createHand() {
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.baseRadius + (this.wheel_amt - 1 ) * this.stepRadius
			this.hand = new Hand(this.sk, xCenter, yCenter, length, this.rpm)
		}
		
		createWheels() {
			this.wheels = []
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			//draw wheels outside in
			for (var i = 0; i < this.wheel_amt ; i++) {
				let radius = this.baseRadius + this.stepRadius * i
				let wheel = new Wheel(this.sk, radius, xCenter, yCenter)
				this.wheels.push(wheel)
			}
		}

		draw() {
			//draw wheels outside in
			for (var i = this.wheel_amt - 1; i > -1 ; i--) {
				this.wheels[i].draw(this.hand.rotation)
			}
			this.hand.draw()
		}

		getIntersectObj(x, y) {
			for(var i = 0; i < this.wheels.length; i++) {
				let obj = this.wheels[i].getIntersectObj(x, y)
				if (obj != null) {
					return obj
				}
			}
			return null
		}
		mousePressed() {
			let obj = this.getIntersectObj(this.sk.mouseX, this.sk.mouseY)

			if (obj != null) {
				obj.clickAction(this.sk.mouseX, this.sk.mouseY)
			}
		}
	}
	return Interface
})