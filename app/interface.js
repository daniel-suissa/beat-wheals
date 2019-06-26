/*
TODO: 
 - make half of each wheel a button
 - make beats clickable
 - separate interface from main
*/

import * as p5 from './p5.min.js'

var count = 0
require(['./Wheel', './Hand'], function (Wheel, Hand) {
	var Interface = class {
		constructor() {
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			this.wheel_amt = 4
			this.baseRadius = 75
			this.stepRadius = 70
			this.createHand();
			this.createWheels();
		}

		createHand() {
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.baseRadius + (this.wheel_amt - 1 ) * this.stepRadius
			this.hand = new Hand(xCenter, yCenter, length, 30)
		}
		
		createWheels() {
			this.wheels = []
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
	    	const baseRadius = 75
			const stepRadius = 70
			//draw wheels outside in
			for (var i = 0; i < this.wheel_amt ; i++) {
				let radius = baseRadius + stepRadius * i
				let wheel = new Wheel(radius, xCenter, yCenter)
				this.wheels.push(wheel)
			}
		}

		draw(sk) {
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
	    	const baseRadius = 75
			const stepRadius = 70
			//draw wheels outside in
			for (var i = this.wheel_amt - 1; i > -1 ; i--) {
				this.wheels[i].draw(sk)
			}
			this.hand.draw(sk)
		}

		getIntersectObj(sk, x, y) {
			for(var i = 0; i < this.wheels.length; i++) {
				let obj = this.wheels[i].getIntersectObj(sk, x, y)
				if (obj != null) {
					return obj
				}
			}
			return null
		}
		mousePressed(sk, mouseX, mouseY) {
			let obj = this.getIntersectObj(sk, mouseX, mouseY)

			if (obj != null) {
				obj.clickAction(mouseX, mouseY)
			}
		}
	}

	let intfc = new Interface();
	let sketch = (sk) => {    
		sk.setup = () => {

			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			intfc.draw(sk)
		}
		sk.mouseClicked = () => {
			sk.background('#ffffff')
			intfc.mousePressed(sk, sk.mouseX, sk.mouseY)
		}
	}
	const P5 = new p5(sketch);
});




