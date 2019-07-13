
define(['./Wheel', './Hand', './config/common', './common', './soundManager'], function (Wheel, Hand, config, common, SoundManager) {
	var Interface = class {
		constructor(sk, style) {
			this.sk = sk
			this.soundManager = new SoundManager(sk)
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);			
			this.rpmSlider = null
			this.lastPressedObj = null
			this.createWheels(style);
			this.createHand();
			this.draw = this.update
		}

		showOverlay() {
			this.hand.stop()
			$('.overlay').addClass('is-open')

		}

		showLoadingButton() {
			$('.overlay-button').off()
			$('.overlay-button').addClass('is-open')
			$('.overlay-button').text("Loading...")
		}

		showStartButton() {
			$('.overlay-button').text("Start")
			let that = this
			$('.overlay-button').on('click', function() {
		    $('.overlay-button').removeClass('is-open');
		    $('.overlay').removeClass('is-open');
		    that.hand.start()
		    that.draw = that.update
		    that.sk.loop()
		  });
		}

		createHand() {
			// should only be called after createWheels was
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.wheels[this.wheels.length - 1].radius

			this.hand = new Hand(this.sk, 
				xCenter, 
				yCenter, 
				length,
				this.wheels)
		}
		
		createWheels(style) {
			this.wheels.length = 0
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
	    	let wheelsConfig = config.getStyleConfig(style)
			for (var i = 0; i < wheelsConfig.wheels.length ; i++) {
				const wheelConfig = wheelsConfig.wheels[i]
				let wheel = new Wheel(this.sk, 
										xCenter, 
										yCenter, 
										wheelConfig,
										this.soundManager)
				this.wheels.push(wheel)
			}
		}

		preload() {
			this.soundManager.preload()
			this.showOverlay();
			this.showLoadingButton();
			this.wheels.forEach( (wheel) => {
				wheel.preload()
			})
		}

		update() {
			//draw wheels outside-in
			for (var i = this.wheels.length - 1; i > -1 ; i--) {
				this.wheels[i].draw()
			}
			if(this.hand) {
				this.hand.draw(this.rpmSlider.value())
			}
		}

		setSlider() {
			this.rpmSlider = this.sk.select('#rs-range-line')
		}

		clear() {
			// hacky hacky becase clear() doesn't work properly
			this.sk.background(config.backgroundColor)
		}

		setSelect() {
			this.sel = this.sk.select('#dropdown')
			//this.sel.changed(this.getStyleChangedListener()); 
			$('#styles-button').on('click', () => {
				this.draw = this.clear
				this.sk.noLoop()
				this.showOverlay();
				this.showStylesMenu()
			})

			$('#info-button').on('click', () => {
				this.draw = this.clear
				this.sk.noLoop()
				this.showOverlay();
				this.showInfo()
			})
		}

		createCloseButton() {
			let exitButton = $('<a href="#" class="close-button"></a>')
			exitButton.on('click', () => {
				$('.styles-menu').remove()
				$('.info').remove()
				$('.overlay').removeClass('is-open')
				this.hand.continue()
				this.draw = this.update
				this.sk.loop()
			})
			return exitButton
		}

		showStylesMenu() {
			let menu = document.createElement('div')
			$(menu).addClass('styles-menu')
			$('.overlay').append(menu)
			var i = 0
			config.styleOptions.forEach((opt) => {
				let elem = document.createElement('button')
				elem.innerHTML = opt;
				let formattedOpt = opt.toLowerCase().replace(/ /g, '_')
				elem.setAttribute("id", "button-" + formattedOpt);
				$(elem).addClass('menu-button')
				$(elem).css("background-color", config.styleButtonColors[i++])
				$(elem).css("height", + 50 / config.styleOptions.length +  'vh')
				let that = this
				$(elem).on('click', () => {
					$('.overlay').removeClass('is-open')
					menu.remove()
					that.reset(formattedOpt)
				})
				$(menu).append(elem)
			})
			let closeButton = this.createCloseButton()
			$(menu).append(closeButton)
		}

		showInfo() {
			let container = $('<div class="info"></div')
			let description = $('<p class="description-text">\
				Rotate the wheels and flip on the beats to create your own rhythm. <br>\
				Speed things up or slow them down by sliding the RPM (revolutions per minute) \
				slider on the bottom. <br>\
				You can work off an empty template, or use an existing \
				rhythm by clicking the Djembe icon.</p>')
			let legend = $('<div class="legend"></div')
			Object.keys(config.beatsConfig.types).forEach((name, _i) => {
				let formattedName = name.split('_')
									.map((s) => s.charAt(0).toUpperCase()
												+ s.substring(1))
									.join(' ');
				let legendElement = $(`
					<div class="legend-element">
						<div class="legend-icon" style="background-color: ${config.beatsConfig.types[name].color}"></div>
						<p class="legend-text">${formattedName}</p>
					</div>`)
				legend.append(legendElement)
			})
			let closeButton = this.createCloseButton()

			
			container.append(description)
			container.append(legend)
			container.append(closeButton)
			$('.overlay').append(container)

		}

		setup() {	
			this.setSlider()
			this.setSelect() 
			this.soundManager.setup()
		    this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })
		    this.showStartButton()	
		}

		reset(style) {
			console.log(`resetting to ${style}`)
			this.showOverlay()
			this.showLoadingButton()
			this.createWheels(style)
			this.preload()
			//this.sk.noLoop()
			this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })
		    setTimeout(() => {
		    	this.showStartButton()
				}, 4000)
		}

		getStyleChangedListener() {
			let that = this
			return () => {
				let style = this.sel.value().toLowerCase().replace(/ /g, '_')
				that.reset(style)
			}
		}

		getIntersectObj(x, y) {
			for(var i = 0; i < this.wheels.length; i++) {
				let obj = this.wheels[i].getIntersectObj(x, y)
				if (obj != null) {
					return obj
				}
			}
			return null
		}

		mousePressed() {
			this.lastPressedObj = this.getIntersectObj(this.sk.mouseX, this.sk.mouseY)

			if (this.lastPressedObj != null) {
				this.lastPressedObj.mousePressed(this.sk.mouseX, this.sk.mouseY)
			}
		}

		mouseReleased() {
			if(!this.lastPressedObj) return
			this.lastPressedObj.mouseReleased(this.sk.mouseX, this.sk.mouseY)
			this.lastPressedObj = null
		}

		mouseDragged() {
			if(!this.lastPressedObj) return
			this.lastPressedObj.mouseDragged(this.sk.mouseX, this.sk.mouseY)
		}
	}
	return Interface
})