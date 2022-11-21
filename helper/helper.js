const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) console.log(err);
  });
}

const getNewId = () => {
  return uuidv4();
};

const timestamp = () => {
  return Date.now();
};

module.exports = {
  writeJSONFile,
  getNewId,
  timestamp,
};
