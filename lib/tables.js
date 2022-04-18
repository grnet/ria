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
      !elem.includes(label) &&
      !elem.includes(header) &&
      !elem.includes(secondHeader) &&
      elem.includes(prefix)
    ) {
      //push into row. Construct individual table rows
      value = data[elem];
      if (typeof value != undefined) {
        row.push({ [elem]: value });
      } else {
        row.push("");
      }
    }
  }
  return tables;
}

function createDynamicTable(data, key, entry) {
  let array = [];
  let keys = Object.keys(data);
  if (!entry) {
    entry = [];
  }
  let result = keys.filter((elem) => elem.includes(key));
  result.forEach((elem) => array.push({ elem: data[elem] }));
  return array.length ? array : entry;
}

function createDynamicPDFTable(data, keys) {
  let result = [];

  for (i in data) {
    for (j in keys) {
      if ( i.includes(keys[j]) ) {
        result.push(data[i]);
      }
    }
  }
  return result.length ? result : [];
}

function createDynamicTable(data, keys, key, entry) {
  let array = [];
  if (!entry) {
    entry = [];
  }
  let result = keys.filter((elem) => elem.includes(key));
  result.forEach((elem) => array.push({ elem: data[elem] }));
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

function getDataForPdfCheckboxTables(data, header, label, subHeader) {
  let prefixes = [];
  let headers = [];
  let subHeaders = [];
  let labels = [];

  let value;
  let tableRows = [];
  let tables = [];
  let rowValues = [];

  for (i in data) {
    if (i.includes(label)) {
      rowLabel = data[i];
      let prefix = i.split(label);
      prefix = prefix.slice(0, -1);
      if (prefix.includes("final")) {
        continue;
      }
      prefixes.push(prefix);
      labels.push(data[i]);
    }
    if (i.includes(header)) {
      headers.push(data[i]);
    }
    if (i.includes(subHeader)) {
      subHeaders.push(data[i]);
    }
  }
  tables = [
    {
      header: headers[0],
      data: [
        {
          subHeader: subHeaders[0],
          rows: [],
        },
        {
          subHeader: subHeaders[1],
          rows: [],
        },
      ],
    },
    {
      header: headers[1],
      data: [
        {
          subHeader: subHeaders[2],
          rows: [],
        },
        {
          subHeader: subHeaders[3],
          rows: [],
        },
      ],
    },
    {
      header: headers[2],
      data: [
        {
          subHeader: subHeaders[4],
          rows: [],
        },
        {
          subHeader: subHeaders[5],
          rows: [],
        },
      ],
    },
  ];
  let count = 0;
  for (i in data) {
    for (j in prefixes) {
      if (
        !i.includes(label) &&
        !i.includes(header) &&
        !i.includes(subHeader) &&
        i.includes(prefixes[j])
      ) {
        value = data[i];
        if (value) {
          rowValues.push({ value: value });
        } else {
          rowValues.push({ value: "" });
        }
        if (rowValues.length === 5) {
          tableRows.push({
            label: labels[count],
            values: rowValues,
          });
          count++;
          rowValues = [];
        }
      }
    }
  }

  for (let i = 0; i < tableRows.length; i++) {
    if (i < 5) {
      tables[0].data[0].rows.push({ row: tableRows[i] });
      continue;
    } else if (i >= 5 && i < 10) {
      tables[0].data[1].rows.push({ row: tableRows[i] });
      continue;
    } else if (i >= 10 && i < 15) {
      tables[1].data[0].rows.push({ row: tableRows[i] });
      continue;
    } else if (i >= 15 && i < 18) {
      tables[1].data[1].rows.push({ row: tableRows[i] });
      continue;
    } else if (i >= 18 && i < 22) {
      tables[2].data[0].rows.push({ row: tableRows[i] });
      continue;
    } else if (i > 22) {
      tables[2].data[1].rows.push({ row: tableRows[i] });
    }
    return tables;
  }
}
module.exports = {
  createStaticTable: createStaticTable,
  createDynamicTable: createDynamicTable,
  getDataForPdfField9: getDataForPdfField9,
  getDataForPdfCheckboxTables: getDataForPdfCheckboxTables,
  createDynamicPDFTable: createDynamicPDFTable,
};
