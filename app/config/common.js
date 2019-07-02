define(['./common', './empty', './4_on_the_floor'], function (common, empty, four_on_the_floor) {
	let config = {
		defaultStyle: 'empty',
		styleOptions: ['Empty', '4 on the Floor', 'Classic Half Time',
			'The Dance Beat', 'Son Clave', 'Tresillo'],
		interfaceHeight: window.innerHeight,
		interfaceWidth: window.innerWidth,
		backgroundColor: '#f4f4f4',
		handConfig: {
			defaultRpm: 30,
			color: '#ffffff',
			baseWidth: 0.005
		},
		beatsConfig: {
			nullBeat: {
					radius: 0.025,
					color: '#eef0e8',
					strokeColor: '#000000',
					strokeWeight: 0
				},
			types: {
				'type1': {
					radius: 0.03,
					swellRadius: 0.04,
					src: './assets/bass_sample.mp3',
					color: '#32e5b2',
				},
				'type2': {
					radius: 0.04,
					swellRadius: 0.045,
					src: './assets/clap_sample.mp3',
					color: '#db0808',
				},
				'type3': {
					name: 'type3',
					radius: 0.05,
					swellRadius: 0.06,
					src: './assets/hh_sample.mp3',
					color: '#4f4ad6',
				}
			}
		},
		getStyleConfig: (style) => {
			switch(style) {
				case 'empty':
					return empty
					break
				case '4_on_the_floor':
					return four_on_the_floor
					break
				default: 
					return empty
					break
			}
		}
	}
	return config
});