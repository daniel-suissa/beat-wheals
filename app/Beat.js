define(['./BeatType'], function(beatTypes) {
	class Beat {
		constructor(sk, radians, typeName=null) {
			this.sk = sk
			this.radians = radians
			this.defaultType = typeName
			this.enabled = true
			this.isPlaying = false

			//initiazlied during setup
			this.typeIndex = -1
			this.currType = null
			this.currSound = null

			//initialized during preload
			this.sounds = null
		}
		
		incrementTypeIndex() {
			this.typeIndex = (this.typeIndex + 1) % beatTypes.length
		}

		preload() {
			this.loadSounds()
		}

		loadSounds() {
			//create an array of preloaded sounds. one for each type
			//must be called before draw
			this.sounds = []
			for(var i = 0; i < beatTypes.length; i++) {
				if (beatTypes[i].src != '') {
					let sound = this.sk.loadSound(beatTypes[i].src)
					this.sounds.push(sound)
					this.setSoundOnEndedCallback(sound, this)
				} else {
					//element won't be used but we want to preserve the index parallel
					this.sounds.push(null)
				}
			}
		}

		setup() {
			// actualize initial beat type
			if(this.defaultType) {
				this.typeIndex = beatTypes.findIndex((type) => {
					return type.name == this.defaultType
				})
			} else {
				this.typeIndex = 0
			}
			
			this.currType = beatTypes[this.typeIndex]
			this.currSound = null
			this.currSound = this.sounds[this.typeIndex]
		}

		addRadians(rotation) {
			this.radians += rotation
			if (this.radians > 2 * Math.PI) {
				this.radians = 0
			} else if (this.radians < 0) {
				this.radians += 2 * Math.PI
			}
		}

		nextType() {
			this.incrementTypeIndex()
			this.currType = beatTypes[this.typeIndex]
			this.enabled = true
			this.isPlaying = false
			if (this.sounds != null) {
				this.currSound = this.sounds[this.typeIndex]
			}
		}

		setSoundOnEndedCallback (sound, that) {
			sound.onended( () => {
				that.isPlaying = false
			})
		}

		draw(x, y) {
			this.x = x
			this.y = y

			if (this.isPlaying) {
				this.swell(x, y)
			}

			
			if (this.currType.strokeColor) {
				this.sk.stroke(this.currType.strokeColor)
				this.sk.strokeWeight(this.currType.strokeWeight)
			} else {
				this.sk.noStroke()
			}
			this.sk.fill(this.currType.color)
			this.sk.circle(x,y, this.currType.radius)	
		}

		swell(x, y) {
			const portion = this.currSound.currentTime() / 
							this.currSound.duration()
			const radius = this.currType.radius + 
							Math.sin(Math.PI * portion) * 
							(this.currType.swellRadius - this.currType.radius)
			this.sk.fill(this.currType.color)
			this.sk.noStroke()

			this.sk.circle(x,y,radius);
		}

		play() {
			if (this.enabled && this.currSound) {
				try {
					this.isPlaying = true
					this.currSound.play()
				} catch (err) {
					console.log(err)
				}
			}
		}

		mousePressed(_x, _y) {
			if (this.isPlaying) {
				return
			}
			this.nextType()
			this.play()
		}

		mouseReleased(_x, _y) {}

		mouseDragged(_x, _y) {}
		
		disable() {
			this.enabled = false
		}

		enable() {
			this.enabled = true
		}
	}

	return Beat
})