const puppeteer = require("puppeteer");
const fs = require("fs");

function getchordsheets(singername, websitename) {
  fs.readFile(
    singername + "/" + websitename + ".txt",
    "utf8",
    async function (err, data) {
      if (err) throw err;
      console.log("OK: ");
      const alllinks = data.split("\n");
      for (let j = 0; j < alllinks.length; j++) {
        console.log(alllinks[j]);
        await getpage(alllinks[j], function (result) {
          console.log(result);
          fs.writeFile(
            "output/" + websitename + "/" + singername + "-" + j + ".txt",
            result,
            function (err) {
              if (err) return console.log(err);
              console.log("written");
            }
          );
        });
      }
    }
  );
}

async function getpage(link, callback) {
  try {
    if (link.indexOf("guitarians.com/chord") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByClassName("section-part")[0]
                .innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("polygonguitar.blogspot.com") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByClassName("post-body")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("daydayguitar.blogspot.com") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByTagName("article")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("blog.xuite.net") != -1) {
      // return callback('not supported');
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          await page.goto(link, {
            waitUntil: "load",
          });

          const pageresult = await page.evaluate(() => {
            return {
              text: document
                .getElementsByClassName("blogbody")[0]
                .innerText.split("--------------")[0],
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("91pu.com") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });

          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByClassName("tone")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("tabs.ultimate-guitar.com") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByTagName("code")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("chord4.com/tabs") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByTagName("pre")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("chords-and-tabs.net") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            return {
              text: document.getElementsByClassName("contentdiv")[0].innerText,
            };
          });

          // console.log(pageresult.text);
          await browser.close();
          callback(pageresult.text);
        } catch {
          callback("server error");
        }
      })();
    } else if (link.indexOf("polygon.guitars") != -1) {
      return (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(link, {
            waitUntil: "load",
          });
          const pageresult = await page.evaluate(() => {
            var allline = document
              .getElementsByClassName("cnl_page")[0]
              .getElementsByClassName("cnl_line");
            var tempresult = "";
            for (var j = 0; j < allline.length; j++) {
              var tempallchord = allline[j].getElementsByClassName("chord");
              for (var k = 0; k < tempallchord.length; k++) {
                tempresult += tempallchord[k].innerText;
              }
              tempresult += "\n";
              var tempalllyric = allline[j].getElementsByClassName("lyric");
              for (var k = 0; k < tempalllyric.length; k++) {
                tempresult += tempalllyric[k].innerText;
              }
              tempresult += "\n";
            }
            console.log(tempresult);
            return {
              text: tempresult,
            };
          });

          var tempresult = pageresult.text;
          for (var j = 0; j < tempresult; j++) {
            if (tempresult[j] == "\n") {
              tempresult[j] = "\0";
            }
          }
          // console.log(tempresult);
          await browser.close();
          callback(tempresult);
        } catch {
          callback("server error");
        }
      })();
    } else {
      callback("not supported");
    }
  } catch (e) {
    console.log(e);
    callback("server error");
  }
}

exports.getchordsheets = getchordsheets;
