const SECS_IN_MIN = 60
const MILLISECS_IN_SEC = 1000
const FRAMES_IN_LAP = 400

define(['./config'], function(config) {
	class Hand {
		constructor(sk, x, y, length, wheels) {
			this.sk = sk
			this.color = config.handConfig.color
			this.x = x
			this.y = y
			this.length = length
			this.rpm = config.handConfig.defaultRpm

			this.rotation = 0
			this.wheels = wheels
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
  			this.playIfNextBeatHit()
  			
		}

		playIfNextBeatHit() {
			for(var i = 0; i < this.wheels.length; i++) {
				let wheel = this.wheels[i]
				for (var j = 0; j < wheel.beats.length; j++) {
					let beat = wheel.beats[j]
					if (this.isBeatHit(beat)) {
						beat.play();
						beat.disable()
					} else {
						beat.enable()
					}
				}
			}
		}

		isBeatHit(beat) {
			const distanceFromBeat = Math.abs(this.rotation - beat.radians) 
			if (distanceFromBeat < 0.06) {
				return true
			} 
			return false
		}
	}
	return Hand
})