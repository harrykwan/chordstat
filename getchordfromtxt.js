const { Note, Interval, Distance, Scale, Chord } = require("tonal");
const Detect = require("tonal-detect");
const fs = require("fs");

// console.log(Note.chroma("D"));
// // console.log(Note.fromMidi(9 + 12));
// return;

function hasNumber(myString) {
  return /\d/.test(myString);
}

function getchordfromtxt(path, callback) {
  fs.readFile(path, "utf8", async function (err, data) {
    if (err) throw err;
    // console.log(data);
    // console.log("OK: ");
    //   console.log(data.split("\n"));
    var alltext = data.split("\n");
    alltext = alltext.map((x) => {
      return x.split("|").join(" ").split("｜").join(" ").split("　").join(" ");
    });
    alltext = alltext.map((x) => {
      return x.split(" ");
    });

    // console.log(alltext);
    var chordline = [];
    var emptyline = [];
    var lyricsline = [];
    var musicbreak = [];
    var chordprogression = [];
    var chordprogressionline = [];
    var lastchordline = -1;
    for (var j = 0; j < alltext.length; j++) {
      if (alltext[j] == "") emptyline[j] = true;
      else emptyline[j] = false;
      chordline[j] = false;
      for (var k = 0; k < alltext[j].length; k++) {
        alltext[j][k] = alltext[j][k].split("/")[0];
        const translatedchord = Chord.notes(alltext[j][k]);
        if (translatedchord[0] && !hasNumber(translatedchord[0])) {
          alltext[j][k] = alltext[j][k].trim();
          chordprogression.push(alltext[j][k]);
          chordprogressionline.push(j);
          // console.log(alltext[j][k]);
          chordline[j] = true;
          // console.log(alltext[j][k] + " to " + Chord.notes(alltext[j][k]));
        }
      }
      musicbreak[j] = true;
      if (!emptyline[j] && !chordline[j]) lyricsline[j] = true;
      else lyricsline[j] = false;
      if (chordline[j]) lastchordline = j;
      if (lyricsline[j]) {
        if (lastchordline != -1) musicbreak[lastchordline] = false;
      }
    }
    for (var j = 0; j < alltext.length; j++) {
      if (!emptyline[j]) {
        // console.log(alltext[j]);
        if (chordline[j]) {
          // console.log("chord");
        } else {
          // console.log("lyrics");
        }
      }
    }
    // console.log(chordprogression);
    var chordprogressionjson = chordprogression.map((x, index) => {
      return {
        original: x,
        root: Chord.notes(x)[0],
        // notes: Chord.notes(x).join(" "),
        position: Note.chroma(Chord.notes(x)[0]),
        name: x.split(Chord.notes(x)[0]).join(""),
        musicbreak: musicbreak[chordprogressionline[index]],
      };
    });
    callback({
      data: data,
      chordprogression: chordprogression,
      chordprogressionjson: chordprogressionjson,
      chordline: chordline,
      lyricsline: lyricsline,
      emptyline: emptyline,
      musicbreak: musicbreak,
    });
  });
}

exports.getchordfromtxt = getchordfromtxt;
