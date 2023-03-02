const fs = require("fs");
let database = require("../services/database");
let path = require("path");
var PdfPrinter = require("../node_modules/pdfmake/src/printer");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
const htmlToPdfmake = require("html-to-pdfmake");
const tablesLib = require("../lib/tables");

exports.exportGlk = async function (req, res, next) {
  let result = await database.analysis.findOne({
    where: { id: req.params.entry_id },
  });
  let data = result.dataValues.data;
  let accountingData = result.dataValues.accountingData;

  const field_17_minister_names = await tablesLib.getTableData(
    ["field_17_minister_name"],
    accountingData
  );
  const field_17_minister_ministries = await tablesLib.getTableData(
    ["field_17_minister_ministry"],
    accountingData
  );
  const field_17_minister_roles = await tablesLib.getTableData(
    ["field_17_minister_role"],
    accountingData
  );

  // download default Roboto font from cdnjs.com
  fonts = {
    Roboto: {
      normal: "public/fonts/Roboto-Regular.ttf",
      bold: "public/fonts/Roboto-Bold.ttf",
      bolditalics: "public/fonts/Roboto-BoldItalic.ttf",
      italics: "public/fonts/Roboto-Italic.ttf",
      medium: "public/fonts/Roboto-Medium.ttf",
    },
  };
  var printer = new PdfPrinter(fonts);

  let docDefinition = {
    pageSize: "A4",
    styles: {
      header1: {
        fontSize: 17,
        bold: true,
        decoration: "underline",
        alignment: "center",
      },
      header2: {
        alignment: "center",
        bold: true,
        color: "#5c3d3d",
        fontSize: 15,
      },
      header3: {
        alignment: "center",
        bold: true,
        fontSize: 13,
      },
      header4: {
        alignment: "center",
        fontSize: 13,
      },
    },
    defaultStyle: {
      fontSize: 11,
      alignment: "center",
    },
    content: [
      [
        {
          text: "ΑΝΑΛΥΣΗ ΣΥΝΕΠΕΙΩΝ ΡΥΘΜΙΣΗΣ\n\n",
          style: "header1",
        },
        {
          text: "ΤΙΤΛΟΣ ΑΞΙΟΛΟΓΟΥΜΕΝΗΣ ΡΥΘΜΙΣΗΣ\n\n",
          style: "header3",
        },
        {
          table: {
            headerRows: 0,
            widths: ["100%"],
            body: [[{ text: data.title, style: "header4" }]],
          },
        },
        {
          text: "Επισπεύδον Υπουργείο:\n\n",
          style: "header3",
        },
        {
          text: isEmpty(data.epispeudon_foreas),
          style: "header3",
        },
        {
          text: "\n\nΣτοιχεία επικοινωνίας:",
          style: "header3",
        },
        {
          table: {
            headerRows: 0,
            widths: ["100%"],
            body: [
              [{ text: isEmpty(data.stoixeia_epikoinwnias), style: "header4" }],
            ],
          },
        },
        { text: "\n\n" },
        {
          text: "Β. Έκθεση Γενικού Λογιστηρίου του Κράτους (άρθρο 75 παρ. 1 ή 2 του Συντάγματος)\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: isEmpty(accountingData.field_15_sxedio_nomou) },
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "του Υπουργείου:\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: isEmpty(accountingData.field_15_ypoyrgeio) },
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "15",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης\n",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                richText(accountingData.regulations),
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Στόχοι αξιολογούμενης ρύθμισης\n",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "16",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων\n",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα:\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Επί του Κρατικού Προϋπολογισμού\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                richText(accountingData.state_budget),
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                richText(accountingData.agency_budget),
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          text: "Ο/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ \n",
          style: "header3",
        },
        {
          table: {
            widths: ["20%", "60%", "20%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text:
                    "\n\n\n" +
                    accountingData.field_16_genikos_onoma +
                    " " +
                    accountingData.field_16_genikos_epitheto,
                  style: "header4",
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          text: "Γ. Ειδική Έκθεση (άρθρο 75 παρ. 3 του Συντάγματος)\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου\n",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: isEmpty(accountingData.field_17_sxedio_nomou) },
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "του Υπουργείου:",
                  style: "header4",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: isEmpty(accountingData.field_17_ypoyrgeio) },
              ],
            ],
          },
        },
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "17",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Οικονομικά αποτελέσματα \n",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                richText(accountingData.results),
              ],
            ],
          },
        },
        { text: "\n\n" },
        createSignatories(
          field_17_minister_names.field_17_minister_name,
          field_17_minister_roles.field_17_minister_role,
          field_17_minister_ministries.field_17_minister_ministry
        ),
      ],
    ],
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  var pdf_name = data.glk_pdf_name + ".pdf";
  //pdf_name = pdf_name.replace(/\s+/g, '');
  var export_path = "public/exports/";
  var pdf_path = path.resolve(export_path, pdf_name);
  pdf_path = path.resolve(export_path, pdf_name);
  pdfDoc.pipe(fs.createWriteStream(pdf_path));
  pdfDoc.end();

  if (fs.existsSync(pdf_path)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
};

function isEmpty(value) {
  return value === "" || !value ? "\n\n\n" : value;
}

