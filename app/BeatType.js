define(['./config/common'], function(config) {
	class BeatType {
		constructor(name, src, color, radius, swellRadius=null, strokeColor=null, strokeWeight=null) {
			this.name = name
			this.src = src
			this.color = color
			this.radius = radius
			this.swellRadius = swellRadius
			this.strokeColor = strokeColor
			this.strokeWeight = strokeWeight
		}
	}

	let beatTypes = []
	beatTypes.push(new BeatType( 
				'nullBeat',
				'',
				config.beatsConfig.nullBeat.color,
				config.beatsConfig.nullBeat.radius,
				config.beatsConfig.nullBeat.strokeColor,
				config.beatsConfig.nullBeat.strokeWeight
				))
	Object.keys(config.beatsConfig.types).forEach((name, _i) => {
		beatTypes.push(new BeatType(
								name, 
								config.beatsConfig.types[name].src, 
								config.beatsConfig.types[name].color, 
								config.beatsConfig.types[name].radius,
								config.beatsConfig.types[name].swellRadius))
	})
	return beatTypes
})