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

	let beatTypes = [new BeatType('type1', '', '#32e5b2', DEFUALT_BEAT_RADIUS)]

	class Beat {
		constructor() {
			this.type = beatTypes[DEFAULT_BEAT_TYPE]
		}

		draw(sk, x, y) {
			this.x = x
			this.y = y
			sk.fill(this.type.color)
			sk.noStroke()
			sk.ellipse(x,y,this.type.radius,this.type.radius)
		}
	}

	return Beat
})