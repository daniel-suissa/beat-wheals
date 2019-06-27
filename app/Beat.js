define(['./config'], function(config) {
	class BeatType {
		constructor(sk, name, src, color, radius, strokeColor=null, strokeWeight=null) {
			this.name = name
			if (src != '') {
			    this.sound = sk.loadSound(src)
			} else {
				this.sound = null
			}
			this.color = color
			this.radius = radius
			this.strokeColor = strokeColor
			this.strokeWeight = strokeWeight
		}
	}

	class Beat {
		constructor(sk, type, radians) {
			this.sk = sk
			this.radians = radians
			this.onType = new BeatType(sk, 
								type, 
								config.beatsConfig.types[type].sound, 
								config.beatsConfig.types[type].color, 
								config.beatsConfig.types[type].radius)
			this.offType = new BeatType(sk, 
				'nullBeat',
				'',
				config.beatsConfig.nullBeat.color,
				config.beatsConfig.nullBeat.radius,
				config.beatsConfig.nullBeat.strokeColor,
				config.beatsConfig.nullBeat.strokeWeight
				)
			this.type = this.offType
			this.enabled = true
		}
		
		draw(x, y) {
			this.x = x
			this.y = y
			this.sk.fill(this.type.color)
			if (this.type.strokeColor) {
				this.sk.stroke(this.type.strokeColor)
				this.sk.strokeWeight(this.type.strokeWeight)
			} else {
				this.sk.noStroke()
			}
			
			this.sk.circle(x,y,this.type.radius)
		}

		play() {
			if (this.enabled && this.type == this.onType) {
				try {
					this.onType.sound.play()
				} catch (err) {
					console.log(err)
				}
				
			}
		}

		clickAction(_x, _y) {
			if (this.type == this.offType) {
				this.type = this.onType
			} else {
				this.type = this.offType
			}
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