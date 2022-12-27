const csv = require("csv-parser");
const fs = require("fs");

function getTooltips() {
  return new Promise((resolve, reject) => {
    const birthdays = [];
    fs.createReadStream("./public/csvs/ASR_Tooltips.csv")
      .pipe(csv())
      .on("data", (data) => birthdays.push(data))
      .on("end", () => {
        resolve(birthdays);
      });
  });
}

module.exports = { getTooltips };
