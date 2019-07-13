define(['./BeatType'], function(beatTypes) {
	class Beat {
		constructor(sk, radians, soundManager, typeName=null) {
			this.sk = sk
			this.radians = radians
			this.defaultType = typeName
			this.enabled = true
			this.maxSwellFrames = 20
			this.swellFrames = this.maxSwellFrames
			//initiazlied during setup
			this.typeIndex = -1
			this.currType = null
			this.currSound = null

			//initialized during preload
			this.sounds = null
			this.soundManager = soundManager
		}
		
		incrementTypeIndex() {
			this.typeIndex = (this.typeIndex + 1) % beatTypes.length
		}

		preload() {
			//this.loadSounds()
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
			this.currSound = this.soundManager.getSoundByName(this.currType.name)
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
			this.currSound = this.soundManager.getNextSound(this.currType.name)
			this.incrementTypeIndex()
			this.currType = beatTypes[this.typeIndex]
			this.enabled = true	
		}

		draw(x, y) {
			this.x = x
			this.y = y
			if(this.swellFrames < this.maxSwellFrames) {
				this.swellFrames = Math.min(++this.swellFrames, this.maxSwellFrames)
				this.swellUpdate(x, y)
			}
			
			if (this.currType.strokeColor) {
				this.sk.noFill()
				this.sk.stroke(this.currType.strokeColor)
				this.sk.strokeWeight(this.currType.strokeWeight)
			} else {
				this.sk.noStroke()
				this.sk.fill(this.currType.color)
			}
			this.sk.circle(x,y, this.currType.radius)	
		}

		swellUpdate(x, y) {
			const portion = this.swellFrames / this.maxSwellFrames
			const radius = this.currType.radius + 
							Math.sin(Math.PI * portion) * 
							(this.currType.swellRadius - this.currType.radius)
			
			if (this.currType.strokeColor) {
				this.sk.noFill()
				this.sk.stroke(this.currType.strokeColor)
				this.sk.strokeWeight(this.currType.strokeWeight)
			} else {
				this.sk.noStroke()
				this.sk.fill(this.currType.color)
			}
			this.sk.circle(x,y,radius);
		}

		play() {
			if (this.enabled && this.currType.name != 'nullBeat') {
				try {
					this.swellFrames = 0
					this.currSound.play()
				} catch (err) {
					console.log(err)
				}
			}
		}

		mousePressed(_x, _y) {
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