define([], function () {
	return {
		wheels: {
			amount: 4,
			baseRadius: 75,
			stepRadius: 70
		},
		hand: {
			defaultRpm: 30
		},
		beats: {
			defaulTypeIndex: 0,
			types: [
				{
					name: 'type0',
					radius: 5,
					sound: '',
					color: '#ff0000'
				},
				{
					name: 'type1',
					radius: 15,
					sound: './assets/bass_sample.mp3',
					color: '#32e5b2'
				},
				{
					name: 'type2',
					radius: 20,
					sound: './assets/clap_sample.mp3',
					color: '#db0808'
				},
				{
					name: 'type3',
					radius: 25,
					sound: './assets/hh_sample.mp3',
					color: '#4f4ad6'
				}
			]
		}
	}
});