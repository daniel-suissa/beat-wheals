
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
		}

		startOverlay() {
			$('.overlay-start').addClass('is-open')
			let that = this
			$('.overlay-start').on('click', function() {
		    $('.overlay-start').removeClass('is-open');
		    $('.overlay').removeClass('is-open');
		    that.createHand();
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

		draw() {
			//draw wheels outside-in
			for (var i = this.wheels.length - 1; i > -1 ; i--) {
				this.wheels[i].draw()
			}
			if(this.hand) {
				this.hand.draw(this.rpmSlider.value())
			}
		}

		setSlider() {
			this.rpmSlider = this.sk.select('#slider')
		}

		setSelect() {
			this.sel = this.sk.select('#dropdown')
			this.sel.changed(this.getStyleChangedListener()); 
		}

		setup() {
			this.startOverlay();
			this.setSlider()
			this.setSelect() 

		    this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })	  
		}

		reset(style) {
			this.createWheels(style)
			this.preload()
			this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })
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