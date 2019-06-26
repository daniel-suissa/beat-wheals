const SECS_IN_MIN = 60
const MILLISECS_IN_SEC = 1000
const FRAMES_IN_LAP = 400

define([], function() {
	class Hand {
		constructor(sk, x, y, length, rpm) {
			this.sk = sk
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

		draw() {
			const rps = (this.rpm / SECS_IN_MIN) 
			const fps = this.sk.frameRate()
			const step = rps * 2 * Math.PI / fps
			if (step > 10) {
				// invalid step, probably due to invalid fps
				return
			}
			
			this.sk.stroke(this.color)
			this.sk.strokeWeight(2);
  			this.sk.line(this.x, this.y, 
  				this.x + Math.sin(this.rotation) * this.length, 
  				this.y - Math.cos(this.rotation) * this.length);
  			this.rotation = (this.rotation + step) % (2 * Math.PI)
		}
	}
	return Hand
})