const fs = require("fs");
const path = require("path");
function save(livresData) {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "livres.json"),
      JSON.stringify(livresData)
    );
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = {
  save,
};
