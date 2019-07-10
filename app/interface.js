
define(['./Wheel', './Hand', './config/common', './common'], function (Wheel, Hand, config, common) {
	var Interface = class {
		constructor(sk, style) {
			this.sk = sk
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);			
			this.rpmSlider = null
			this.lastPressedObj = null

			this.createWheels(style);
			this.createHand();
			this.startOverlay();
			this.draw = this.update
		}

		startOverlay() {
			this.hand.stop()
			$('.overlay-button').off()
			$('.overlay-button').addClass('is-open')
			$('.overlay-button').text("Loading...")
			$('.overlay').addClass('is-open')

		}

		buttonStart() {
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
										wheelConfig)
				this.wheels.push(wheel)
			}
		}

		preload() {
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
				this.hand.stop()
				this.draw = this.clear
				this.sk.noLoop()
				this.openStylesMenu()
			})
		}

		openStylesMenu() {
			$('.overlay').addClass('is-open')
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
				$(elem).css("height", + 70 / config.styleOptions.length +  'vh')
				let that = this
				$(elem).on('click', () => {
					$('.overlay').removeClass('is-open')
					menu.remove()
					that.reset(formattedOpt)
				})
				$(menu).append(elem)
			})
			let exitButton = $('<a href="#" class="close-button"></a>')
			exitButton.on('click', () => {
				menu.remove()
				$('.overlay').removeClass('is-open')
				this.hand.continue()
				this.draw = this.update
				this.sk.loop()
			})

			$(menu).append(exitButton)
		}

		setup() {	
			this.setSlider()
			this.setSelect() 

		    this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })
		    this.buttonStart()	
		}

		reset(style) {
			console.log(`resetting to ${style}`)
			this.startOverlay()
			this.createWheels(style)
			this.preload()
			//this.sk.noLoop()
			this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })
		    setTimeout(() => {
		    	this.buttonStart()
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