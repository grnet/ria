//TODO: remove once pdf & diff refactoring for fields 19 & 20 is done
async function getCheckboxTableData(data, prefix, isPdfTable) {
  let array = [];
  let labelsArray = [];
  let valuesArray = [];
  let headers = [
    "thesmoi",
    "oikonomia",
    "kinonia",
    "perivallon",
    "nisiwtikotita",
  ];
  let label;

  for (let i in data) {
    if (
      i.includes(prefix) &&
      !i.includes("_cbxHeader") &&
      !i.includes("_cbxsecondHeader") &&
      !i.includes("_comments")
    ) {
      if (i.includes("_cbxlabel")) {
        labelsArray.push({ [i]: data[i] });
      } else {
        valuesArray.push({ [i]: data[i] });
      }
    }
  }

  if (isPdfTable) return valuesArray;

  for (let i in labelsArray) {
    array.push(Object.values(labelsArray[i])[0]);
    label = Object.keys(labelsArray[i])[0];
    label = label.split("_cbxlabel")[0];
    for (let j in headers) {
      for (let k in valuesArray) {
        let key = Object.keys(valuesArray[k])[0];
        if (key.includes(label) && key.includes(headers[j])) {
          array.push(Object.values(valuesArray[k])[0]);
          break;
        }
      }
    }
  }
  return array;
}

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

async function getTableData(prefixes, data) {
  let values = [];
  let result = {};
  if (!Array.isArray(prefixes)) return [];
  if (!data) return [];

  for (let i in prefixes) {
    let prefix = prefixes[i];
    for (let j in data) {
      if (j.includes(prefix)) values.push(data[j]);
    }
    result[`${prefix}`] = values;
    values = [];
  }
  return result;
}

async function getField9(data) {
  const prefixes = [
    "ekpaideysi",
    "politismos",
    "oikonomia",
    "forologia",
    "ergasiakes_sxeseis",
    "apasxolisi",
    "koinoniki_asfalisi",
    "koinoniki_pronoia",
    "ygeia",
    "isotita_fylwn",
    "metanasteytiki_prosfygiki_politiki",
    "dimosia_dioikisi",
    "dimosia_asfaleia",
    "dikaiosini",
    "ependytiki_drastiriotita",
    "perivallon_energeia",
  ];
  const tableData = {};
  for (let j in prefixes) {
    tableData[`${prefixes[j]}`] = [];
  }
  for (let i in data) {
    for (let j in prefixes) {
      if (i.includes(prefixes[j])) {
        if (i.includes("index")) {
          tableData[`${prefixes[j]}`].push({ row: [data[i]] });
          continue;
        }
        const pos = i.slice(-1);
        if (!isNaN(pos)) {
          tableData[`${prefixes[j]}`][`${pos}`]["row"].push(data[i]);
        }
      }
    }
  }
  return tableData;
}

module.exports = {
  getTableData,
  getCheckboxTableData,
  getMinisters,
  getField9,
};
