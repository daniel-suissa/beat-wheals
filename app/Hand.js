const SECS_IN_MIN = 60
const MILLISECS_IN_SEC = 1000

define([], function() {
	class Hand {
		constructor(container, rpm) {
			this.container = container
			this.handElem = $("<div>", {id: "hand"}).appendTo(this.container)
			this.rpm = rpm
		}

		position(canvas) {
			// place hand in the middle of the canvas
			const {top, left} = this.container.position(); 
			this.handElem.css({
				top: top + canvas.height / 2, 
				left: left + canvas.width / 2})
		}

		animate() {
			var rps = this.rpm / SECS_IN_MIN
			const updateInterval = 50
			var stepDeg = 360 * updateInterval  / MILLISECS_IN_SEC * rps 
			var rotation = 180;
			setInterval(() => {
				rotation = (rotation + stepDeg) % 360;
				this.handElem.css({
					"-moz-transform": `rotate(${rotation}deg)`,
				    "-ms-transform": `rotate(${rotation}deg)`,
				    "-webkit-transform": `rotate(${rotation}deg)`,
				    "transform": `rotate(${rotation}deg)`
			    })

				rps = this.rpm / SECS_IN_MIN
			}, updateInterval);
		}
	}
	return Hand
})