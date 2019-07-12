define(['./BeatType'], function(beatTypes) {
	class SoundManager {
		constructor(sk) {
			this.sk = sk
			this.sounds = []
			for(var i = 0; i < beatTypes.length; i++) {
				let soundObj = {
					name: beatTypes[i].name,
					src: beatTypes[i].src,
					sound: null,
					isPlaying: false
				}
				this.sounds.push(soundObj)
			}
		}

		setup() {
		}

		preload() {
			for(var i = 0; i < this.sounds.length; i ++) {
				let soundObj = this.sounds[i]
				if (soundObj.name != 'nullBeat') {
					soundObj.sound = this.sk.loadSound(soundObj.src)
					this.setSoundOnEndedCallback(soundObj.sound, soundObj)
				}
			}
		}
		getNextSound(soundName) {
			let i = this.sounds.findIndex(soundObj => {
				return soundObj.name == soundName
			})
			i = (i + 1) / beatTypes.length
			return this.sounds[i]
		}

		getSoundByName(soundName) {
			return sounds.findIndex((soundObj) => {
				return soundObj.name == soundName
			})
		}

		setSoundOnEndedCallback (sound, soundObj) {
			sound.onended( () => {
				soundObj.isPlaying = false
			})
		}

		playSound(soundObj) {
			if(soundObj.name != 'nullBeat') {
				soundObj.isPlaying = true
				soundObj.sound.play()
			}
		}

		isPlaying(soundObj) {
			return soundObj.isPlaying
		}

		currentTime(soundObj) {
			return soundObj.sound.currentTime()
		}

		duration(soundObj) {
			return soundObj.sound.duration()
		}
	}
	return SoundManager
})