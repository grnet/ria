function createStaticTable(data, header, label, secondHeader) {
  let prefix, value;
  let row = [];
  let table = [];
  let tables = [];

  for (let elem in data) {
    //if header, namely start of new talbe, push table into tables
    if (elem.includes(header)) {
      if (table.length) {
        tables.push({ table: table });
        table = [];
      }
    } else if (elem.includes(label)) {
      //if label push row into table. Constructing individual table
      if (row.length) {
        table.push({ row: row });
        row = [];
      }
      prefix = elem.split(label);
      prefix = prefix.slice(0, -1);
    } else if (
      (!elem.includes(label) &&
      !elem.includes(header) &&
      !elem.includes(secondHeader) &&
      elem.includes(prefix))
    ) {
      //push into row. Construct individual table rows
      value = data[elem];
      if (typeof value != undefined) {
        row.push({ [elem]: value });
      } else {
        row.push("");
      }
    }
    if (elem.includes("allos_deiktis") && elem.includes("_label")) {
      value = data[elem][1];
      if (typeof value != undefined) {
        row.push({ [elem]: value });
      } else {
        row.push("");
      }
      console.log(true)
    }
  }
  return tables;
}

function createDynamicPDFTable(data, keys) {
  let result = [];

  for (i in data) {
    for (j in keys) {
      if (i.includes(keys[j])) {
        result.push(data[i]);
      }
    }
  }
  return result.length ? result : [];
}

function createDynamicTable(data, keys, key, entry, prefix) {
  let array = [];
  if (!entry) {
    entry = [];
  }
  let result = keys.filter((elem) => elem.includes(key));
  result.forEach((elem) => {
    if (!elem.includes(prefix)) {
      array.push({ elem: data[elem] });
    }
  });

  return array.length ? array : entry;
}

function getDataForPdfField9(data, header, label, secondHeader) {
  let prefix, value;
  let tableRows = [];
  let tables = [];
  let rowHeader;
  let rowLabel;
  let rowValues = [];
  for (let elem in data) {
    if (elem.includes(header)) {
      if (tableRows.length) {
        tables.push(tableRows);
        tableRows = [];
      }
      rowHeader = data[elem];
    }
    if (elem.includes(label)) {
      rowLabel = data[elem];
      prefix = elem.split(label);
      prefix = prefix.slice(0, -1);
    }
    if (
      !elem.includes(label) &&
      !elem.includes(header) &&
      !elem.includes(secondHeader) &&
      elem.includes(prefix)
    ) {
      value = data[elem];
      if (typeof value != undefined) {
        rowValues.push({ value: value });
      } else {
        rowValues.push("");
      }
      if (rowValues.length === 7) {
        if (rowHeader) {
          tableRows.push({
            header: rowHeader,
            label: rowLabel,
            values: rowValues,
          });
          rowHeader = "";
        } else {
          tableRows.push({
            label: rowLabel,
            values: rowValues,
          });
        }
        rowValues = [];
      }
    }
  }
  return tables;
}

function getPdfCheckboxTableData(data, prefix) {
  let array = [];
  let labelsArray = [];
  let valuesArray = [];
  let headers = ["thesmoi", "oikonomia", "kinonia", "perivallon", "nisiwtika"];

  for (let i in data) {
    if (
      i.includes(prefix) &&
      !i.includes("_cbxHeader") &&
      !i.includes("_cbxsecondHeader") &&
      !i.includes("_comments")
    ) {
      console.log(i)
      if (i.includes("_cbxlabel")) {
        labelsArray.push({ [i]: data[i] });
      } else {
        valuesArray.push({ [i]: data[i] });
      }
    }
  }
  //create array with the 5 labels(thesmoi, nisiotikotita etc)
  //loop labels, loop new array ^, loop values
  //if value[i] includes label && newarraylabel[j] then push 
  let count = 0;
  //bug's in here
  for (let i in labelsArray) {
    array.push(Object.values(labelsArray[i])[0]);
    for (let j = count; j < count + 5; j++) {
      array.push(Object.values(valuesArray[j])[0]);
    }
    count += 5;
  }
  return array;
}

