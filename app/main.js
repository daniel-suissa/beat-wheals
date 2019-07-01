
import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";


require(['./Interface', './config'], function(Interface, config) {
	let sketch = (sk) => { 

		let intfc = new Interface(sk);

		sk.preload = () => {
			intfc.preload()
		}
		var slider
		sk.setup = () => {
			sk.createCanvas(config.interfaceWidth, config.interfaceHeight);
			intfc.setup()
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

		sk.mouseReleased = () => {
			intfc.mouseReleased()
		}

		sk.touchEnded = () => {
			intfc.mouseReleased()
		}

		sk.mouseDragged = () => {
			intfc.mouseDragged()
		}

		sk.touchMoved = () => {
			intfc.mouseDragged()
		}
	}
	const P5 = new p5(sketch);
});




