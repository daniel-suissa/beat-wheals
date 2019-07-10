// created by Marine Piette: https://codepen.io/mayuMPH/pen/ZjxGEY

var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");
showSliderValue()
rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  let sliderWidth = $('#rs-range-line').width() 
  let bulletWidth = $('#rs-bullet').width()
  rangeBullet.innerHTML = rangeSlider.value;
  //bulletPosition is scaled down because the actualy slider line is shorter than it's width
  var bulletPosition = (rangeSlider.value / rangeSlider.max) * 0.96;
  // the 11 comes from half the tracker's width
  rangeBullet.style.left = ( bulletPosition * sliderWidth) - bulletWidth/2 + 11 + "px";
}
