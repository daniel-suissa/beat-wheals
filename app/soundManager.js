define(['./BeatType'], function(beatTypes) {
	class Sound {
		constructor(name, src) {
			this.name = name
			this.src = src
			this.sound = null
		}

		play() {

			if(this.name != 'nullBeat') {
				this.sound.play()
			}
		}

		currentTime() {
			return this.sound.currentTime()
		}

		duration() {
			return this.sound.duration()
		}

		stop() {
			if(this.name != 'nullBeat') {
				this.sound.stop()
			}
		}

		loadSound(sk) {
			if (this.name != 'nullBeat') {
				this.sound = sk.loadSound(this.src)
			}
		}
		
	}
	class SoundManager {
		constructor(sk) {
			this.sk = sk
			this.sounds = []
			for(var i = 0; i < beatTypes.length; i++) {
				let soundObj = new Sound(beatTypes[i].name, beatTypes[i].src)
				this.sounds.push(soundObj)
			}
		}

		setup() {}

		preload() {
			for(var i = 0; i < this.sounds.length; i ++) {
				let soundObj = this.sounds[i]
				soundObj.loadSound(this.sk)
			}
		}

		getNextSound(soundName=null) {
			if (!soundName) {
				return this.sounds[0]
			}
			let i = this.sounds.findIndex(soundObj => {
				return soundObj.name == soundName
			})
			i = (i + 1) % beatTypes.length
			this.sounds[i].stop()
			return this.sounds[i]
		}

		getSoundByName(soundName) {
			return sounds.findIndex((soundObj) => {
				return soundObj.name == soundName
			})
		}

		
	}
	return SoundManager
})