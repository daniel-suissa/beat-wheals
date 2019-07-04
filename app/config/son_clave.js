define([], function () {
	return {
		wheels: [
			{
				radius: 0.18,
				color: '#FF3864',
				defaultBeatTypes: ['conga_right', 
				'conga_right','conga_right','conga_right'
				]
			},
			{
				radius: 0.25,
				color: '#261447',
				defaultBeatTypes: ['nullBeat', 
				'nullBeat', 'nullBeat', 'conga_left',
				'nullBeat', 'nullBeat', 'conga_left',
				'nullBeat', 'nullBeat', 'nullBeat',
				'conga_left', 'nullBeat', 'conga_left',
				'nullBeat', 'nullBeat', 'nullBeat'
				]
			}
		],
	}
});