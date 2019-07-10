// created by Marine Piette: https://codepen.io/mayuMPH/pen/ZjxGEY

var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");
showSliderValue()
rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  let sliderWidth = $('#rs-range-line').width()
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * sliderWidth * 0.95) + "px";
}
