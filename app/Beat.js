define(['./BeatType'], function(beatTypes) {
	class Beat {
		constructor(sk, radians) {
			this.sk = sk
			this.radians = radians
			this.availableTypes = beatTypes
			this.typeIndex = -1
			this.nextType()
			this.enabled = true
			this.isPlaying = false
		}
		
		incrementTypeIndex() {
			this.typeIndex = (this.typeIndex + 1) % this.availableTypes.length
		}

		nextType() {
			this.incrementTypeIndex()
			this.type = this.availableTypes[this.typeIndex]
			if (this.type.src != '') {
				this.sound = this.sk.loadSound(this.type.src)
				this.setSoundOnEndedCallback(this)
			} else {
				this.sound = null
			}
			this.enabled = true
			this.isPlaying = false
		}

		setSoundOnEndedCallback (that) {
			this.sound.onended( () => {
				that.isPlaying = false
			})
		}

		draw(x, y) {
			this.x = x
			this.y = y

			if (this.isPlaying) {
				this.swell(x, y)
			}

			this.sk.fill(this.type.color)
			if (this.type.strokeColor) {
				this.sk.stroke(this.type.strokeColor)
				this.sk.strokeWeight(this.type.strokeWeight)
			} else {
				this.sk.noStroke()
			}
			this.sk.circle(x,y, this.type.radius)
			
			
		}

		swell(x, y) {
			const portion = this.sound.currentTime() / 
							this.sound.duration()
			
			const radius = this.type.radius + 
							Math.sin(Math.PI * portion) * 
							(this.type.swellRadius - this.type.radius)

			this.sk.fill(this.type.color)
			this.sk.noStroke()

			this.sk.circle(x,y,radius);
		}

		play() {
			if (this.enabled && this.sound) {
				try {
					this.isPlaying = true
					this.sound.play()
				} catch (err) {
					console.log(err)
				}
			}
		}


		clickAction(_x, _y) {
			if (this.isPlaying) {
				return
			}
			this.nextType()
			this.play()
		}

		disable() {
			this.enabled = false
		}

		enable() {
			this.enabled = true
		}
	}

	return Beat
})