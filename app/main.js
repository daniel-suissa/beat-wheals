/*
TODO: 
 - change the draw function to 'update'
*/



import p5 from "p5";
import "p5/lib/addons/p5.sound";


var count = 0
require(['./Interface'], function(Interface) {
	let sketch = (sk) => { 
		sk.setup = () => {
			sk.intfc = new Interface(sk);
			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			sk.intfc.draw(sk)
		}
		sk.mouseClicked = () => {
			sk.background('#ffffff')
			sk.intfc.mousePressed()
		}
	}
	const P5 = new p5(sketch);
});




