define([], function () {
	return {
		wheels: [
			{
				radius: 0.1,
				color: '#F9C909',
				defaultBeatTypes: ['bass_drum', 'bass_drum']
			},
			{
				radius: 0.18,
				color: '#F35844',
				defaultBeatTypes: ['nullBeat', 'nullBeat', 'snare_drum', 'nullBeat']
			},
			{
				radius: 0.25,
				color: '#189AA8',
				defaultBeatTypes: ['nullBeat', 'nullBeat', 'hi_hat', 'nullBeat',
								   'nullBeat', 'nullBeat', 'hi_hat', 'nullBeat'],
			}
		],
	}
});