const fs = require("fs");
let database = require("../services/database");
let path = require("path");
const PDFMerger = require("pdf-merger-js");
let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let { window } = new JSDOM("");
let PdfPrinter = require("../node_modules/pdfmake/src/printer");
const htmlToPdfmake = require("html-to-pdfmake");
const tablesLib = require("../lib/tables");

exports.exportPDF = async function (req, res, next) {
  let data = req.diffData;
  // const minister_names = await tablesLib.getTableData(["minister_name"], data);
  // const minister_ministries = await tablesLib.getTableData(
  //   ["minister_ministry"],
  //   data
  // );
  // const minister_roles = await tablesLib.getTableData(["minister_role"], data);

  // const field_17_minister_names = await tablesLib.getTableData(
  //   ["field_17_minister_name"],
  //   accountingData
  // );
  // const field_17_minister_ministries = await tablesLib.getTableData(
  //   ["field_17_minister_ministry"],
  //   accountingData
  // );
  // const field_17_minister_roles = await tablesLib.getTableData(
  //   ["field_17_minister_role"],
  //   accountingData
  // );

  const field_9 = await tablesLib.getField9(data); //data for field_9

  const field_14 = {
    columns: 2,
    headers: ["Άρθρο", "Στόχος"],
    keys: ["field_14_arthro", "field_14_stoxos"],
    data: await tablesLib.getTableData(
      ["field_14_arthro", "field_14_stoxos"],
      data
    ),
  };

  const field_29 = {
    columns: 2,
    headers: ["Διατάξεις αξιολογούμενης ρύθμισης", "Υφιστάμενες διατάξεις"],
    keys: ["field_29_diatakseis_rythmisis", "field_29_yfistamenes_diatakseis"],
    data: await tablesLib.getTableData(
      ["field_29_diatakseis_rythmisis", "field_29_yfistamenes_diatakseis"],
      data
    ),
  };

  const field_30 = {
    columns: 2,
    headers: [
      "Διατάξεις αξιολογούμενης ρύθμισης που προβλέπουν κατάργηση",
      "Καταργούμενες διατάξεις",
    ],
    keys: [
      "field_30_diatakseis_katargisi",
      "field_30_katargoumenes_diatakseis",
    ],
    data: await tablesLib.getTableData(
      ["field_30_diatakseis_katargisi", "field_30_katargoumenes_diatakseis"],
      data
    ),
  };

  const field_31 = {
    columns: 3,
    headers: [
      "Σχετική διάταξη αξιολογούμενης ρύθμισης",
      "Συναρμόδια Υπουργεία –Συναρμόδιες υπηρεσίες / φορείς",
      "Αντικείμενο συναρμοδιότητας",
    ],
    keys: [
      "field_31_sxetiki_diataksi",
      "field_31_synarmodia_ypoyrgeia",
      "field_31_antikeimeno_synarmodiotitas",
    ],
    data: await tablesLib.getTableData(
      [
        "field_31_sxetiki_diataksi",
        "field_31_synarmodia_ypoyrgeia",
        "field_31_antikeimeno_synarmodiotitas",
      ],
      data
    ),
  };

  const field_32 = {
    columns: 5,
    headers: [
      "Εξουσιοδοτική διάταξη",
      "Είδος πράξης",
      "Αρμόδιο ή επισπεύδον Υπουργείο ή υπηρεσία",
      "Αντικείμενο",
      "Χρονοδιάγραμμα (ενδεικτική ή αποκλειστική προθεσμία)",
    ],
    keys: [
      "field_32_eksousiodotiki_diataksi",
      "field_32_eidos_praksis",
      "field_32_armodio_ypoyrgeio",
      "field_32_antikeimeno",
      "field_32_xronodiagramma",
    ],
    data: await tablesLib.getTableData(
      [
        "field_32_eksousiodotiki_diataksi",
        "field_32_eidos_praksis",
        "field_32_armodio_ypoyrgeio",
        "field_32_antikeimeno",
        "field_32_xronodiagramma",
      ],
      data
    ),
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
  let printer = new PdfPrinter(fonts);

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
            widths: ["100%"],
            body: [
              [{ text: isEmpty(getTextDiff(data.title)), style: "header4" }],
            ],
          },
        },
        {
          text: "Επισπεύδον Υπουργείο:\n\n",
          style: "header3",
        },
        {
          text: isEmpty(getTextDiff(data.epispeudon_foreas)),
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
              [
                {
                  text: isEmpty(getTextDiff(data.stoixeia_epikoinwnias)),
                  style: "header4",
                },
              ],
            ],
          },
        },
        { text: "\n\n" },
        {
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
              [
                { text: "ΤΟΜΕΙΣ ΝΟΜΟΘΕΤΗΣΗΣ" },
                { text: "(X)", alignment: "center" },
              ],
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
                  text: checkboxValue(getTextDiff(data.ekpedeusi_politismos)),
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
                  text: checkboxValue(getTextDiff(data.eksoteriki_politiki)),
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
                  text: checkboxValue(getTextDiff(data.forologiki_politiki)),
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
                  text: checkboxValue(getTextDiff(data.koinoniki_politiki)),
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
                  text: checkboxValue(getTextDiff(data.dimosia_dioikisi)),
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
                  text: checkboxValue(getTextDiff(data.anaptiksi)),
                  alignment: "center",
                },
              ],
            ],
          },
        },
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
        },
        {
          text: "Α. Αιτολογική έκθεση\n\n\n",
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
                  text: "Η «ταυτότητα» της αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "1",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση;",
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
                { text: isEmpty(getTextDiff(data.field_1)) },
              ],
              [
                {
                  text: "2",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Γιατί αποτελεί πρόβλημα;",
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
                { text: isEmpty(getTextDiff(data.field_2)) },
              ],
              [
                {
                  text: "3",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;",
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
                { text: isEmpty(getTextDiff(data.field_3)) },
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
                  text: "Η αναγκαιότητα της αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "4",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isSelect(
                    `Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; 
                      ΝΑΙ ΟΧΙ 
                      Εάν ΝΑΙ, ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα;`,
                    getTextDiff(data.field_4)
                  ),
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
                { text: isEmpty(getTextDiff(data.field_4_comments)) },
              ],
              [
                {
                  text: "5",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "20%", "75%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "i) με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης;",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_5_1)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "ii) με αλλαγή διοικητικής πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας;",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_5_2)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "iii) με διάθεση περισσότερων ανθρώπινων και υλικών πόρων;",
                },
                { text: isEmpty(getTextDiff(data.field_5_3)) },
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
                  text: "Συναφείς πρακτικές",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "6",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isSelect(
                    `Έχετε λάβει υπόψη συναφείς πρακτικές; 
                   ΝΑΙ  ΟΧΙ
                   Εάν ΝΑΙ, αναφέρατε συγκεκριμένα:`,
                    getTextDiff(data.field_6)
                  ),
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "20%", "75%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "i) σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ:",
                },
                { text: isEmpty(getTextDiff(data.field_6_1)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "ii) σε όργανα της Ε.Ε.:",
                },
                { text: isEmpty(getTextDiff(data.field_6_2)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "iii) σε διεθνείς οργανισμούς:",
                },
                { text: isEmpty(getTextDiff(data.field_6_3)) },
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
                  text: "Στόχοι αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "7",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Σημειώστε ποιοι από τους στόχους βιώσιμης ανάπτυξης των Ηνωμένων Εθνών επιδιώκονται με την αξιολογούμενη ρύθμιση",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        createField7(data),
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "8",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης;",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "20%", "75%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "i) βραχυπρόθεσμοι:",
                },
                { text: isEmpty(getTextDiff(data.field_8_1)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "ii) μακροπρόθεσμοι:",
                },
                { text: isEmpty(getTextDiff(data.field_8_2)) },
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
                  text: "9",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        // createField9(field_9),
        {
          text: "\n\n",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "10",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isDirectOrIndirect(
                    `Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης: 
                    ΑΜΕΣΗ ή/και ΕΜΜΕΣΗ`,
                    data.field_10_amesi,
                    data.field_10_emmesi
                  ),
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "20%", "75%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "i) Εάν είναι άμεση, εξηγήστε:",
                },
                { text: isEmpty(getTextDiff(data.field_10_amesi_comments)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "ii) Εάν είναι έμμεση, εξηγήστε:",
                },
                { text: isEmpty(getTextDiff(data.field_10_emmesi_comments)) },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "11",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isSelect(
                    `Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού);   
                    ΝΑΙ  ΟΧΙ`,
                    getTextDiff(data.field_11)
                  ),
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
                { text: isEmpty(getTextDiff(data.field_11_comments)) },
              ],
              [
                {
                  text: "12",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isSelect(
                    `Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα; 
                    ΝΑΙ ΟΧΙ`,
                    getTextDiff(data.field_12)
                  ),
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
                { text: isEmpty(getTextDiff(data.field_12_comments)) },
              ],
              [
                {
                  text: "13",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: isSelect(
                    `Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος; 
                    ΝΑΙ ΟΧΙ`,
                    getTextDiff(data.field_13)
                  ),
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
                { text: isEmpty(getTextDiff(data.field_13_comments)) },
              ],
            ],
          },
        },
        { text: "\n\n" },
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
                  text: "Κατ’ άρθρο ανάλυση αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "14",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Σύνοψη στόχων κάθε άρθρου",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createTables(field_14),
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
                { text: isEmpty(getTextDiff(data.field_15_sxedio_nomou)) },
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
                { text: isEmpty(getTextDiff(data.field_15_ypoyrgeio)) },
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
                    getTextDiff(data.field_16_genikos_onoma) +
                    " " +
                    getTextDiff(data.field_16_genikos_epitheto),
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
                { text: isEmpty(getTextDiff(data.field_17_sxedio_nomou)) },
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
                { text: isEmpty(getTextDiff(data.field_17_ypoyrgeio)) },
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
        // createSignatories(field_17_ministers),
        {
          text: "\n\n",
        },
        {
          text: "Δ.  Έκθεση γενικών συνεπειών\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "18",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Οφέλη αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createField18(data),
        {
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  text: "Σχολιασμός / ποιοτική αποτίμηση:",
                  style: "header4",
                },
              ],
              [
                {
                  text: isEmpty(getTextDiff(data.field_18_comments)),
                },
              ],
            ],
          },
        },
        { text: "", pageBreak: "before" },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "19",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Κόστος αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createField19(data),
        {
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  text: "Σχολιασμός / ποιοτική αποτίμηση:",
                  style: "header4",
                },
              ],
              [
                {
                  text: isEmpty(getTextDiff(data.field_19_comments)),
                },
              ],
            ],
          },
        },
        { text: "", pageBreak: "before" },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "20",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Κίνδυνοι αξιολογούμενης ρύθμισης",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createField19(data),
        { text: "\n\n" },
        {
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  text: "Σχολιασμός / ποιοτική αποτίμηση:",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
              [
                {
                  text: isEmpty(getTextDiff(data.field_20_comments)),
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "21",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },

                {
                  text: "Γνώμες ή πορίσματα αρμόδιων υπηρεσιών και ανεξάρτητων αρχών (ηλεκτρονική επισύναψη). Ειδική αιτιολογία σε περίπτωση σημαντικής απόκλισης μεταξύ της γνωμοδότησης και της αξιολογούμενης ρύθμισης.",
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
                { text: "Δείτε το Παράρτημα" },
              ],
            ],
          },
        },
        { text: "\n\n" },
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
                  text: "Ειδική αιτιολογία σε περίπτωση σημαντικής απόκλισης μεταξύ της γνωμοδότησης και της αξιολογούμενης ρύθμισης.",
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: isEmpty(getTextDiff(data.field_21_comments)),
                },
              ],
            ],
          },
        },
        {
          text: "Ε. Έκθεση διαβούλευσης\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "22",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Διαβούλευση κατά τη διάρκεια της νομοπαρασκευαστικής διαδικασίας από την έναρξη κατάρτισης της αξιολογούμενης ρύθμισης μέχρι την υπογραφή από τους συναρμόδιους Υπουργούς",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Συνεργασία με άλλα υπουργεία / υπηρεσίες",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_22_sinergasia_ypoyrgeiwn)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Συνεργασία με κοινωνικούς φορείς / Ανεξάρτητες Αρχές",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_22_sinergasia_forewn_arxwn)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Διεθνής διαβούλευση",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_22_diethnis_diavouleusi)
                  ),
                },
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
                  text: "23",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            headerRows: 6,
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                },
                {
                  text: "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
                  rowSpan: 3,
                },
                { text: "Αριθμός συμμετασχόντων" },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arxes_symmetasxontes)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                },
                { text: "" },
                {
                  text: "Σχόλια που υιοθετήθηκαν",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arxes_sxolia_yiothetithikan)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                },
                { text: "" },
                {
                  text: "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arxes_sxolia_den_yiothetithikan)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
                  rowSpan: 3,
                },
                { text: "Αριθμός συμμετασχόντων" },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arthra_symmetasxontes)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: "" },
                {
                  text: "Σχόλια που υιοθετήθηκαν",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arthra_sxolia_yiothetithikan)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                { text: "" },
                {
                  text: "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_23_arthra_sxolia_den_yiothetithikan)
                  ),
                },
              ],
            ],
          },
        },
        {
          text: "Στ. Έκθεση νομιμότητας\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "24",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Συναφείς συνταγματικές διατάξεις",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
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
                { text: isEmpty(getTextDiff(data.field_24)) },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "25",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Ενωσιακό δίκαιο",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Πρωτογενές ενωσιακό δίκαιο (συμπεριλαμβανομένου του Χάρτη Θεμελιωδών Δικαιωμάτων)",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_25_dikaio_comment)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Κανονισμός",
                  fillColor: "white",
                },
                {
                  text: isEmpty(getTextDiff(data.field_25_kanonismos_comment)),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Οδηγία/Ανακοινώσεις",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_25_odigia_comment)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Απόφαση",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_25_apofasi_comment)) },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "26",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Συναφείς διατάξεις διεθνών συνθηκών ή συμφωνιών",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Ευρωπαϊκή Σύμβαση των Δικαιωμάτων του Ανθρώπου",
                  fillColor: "white",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_26_antrwpina_dikaiwmata_comment)
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Διεθνείς συμβάσεις",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_26_symvaseis_comment)) },
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
                  text: "27",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Συναφής νομολογία των ανωτάτων και άλλων εθνικών δικαστηρίων, καθώς και αποφάσεις των Ανεξάρτητων Αρχών",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "",
                },
                {
                  text: "",
                },
                { text: "Στοιχεία & βασικό περιεχόμενο απόφασης" },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Ανώτατο ή άλλο εθνικό δικαστήριο (αναφέρατε)",
                  fillColor: "white",
                },
                {
                  text: isEmpty(getTextDiff(data.field_27_dikastirio_comment)),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Ανεξάρτητη Αρχή (αναφέρατε)",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_27_arxi_comment)) },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "28",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Συναφής ευρωπαϊκή και διεθνής νομολογία",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "10%", "25%", "60%"],
            body: [
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  text: "",
                },
                {
                  text: "",
                },
                { text: "Στοιχεία & βασικό περιεχόμενο απόφασης" },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Νομολογία Δικαστηρίου Ε.Ε.",
                  fillColor: "white",
                },
                { text: isEmpty(getTextDiff(data.field_28_nomologia_comment)) },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Νομολογία Ευρωπαϊκού Δικαστηρίου Δικαιωμάτων του Ανθρώπου",
                  fillColor: "white",
                },
                {
                  text: isEmpty(
                    getTextDiff(
                      data.field_28_nomologia_dikaiwmatwn_anthrwpou_comment
                    )
                  ),
                },
              ],
              [
                {
                  text: "",
                  border: [false, false, false, false],
                  fillColor: "white",
                },
                {
                  image: `./public/img/empty-checkbox.jpg`,
                  width: 30,
                  height: 30,
                },
                {
                  text: "Άλλα ευρωπαϊκά ή διεθνή δικαστήρια ή διαιτητικά όργανα",
                  fillColor: "white",
                },
                {
                  text: isEmpty(
                    getTextDiff(data.field_28_alla_dikastiria_comment)
                  ),
                },
              ],
            ],
          },
        },
        {
          text: "Ζ. Πίνακας τροποποιούμενων ή καταργούμενων διατάξεων\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "29",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Τροποποίηση – αντικατάσταση – συμπλήρωση διατάξεων",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createTables(field_29),
        { text: "\n\n" },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "30",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Κατάργηση διατάξεων",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createTables(field_30),
        {
          text: "Η. Έκθεση εφαρμογής της ρύθμισης\n\n\n",
          style: "header2",
          pageBreak: "before",
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "31",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Συναρμοδιότητα Υπουργείων / υπηρεσιών / φορέων",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createTables(field_31),
        { text: "\n\n" },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "32",
                  fillColor: "#dcdcdc",
                  style: "header4",
                },
                {
                  text: "Έκδοση κανονιστικών πράξεων και εγκυκλίων",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
              ],
            ],
          },
        },
        createTables(field_32),
        { text: "\n\n" },
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
                  text: "Ανάγκη σύστασης νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
              [
                {
                  text: "33",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Ποιες διατάξεις της αξιολογούμενης ρύθμισης προβλέπουν τη σύσταση νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας;",
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
                { text: isEmpty(getTextDiff(data.field_33)) },
              ],
              [
                {
                  text: "34",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Γιατί προτείνεται η σύσταση αυτού του νέου οργάνου και δεν επαρκούν οι υφιστάμενες διοικητικές δομές για να επιτευχθεί ο στόχος της αξιολογούμενηςρύθμισης;",
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
                { text: isEmpty(getTextDiff(data.field_34)) },
              ],
              [
                {
                  text: "35",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Χρόνος έναρξης λειτουργίας του νέου οργάνου",
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
                { text: isEmpty(getTextDiff(data.field_35)) },
              ],
              [
                {
                  text: "36",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: isSelect(
                    `Έχει γίνει η σχετική οικονομοτεχνική μελέτη αναφορικά με τη σύσταση του νέου οργάνου; 
                      ΝΑΙ ΟΧΙ
                      Εάν ΝΑΙ, να επισυναφθεί ηλεκτρονικά.`,
                    getTextDiff(data.field_36)
                  ),
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
                { text: "Δείτε το Παράρτημα" },
              ],
            ],
          },
        },
        { text: "\n\n" },
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
                  text: "Στοιχεία νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας",
                  style: "header4",
                  fillColor: "#a9a9a9",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["5%", "95%"],
            body: [
              [
                {
                  text: "37",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Επωνυμία ή ονομασία και νομική μορφή",
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
                { text: isEmpty(getTextDiff(data.field_37)) },
              ],
              [
                {
                  text: "38",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Χώρος λειτουργίας του νέου οργάνου",
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
                { text: isEmpty(getTextDiff(data.field_38)) },
              ],
              [
                {
                  text: "39",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Διασφάλιση επαρκούς υλικοτεχνικού & ηλεκτρονικού εξοπλισμού",
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
                { text: isEmpty(getTextDiff(data.field_39)) },
              ],
              [
                {
                  text: "40",
                  style: "header4",
                  fillColor: "#dcdcdc",
                },
                {
                  text: "Τρόπος στελέχωσης του νέου οργάνου",
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
                { text: isEmpty(getTextDiff(data.field_40)) },
              ],
            ],
          },
        },
        { text: "\n\n" },
        // createSignatories(
        //   minister_names.minister_name,
        //   minister_roles.minister_role
        // ),
      ],
    ],
  };

  let pdfDoc = printer.createPdfKitDocument(docDefinition);
  let pdf_name = "diff.pdf";
  //pdf_name = pdf_name.replace(/\s+/g, '');
  let export_path = "public/exports/";
  let pdf_path = path.resolve(export_path, pdf_name);
  pdf_path = path.resolve(export_path, pdf_name);
  pdfDoc.pipe(fs.createWriteStream(pdf_path));
  pdfDoc.end();
  await new Promise((resolve) => setTimeout(resolve, 1000)); //add some extra delay

  try {
    let entry = await database.analysis.findOne({
      where: {
        id: req.params.entry_id,
      },
    });
    let merger = new PDFMerger();
    merger.add(pdf_path);
    if (entry.dataValues.field_21_upload) {
      for (i in entry.dataValues.field_21_upload) {
        merger.add("public/uploads/" + entry.field_21_upload[i]);
      }
    }
    if (entry.dataValues.field_23_upload) {
      for (i in entry.dataValues.field_23_upload) {
        merger.add("public/uploads/" + entry.field_23_upload[i]);
      }
    }
    if (entry.dataValues.field_36_upload) {
      for (i in entry.dataValues.field_36_upload) {
        merger.add("public/uploads/" + entry.field_36_upload[i]);
      }
    }
    await merger.save(pdf_path); //save under given name

    if (fs.existsSync(pdf_path)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.log(err);
  }
};

