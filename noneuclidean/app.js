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
           export function startBeat()    {
        beat = setInterval(play_sounds, 1000);
            };
            export function stopBeat() {
        clearInterval(beat);
            };
        // {/* </script> */}