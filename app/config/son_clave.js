define([], function () {
	return {
		wheels: [
			{
				radius: 0.1,
				color: '#F9C909',
				defaultBase: 4,
			},
			{
				radius: 0.18,
				color: '#F35844',
				defaultBeatTypes: ['conga_right', 
				'conga_right','conga_right','conga_right'
				]
			},
			{
				radius: 0.25,
				color: '#189AA8',
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