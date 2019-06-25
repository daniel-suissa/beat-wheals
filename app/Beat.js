///Beat
let DEFAULT_BEAT_TYPE = 0
let DEFUALT_BEAT_RADIUS = 8

define([], function() {
	class BeatType {
		constructor(name, src, color, radius) {
			this.name = name
			this.src = src
			this.color = color
			this.radius = radius
		}
	}

	let beatTypes = [new BeatType('type1', '', 'orange', DEFUALT_BEAT_RADIUS)]

	class Beat {
		constructor() {
			this.type = beatTypes[DEFAULT_BEAT_TYPE]
		}
	}

	return Beat
})