////////////////////////FUNCTIONS////////////////////////////////

// TODO: add function which splits string on NAI/OXI and reconstruct it adding checked/unchecked checkbox imgs after each depending on value of checkbox/dropdown
function isSelect(text, array) {
  let newText;
  if (array && array.length && array[0].text === "Ναι") {
    newText = text.replace("ΝΑΙ", "ΝΑΙ  X   ");
  }
  if (array && array.length && array[0].text === "Όχι") {
    newText = text.replace("ΟΧΙ", "   ΟΧΙ  X");
  }
  return newText ? newText : text;
}

function isDirectOrIndirect(text, array1, array2) {
  let newText;
  if (array1 && array1.length && array1[0].value === "on") {
    newText = text.replace("ΑΜΕΣΗ", "ΑΜΕΣΗ  X   ");
  }
  if (array2 && array2.length && array2[0].value === "on") {
    newText
      ? (newText = newText.replace("ΕΜΜΕΣΗ", "   ΕΜΜΕΣΗ  X"))
      : (newText = text.replace("ΕΜΜΕΣΗ", "   ΕΜΜΕΣΗ  X"));
  }
  return newText ? newText : text;
}

function isEmpty(val, hasHTML) {
  let text;
  if (hasHTML) {
    if (Array.isArray(val)) {
      text = htmlToPdfmake(val[0].value, {
        window: window,
        replaceText: function (richText) {
          return richText.replace(/(?:\r\n|\r|\n)/g, "<br>");
        },
      });
      let result = applyRichTextDecorations(text, val[0].color);
      return result;
    }
    text = htmlToPdfmake(val, {
      window: window,
      replaceText: function (richText) {
        return richText.replace(/(?:\r\n|\r|\n)/g, "<br>");
      },
    });
    return text.text !== "undefined" ? text : { text: "\n\n" };
  } else {
    val === "" && !val ? (text = "\n\n") : (text = val);
  }
  return text ? text : "\n\n";
}

