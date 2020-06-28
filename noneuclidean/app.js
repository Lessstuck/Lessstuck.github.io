import { Track } from "./modules/noneuclidean.mjs";

const trackCount = 4;
var tracks = [];
for (var i = 0; i < trackCount; i++)    {
    let newTrack = new Track([.25, .25, .25, .25]);
    newTrack.play();
    tracks.push(newTrack);
}

function play_sounds()  {
    if (track[0].play() == 1) {
        play_sound1();
    };
    if (track[1].play() == 1) {
        play_sound2();
    };
    if (track[2].play() == 1) {
        play_sound3();
    };
    if (track[3].play() == 1) {
        play_sound4();
    };
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

var onoff = false;
document.getElementById("startStopButton").onclick = () => {
    onoff = !onoff;
    beat(onoff);
};

var beatId = null;
function beat(onoff)  {
    if (onoff == true) {
        beatId = setInterval(play_sounds, 125);
    }
    else {
        clearInterval(beatId);
    };
};
