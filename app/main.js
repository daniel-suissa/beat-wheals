
import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";



require(['./Interface', './config/common'], function(Interface, config) {
	let sketch = (sk) => { 

		let intfc = new Interface(sk, config.defaultStyle);

		sk.preload = () => {
			intfc.preload()
		}
		
		sk.reset = (style) => {
			intfc = new Interface(sk, style)
			intfc.preload()
			intfc.setup()
		}

		sk.windowResized = () => {
		  sk.resizeCanvas(
				$('#canvas-container').width(), 
				$('#canvas-container').height());
		}

		sk.setup = () => {
			var canvas = sk.createCanvas(
				$('#canvas-container').width(), 
				$('#canvas-container').height());
			canvas.parent('canvas-container');
			intfc.setup()
		}

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




