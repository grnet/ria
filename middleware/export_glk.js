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
  let data = req.body;
  let field_17_ministers = tablesLib.getMinisters(
    data,
    "field_17_minister_name",
    "field_17_minister_surname",
    "field_17_minister_ministry",
    "field_17_minister_role"
  );
  let field_16_signatory = [
    data.field_16_genikos_onoma,
    data.field_16_genikos_epitheto,
  ];
  const Report = {
    cover: createCover(data),
    reports: [
      {
        reportTitle:
          "Β. Έκθεση Γενικού Λογιστηρίου του Κράτους (άρθρο 75 παρ. 1 ή 2 του Συντάγματος)",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldHeader:
                      "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου",
                    fieldText: isEmpty(data.field_15_sxedio_nomou),
                  },
                },
                {
                  field: {
                    fieldHeader: "του Υπουργείου:",
                    fieldText: isEmpty(data.field_15_ypoyrgeio),
                  },
                },
                {
                  field: {
                    fieldId: 15,
                    fieldHeader:
                      "15.Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης",
                    fieldText: isEmpty(data.field_15_rythmiseis, true),
                    hasHTML: true,
                  },
                },
              ],
            },
          },
          {
            category: {
              categoryHeader: "Στόχοι αξιολογούμενης ρύθμισης",
              categoryFields: [
                {
                  field: {
                    fieldId: 16,
                    fieldHeader:
                      "16.Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων",
                  },
                },
                {
                  field: {
                    fieldHeader:
                      "Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα:",
                  },
                },
                {
                  field: {
                    fieldHeader: "Επί του Κρατικού Προϋπολογισμού",
                    fieldText: isEmpty(data.field_16_kratikos_proypologismos),
                    hasHTML: true,
                  },
                },
                {
                  field: {
                    fieldHeader:
                      "Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων",
                    fieldText: isEmpty(
                      data.field_16_proypologismos_forea,
                      true
                    ),
                    hasHTML: true,
                  },
                },
              ],
            },
          },
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldCreatedBy:
                      createGlkDirectorSignature(field_16_signatory),
                  },
                },
              ],
            },
          },
        ],
      },
      {
        reportTitle: "Γ. Ειδική Έκθεση (άρθρο 75 παρ. 3 του Συντάγματος)",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldHeader:
                      "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου",
                    fieldText: isEmpty(data.field_17_sxedio_nomou),
                  },
                },
                {
                  field: {
                    fieldHeader: "του Υπουργείου:",
                    fieldText: isEmpty(data.field_17_ypoyrgeio),
                  },
                },
                {
                  field: {
                    fieldId: 17,
                    fieldHeader: "17.Οικονομικά αποτελέσματα ",
                    fieldText: isEmpty(
                      data.field_17_oikonomika_apotelesmata,
                      true
                    ),
                    hasHTML: true,
                  },
                },
              ],
            },
          },
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldCreatedBy: createSignatories(field_17_ministers),
                  },
                },
              ],
            },
          },
        ],
      },
    ],
    // annex: "Παράρτημα",
  };
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
    content: [[createContainerTable(Report)]],
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

function isEmpty(val, hasHTML) {
  let text;
  if (hasHTML) {
    !htmlToPdfmake(val, { window: window }).length
      ? (text = "\n\n")
      : (text = val);
  } else {
    val === "" && !val ? (text = "\n\n") : (text = val);
  }
  return text;
}

