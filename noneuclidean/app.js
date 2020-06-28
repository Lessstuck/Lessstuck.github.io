import { Track } from "./modules/noneuclidean.mjs";

const track = new Track([.25, .25, .5]);
track.play();

// {/* <script type="text/javascript">; */}

function play_sounds()  {

play_sound1();
        play_sound2();
        play_sound3();
        play_sound4();
        console.log("play_sounds");
};
function play_sound1()  {
    document.getElementById('sound1').play();
};
function play_sound2() {
    document.getElementById('sound2').play();
};
function play_sound3() {
    document.getElementById('sound3').play();
};
function play_sound4() {
    document.getElementById('sound4').play();
};
beat(0);
document.getElementById("startButton").onclick = beat(1);
document.getElementById("stopButton").onclick = beat(0);
function beat(onoff) {
    if (onoff == 1) {
        var beatId = setInterval(play_sounds, 1000);
    }
    else {
        clearInterval(beatId);
    }
};
            
        // {/* </script> */}