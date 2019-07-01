
//////Wheel
define(['./Beat'], function(Beat) {
	class Wheel {
		constructor(sk ,x ,y, {radius, color, defaultBase=null, defaultBeatTypes=null}) {
			this.sk = sk
			this.radius = radius
			this.beats = this.createBeats({
								base: defaultBase,
								types: defaultBeatTypes})
			this.x = x
			this.y = y
			this.strokeColor = color
			this.fillColor = color

			this.dragOriginX = null
			this.dragOriginY = null
		}

		createBeats({base=null, types=null}) {
			if (types) {
				return this.createPreconfiguredBeats(types)
			} else {
				return this.createDefaultBeats(base)
			}
		}

		createDefaultBeats(num) {
			let beats = []
			for(var i = 0; i < num; i++) {
				const radians = i * 2 * Math.PI / num
				let beat = new Beat(this.sk, radians)
				beats.push(beat)
			}
			return beats
		}

		createPreconfiguredBeats(types) {
			let beats = []
			for(var i = 0; i < types.length; i++) {
				const radians = i * 2 * Math.PI / types.length
				let beat = new Beat(this.sk, radians, types[i])
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
			
			if (this.sk.dist(x, y, this.x, this.y) <= this.radius) {
				return this
			}
			return null

		}

		preload() {
			this.beats.forEach( (beat) => {
				beat.preload()
			})
		}

		setup() {
			this.beats.forEach( (beat) => {
				beat.setup()
			})
		}

		mousePressed(x, y) {
			this.dragOriginX = x
			this.dragOriginY = y
		}

		mouseReleased(_x, _y) {
			this.dragOriginX = null
			this.dragOriginY = null
		}

		mouseDragged(x, y) {
			const originFromCenter = this.sk.dist(
												this.dragOriginX,
												this.dragOriginY,
												this.x,
												this.y)
			const finalFromCenter = this.sk.dist(
												x,
												y,
												this.x,
												this.y
				)

			const dragDist = this.sk.dist(
										this.dragOriginX,
										this.dragOriginY,
										x,
										y)

			var rotation = Math.acos(
									(Math.pow(originFromCenter, 2) + 
									Math.pow(finalFromCenter, 2) - 
									Math.pow(dragDist, 2)) / 
									(2 * originFromCenter * finalFromCenter)
					)
			if (!this.isClockWiseMove(x,y)) {
				rotation *= -1
			}
			this.beats.forEach( (beat) => {
				beat.addRadians(rotation)
			})
			this.dragOriginX = x
			this.dragOriginY = y
		}

		isClockWiseMove(x,y) {
			let v1 = [this.dragOriginX - this.x, this.dragOriginY - this.y]
			let v2 = [x - this.x, y - this.y]
			if(v1[0]*v2[1] < v1[1]*v2[0]){
				return false
			} else {
				return true
			}
			
		}

	}
	return Wheel
})




