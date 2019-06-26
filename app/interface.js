/*
TODO: 
 - extract drawing functions to p5
 - make half of each wheel a button
 - make beats clickable
 - clean fixDpi function
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

		}

		createHand() {
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.baseRadius + (this.wheel_amt - 1 ) * this.stepRadius
			this.hand = new Hand(xCenter, yCenter, length, 30)
		}
		

		draw(sk) {
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
	    	const baseRadius = 75
			const stepRadius = 70
			//draw wheels outside in
			for (var i = this.wheel_amt - 1; i > -1 ; i--) {
				let radius = baseRadius + stepRadius * i
				let wheel = new Wheel(radius, xCenter, yCenter)
				this.wheels.push(wheel)
				wheel.draw(sk)
			}
			this.hand.draw(sk)
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
	}
	const P5 = new p5(sketch);
});




