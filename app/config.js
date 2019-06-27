define([], function () {
	return {
		backgroundColor: '#f4f4f4',
		wheelsConfig: {
			baseRadius: 75,
			stepRadius: 70,
			amount: 3,
			colors: ['#F39C6B', '#FF3864', '#261447'],
			bases: [2, 3, 4],
			beatTypes: ['type1', 'type2', 'type3'],
		},
		handConfig: {
			defaultRpm: 30,
			color: '#ff5ee6',
		},
		beatsConfig: {
			nullBeat: {
					radius: 10,
					color: '#eef0e8',
					strokeColor: '#000000',
					strokeWeight: 0
				},
			maxShockWaveRadiusMultiplyer: 1.5,
			types: {
				'type1': {
					radius: 15,
					swellRadius: 25,
					sound: './assets/bass_sample.mp3',
					color: '#32e5b2',
				},
				'type2': {
					radius: 20,
					swellRadius: 30,
					sound: './assets/clap_sample.mp3',
					color: '#db0808',
				},
				'type3': {
					name: 'type3',
					radius: 25,
					swellRadius: 50,
					sound: './assets/hh_sample.mp3',
					color: '#4f4ad6',
				}
			}
		}
	}
});