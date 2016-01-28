/**
 * Created by atg on 13/01/2016.
 */

eventjs.add(window, "load", function(event) {
    var player;

    MIDI.loader = new sketch.ui.Timer;
    MIDI.loadPlugin({
        soundfontUrl: "./soundfont/",
        onsuccess: function() {
            /// this is the language we are running in
            /// this sets up the MIDI.Player and gets things going...
            player = MIDI.Player;
            player.timeWarp = 1; // speed the song is played back
            console.log("About to load");
            player.loadFile("./assets/layer1.mid", player.start);
        }
    });
});
