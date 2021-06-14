function createStaticTable(data, header, label, secondHeader) {

    let prefix, elemValue;
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
        } else if (elem.includes(label)) { //if label push row into table. Constructing individual table
            if (row.length) {
                table.push({ row: row });
                row = [];
            }
            prefix = elem.split(label);
            prefix = prefix.slice(0, -1);
        } else if (!elem.includes(label) && !elem.includes(header) && !elem.includes(secondHeader) && elem.includes(prefix)) {//push into row. Construct individual table rows
            elemValue = data[elem];
            if (typeof elemValue != undefined) {
                row.push({ [elem]: elemValue });
            } else {
                row.push('');
            }
        }
    }
    return tables;
}

function createDynamicTable(data, keys, key) {

    let table = [];
    let result = keys.filter(elem => elem.includes(key));
    result.forEach(elem => table.push(data[elem]));
    console.log(result)
    return table;

}

module.exports = {
    createStaticTable: createStaticTable,
    createDynamicTable: createDynamicTable
};
