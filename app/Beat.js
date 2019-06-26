define(['./config'], function(config) {
	class BeatType {
		constructor(sk, name, src, color, radius) {
			this.name = name
			if (src != '') {
			    this.sound = sk.loadSound(src)
			} else {
				this.sound = null
			}
			this.color = color
			this.radius = radius
		}
	}

	class Beat {
		constructor(sk, radians) {
			this.sk = sk
			this.radians = radians
			this.typeIndex = config.beats.defaulTypeIndex
			this.typeList = []
			config.beats.types.forEach( (type) => {
				this.typeList.push(new BeatType(
					this.sk,
					type.name, 
					type.sound, 
					type.color, 
					type.radius
					))
			})
			this.type = this.typeList[this.typeIndex]
			this.prepareForHit = true
		}
		
		draw(x, y, handRotation) {
			this.x = x
			this.y = y
			this.sk.fill(this.type.color)
			this.sk.noStroke()
			this.sk.circle(x,y,this.type.radius)
			const handDistance = Math.abs(handRotation - this.radians) 
			if ( this.prepareForHit && this.type.sound != null && handDistance < 0.1) {
				try {
					this.type.sound.play()
					this.prepareForHit = false
				} catch (err) {
					console.log("cant play")
					this.prepareForHit = false
				}
			} else if (!this.prepareForHit && (handDistance > 0.1) ){
				this.prepareForHit = true
			}
		}

		clickAction(_x, _y) {
			this.typeIndex = (this.typeIndex + 1) % this.typeList.length
			this.type = this.typeList[this.typeIndex]
			if (this.type.sound != null) {
				this.type.sound.play()
			}
		}
	}

	return Beat
})