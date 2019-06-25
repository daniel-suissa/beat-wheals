
//////Wheel
define(['./Beat', 'jquery'], function(Beat) {
	class Wheel {
		constructor(context, radius,x ,y) {
			this.radius = radius
			this.beats = [new Beat(), new Beat(), new Beat()]
			this.x = x
			this.y = y
			this.color = 'grey'
			this.context = context
		}

		drawBeats() {
			for (var i = 0; i < this.beats.length; i++) {
				let beat = this.beats[i]
				this.context.beginPath();
				const {x, y} = this.getBeatCenter(i)
			  	this.context.fillStyle = beat.type.color;
			  	this.context.arc(x, y, beat.type.radius,0,2*Math.PI);
			  	this.context.fill();
			}
		}

		getBeatCenter(beatIndex) {
			const radians = beatIndex * 2 * Math.PI / this.beats.length
			const x = this.x + this.radius  * Math.sin(radians);
			const y = this.y - this.radius  * Math.cos(radians);
			return {x: x, y: y}
		}

		draw() {
			this.context.beginPath();
			this.context.strokeStyle = this.color;
			this.context.arc(this.x, this.y, this.radius, 0,2*Math.PI);
			this.context.stroke();
			this.drawBeats();
		}

	}
	return Wheel
})




