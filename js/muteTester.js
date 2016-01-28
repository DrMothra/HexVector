/**
 * Created by atg on 25/01/2016.
 */

var midiManager = (function() {

    var audioPlayers = [];
    var numAudioFiles = 0;
    var loadedFiles = 0;

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

        loadMidiFiles: function(files) {
            numAudioFiles = files.length;
            var _this = this;
            for(var i=0; i<numAudioFiles; ++i) {
                this.loadRemote(files[i], function(data) {
                    var midiFile = MidiFile(data);
                    var synth = Synth(44100);
                    var replayer = Replayer(midiFile, synth);
                    var audioFile = {};
                    audioFile.midiFile = midiFile;
                    audioFile.synth = synth;
                    audioFile.replayer = replayer;
                    audioPlayers.push(audioFile);
                    if(++loadedFiles >= numAudioFiles) {
                        _this.playAllFiles();
                    }
                })
            }

        },

        play: function(fileId) {
            var replay = audioPlayers[fileId].replayer;
            AudioPlayer(replay);
        },

        playAllFiles: function() {
            var replay;
            for(var i=0; i<numAudioFiles; ++i) {
                replay = audioPlayers[i].replayer;
                AudioPlayer(replay);
            }
        },

        muteChannel: function(channelId, mute) {
            audioPlayers[channelId].replayer.setMute(mute);
        }
    }
})();

$(document).ready(function() {
    var midiFiles = ["assets/layer1.mid", "assets/layer2.mid", "assets/layer3.mid", "assets/layer4.mid", "assets/layer5.mid", "assets/layer6.mid"];
    midiManager.loadMidiFiles(midiFiles);

    var channelsMuted = [false, false, false, false, false, false];
    $('[id^=mute]').on("click", function() {
        var id = this.id.charAt(this.id.length-1);
        console.log("id = ", id);
        channelsMuted[id] = !channelsMuted[id];
        midiManager.muteChannel(id, channelsMuted[id]);
        $('#muteStatus'+id).html(channelsMuted[id] ? "Off" : "On");
    });

});

