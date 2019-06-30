define([], function () {
	return {

		interfaceHeight: window.innerHeight * 0.9,
		backgroundColor: '#f4f4f4',
		wheelsConfig: {
			wheels: [
				{
					radius: 100,
					color: '#F39C6B',
					base: 2,
				},
				{
					radius: 150,
					color: '#FF3864',
					base: 3,
				},
				{
					radius: 200,
					color: '#261447',
					base: 4,
				}
			],
		},
		handConfig: {
			defaultRpm: 30,
			color: '#ff5ee6',
			baseWidth: 7,
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