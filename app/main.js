/*
TODO: 
 - make half of each wheel a button
 - make beats clickable
 - separate interface from main
*/

import * as p5 from './p5.min.js'

var count = 0
require(['./interface'], function(Interface) {
	let sketch = (sk) => {    
		sk.setup = () => {
			sk.intfc = new Interface();
			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			sk.intfc.draw(sk)
		}
		sk.mouseClicked = () => {
			sk.background('#ffffff')
			sk.intfc.mousePressed(sk, sk.mouseX, sk.mouseY)
		}
	}
	const P5 = new p5(sketch);
});




