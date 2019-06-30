
//////Wheel
define(['./Beat'], function(Beat) {
	class Wheel {
		constructor(sk ,x ,y, radius, color, base) {
			this.sk = sk
			this.radius = radius
			this.base = base
			this.beats = this.createBeats(this.base)
			this.x = x
			this.y = y
			this.strokeColor = color
			this.fillColor = color
		}

		createBeats(num) {
			let beats = []
			for(var i = 0; i < num; i++) {
				const radians = i * 2 * Math.PI / num
				let beat = new Beat(this.sk, radians)
				beats.push(beat)
			}
			return beats
		}

		getBeatCenter(beat) {
			const x = this.x + this.radius  * Math.sin(beat.radians);
			const y = this.y - this.radius  * Math.cos(beat.radians);
			return {x: x, y: y}
		}

		draw() {
			//draw wheel itself
			this.sk.stroke(this.strokeColor)
			this.sk.fill(this.fillColor)
			this.sk.circle(this.x, this.y, 2 * this.radius)
			//draw beats
			for (var i = 0; i < this.beats.length; i++) {
				let beat = this.beats[i]
				const {x, y} = this.getBeatCenter(beat)
				beat.draw(x,y)
			}
		}

		getIntersectObj(x, y) {
			// if intersects a beat, returns the beat
			for(var i = 0; i < this.beats.length; i++) {
				let beat = this.beats[i]
				if (this.sk.dist(x, y, beat.x, beat.y) <= beat.currType.radius) {
					return beat
				}
			}
			
			// if intersects the wheel, returns the wheel
			/*
			if (this.sk.dist(x, y, this.x, this.y) <= this.radius) {
				return this
			}*/
			return null

		}

		preload() {
			this.beats.forEach( (beat) => {
				beat.preload()
			})
		}

		clickAction(x, _y) {
		}

	}
	return Wheel
})




