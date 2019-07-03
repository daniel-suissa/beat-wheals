
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
		}

		createHand() {
			// should only happen after createWheels
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
			this.hand.draw(this.rpmSlider.value())
		    
			this.drawSliderText()
			this.drawStylesDropDownText()
		}

		drawSliderText() {
			if (!this.rpmSlider) return
			this.sk.fill(0)
			this.sk.textSize(30);
		    this.sk.color('#000000')
		    this.sk.textFont('Playfair Display')
		    this.sk.textAlign(this.sk.CENTER);
		    this.sk.text('RPM', 
		    	this.rpmSlider.x + this.rpmSlider.size().width / 2, 
		    	this.rpmSlider.y+50);
		}

		drawStylesDropDownText() {
			if (!this.sel) return
			this.sk.fill(0)
			this.sk.textSize(30);
		    this.sk.color('#000000')
		    this.sk.textFont('Playfair Display')
		    this.sk.textAlign(this.sk.LEFT);
		    this.sk.text('Style', 
		    	this.sel.x + this.sel.size().width / 2, 
		    	this.sel.y+50);
		}

		createSlider() {
			this.sk.colorMode(this.sk.HSB);
		    this.rpmSlider = this.sk.createSlider(10, 70, config.handConfig.defaultRpm);
		    this.rpmSlider.style('width', `${common.getWidth(config.rpmSlider.width)}`)
		    this.rpmSlider.position(common.getWidth(config.rpmSlider.left), 
		    						common.getHeight(1-config.rpmSlider.bottom));
		}

		createStyleDropDown() {
			//style drop menu 
			this.sel = this.sk.createSelect();
			this.sel.position(common.getWidth(config.stylesDropdown.left), 
							common.getHeight(1-config.stylesDropdown.bottom));
			this.sel.option('Empty');
			this.sel.option('4 on the Floor');
			this.sel.option('Classic Half Time');
			this.sel.option('The Dance Beat');
			this.sel.option('Son Clave');
			this.sel.option('Tresillo');
			this.sel.changed(this.getStyleChangedListener()); 
		}

		setup() {
			this.createSlider()
			this.createStyleDropDown() 

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