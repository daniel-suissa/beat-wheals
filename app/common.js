define([], function() {
	let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return {
		width: width,
		height: height,
		getWidth: (perc) => {
			return perc * width
		},
		getHeight: (perc) => {
			return perc * height
		}
	}
	
	
})