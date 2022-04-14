function createStaticTable(data, header, label, secondHeader) {
  let prefix, value;
  let row = [];
  let table = [];
  let tables = [];

  for (var elem in data) {
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

function createDynamicTable(data, keys, key, entry) {
  let array = [];
  if (!entry) {
    entry = [];
  }
  let result = keys.filter((elem) => elem.includes(key));
  result.forEach((elem) => array.push({ elem: data[elem] }));
  return array.length ? array : entry;
}

function getStaticArrayForPdf(data, header, label, secondHeader) {
  let prefix, value;
  let tableRows = [];
  let tables = [];
  let rowHeader;
  let rowLabel;
  let rowValues = [];
  for (var elem in data) {
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

module.exports = {
  createStaticTable: createStaticTable,
  createDynamicTable: createDynamicTable,
  getStaticArrayForPdf: getStaticArrayForPdf,
};
