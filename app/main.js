
import p5 from "p5";
import "p5/lib/addons/p5.sound";

require(['./Interface', './config'], function(Interface, config) {
	let sketch = (sk) => { 

		let intfc = new Interface(sk);

		sk.preload = () => {
			intfc.preload()
		}

		sk.setup = () => {
			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			sk.background(config.backgroundColor)
			intfc.draw(sk)
		}

		sk.mousePressed = () => {
			intfc.mousePressed()
		}

		sk.touchStarted = () => {
			intfc.mousePressed()
		}
	}
	const P5 = new p5(sketch);
});




