define(['./common', './empty', './4_on_the_floor','./tresillo', './son_clave'], 
	function (common, empty, four_on_the_floor, tresillo, son_clave) {
	let config = {
		defaultStyle: 'empty',
		styleOptions: ['Empty', '4 on the Floor', 'Classic Half Time',
			'The Dance Beat', 'Son Clave', 'Tresillo'],
		interfaceHeight: window.innerHeight,
		interfaceWidth: window.innerWidth,
		backgroundColor: '#ffffff',
		font: 'Playfair Display',
		stylesDropdown: {
			bottom: 0.1,
			left: 0.4,
			width: 0.1,

		}, 
		rpmSlider: {
			bottom: 0.1,
			left: 0.6,
			width: 0.2
		},
		handConfig: {
			defaultRpm: 30,
			color: '#ffffff',
			baseWidth: 0.005
		},
		beatsConfig: {
			nullBeat: {
					radius: 0.025,
					color: '#5D5F8D',
					strokeColor: '#5D5F8D',
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
					color: '#ff7373',
				},
				'type3': {
					radius: 0.05,
					swellRadius: 0.06,
					src: './assets/hh_sample.mp3',
					color: '#4f4ad6',
				},
				'djembe_bass': {
					radius: 0.03,
					swellRadius: 0.04,
					src: './assets/djembe_bass.wav',
					color: '#157539'
				},
				'djembe_tone': {
					radius: 0.04,
					swellRadius: 0.045,
					src: './assets/djembe_tone.wav',
					color: '#ffad17'
				},
				'djembe_slap': {
					radius: 0.05,
					swellRadius: 0.055,
					src: './assets/djembe_slap.wav',
					color: '#ff6900'
				},
				'conga_right': {
					radius: 0.04,
					swellRadius: 0.045,
					src: './assets/conga_right.wav',
					color: '#8b0304'
				},
				'conga_left': {
					radius: 0.05,
					swellRadius: 0.055,
					src: './assets/conga_left.wav',
					color: '#c9c4af'
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
				case 'tresillo':
					return tresillo
					break
				case 'son_clave':
					return son_clave
					break
				default: 
					return empty
					break
			}
		}
	}
	return config
});