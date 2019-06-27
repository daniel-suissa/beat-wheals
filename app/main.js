/*
TODO: 
 - create hit indication on beats
*/



import p5 from "p5";
import "p5/lib/addons/p5.sound";


var count = 0
require(['./Interface', './config'], function(Interface, config) {
	let sketch = (sk) => { 
		sk.setup = () => {
			sk.intfc = new Interface(sk);
			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			sk.background(config.backgroundColor)
			sk.intfc.draw(sk)
		}
		sk.mouseClicked = () => {
			sk.intfc.mousePressed()
		}
	}
	const P5 = new p5(sketch);
});




