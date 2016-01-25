/**
 * Created by atg on 25/01/2016.
 */

var midiManager = (function() {

    var audioPlayers = [];

    return {

        loadRemote: function(path, callback) {
            var fetch = new XMLHttpRequest();
            fetch.open('GET', path);
            fetch.overrideMimeType("text/plain; charset=x-user-defined");
            fetch.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    /* munge response into a binary string */
                    var t = this.responseText || "" ;
                    var ff = [];
                    var mx = t.length;
                    var scc= String.fromCharCode;
                    for (var z = 0; z < mx; z++) {
                        ff[z] = scc(t.charCodeAt(z) & 255);
                    }
                    callback(ff.join(""));
                }
            };
            fetch.send();
        },

        loadMidiFile: function(file) {
            this.loadRemote(file, function(data) {
                var midiFile = MidiFile(data);
                var synth = Synth(44100);
                var replayer = Replayer(midiFile, synth);
                var audioFile = {};
                audioFile.midiFile = midiFile;
                audioFile.synth = synth;
                audioFile.replayer = replayer;
                audioPlayers.push(audioFile);
                AudioPlayer(replayer);
            })
        },

        play: function(fileId) {
            var replay = audioPlayers[fileId].replayer;
            AudioPlayer(replay);
        },

        muteChannel: function(mute) {
            console.log(audioPlayers[0]);
            audioPlayers[0].replayer.setMute(mute);
        }
    }
})();

$(document).ready(function() {
    midiManager.loadMidiFile("assets/layer1.mid");
    //midiManager.loadMidiFile("assets/layer2.mid");

    //midiManager.play(0);
    var channelMuted = false;
    $('#mute').on("click", function() {
        channelMuted = !channelMuted;
        midiManager.muteChannel(channelMuted);
    })
});

