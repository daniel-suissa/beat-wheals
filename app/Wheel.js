
//////Wheel
define(['./Beat', 'jquery'], function(Beat) {
	class Wheel {
		constructor(radius,x ,y) {
			this.radius = radius
			this.beats = [new Beat(), new Beat(), new Beat()]
			this.x = x
			this.y = y
			this.strokeColor = '#000000'
			this.fillColor = '#ffffff'
		}

		getBeatCenter(beatIndex) {
			const radians = beatIndex * 2 * Math.PI / this.beats.length
			const x = this.x + this.radius  * Math.sin(radians);
			const y = this.y - this.radius  * Math.cos(radians);
			return {x: x, y: y}
		}

		draw(sk) {
			//draw wheel itself
			sk.stroke(this.strokeColor)
			sk.fill(this.fillColor)
			sk.circle(this.x, this.y, 2 * this.radius)

			//draw beats
			for (var i = 0; i < this.beats.length; i++) {
				let beat = this.beats[i]
				const {x, y} = this.getBeatCenter(i)
				beat.draw(sk, x, y)
			}
		}

		// TODO: move dist function to common
		getIntersectObj(sk, x, y) {
			// if intersects a beat, returns the beat
			

			for(var i = 0; i < this.beats.length; i++) {
				let beat = this.beats[i]
				if (sk.dist(x, y, beat.x, beat.y) <= beat.type.radius) {
					return beat
				}
			}
			
			// if intersects the wheel, returns the wheel
			if (sk.dist(x, y, this.x, this.y) <= this.radius) {
				return this
			}
			return null
		}

		clickAction(x, _y) {
			if (x >= this.x) {
				// right side of the circle adds a beat
				this.beats.push(new Beat())
			} else {
				this.beats.pop()
			}
		}

	}
	return Wheel
})