// function getPdfCheckboxTableData(data, prefix) {
//   let array = [];
//   let labelsArray = [];
//   let valuesArray = [];
//   let thesmoi = [];
//   let oikonomia = [];
//   let kinonia = [];
//   let perivallon = [];
//   let nisiwtika = [];

//   for (let i in data) {
//     if (
//       i.includes(prefix) &&
//       !i.includes("_cbxHeader") &&
//       !i.includes("_cbxsecondHeader") &&
//       !i.includes("_comments")
//     ) {
//       if (i.includes("_cbxlabel")) {
//         labelsArray.push({ [i]: data[i] });
//       } else {
//         if (i.includes("thesmoi")) {
//           thesmoi.push({ [i]: data[i] });
//         } else if (i.includes("oikonomia")) {
//           oikonomia.push({ [i]: data[i] });
//         } else if (i.includes("kinonia")) {
//           kinonia.push({ [i]: data[i] });
//         } else if (i.includes("perivallon")) {
//           perivallon.push({ [i]: data[i] });
//         } else if (i.includes("nisiwtika")) {
//           nisiwtika.push({ [i]: data[i] });
//         }
//       }
//     }
//   }

//   for (let i in labelsArray) {
//     let labelKey = Object.keys(labelsArray[i])[0].split("_cbxlabel");
//     labelKey = labelKey[0];
//     array.push(Object.values(labelsArray[i])[0]);
//     for (let j in thesmoi) {
//       if (Object.keys(thesmoi[j])[0].includes(labelKey)) {
//         array.push(Object.values(thesmoi[j])[0]);
//         console.log(Object.keys(thesmoi[j])[0] + " " + labelKey);
//       }
//       if (Object.keys(oikonomia[j])[0].includes(labelKey)) {
//         array.push(Object.values(oikonomia[j])[0]);
//       }
//       if (Object.keys(kinonia[j])[0].includes(labelKey)) {
//         array.push(Object.values(kinonia[j])[0]);
//       }
//       if (Object.keys(perivallon[j])[0].includes(labelKey)) {
//         array.push(Object.values(perivallon[j])[0]);
//       }
//       if (Object.keys(nisiwtika[j])[0].includes(labelKey)) {
//         array.push(Object.values(nisiwtika[j])[0]);
//       }
//     }
//   }
//   console.log(labelsArray);
//   return array;
// }



function getMinisters(data, name, surname, ministry, role, noPrefix) {
  let tempName, tempSurname, tempMinistry, tempRole;
  let ministers = [];
  let undersecretaries = [];
  let substitutes = [];
  for (i in data) {
    if (!i.includes(noPrefix)) {
      if (i.includes(name)) {
        tempName = data[i];
      }
      if (i.includes(surname)) {
        tempSurname = data[i];
      }
      if (i.includes(role)) {
        tempRole = data[i];
      }
      if (i.includes(ministry)) {
        tempMinistry = data[i].split("ΥΠΟΥΡΓΕΙΟ ");
        if (tempRole === "ΥΠΟΥΡΓΟΣ") {
          ministers.push([tempName, tempSurname, tempMinistry[1]]);
        } else if (tempRole && tempRole.includes("ΥΦΥΠΟΥΡΓΟΣ")) {
          substitutes.push([tempName, tempSurname, tempMinistry[1]]);
        } else {
          undersecretaries.push([tempName, tempSurname, tempMinistry[1]]);
        }
      }
    }
  }
  return { ministers, substitutes, undersecretaries };
}

module.exports = {
  createStaticTable,
  createDynamicTable,
  getDataForPdfField9,
  getPdfCheckboxTableData,
  createDynamicPDFTable,
  getMinisters,
};
