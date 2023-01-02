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
  let result = await database.analysis.findOne({where: {id: req.params.id}});
  let data = result.dataValues;
  let field_17_ministers = tablesLib.getMinisters(
    data,
    "field_17_minister_name",
    "field_17_minister_surname",
    "field_17_minister_ministry",
    "field_17_minister_role"
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
          text: data.epispeudon_foreas,
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
            body: [[{ text: data.stoixeia_epikoinwnias, style: "header4" }]],
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
                { text: isEmpty(data.field_15_sxedio_nomou) },
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
                { text: isEmpty(data.field_15_ypoyrgeio) },
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
                { text: isEmpty(data.field_15_rythmiseis, true) },
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
                { text: isEmpty(data.field_16_kratikos_proypologismos, true) },
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
                { text: isEmpty(data.field_16_proypologismos_forea, true) },
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
                    data.field_16_genikos_onoma +
                    " " +
                    data.field_16_genikos_epitheto,
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
                { text: isEmpty(data.field_17_sxedio_nomou) },
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
                { text: isEmpty(data.field_17_ypoyrgeio) },
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
                { text: isEmpty(data.field_17_oikonomika_apotelesmata, true) },
              ],
            ],
          },
        },
        { text: "\n\n" },
        createSignatories(field_17_ministers),
      ],
    ],
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  var pdf_name = data.glk_pdf_name + ".pdf";
  //pdf_name = pdf_name.replace(/\s+/g, '');
  var export_path = "public/pdf_exports/";
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

function isEmpty(value, isRichText) {
  let text;
  if (isRichText) {
    !htmlToPdfmake(value, { window: window }).length
      ? (text = "\n\n")
      : (text = htmlToPdfmake(value, {
          window: window,
          replaceText: function (richText) {
            return richText.replace(/(?:\r\n|\r|\n)/g, "<br>");
          },
        }));
  } else {
    value === "" || !value ? (text = "\n\n") : (text = value);
  }
  return text;
}

function createSignatories(ministers) {
  let signatories = [];
  let table = [];
  if (ministers.ministers && ministers.ministers.length) {
    signatories.push({ text: "\n\n" });
    signatories.push({
      text: "ΟΙ ΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    for (i = 0; i < ministers.ministers.length; i += 2) {
      table.push([
        {
          text: ministers.ministers[i][2],
          bold: true,
          alignment: "center",
        },
        {
          text: isMinister(ministers.ministers, i, "ministry"),
          bold: true,
          alignment: "center",
        },
      ]);
      table.push([
        {
          text:
            "\n\n\n" +
            ministers.ministers[i][0] +
            " " +
            ministers.ministers[i][1],
          alignment: "center",
        },
        {
          text: isMinister(ministers.ministers, i, "name"),
          alignment: "center",
        },
      ]);
    }
    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: table,
      },
    });
    table = [];
  }

  if (ministers.substitutes && ministers.substitutes.length) {
    signatories.push({ text: "\n\n" });
    signatories.push({
      text: "ΟΙ ΥΦΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    for (i = 0; i < ministers.substitutes.length; i += 2) {
      table.push([
        {
          text: ministers.substitutes[i][2],
          bold: true,
          alignment: "center",
        },
        {
          text: isMinister(ministers.substitutes, i, "ministry"),
          bold: true,
          alignment: "center",
        },
      ]);
      table.push([
        {
          text:
            "\n\n\n" +
            ministers.substitutes[i][0] +
            " " +
            ministers.substitutes[i][1],
          alignment: "center",
        },
        {
          text: isMinister(ministers.substitutes, i, "name"),
          alignment: "center",
        },
      ]);
    }
    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: table,
      },
    });
    table = [];
  }

  if (ministers.undersecretaries && ministers.undersecretaries.length) {
    signatories.push({ text: "\n\n" });
    signatories.push({
      text: "ΟΙ ΑΝΑΠΛΗΡΩΤΕΣ ΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    for (i = 0; i < ministers.undersecretaries.length; i += 2) {
      table.push([
        {
          text: ministers.undersecretaries[i][2],
          bold: true,
          alignment: "center",
        },
        {
          text: isMinister(ministers.undersecretaries, i, "ministry"),
          bold: true,
          alignment: "center",
        },
      ]);
      table.push([
        {
          text:
            "\n\n\n" +
            ministers.undersecretaries[i][0] +
            " " +
            ministers.undersecretaries[i][1],
          alignment: "center",
        },
        {
          text: isMinister(ministers.undersecretaries, i, "name"),
          alignment: "center",
        },
      ]);
    }
    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: table,
      },
    });
  }
  if (signatories) {
    return signatories;
  }
}

function isMinister(data, step, type) {
  if (data[step + 1]) {
    if (type === "name") {
      return "\n\n\n" + data[step + 1][0] + " " + data[step + 1][1];
    } else {
      return data[step + 1][2];
    }
  } else {
    return "";
  }
}

