define([], function () {
	return {
		wheels: [
			{
				radius: 0.1,
				color: '#F9C909',
				defaultBeatTypes: ['bass_drum', 'nullBeat', 'bass_drum', 'nullBeat']
			},
			{
				radius: 0.18,
				color: '#F35844',
				defaultBeatTypes: ['nullBeat', 'nullBeat', 'snare_drum', 'nullBeat']
			},
			{
				radius: 0.25,
				color: '#189AA8',
				defaultBeatTypes: ['hi_hat', 'nullBeat', 'hi_hat', 'nullBeat',
								   'hi_hat', 'nullBeat', 'hi_hat', 'nullBeat'],
			}
		],
	}
});