//create field7 alignment using columns and stacks
function createField7(data) {
  let reportTables = {
    table: {
      headerRows: 0,
      widths: ["100%"],
      body: [
        [
          {
            stack: [
              {
                columns: [
                  {
                    stack: [
                      {
                        columns: [
                          setImage(data.field_7_goal_1),
                          {
                            image: "./public/img/gr-goal-1.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_2),
                          {
                            image: "./public/img/gr-goal-2.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_3),
                          {
                            image: "./public/img/gr-goal-3.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_4),
                          {
                            image: "./public/img/gr-goal-4.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_5),
                          {
                            image: "./public/img/gr-goal-5.jpg",
                            width: 60,
                            height: 60,
                          },
                        ],
                      },
                      {
                        text: "\n",
                      },
                    ],
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    stack: [
                      {
                        columns: [
                          setImage(data.field_7_goal_6),
                          {
                            image: "./public/img/gr-goal-6.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_7),
                          {
                            image: "./public/img/gr-goal-7.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_8),
                          {
                            image: "./public/img/gr-goal-8.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_9),
                          {
                            image: "./public/img/gr-goal-9.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_10),
                          {
                            image: "./public/img/gr-goal-10.jpg",
                            width: 60,
                            height: 60,
                          },
                        ],
                      },
                      {
                        text: "\n",
                      },
                    ],
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    stack: [
                      {
                        columns: [
                          setImage(data.field_7_goal_11),
                          {
                            image: "./public/img/gr-goal-11.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_12),
                          {
                            image: "./public/img/gr-goal-12.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_13),
                          {
                            image: "./public/img/gr-goal-13.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_14),
                          {
                            image: "./public/img/gr-goal-14.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_15),
                          {
                            image: "./public/img/gr-goal-15.jpg",
                            width: 60,
                            height: 60,
                          },
                        ],
                      },
                      {
                        text: "\n",
                      },
                    ],
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    stack: [
                      {
                        columns: [
                          {
                            text: "",
                          },
                          {
                            text: "",
                          },
                          {
                            text: "",
                          },
                          {
                            image: "./public/img/gr-goal-16.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_16),
                          {
                            image: "./public/img/gr-goal-17.jpg",
                            width: 60,
                            height: 60,
                          },
                          setImage(data.field_7_goal_17),
                          {
                            text: "",
                          },
                          {
                            text: "",
                          },
                          {
                            text: "",
                          },
                        ],
                      },
                    ],
                  },
                ],
                columnGap: 10,
              },
            ],
          },
        ],
      ],
    },
  };
  return reportTables;
}

function setImage(array) {
  if (array && array.length) {
    if (array[0].color === "green") {
      return {
        image: "./public/img/checked-checkbox.png",
        width: 20,
        height: 20,
      };
    } else {
      return {
        image: "./public/img/empty-checkbox.jpg",
        width: 20,
        height: 20,
        // opacity: 0.15,
      };
    }
  }
  return {
    image: "./public/img/empty-checkbox.jpg",
    width: 20,
    height: 20,
  };
}

function createTables(tableData, headers) {
  let rows = [];
  let table;
  if (tableData.columns === 2) {
    rows.push([
      { text: "", border: [false, false, false, false] },
      { text: tableData.headers[0], alignment: "center" },
      { text: tableData.headers[1], alignment: "center" },
    ]);
    for (let i = 0; i < tableData.data[`${tableData.keys[0]}`].length; i++) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getTextDiff(tableData.data[`${tableData.keys[0]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[1]}`][i]) },
      ]);
    }
    table = {
      table: {
        widths: ["10%", "20%", "70%"],
        body: rows,
      },
    };
  } else if (tableData.columns === 3) {
    rows.push([
      { text: "", border: [false, false, false, false] },
      { text: tableData.headers[0], alignment: "center" },
      { text: tableData.headers[1], alignment: "center" },
      { text: tableData.headers[2], alignment: "center" },
    ]);
    for (let i = 0; i < tableData.data[`${tableData.keys[0]}`].length; i++) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getTextDiff(tableData.data[`${tableData.keys[0]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[1]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[2]}`][i]) },
      ]);
    }
    table = {
      table: {
        widths: ["10%", "30%", "30%", "30%"],
        body: rows,
      },
    };
  } else if (tableData.columns === 5) {
    rows.push([
      { text: "", border: [false, false, false, false] },
      { text: tableData.headers[0], alignment: "center" },
      { text: tableData.headers[1], alignment: "center" },
      { text: tableData.headers[2], alignment: "center" },
      { text: tableData.headers[3], alignment: "center" },
      { text: tableData.headers[4], alignment: "center" },
    ]);
    for (let i = 0; i < tableData.data[`${tableData.keys[0]}`].length; i++) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getTextDiff(tableData.data[`${tableData.keys[0]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[1]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[2]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[3]}`][i]) },
        { text: getTextDiff(tableData.data[`${tableData.keys[4]}`][i]) },
      ]);
    }
    table = {
      table: {
        widths: ["10%", "18%", "18%", "18%", "18%", "18%"],
        body: rows,
      },
    };
  }

  return table;
}

function getField9Table(data, header) {
  let tableRows = [];
  tableRows.push([
    {
      text: header,
      alignment: "center",
      fillColor: "#87CEEB",
      bold: true,
    },
    {
      text: "Εξέλιξη την τελευταία 5ετία",
      alignment: "center",
      fillColor: "#87CEEB",
      bold: true,
      colSpan: 5,
    },

    {},
    {},
    {},
    {},
    {
      text: "Πρόσφατα στοιχεία",
      alignment: "center",
      fillColor: "#87CEEB",
      bold: true,
    },
    {
      text: "Επιδιωκόμενος στόχος (3ετία)",
      alignment: "center",
      fillColor: "#87CEEB",
      bold: true,
    },
  ]);
  for (i in data) {
    tableRows.push([
      {
        text: data[i].row[0],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[1],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[2],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[3],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[4],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[5],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[6],
        alignment: "center",
        fontSize: 7,
      },
      {
        text: data[i].row[7],
        alignment: "center",
        fontSize: 7,
      },
    ]);
  }

  let table = {
    table: {
      headerRows: 0,
      widths: ["25%", "5%", "5%", "5%", "5%", "5%", "25%", "25%"],
      body: tableRows,
    },
  };
  return table;
};

function createField9(data) {
  let tables = [];
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
  const headers = {
    ekpaideysi: "ΕΚΠΑΙΔΕΥΣΗ",
    politismos: "ΠΟΛΙΤΙΣΜΟΣ",
    dimosia_dioikisi: "ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ",
    dimosia_asfaleia: "ΔΗΜΟΣΙΑ ΑΣΦΑΛΕΙΑ",
    dikaiosini: "ΔΙΚΑΙΟΣΥΝΗ",
  };
  for (i in prefixes) {
    if (data[`${prefixes[i]}`].length > 0) {
      tables.push(
        getField9Table(data[`${prefixes[i]}`], headers[`${prefixes[i]}`])
      );
      tables.push({ text: "\n\n" });
    }
  }
  return tables;
};

function checkboxValue(array) {
  if (Array.isArray(array)) {
    if (array[0].value || array[0].text) {
      return array[0].color ? { text: "X", color: array[0].color } : "X";
    }
    return "";
  }
  return "";
};

function createField18(data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    {
      text: "ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΝΗΣΙΩΤΙΚΟΤΗΤΑ",
      alignment: "center",
      fontSize: 10,
    },
  ]);
  table.push([
    {
      text: "ΟΦΕΛΗ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 10,
      fillColor: "#93C572",
      fontSize: 10,
    },
    {
      text: "ΑΜΕΣΑ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#C1E1C1",
      fontSize: 10,
    },
    {
      text: "Αύξηση εσόδων",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_18_amesa_esoda_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_amesa_esoda_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_amesa_esoda_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_amesa_esoda_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_amesa_esoda_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Μείωση δαπανών",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_amesa_dapanes_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_dapanes_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_dapanes_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_dapanes_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_dapanes_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Εξοικονόμηση χρόνου",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_amesa_eksikonomisi_xronou_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_eksikonomisi_xronou_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_eksikonomisi_xronou_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_eksikonomisi_xronou_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(
          data.field_18_amesa_eksikonomisi_xronou_nisiwtikotita
        ),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Μεγαλύτερη αποδοτικότητα",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_amesa_apodotikotita_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_apodotikotita_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_apodotikotita_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_apodotikotita_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_apodotikotita_perivallon),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_amesa_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_amesa_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  table.push([
    {
      text: "",
    },
    {
      text: "ΕΜΜΕΣΑ",
      alignment: "center",
      rowSpan: 5,
      fontSize: 10,
      fillColor: "#C1E1C1",
    },
    {
      text: "Βελτίωση παρεχόμενων υπηρεσιών",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_18_emmesa_veltiosi_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_emmesa_veltiosi_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_emmesa_veltiosi_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_emmesa_veltiosi_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_18_emmesa_veltiosi_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Δίκαιη μεταχείριση πολιτών",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_emmesa_metaxirisi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_metaxirisi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_metaxirisi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_metaxirisi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_metaxirisi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Αυξημένη αξιοπιστία / διαφάνεια θεσμών",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_emmesa_diafania_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diafania_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diafania_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diafania_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diafania_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Βελτιωμένη διαχείριση κινδύνων",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_emmesa_diaxirisi_kindinwn_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diaxirisi_kindinwn_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diaxirisi_kindinwn_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_diaxirisi_kindinwn_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(
          data.field_18_emmesa_diaxirisi_kindinwn_nisiwtikotita
        ),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_18_emmesa_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_18_emmesa_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  return fieldData;
}

function createField19(data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    {
      text: "ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΝΗΣΙΩΤΙΚΟΤΗΤΑ",
      alignment: "center",
      fontSize: 10,
    },
  ]);
  table.push([
    {
      text: "ΚΟΣΤΟΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 9,
      fillColor: "#93C572",
      fontSize: 10,
    },
    {
      text: "ΓΙΑ ΤΗΝ ΕΝΑΡΞΗ ΕΦΑΡΜΟΓΗΣ ΤΗΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#C1E1C1",
      fontSize: 10,
    },
    {
      text: "Σχεδιασμός / προετοιμασία",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_19_efarmogi_proetimasia_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_efarmogi_proetimasia_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_efarmogi_proetimasia_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_efarmogi_proetimasia_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_efarmogi_proetimasia_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Υποδομή / εξοπλισμός",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_efarmogi_ypodomi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_ypodomi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_ypodomi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_ypodomi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_ypodomi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Προσλήψεις / κινητικότητα",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_efarmogi_kinitikotita_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_kinitikotita_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_kinitikotita_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_kinitikotita_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_kinitikotita_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Ενημέρωση εκπαίδευση εμπλεκομένων",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_efarmogi_emplekomenoi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_emplekomenoi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_emplekomenoi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_emplekomenoi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_emplekomenoi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_efarmogi_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_efarmogi_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  table.push([
    {
      text: "",
    },
    {
      text: "ΓΙΑ ΤΗ ΛΕΙΤΟΥΡΓΙΑ & ΑΠΟΔΟΣΗ ΤΗΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 4,
      fontSize: 10,
      fillColor: "#C1E1C1",
    },
    {
      text: "Στήριξη και λειτουργία διαχείρισης",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_19_apodosi_diaxirisis_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_apodosi_diaxirisis_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_apodosi_diaxirisis_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_apodosi_diaxirisis_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_19_apodosi_diaxirisis_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Διαχείριση αλλαγών κατά την εκτέλεση",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_apodosi_ektelesi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_ektelesi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_ektelesi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_ektelesi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_ektelesi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Κόστος συμμετοχής στη νέα ρύθμιση",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_apodosi_kostos_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_kostos_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_kostos_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_kostos_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_kostos_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_19_apodosi_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_19_apodosi_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);

  return fieldData;
}

function createField20(data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    {
      text: "ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ",
      alignment: "center",
      fontSize: 10,
    },
    {
      text: "ΝΗΣΙΩΤΙΚΟΤΗΤΑ",
      alignment: "center",
      fontSize: 10,
    },
  ]);
  table.push([
    {
      text: "ΚΙΝΔΥΝΟΙ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 8,
      fillColor: "#93C572",
      fontSize: 10,
    },
    {
      text: "ΔΙΑΧΕΙΡΙΣΗ KΙΝΔΥΝΩΝ",
      alignment: "center",
      rowSpan: 4,
      fillColor: "#C1E1C1",
      fontSize: 10,
    },
    {
      text: "Αναγνώριση / εντοπισμός κινδύνου",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_20_diaxirisi_entopismos_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_diaxirisi_entopismos_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_diaxirisi_entopismos_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_diaxirisi_entopismos_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_diaxirisi_entopismos_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Διαπίστωση συνεπειών κινδύνων στους στόχους",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_synepeies_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_synepeies_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_synepeies_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_synepeies_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_synepeies_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Σχεδιασμός αποτροπής / αντιστάθμισης κινδύνων",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_apotropi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_apotropi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_apotropi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_apotropi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_apotropi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_diaxirisi_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  table.push([
    {
      text: "",
    },
    {
      text: "ΜΕΙΩΣΗ ΚΙΝΔΥΝΩΝ",
      alignment: "center",
      rowSpan: 4,
      fontSize: 10,
      fillColor: "#C1E1C1",
    },
    {
      text: "Πιλοτική εφαρμογή",
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(data.field_20_meiwsi_efarmogi_thesmoi),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_meiwsi_efarmogi_oikonomia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_meiwsi_efarmogi_kinonia),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_meiwsi_efarmogi_perivallon),
      alignment: "center",
    },
    {
      text: checkboxValue(data.field_20_meiwsi_efarmogi_nisiwtikotita),
      alignment: "center",
    },
  ]);
  table.push(
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Ανάδειξη καλών πρακτικών κατά την υλοποίηση της ρύθμισης",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_meiwsi_praktikes_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_praktikes_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_praktikes_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_praktikes_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_praktikes_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Συνεχής αξιολόγηση διαδικασιών διαχείρισης κινδύνων",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_meiwsi_aksiologisi_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_aksiologisi_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_aksiologisi_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_aksiologisi_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_aksiologisi_nisiwtikotita),
        alignment: "center",
      },
    ],
    [
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "Άλλο",
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(data.field_20_meiwsi_allo_thesmoi),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_allo_oikonomia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_allo_kinonia),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_allo_perivallon),
        alignment: "center",
      },
      {
        text: checkboxValue(data.field_20_meiwsi_allo_nisiwtikotita),
        alignment: "center",
      },
    ]
  );
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);

  return fieldData;
}

