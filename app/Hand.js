const SECS_IN_MIN = 60
const MILLISECS_IN_SEC = 1000
const FRAMES_IN_LAP = 400

define([], function() {
	class Hand {
		constructor(x, y, length, rpm, frameRate) {
			this.rpm = rpm
			this.color = '#ff5ee6'
			this.x = x
			this.y = y
			this.length = length
			this.rotation = 0
			this.rpm = rpm
		}

		position(canvas) {
			// place hand in the middle of the canvas
			const {top, left} = this.container.position(); 
			this.handElem.css({
				top: top + this.container.height() / 2, 
				left: left + this.container.width() / 2})
		}

		animate() {
			var rps = this.rpm / SECS_IN_MIN
			const updateInterval = 50
			var stepDeg = 360 * updateInterval  / MILLISECS_IN_SEC * rps 
			var rotation = 180;
			setInterval(() => {
				rotation = (rotation + stepDeg) % 360;
				this.handElem.css({
					"-moz-transform": `rotate(${rotation}deg)`,
				    "-ms-transform": `rotate(${rotation}deg)`,
				    "-webkit-transform": `rotate(${rotation}deg)`,
				    "transform": `rotate(${rotation}deg)`
			    })

				rps = this.rpm / SECS_IN_MIN
			}, updateInterval);
		}

		//TODO: move this to common
		toRadians (angle) {
		  return angle * (Math.PI / 180);
		}

		draw(sk) {
			const rps = (this.rpm / SECS_IN_MIN) 
			const fps = sk.frameRate()
			const step = rps * 360 / fps
			if (step > 10) {
				// invalid step, probably due to invalid fps
				return
			}
			
			sk.stroke(this.color)
			sk.strokeWeight(2);
  			sk.line(this.x, this.y, 
  				this.x + Math.cos(this.toRadians(this.rotation)) * this.length, 
  				this.y + Math.sin(this.toRadians(this.rotation)) * this.length);
  			this.rotation = (this.rotation + step) % 360
  			
		}
	}
	return Hand
})