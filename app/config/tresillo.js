define([], function () {
	return {
		wheels: [
			{
				radius: 0.1,
				color: '#F9C909',
				defaultBeatTypes: ['djembe_bass', 'nullBeat', 'nullBeat',
								'djembe_bass', 'nullBeat','nullBeat',
								'nullBeat', 'nullBeat']
			},
			{
				radius: 0.18,
				color: '#F35844',
				defaultBeatTypes: ['nullBeat', 'djembe_tone', 'djembe_tone',
								'nullBeat', 'djembe_tone','djembe_tone',
								'djembe_slap', 'djembe_tone']
			},
			{
				radius: 0.25,
				color: '#189AA8',
				defaultBase: 16,
			}
		],
	}
});