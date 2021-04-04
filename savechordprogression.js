const { Note, Key } = require("tonal");
const jsonfile = require("jsonfile");
const getchordfromtxt = require("./getchordfromtxt");

function savetofile(num) {
  for (let n = 0; n < num; n++) {
    getchordfromtxt.getchordfromtxt(
      "./output/guitarians/jaychou-" + n + ".txt",
      function (result) {
        // getkey(result);
        var chordtree = getchordtree(result);
        console.log(chordtree);
        // var steps = getsteps(result)
        // const freqct = calcfequency(steps, 4);
        // const file = "./tmp/data-" + n + ".json";
        // jsonfile.writeFileSync(file, freqct);
      }
    );
  }
}

function getchordtree(result) {
  const chordprogressionjson = result.chordprogressionjson.map((x) => {
    return x.root + x.name;
  });
  var chordtree = {};
  for (var j = 0; j < chordprogressionjson.length; j++) {
    const normalizechord = chordprogressionjson[j];
    if (!chordtree[normalizechord]) {
      chordtree[normalizechord] = {
        nextchord: {},
        previouschord: {},
      };
    }
    if (j + 1 < chordprogressionjson.length) {
      if (!chordtree[normalizechord].nextchord[chordprogressionjson[j + 1]]) {
        chordtree[normalizechord].nextchord[chordprogressionjson[j + 1]] = 1;
      } else {
        chordtree[normalizechord].nextchord[chordprogressionjson[j + 1]]++;
      }
    }
    if (j > 0) {
      if (
        !chordtree[normalizechord].previouschord[chordprogressionjson[j - 1]]
      ) {
        chordtree[normalizechord].previouschord[
          chordprogressionjson[j - 1]
        ] = 1;
      } else {
        chordtree[normalizechord].previouschord[chordprogressionjson[j - 1]]++;
      }
    }
  }
  return chordtree;
}

function getsteps(result) {
  var steps = [];
  const chordprogressionjson = result.chordprogressionjson;
  for (var j = 1; j < chordprogressionjson.length; j++) {
    let step =
      chordprogressionjson[j].position - chordprogressionjson[j - 1].position;
    if (step < 0) step = step + 12;
    steps.push(step);
  }
  return steps;
}

function calcfequency(inputarray, maxlength) {
  var freqct = {};
  for (var j = 0; j < inputarray.length; j++) {
    const tempseq = inputarray.slice(j, j + maxlength);
    var temppos = freqct;
    for (var jj = 0; jj < tempseq.length; jj++) {
      if (!temppos[String(tempseq[jj])]) {
        temppos[String(tempseq[jj])] = {
          count: 0,
        };
      }
      temppos[String(tempseq[jj])].count++;
      temppos = temppos[String(tempseq[jj])];
    }
  }
  return freqct;
  // console.log("RESULT");
  // dfs(freqct, []);
}

function dfs(position, pattern) {
  for (var j in position) {
    if (j != "count") {
      pattern.push(j);
      console.log(
        pattern
        // .map((x) => {
        //   return Note.fromMidi(x + 12);
        // })
      );
      console.log(`COUNT: ${position[j].count}`);
      dfs(position[j], pattern);
      pattern.pop();
    }
  }
}

function getkey(inputdata) {
  console.log("GET KEY");
  console.log(inputdata.chordprogressionjson);
}

exports.savetofile = savetofile;
