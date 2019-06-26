/*
TODO: 
 - make half of each wheel a button
 - make beats clickable
 - separate interface from main
*/



import p5 from "p5";
import "p5/lib/addons/p5.sound";


var count = 0
require(['./interface'], function(Interface) {
	let sketch = (sk) => {    
		sk.setup = () => {
			sk.intfc = new Interface();
			sk.song = sk.loadSound('./assets/bass_sample.mp3');
			sk.createCanvas(window.innerWidth,window.innerHeight);
		}, 
		sk.draw = () => {
			sk.intfc.draw(sk)
		}
		sk.mouseClicked = () => {
			sk.background('#ffffff')
			sk.song.play()
			sk.intfc.mousePressed(sk, sk.mouseX, sk.mouseY)
		}
	}
	const P5 = new p5(sketch);
});