function createSignatories(names, roles) {
  let signatories = [];
  const ministerIndexes = [];
  const substitutesIndexes = [];
  const undersecretariesIndexes = [];
  console.log('roles', roles);
  for (let i in roles) {
    const role = roles[i][0].value;
    if (role.includes("ΥΠΟΥΡΓΟΣ") && !roles[i].includes("ΥΦΥΠΟΥΡΓΟΣ")) {
      ministerIndexes.push(i);
    }
    if (role.includes("ΥΦΥΠΟΥΡΓΟΣ")) {
      substitutesIndexes.push(i);
    }
    if (role.includes("ΑΝΑΠΛΗΡΩΤΗΣ ΥΠΟΥΡΓΟΣ")) {
      undersecretariesIndexes.push(i);
    }
  }
  if (ministerIndexes.length > 0) {
    signatories.push({
      text: "ΟΙ ΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: createMinisterRows(ministerIndexes, roles, names),
      },
    });
    table = [];
  }

  if (substitutesIndexes.length > 0) {
    signatories.push({
      text: "ΟΙ ΥΦΥΠΟΥΡΓΟΙ \n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });

    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: createMinisterRows(substitutesIndexes, roles, names),
      },
    });
    table = [];
  }
  if (undersecretariesIndexes.length > 0) {
    signatories.push({
      text: "ΟΙ ΑΝΑΠΛΗΡΩΤΕΣ ΥΠΟΥΡΓΟΙ\n",
      bold: true,
      alignment: "center",
    });
    signatories.push({ text: "\n" });
    signatories.push({
      table: {
        headerRows: 0,
        widths: ["50%", "50%"],
        body: createMinisterRows(undersecretariesIndexes, roles, names),
      },
    });
    table = [];
  }
  if (signatories.length > 0) {
    return signatories;
  }
}

