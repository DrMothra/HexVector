/**
 * Created by atg on 13/01/2016.
 */

$(document).ready(function() {

    $('#playMidi').on("click", function() {
        MIDIjs.play("assets/layer1.mid");
    });

    $('#stopMidi').on("click", function() {
       MIDIjs.stop();
    });
});
