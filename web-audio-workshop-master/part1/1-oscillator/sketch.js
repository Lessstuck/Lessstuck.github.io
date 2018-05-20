//set AudioContext class for compatibility
let AudioContext = window.AudioContext || window.webkitAudioContext;
// var freak;
//create audio context
const audioContext = new AudioContext();

//setup oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = "square";
oscillator.frequency.value = 440;
oscillator.start();
oscillator.connect( audioContext.destination );
function modFreq() {
	oscillator.detune.value = Math.random() * 2400;//cents
}
setInterval( modFreq, 1000);
function setup() {

	//resume web audio on first click for Chrome autoplay rules
	function clickHandler(){
		audioContext.resume();
		document.body.removeEventListener( "click", clickHandler );
	}
	document.body.addEventListener( "click", clickHandler );

	//create p5 canvas
	createCanvas( windowWidth, windowHeight );


}

function draw() {

}