function richText(value) {
  const richText = htmlToPdfmake(value, {
    window: window,
    replaceText: function (richText) {
      return richText.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
  });
  return richText;
}

function createSignatories(names, roles, ministries) {
  let signatories = [];
  const ministerIndexes = [];
  const substitutesIndexes = [];
  const undersecretariesIndexes = [];
  for (let i in roles) {
    if (
      roles[i].includes("ΥΠΟΥΡΓΟΣ") &&
      !roles[i].includes("ΥΦΥΠΟΥΡΓΟΣ") &&
      !roles[i].includes("ΑΝΑΠΛΗΡΩΤΗΣ")
    ) {
      ministerIndexes.push(i);
    }
    if (roles[i].includes("ΥΦΥΠΟΥΡΓΟΣ")) {
      substitutesIndexes.push(i);
    }
    if (roles[i].includes("ΑΝΑΠΛΗΡΩΤΗΣ ΥΠΟΥΡΓΟΣ")) {
      undersecretariesIndexes.push(i);
    }
  }
  if (ministerIndexes.length > 0) {
    signatories.push({
      text: "\n\nΟΙ ΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    signatories.push(
      createSignatoryTables(ministerIndexes, names, ministries, roles)
    );
  }

  if (substitutesIndexes.length > 0) {
    signatories.push({
      text: "\n\nΟΙ ΥΦΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    signatories.push(
      createSignatoryTables(substitutesIndexes, names, ministries)
    );
  }
  if (undersecretariesIndexes.length > 0) {
    signatories.push({
      text: "\n\nΟΙ ΑΝΑΠΛΗΡΩΤΕΣ ΥΠΟΥΡΓΟΙ\n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    signatories.push(
      createSignatoryTables(undersecretariesIndexes, names, ministries)
    );
  }
  if (signatories) {
    return signatories;
  }
}

function createSignatoryTables(indexes, names, ministries, roles) {
  const table = [];
  const result = [];
  let lastIndex, role1, role2;

  if (indexes.length === 1) {
    role1 =
      !ministries[indexes[0]] || ministries[indexes[0]] === ""
        ? roles[indexes[0]].split(" ").slice(1).join(" ")
        : ministries[indexes[0]].split(" ").slice(1).join(" ");
    table.push([
      { text: "", border: [false, false, false, false] },
      {
        text: role1 + "\n\n\n\n\n\n" + names[indexes[0]],
        bold: true,
        alignment: "center",
      },
      { text: "", border: [false, false, false, false] },
    ]);
  } else if (indexes.length % 2 === 1) {
    lastIndex = indexes[indexes.length - 1];

    for (i = 0; i < indexes.length - 2; i += 2) {
      role1 =
        !ministries[indexes[i]] || ministries[indexes[i]] === ""
          ? roles[indexes[i]].split(" ").slice(1).join(" ")
          : ministries[indexes[i]].split(" ").slice(1).join(" ");
      role2 =
        !ministries[indexes[i + 1]] || ministries[indexes[i + 1]] === ""
          ? roles[indexes[i + 1]].split(" ").slice(1).join(" ")
          : ministries[indexes[i + 1]].split(" ").slice(1).join(" ");
      table.push([
        {
          text: role1 + "\n\n\n\n\n\n" + names[indexes[i]],
          bold: true,
          alignment: "center",
        },
        { text: "", border: [false, false, false, false] },
        {
          text: role2 + "\n\n\n\n\n\n" + names[indexes[i + 1]],
          bold: true,
          alignment: "center",
        },
      ]);
      table.push([
        { text: "\n", border: [false, false, false, false] },
        { text: "\n", border: [false, false, false, false] },
        { text: "\n", border: [false, false, false, false] },
      ]);
    }
    table.push([
      { text: "\n", border: [false, false, false, false] },
      { text: "\n", border: [false, false, false, false] },
      { text: "\n", border: [false, false, false, false] },
    ]);
    role1 =
      !ministries[lastIndex] || ministries[lastIndex] === ""
        ? roles[lastIndex].split(" ").slice(1).join(" ")
        : ministries[lastIndex].split(" ").slice(1).join(" ");
    table.push([
      { text: "", border: [false, false, false, false] },
      {
        text: role1 + "\n\n\n\n\n\n" + names[lastIndex],
        bold: true,
        alignment: "center",
      },
      { text: "", border: [false, false, false, false] },
    ]);
  } else {
    for (i = 0; i < indexes.length; i += 2) {
      role1 =
        !ministries[indexes[i]] || ministries[indexes[i]] === ""
          ? roles[indexes[i]].split(" ").slice(1).join(" ")
          : ministries[indexes[i]].split(" ").slice(1).join(" ");
      table.push([
        {
          text: role1 + "\n\n\n\n\n\n" + names[indexes[i]],
          bold: true,
          alignment: "center",
        },
        { text: "", border: [false, false, false, false] },
        {
          text: role1 + "\n\n\n\n\n\n" + names[indexes[i + 1]],
          bold: true,
          alignment: "center",
        },
      ]);
      table.push([
        { text: "\n", border: [false, false, false, false] },
        { text: "\n", border: [false, false, false, false] },
        { text: "\n", border: [false, false, false, false] },
      ]);
    }
  }
  //Todo: return table with widths
  result.push({ text: "\n\n" });
  result.push({
    table: {
      headerRows: 0,
      widths: ["33%", "34%", "33%"],
      body: table,
    },
  });
  return result;
}