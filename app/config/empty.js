define([], function () {
	return {
		interfaceHeight: window.innerHeight,
		interfaceWidth: window.innerWidth,
		backgroundColor: '#f4f4f4',
		wheelsConfig: {
			wheels: [
				{
					radius: 200,
					color: '#F39C6B',
					defaultBase: 2,
					defaultBeatTypes: ['type1', 'type3']
				},
				{
					radius: 300,
					color: '#FF3864',
					defaultBase: 3,
				},
				{
					radius: 400,
					color: '#261447',
					defaultBase: 4,
				}
			],
		},
		handConfig: {
			defaultRpm: 30,
			color: '#ffffff',
			baseWidth: 7
		},
		beatsConfig: {
			nullBeat: {
					radius: 20,
					color: '#eef0e8',
					strokeColor: '#000000',
					strokeWeight: 0
				},
			maxShockWaveRadiusMultiplyer: 1.5,
			types: {
				'type1': {
					radius: 25,
					swellRadius: 30,
					src: './assets/bass_sample.mp3',
					color: '#32e5b2',
				},
				'type2': {
					radius: 28,
					swellRadius: 35,
					src: './assets/clap_sample.mp3',
					color: '#db0808',
				},
				'type3': {
					name: 'type3',
					radius: 31,
					swellRadius: 50,
					src: './assets/hh_sample.mp3',
					color: '#4f4ad6',
				}
			}
		}
	}
});