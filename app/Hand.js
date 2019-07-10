const SECS_IN_MIN = 60
const MILLISECS_IN_SEC = 1000
const FRAMES_IN_LAP = 400

define(['./config/common', './common'], function(config, common) {
	class Hand {
		constructor(sk, x, y, length, wheels) {
			this.sk = sk
			this.color = config.handConfig.color
			this.baseWidth = common.getHeight(config.handConfig.baseWidth)
			this.x = x
			this.y = y
			this.length = length
			this.wheels = wheels
			this.stop()
		}

		position(canvas) {
			// place hand in the middle of the canvas
			const {top, left} = this.container.position(); 
			this.handElem.css({
				top: top + this.container.height() / 2, 
				left: left + this.container.width() / 2})
		}

		update(rpm) {
			const rps = (rpm / SECS_IN_MIN) 
			const fps = this.sk.frameRate()
			const step = rps * 2 * Math.PI / fps
			if (step > 10) {
				// invalid step, probably due to invalid fps
				return
			}

			const x1 = this.x - Math.cos(this.rotation) * this.baseWidth/2
			const y1 = this.y - Math.sin(this.rotation) * this.baseWidth/2
			const x2 = this.x + Math.cos(this.rotation) * this.baseWidth/2
			const y2 = this.y + Math.sin(this.rotation) * this.baseWidth/2
			const x3 = this.x + Math.sin(this.rotation) * this.length
			const y3 = this.y - Math.cos(this.rotation) * this.length

			this.sk.fill(this.color)
			this.sk.triangle(x1,y1,x2,y2,x3,y3)
			
  			/*this.sk.line(this.x, this.y, 
  				this.x + Math.sin(this.rotation) * this.length, 
  				this.y - Math.cos(this.rotation) * this.length);*/
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
			const deltaFromBeat = Math.abs(this.rotation - beat.radians) 
			if (deltaFromBeat < 0.1) {
				return true
			} 
			return false
		}

		backToZero() {
			this.rotation = 0
		}

		stop() {
			this.draw = () => {}
			
		}
		start() {
			this.rotation = 0.98 * 2 * Math.PI
			this.draw = this.update
		}
		continue() {
			this.draw = this.update
		}

	}
	return Hand
})