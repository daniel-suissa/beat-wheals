define([], function () {
	return {
		wheels: [
			{
				radius: 0.1,
				color: '#F9C909',
				defaultBeatTypes: ['conga_ghost', 'nullBeat',
									'nullBeat', 'conga_ghost']
			},
			{
				radius: 0.18,
				color: '#F35844',
				defaultBase: 3,
			},
			{
				radius: 0.25,
				color: '#189AA8',
				defaultBeatTypes: ['conga_high', 
				'nullBeat', 'nullBeat', 'conga_high',
				'nullBeat', 'nullBeat', 'conga_high',
				'nullBeat', 'nullBeat', 'nullBeat',
				'conga_high', 'nullBeat', 'conga_high',
				'nullBeat', 'nullBeat', 'nullBeat'
				]
			},
		],
	}
});