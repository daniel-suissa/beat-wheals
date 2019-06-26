///Beat
let DEFAULT_BEAT_TYPE = 0
let DEFUALT_BEAT_RADIUS = 15

define([], function() {
	class BeatType {
		constructor(name, src, color, radius) {
			this.name = name
			this.src = src
			this.color = color
			this.radius = radius
		}
	}

	let beatTypes = [new BeatType('type1', '', '#32e5b2', DEFUALT_BEAT_RADIUS),
					new BeatType('type2', '', '#db0808', DEFUALT_BEAT_RADIUS + 3),
					new BeatType('type3', '', '#4f4ad6', DEFUALT_BEAT_RADIUS + 6)]

	class Beat {
		constructor() {
			this.typeIndex = DEFAULT_BEAT_TYPE
			this.type = beatTypes[this.typeIndex]
		}

		draw(sk, x, y) {
			this.x = x
			this.y = y
			sk.fill(this.type.color)
			sk.noStroke()
			sk.circle(x,y,this.type.radius)
		}

		clickAction(_x, _y) {
			this.typeIndex = (this.typeIndex + 1) % beatTypes.length
			this.type = beatTypes[this.typeIndex]
		}
	}

	return Beat
})