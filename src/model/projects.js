const fs = require("fs");
var path = require("path");
const jsonData = require("../database/data.json");

function GetData() {
  return jsonData;
}

function SetData(data) {
  fs.writeFileSync(
    path.join(__dirname, "../database/data.json"),
    JSON.stringify(data)
  );
}

function FindById(id) {
  return jsonData.find(item => item.id === id);
}

function DeleteById(id) {
  const result = jsonData.filter(function(item) {
    return item.id !== id;
  });

  SetData(result);
}

module.exports = {
  getData: GetData,
  setData: SetData,
  findById: FindById,
  deleteById: DeleteById
};
