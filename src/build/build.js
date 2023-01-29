const path = require('path');
const ejs = require("ejs");
const fs = require("fs-extra");

let assetsPathSource = path.join(__dirname, "../../dist/assets");
let assetsPathDestination = path.join(__dirname, "../../dev/assets");
let templatePathSource = path.join(__dirname, "./index.ejs");
let templatePathDestination = path.join(__dirname, "../../dev/index.html");

let config = {
  PUBLIC_URL: "",
  MODE: "development",
  TITLE: "Mystical Dispute: R.A.D. Simulator",
  DESCRIPTION: "The R.A.D. Simulator (Reasonable, Acceptable Draw Simulator) for MTG decks as mentioned on Mystical Dispute",
};

let production = false;
if (process.argv[2] == "production") {
  production = true;
  console.log("Production mode.");
}

if (production) {
  config.PUBLIC_URL = "https://rad.mysticaldispute.com/";
  config.MODE = "production";
  templatePathDestination = path.join(__dirname, "../../dist/index.html");
}

if (!production) {
  fs.copy(assetsPathSource, assetsPathDestination, (error) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("Asset files copied.");
  });
}

fs.readFile(templatePathSource, 'utf8', function (error, ejsRendered) {
  if (error) {
    console.log(error);
    return false;
  }

  const ejsCompiled = ejs.compile(ejsRendered);
  const ejsHTML = ejsCompiled(config);
  
  fs.writeFile(templatePathDestination, ejsHTML, function(err) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("Index.html file generated.")
    return true;
  });
});