function createCover(data) {
  let cover = [];

  cover.push({
    text: "ΑΝΑΛΥΣΗ ΣΥΝΕΠΕΙΩΝ ΡΥΘΜΙΣΗΣ\n\n",
    fontSize: 17,
    bold: true,
    decoration: "underline",
    alignment: "center",
  });
  // cover.push({
  //   text: "",
  // });
  cover.push({
    text: "ΤΙΤΛΟΣ ΑΞΙΟΛΟΓΟΥΜΕΝΗΣ ΡΥΘΜΙΣΗΣ",
    fontSize: 15,
    bold: true,
    alignment: "center",
  });
  cover.push({
    table: {
      // headerRows: 0,
      widths: ["100%"],
      body: [[{ text: data.title, alignment: "center" }]],
    },
  });
  cover.push({
    text: "Επισπεύδον Υπουργείο:\n\n",
    alignment: "center",
    bold: true,
  });
  cover.push({
    text: data.epispeudon_foreas,
    fontSize: 15,
    bold: true,
    alignment: "center",
  });
  cover.push({
    text: "\nΣτοιχεία επικοινωνίας: " + data.stoixeia_epikoinwnias,
    alignment: "center",
    bold: true,
  });
  cover.push({
    text: "\n",
  });
  cover.push({
    table: {
      headerRows: 0,
      widths: ["50%", "50%"],
      body: [
        [
          {
            text: "Επιλέξατε από τον παρακάτω κατάλογο τον τομέα ή τους τομείς νομοθέτησης στους οποίους αφορούν οι βασικές διατάξεις της αξιολογούμενης ρύθμισης:",
            alignment: "center",
            colSpan: 2,
          },
          { text: "" },
        ],
        [{ text: "ΤΟΜΕΙΣ ΝΟΜΟΘΕΤΗΣΗΣ" }, { text: "(X)", alignment: "center" }],
        [
          {
            columns: [
              {
                text: "ΕΚΠΑΙΔΕΥΣΗ - ΠΟΛΙΤΙΣΜΟΣ",
                width: "auto",
                fontSize: 11,
              },
              { text: "1", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.ekpedeusi_politismos),
            alignment: "center",
          },
        ],
        [
          {
            columns: [
              {
                text: "ΕΘΝΙΚΗ ΑΜΥΝΑ – ΕΞΩΤΕΡΙΚΗ ΠΟΛΙΤΙΚΗ",
                width: "auto",
                fontSize: 11,
              },
              { text: "2", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.eksoteriki_politiki),
            alignment: "center",
          },
        ],
        [
          {
            columns: [
              {
                text: "ΟΙΚΟΝΟΜΙΚΗ / ΔΗΜΟΣΙΟΝΟΜΙΚΗ / ΦΟΡΟΛΟΓΙΚΗ ΠΟΛΙΤΙΚΗ",
                width: "auto",
                fontSize: 11,
              },
              { text: "3", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.forologiki_politiki),
            alignment: "center",
          },
        ],
        [
          {
            columns: [
              {
                text: "ΚΟΙΝΩΝΙΚΗ ΠΟΛΙΤΙΚΗ",
                width: "auto",
                fontSize: 11,
              },
              { text: "4", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.koinoniki_politiki),
            alignment: "center",
          },
        ],
        [
          {
            columns: [
              {
                text: "ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ – ΔΗΜΟΣΙΑ ΤΑΞΗ – ΔΙΚΑΙΟΣΥΝΗ",
                width: "auto",
                fontSize: 11,
              },
              { text: "5", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.dimosia_dioikisi),
            alignment: "center",
          },
        ],
        [
          {
            columns: [
              {
                text: "ΑΝΑΠΤΥΞΗ – ΕΠΕΝΔΥΤΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ",
                width: "auto",
                fontSize: 11,
              },
              { text: "6", width: "auto", fontSize: 7 },
            ],
          },
          {
            text: checkboxValue(data.anaptiksi),
            alignment: "center",
          },
        ],
      ],
    },
  });
  cover.push({
    text: "\n",
  });
  cover.push(
    {
      columns: [
        { text: "1", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Παιδείας & Θρησκευμάτων και Υπουργείου Πολιτισμού & Αθλητισμού.",
          width: "auto",
          fontSize: 10,
        },
      ],
    },
    {
      columns: [
        { text: "2", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Εθνικής Άμυνας και Υπουργείου Εξωτερικών.",
          width: "auto",
          fontSize: 10,
        },
      ],
    },
    {
      columns: [
        { text: "3", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Οικονομικών.",
          width: "auto",
          fontSize: 10,
        },
      ],
    },
    {
      columns: [
        { text: "4", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Εργασίας και Κοινωνικών Υποθέσεων και Υπουργείου Υγείας.",
          width: "auto",
          fontSize: 10,
        },
      ],
    },
    {
      columns: [
        { text: "5", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Εσωτερικών, Υπουργείου Ψηφιακής Διακυβέρνησης, Υπουργείου Προστασίας του Πολίτη και Υπουργείου Δικαιοσύνης.",
          width: "auto",
          fontSize: 10,
        },
      ],
    },
    {
      columns: [
        { text: "6", width: "auto", fontSize: 8 },
        {
          text: "Τομέας νομοθέτησης επί θεμάτων Υπουργείου Ανάπτυξης & Επενδύσεων, Υπουργείου Περιβάλλοντος & Ενέργειας, Υπουργείου Υποδομών & Μεταφορών, Υπουργείου Ναυτιλίας & Νησιωτικής Πολιτικής, Υπουργείου Αγροτικής Ανάπτυξης & Τροφίμων και Υπουργείου Τουρισμού.",
          width: "auto",
          fontSize: 10,
        },
      ],
    }
  );
  return cover;
}

function createContainerTable(report) {
  const header = { text: report.header, fillColor: "#6c541e" }; //"#808080",}
  let reportTables = [];
  let tempTables;
  reportTables.push(report.cover);
  // TODO: add header NOT as table row
  for (let i in report.reports) {
    // return reportTable;
    reportTables.push({
      text: report.reports[i].reportTitle,
      pageBreak: "before",
      fontSize: 15,
      color: "#5c3d3d",
      bold: true,
    });
    reportTables.push({ text: "\n\n" });
    for (let j in report.reports[i].fields) {
      tempTables = createTable(report.reports[i].fields[j]);
      if (tempTables[1]) {
        reportTables.push({ text: "\n\n" });
        reportTables.push(tempTables[0]);
        reportTables.push(tempTables[1]);
      } else {
        reportTables.push({ text: "\n\n" });
        reportTables.push(tempTables);
      }
    }
  }
  return reportTables;
}

function createTable(categoryData) {
  let reportTable = [];
  let reportTables;
  let generatedFields;

  if (categoryData.category.categoryHeader) {
    reportTable.push([
      {
        text: "",
        border: [false, false, false, false],
        fillColor: "white",
      },
      {
        text: categoryData.category.categoryHeader,
        alignment: "center",
        fillColor: "#a9a9a9",
        colSpan: 2,
      },
      { text: "" },
    ]);
  }

  for (j in categoryData.category.categoryFields) {
    handleCategoryFields(reportTable, categoryData.category.categoryFields[j]);

    if (categoryData.category.categoryFields[j].field.fieldCreatedBy) {
      generatedFields =
        categoryData.category.categoryFields[j].field.fieldCreatedBy;
    }
  }

  let len = reportTable.length;
  if (reportTable[len - 1].length === 4) {
    reportTables = {
      table: {
        headerRows: 0,
        widths: ["5%", "10%", "25%", "60%"],
        body: reportTable,
      },
    };
  } else {
    reportTables = {
      table: {
        headerRows: 0,
        widths: ["5%", "20%", "75%"],
        body: reportTable,
      },
    };
  }

  if (generatedFields) {
    return [reportTables, generatedFields];
  } else {
    return reportTables;
  }
}

function handleCategoryFields(reportTable, category) {
  if (category.field.fieldId) {
    reportTable.push([
      {
        text: category.field.fieldId,
        alignment: "center",
        fillColor: "#dcdcdc",
      },
      {
        text: category.field.fieldHeader,
        alignment: "center",
        fillColor: "#dcdcdc",
        colSpan: 2,
      },
      { text: "" },
    ]);
  } else {
    reportTable.push([
      { text: "", border: [false, false, false, false] },
      {
        text: category.field.fieldHeader,
        alignment: "center",
        colSpan: 2,
      },
      { text: "" },
    ]);
  }
  if (category.field.fieldText) {
    if (category.field.hasHTML) {
      category.field.fieldText === "\n\n"
        ? reportTable.push([
            { text: "", border: [false, false, false, false], colSpan: 2 },
            { text: "" },
            { text: category.field.fieldText },
          ])
        : reportTable.push([
            { text: "", border: [false, false, false, false], colSpan: 2 },
            { text: "" },
            htmlToPdfmake(category.field.fieldText, {
              window: window,
              replaceText: function (text) {
                return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
              },
            }),
          ]);
    } else {
      reportTable.push([
        { text: "", border: [false, false, false, false] },
        {
          text: category.field.fieldText,
          colSpan: 2,
        },
        { text: "" },
      ]);
    }
  }
}

function createGlkDirectorSignature(data) {
  let signatory = [
    {
      text: "\n\n\nΟ/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ ",
      bold: true,
      alignment: "center",
    },
  ];
  signatory.push({
    columns: [
      { width: "30%", text: "" },
      {
        table: {
          headerRows: 0,
          widths: ["50%"],
          body: [
            [
              {
                text: "\n\n\n" + data[0] + " " + data[1],
                bold: true,
                alignment: "center",
              },
            ],
          ],
        },
      },
      { width: "20%", text: "" },
    ],
  });
  return signatory;
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

function checkboxValue(value) {
  return value !== "" ? "X" : value;
}