function createMinisterRows(indexes, roles, names) {  
  const table = [];
  for (i = 0; i < indexes.length; i += 2) {
    table.push([
      {
        text:
          getTextDiff(roles[indexes[i]]) +
          "\n\n\n\n\n\n" +
          getTextDiff(names[indexes[i]]),
        bold: true,
        alignment: "center",
      },
    ]);
    if (indexes[i + 1]) {
      table.push([
        {
          text:
            getTextDiff(roles[indexes[i + 1]]) +
            "\n\n\n\n\n\n" +
            getTextDiff(names[indexes[i + 1]]),
          bold: true,
          alignment: "center",
        },
      ]);
    }
  }
  return table;
}

function getTextDiff(data) {
  let diffText = [];
  if (!data) return "\n\n";
  if (Array.isArray(data)) {
    for (let i in data) {
      if (data[i]) {
        if (data[i].text)
          diffText.push(applyTextDecorations(data[i].text, data[i].color));
        else diffText.push(applyTextDecorations(data[i].value, data[i].color));
      }
    }
  } else {
    return data;
  }
  return diffText;
}

function applyRichTextDecorations(value, color) {
  if (color === "green") {
    if ("text" in value[0]) {
      for (let i in value[0].text) {
        value[0].text[i].color = "#50C878";
      }
    }
    if ("ol" in value[0]) {
      for (let i in value[0].ol) {
        value[0].ol[i].color = "#50C878";
      }
    }
    if ("li" in value[0]) {
      for (let i in value[0].li) {
        value[0].li[i].color = "#50C878";
      }
    }
  } else if (color === "red") {
    if ("text" in value[0]) {
      for (let i in value[0].text) {
        value[0].text[i].color = "#E74C3C";
      }
    }
    if ("ol" in value[0]) {
      for (let i in value[0].ol) {
        value[0].ol[i].color = "#E74C3C";
      }
    }
    if ("li" in value[0]) {
      for (let i in value[0].li) {
        value[0].li[i].color = "#E74C3C";
      }
    }
  }
  return value;
}

function applyTextDecorations(value, color) {
  let text;
  if (color === "green") text = { text: value, color: color };
  else if (color === "red")
    text = {
      text: value,
      color: color,
      decoration: "lineThrough",
    };
  else text = { text: value };
  return text;
}

function hasValidValue(array) {
  if (array === undefined) return "";
  return array[0].value;
  // array && array[0] === undefined ? "" : array[0].value;
}
