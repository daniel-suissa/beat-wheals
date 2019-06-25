/*
TODO: 
 - place buttons on wheels
 - place buttons on beats
 - clean fixDpi function
*/

var count = 0
require(['./Wheel', './Hand'], function (Wheel, Hand) {
	var Interface = class {
		constructor() {
			this.wheelContainer = $('#wheel-container')
			this.canvas = $("<canvas>", {
					id : "Canvas"
				}).appendTo(this.wheelContainer);
			this.context = this.canvas.get(0).getContext("2d");
			this.wheels = [];
			this.resize();
			this.hand = new Hand(this.wheelContainer, 60)
			this.x = this.wheelContainer.position().left
			this.y = this.wheelContainer.position().top
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		}

		fixDpi() {
			// canvas blur solution from https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
			var PIXEL_RATIO = (function () {
			    var ctx = document.createElement("canvas").getContext("2d"),
			        dpr = window.devicePixelRatio || 1,
			        bsr = ctx.webkitBackingStorePixelRatio ||
			              ctx.mozBackingStorePixelRatio ||
			              ctx.msBackingStorePixelRatio ||
			              ctx.oBackingStorePixelRatio ||
			              ctx.backingStorePixelRatio || 1;

			    return dpr / bsr;
			})();

			const ratio = PIXEL_RATIO
			var can = this.canvas.get(0)
			can.width = this.width * ratio;
		    can.height = this.height * ratio;
		    can.style.width = this.width + "px";
		    can.style.height = this.height + "px";
		    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		}

		resize() {
			this.context.canvas.width = this.wheelContainer.width() * 2;
			this.context.canvas.height = this.context.canvas.width;
			this.fixDpi()
		};

		draw() {
			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
			// the following should be configurable
			const wheel_amt = 4
			const xCenter = this.x + this.width / 2;
	    	const yCenter = this. y + this.height / 2;
			const baseRadius = 75
			const stepRadius = 40

			for (var i = 0; i < wheel_amt; i++) {
				let radius = baseRadius + stepRadius * i
				let wheel = new Wheel(this.context, radius, xCenter, yCenter)
				this.wheels.push(wheel)
				wheel.draw()
			}
		}

		start() {
			this.resize();
			this.draw();
			this.hand.position(this.wheelContainer, this.canvas)
			this.hand.animate()
		}
	}
	interface = new Interface();
	interface.start()

	//$(window).on("resize", this.resize.bind(this));
});




