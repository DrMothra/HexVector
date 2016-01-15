/**
 * Created by atg on 13/01/2016.
 */

$(document).ready(function() {

    var player;

    MIDI.loadPlugin({
        soundfontUrl: "./soundfont/",
        onsuccess: function() {
            /// this is the language we are running in
            /// this sets up the MIDI.Player and gets things going...
            player = MIDI.Player;
            player.timeWarp = 1; // speed the song is played back
            player.loadFile("./assets/layer1.mid", player.start);
            //player.loadFile("./assets/layer2.mid", player.start);
        }
    });

    $('#playMidi').on("click", function() {
        //MIDIjs.play("assets/layer1.mid");
    });

    $('#stopMidi').on("click", function() {
       //MIDIjs.stop();
    });
});
