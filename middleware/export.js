const fs = require("fs");
let database = require("../services/database");
let path = require("path");
const PDFMerger = require("pdf-merger-js");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var PdfPrinter = require("../node_modules/pdfmake/src/printer");
const htmlToPdfmake = require("html-to-pdfmake");
const tablesLib = require("../lib/tables");

// exports.exportPDF = (async function ( data, next) { // for diff
exports.exportPDF = async function (req, res, next) {
  let data = req.body;
  let field_17_onoma = [];
  let field_17_epitheto = [];
  let field_17_idiotita = [];
  let minister_surname = [];
  let minister_name = [];
  let ministry = [];
  let field_30_diatakseis_katargisi = [];

  let field_9_data = tablesLib.getDataForPdfField9(
    req.body,
    "_header",
    "_label",
    "_secondHeader"
  ); //data for field_9
  let checkbox_tables = tablesLib.getDataForPdfCheckboxTables(
    req.body,
    "_cbxHeader",
    "_cbxlabel",
    "_cbxsecondHeader"
  ); //data for fields 18-20
  let field_14 = {
    columns: 2,
    data: tablesLib.createDynamicPDFTable(data, [
      "field_14_arthro",
      "field_14_stoxos",
    ]),
  };
  let field_29 = {
    columns: 2,
    data: tablesLib.createDynamicPDFTable(data, [
      "field_29_diatakseis_rythmisis",
      "field_29_yfistamenes_diatakseis",
    ]),
  };

  let field_30 = {
    columns: 2,
    data: tablesLib.createDynamicPDFTable(data, [
      "field_30_diatakseis_katargisi",
      "field_30_katargoumenes_diatakseis",
    ]),
  };

  let field_31 = {
    columns: 3,
    data: tablesLib.createDynamicPDFTable(data, [
      "field_31_sxetiki_diataksi",
      "field_31_synarmodia_ypoyrgeia",
      "field_31_antikeimeno_synarmodiotitas",
    ]),
  };

  let field_32 = {
    columns: 5,
    data: tablesLib.createDynamicPDFTable(data, [
      "field_32_eksousiodotiki_diataksi",
      "field_32_eidos_praksis",
      "field_32_armodio_ypoyrgeio",
      "field_32_antikeimeno",
      "field_32_xronodiagramma",
    ]),
  };

  const Report_A = {
    header: "Α. Αιτολογική έκθεση",
    fields: [
      // TODO: handle 3 colspans
      {
        category: {
          categoryHeader: "Η «ταυτότητα» της αξιολογούμενης ρύθμισης",
          categoryFields: [
            {
              field: {
                fieldId: 1,
                fieldHeader:
                  "Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση;",
                fieldText: data.field_1 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 2,
                fieldHeader: "Γιατί αποτελεί πρόβλημα;",
                fieldText: data.field_2 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 3,
                fieldHeader: "Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;",
                fieldText: data.field_3 + "\n\n",
              },
            },
          ],
        },
      },
      {
        category: {
          categoryHeader: "Η αναγκαιότητα της αξιολογούμενης ρύθμισης",
          categoryFields: [
            {
              field: {
                fieldId: 4,
                fieldHeader: `Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν;
                  ΝΑΙ   Χ        ΟΧΙ  
                  Εάν ΝΑΙ, ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα;`,
                fieldText: data.field_1 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 5,
                fieldHeader:
                  "Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας",
                fieldOptions: [
                  {
                    option:
                      "i) με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης;",
                    optionText: data.field_5_1,
                  },
                  {
                    option:
                      "ii) με αλλαγή διοικητικής  πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας;",
                    optionText: data.field_5_2,
                  },
                ],
                fieldText: data.field_2 + "\n\n",
              },
            },
            ,
          ],
        },
      },
      {
        category: {
          categoryHeader: "Συναφείς πρακτικές",
          categoryFields: [
            {
              field: {
                fieldId: 6,
                fieldHeader: `Έχετε λάβει υπόψη συναφείς πρακτικές; 
                   ΝΑΙ       Χ          ΟΧΙ       
                   Εάν ΝΑΙ, αναφέρατε συγκεκριμένα:`,
                fieldOptions: [
                  {
                    option: "i)   σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ:",
                    optionText: data.field_6_1,
                  },
                  {
                    option: "ii)  σε όργανα της Ε.Ε.:",
                    optionText: data.field_6_2,
                  },
                  {
                    option: "iii) σε διεθνείς οργανισμούς:",
                    optionText: data.field_6_3,
                  },
                ],
              },
            },
            ,
          ],
        },
      },
      {
        category: {
          categoryHeader: "Στόχοι αξιολογούμενης ρύθμισης",
          categoryFields: [
            {
              field: {
                fieldId: 7,
                fieldHeader:
                  "Σημειώστε ποιοι από τους στόχους βιώσιμης ανάπτυξης των Ηνωμένων Εθνών επιδιώκονται με την αξιολογούμενη ρύθμιση",
                // fieldCreatedBy: createField7(data),
              },
            },
            {
              field: {
                fieldId: 8,
                fieldHeader:
                  "Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης;",
                fieldOptions: [
                  {
                    option: "i)   βραχυπρόθεσμοι:",
                    optionText: data.field_8_1,
                  },
                  {
                    option: "ii)  μακροπρόθεσμοι:",
                    optionText: data.field_8_2,
                  },
                ],
              },
            },
            {
              field: {
                fieldId: 9,
                fieldHeader:
                  "Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης",
                fieldCreatedBy: createField9Tables(field_9_data),
              },
            },
          ],
        },
      },
      {
        category: {
          categoryHeader: "Ψηφιακή διακυβέρνηση",
          categoryFields: [
            {
              field: {
                fieldId: 10,
                fieldHeader: `Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης:         ΑΜΕΣΗ           ή/και      ΕΜΜΕΣΗ     `,
                fieldOptions: [
                  {
                    option: "i)   Εάν είναι άμεση, εξηγήστε:",
                    optionText: data.field_10_amesi_comments,
                  },
                  {
                    option: "ii)  Εάν είναι έμμεση, εξηγήστε:",
                    optionText: data.field_10_emmesi_comments,
                  },
                ],
              },
            },
            {
              field: {
                fieldId: 11,
                fieldHeader: `Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού);   
                ΝΑΙ                 ΟΧΙ     `,
                fieldText: data.field_11,
              },
            },
            {
              field: {
                fieldId: 12,
                fieldHeader: `Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα;     ΝΑΙ                 ΟΧΙ     `,
                fieldText: data.field_12,
              },
            },
            {
              field: {
                fieldId: 13,
                fieldHeader: `Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος;                           ΝΑΙ                 ΟΧΙ     `,
                fieldText: data.field_13,
              },
            },
          ],
        },
      },
      {
        category: {
          categoryHeader: "Κατ’ άρθρο ανάλυση αξιολογούμενης ρύθμισης",
          categoryFields: [
            {
              field: {
                fieldId: 14,
                fieldHeader: "Σύνοψη στόχων κάθε άρθρου",
                fieldCreatedBy: createTables(field_14),
              },
            },
          ],
        },
      },
    ],
  };

  const Report_E = {
    header: "Ε.  Έκθεση διαβούλευσης",
    fields: [
      // TODO: handle 3 colspans
      {
        category: {
          categoryHeader: "",
          categoryFields: [
            {
              field: {
                fieldId: 22,
                fieldHeader:
                  "Διαβούλευση κατά τη διάρκεια της νομοπαρασκευαστικής διαδικασίας από την έναρξη κατάρτισης της αξιολογούμενης ρύθμισης μέχρι την υπογραφή από τους συναρμόδιους Υπουργούς",
                fieldOptions: [
                  {
                    hasCheckbox: true,
                    option: "Συνεργασία με άλλα υπουργεία / υπηρεσίες ",
                    optionText: data.field_22_sinergasia_ypoyrgeiwn,
                  },
                  {
                    hasCheckbox: true,
                    option:
                      "Συνεργασία με κοινωνικούς φορείς / Ανεξάρτητες Αρχές",
                    optionText: data.field_22_sinergasia_forewn_arxwn,
                  },
                  {
                    hasCheckbox: true,
                    option: "Διεθνής διαβούλευση",
                    optionText: data.field_22_diethnis_diavouleusi,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        category: {
          categoryHeader: "",
          categoryFields: [
            {
              field: {
                fieldId: 23,
                fieldHeader:
                  "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                fieldOptionsCategories: [
                  {
                    fieldOptionsCategory:
                      "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
                    fieldOptions: [
                      {
                        option: "Αριθμός συμμετασχόντων",
                        optionText: data.field_23_arxes_symmetasxontes,
                      },
                      {
                        option: "Σχόλια που υιοθετήθηκαν",
                        optionText: data.field_23_arxes_sxolia_yiothetithikan,
                      },
                      {
                        option:
                          "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                        optionText:
                          data.field_23_arxes_sxolia_den_yiothetithikan,
                      },
                    ],
                  },
                  {
                    fieldOptionsCategory:
                      "Επί των άρθρων της αξιολογούμενης ρύθμισης",
                    fieldOptions: [
                      {
                        option: "Αριθμός συμμετασχόντων",
                        optionText: data.field_23_arthra_symmetasxontes,
                      },
                      {
                        option: "Σχόλια που υιοθετήθηκαν",
                        optionText: data.field_23_arxes_sxolia_yiothetithikan,
                      },
                      {
                        option:
                          "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                        optionText:
                          data.field_23_arthra_sxolia_den_yiothetithikan,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  const Report_ST = {
    header: "Στ.  Έκθεση νομιμότητας ",
    fields: [
      {
        category: {
          categoryHeader: "",
          categoryFields: [
            {
              field: {
                fieldId: 24,
                fieldHeader: "Συναφείς συνταγματικές διατάξεις",
                fieldText: data.field_24,
              },
            },
            {
              field: {
                fieldId: 25,
                fieldHeader: "Ενωσιακό δίκαιο",
                fieldOptions: [
                  {
                    hasCheckbox: true,
                    option:
                      "Πρωτογενές ενωσιακό δίκαιο (συμπεριλαμβανομένου του Χάρτη Θεμελιωδών Δικαιωμάτων)",
                    optionText: data.field_25_dikaio_comment,
                  },
                  {
                    hasCheckbox: true,
                    option: "Κανονισμός",
                    optionText: data.field_25_kanonismos_comment,
                  },
                  {
                    hasCheckbox: true,
                    option: "Οδηγία/Ανακοινώσεις",
                    optionText: data.field_25_odigia_comment,
                  },
                  {
                    hasCheckbox: true,
                    option: "Απόφαση",
                    optionText: data.field_25_apofasi_comment,
                  },
                ],
              },
            },
            {
              field: {
                fieldId: 26,
                fieldHeader: "Συναφείς διατάξεις διεθνών συνθηκών ή συμφωνιών",
                fieldOptions: [
                  {
                    hasCheckbox: true,
                    option: "Ευρωπαϊκή Σύμβαση των Δικαιωμάτων του Ανθρώπου",
                    optionText: data.field_26_antrwpina_dikaiwmata_comment,
                  },
                  {
                    hasCheckbox: true,
                    option: "Διεθνείς συμβάσεις",
                    optionText: data.field_26_symvaseis_comment,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        category: {
          categoryHeader: "",
          categoryFields: [
            {
              field: {
                fieldId: 27,
                fieldHeader:
                  "Συναφής νομολογία των ανωτάτων και άλλων εθνικών δικαστηρίων, καθώς και αποφάσεις των Ανεξάρτητων Αρχών",
                fieldSubHeader: "Στοιχεία & βασικό περιεχόμενο απόφασης",
                fieldOptions: [
                  {
                    hasCheckbox: true,
                    option: "Ανώτατο ή άλλο εθνικό δικαστήριο  (αναφέρατε)",
                    optionText: data.field_27_dikastirio_comment,
                  },
                  {
                    hasCheckbox: true,
                    option: "Ανεξάρτητη Αρχή (αναφέρατε)",
                    optionText: data.field_27_arxi_comment,
                  },
                ],
              },
            },
            {
              field: {
                fieldId: 28,
                fieldHeader: "Συναφής ευρωπαϊκή και διεθνής νομολογία",
                fieldSubHeader: "Στοιχεία & βασικό περιεχόμενο απόφασης",
                fieldOptions: [
                  {
                    hasCheckbox: true,
                    option: "Νομολογία Δικαστηρίου Ε.Ε.",
                    optionText: data.field_28_nomologia_comment,
                  },
                  {
                    hasCheckbox: true,
                    option:
                      "Νομολογία Ευρωπαϊκού Δικαστηρίου Δικαιωμάτων του Ανθρώπου",
                    optionText:
                      data.field_28_nomologia_dikaiwmatwn_anthrwpou_comment,
                  },
                  {
                    hasCheckbox: true,
                    option:
                      "Άλλα ευρωπαϊκά ή διεθνή δικαστήρια ή διαιτητικά όργανα",
                    optionText: data.field_28_alla_dikastiria_comment,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  const Report_H = {
    header: "Η.  Έκθεση εφαρμογής της ρύθμισης",
    fields: [
      // {
      //   category: {
      //     categoryHeader: "",
      //     categoryFields: [
      //       {
      //         field: {
      //           fieldId: 31,
      //           fieldHeader: "Συναρμοδιότητα Υπουργείων / υπηρεσιών / φορέων",
      //           fieldText: data.field_31 + "\n\n",
      //         },
      //       },
      //       {
      //         field: {
      //           fieldId: 32,
      //           fieldHeader: "Έκδοση κανονιστικών πράξεων και εγκυκλίων",
      //           fieldText: data.field_32 + "\n\n",
      //         },
      //       },
      //     ],
      //   },
      // },
      {
        category: {
          categoryHeader:
            "Ανάγκη σύστασης νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας",
          categoryFields: [
            {
              field: {
                fieldId: 33,
                fieldHeader:
                  "Ποιες διατάξεις της αξιολογούμενης ρύθμισης προβλέπουν τη σύσταση νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας;",
                fieldText: data.field_33 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 34,
                fieldHeader:
                  "Γιατί προτείνεται η σύσταση αυτού του νέου οργάνου και δεν επαρκούν οι υφιστάμενες διοικητικές δομές για να επιτευχθεί ο στόχος της αξιολογούμενης ρύθμισης;",
                fieldText: data.field_34 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 35,
                fieldHeader: "Χρόνος έναρξης λειτουργίας του νέου οργάνου",
                fieldText: data.field_35 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 36,
                fieldHeader:
                  "Έχει γίνει η σχετική οικονομοτεχνική μελέτη αναφορικά με τη σύσταση του νέου οργάνου;            ΝΑΙ                 ΟΧΙ     Εάν ΝΑΙ, να επισυναφθεί ηλεκτρονικά.",
              },
            },
            ,
          ],
        },
      },
      {
        category: {
          categoryHeader:
            "Στοιχεία νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας",
          categoryFields: [
            {
              field: {
                fieldId: 37,
                fieldHeader: "Επωνυμία ή ονομασία και νομική μορφή",
                fieldText: data.field_37 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 38,
                fieldHeader: "Χώρος λειτουργίας του νέου οργάνου",
                fieldText: data.field_38 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 39,
                fieldHeader:
                  "Διασφάλιση επαρκούς υλικοτεχνικού & ηλεκτρονικού εξοπλισμού",
                fieldText: data.field_39 + "\n\n",
              },
            },
            {
              field: {
                fieldId: 40,
                fieldHeader: "Τρόπος στελέχωσης του νέου οργάνου",
                fieldText: data.field_40 + "\n\n",
              },
            },
          ],
        },
      },
    ],
  };
  // download default Roboto font from cdnjs.com
  fonts = {
    Roboto: {
      normal: "public/fonts/Roboto-Regular.ttf",
      bold: "public/fonts/Roboto-Bold.ttf",
      italics: "public/fonts/Roboto-Italic.ttf",
      medium: "public/fonts/Roboto-Medium.ttf",
    },
  };
  var printer = new PdfPrinter(fonts);

  var docDefinition = {
    pageSize: "A4",
    styles: {
      headerStyle: {
        fontSize: 15,
        alignment: "left",
        decoration: "underline",
      },
      labelStyle: {
        fontSize: 13,
        alignment: "left",
        decoration: "underline",
      },
      signatoryStyle: {
        fontSize: 13,
        alignment: "left",
      },
      textStyle: {
        fontSize: 11,
        alignment: "left",
      },
      diffAddedStyle: {
        fontSize: 11,
        alignment: "left",
        color: "green",
      },
      diffRemovedStyle: {
        fontSize: 11,
        alignment: "left",
        color: "red",
        decoration: "lineThrough",
      },
    },

    content: [
      [
        {
          toc: {
            title: {
              text: "Πίνακας περιεχομένων",
              style: ["header", { bold: true }],
              fontSize: 18,
              decoration: "underline",
            },
          },
        },
        {
          text: "Αρχική σελίδα",
          style: "header",
          fontSize: 16,
          tocItem: true,
          tocStyle: { bold: true },
          decoration: "underline",
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },
        {
          text:
            "\n\n" +
            "Τίτλος αξιολογούμενης ρύθμισης: " +
            data.title +
            "\n\n" +
            "Ονοματεπώνυμο συγγραφέα: " +
            req.session.lname +
            " " +
            req.session.fname +
            "\n\n" +
            "Αρχική καταχώρηση: " +
            data.initial_submit +
            "\n\n" +
            "Τελευταία ενημέρωση: " +
            data.last_updated +
            "\n\n" +
            "Επισπεύδων φορέας: " +
            data.epispeudon_foreas +
            "\n\n" +
            "Ρύθμιση την οποία αφορά: " +
            data.rythmisi_pou_afora +
            "\n\n" +
            "Στοιχεία επικοινωνίας: " +
            data.stoixeia_epikoinwnias +
            "\n\n",
          style: "textStyle",
        }, //, pageBreak:'after',

        // {
        //   text: "Α. Αιτολογική έκθεση",
        //   style: "header",
        //   fontSize: 16,
        //   tocItem: true,
        //   tocStyle: { bold: true },
        //   decoration: "underline",
        //   tocMargin: [20, 0, 0, 0],
        //   pageBreak: "before",
        // },
        createContainerTable(Report_A),
        { text: "\n\n" },
        exportColumns(data),
        { text: "\n\n" },
        createField9Tables(field_9_data),
        { text: "\n\n" },
        { text: "14.Σύνοψη στόχων κάθε άρθρου" },
        createTables(field_14),

        {
          text: "Β. Έκθεση Γενικού Λογιστηρίου του Κράτους (άρθρο 75 παρ. 1 ή 2 του Συντάγματος)",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },

        {
          text: "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου",
          style: "labelStyle",
        },
        { text: "\n\n" },
        { text: req.body.field_15_sxedio_nomou + "\n\n", style: "textStyle" },
        { text: "του Υπουργείου: ", style: "labelStyle" },
        { text: "\n\n" },
        { text: req.body.field_15_ypoyrgeio + "\n\n", style: "textStyle" },
        {
          text: "15.Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης ",
          style: "labelStyle",
        },
        { text: "\n\n" },
        htmlToPdfmake(req.body.field_15_rythmiseis, {
          window: window,
          replaceText: function (text, nodes) {
            return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
          },
        }),
        { text: "\n\n" },

        {
          text: "16.Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ",
          style: "labelStyle",
        },
        { text: "\n\n" },
        {
          text: "Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα: ",
          style: "labelStyle",
        },
        { text: "\n\n" },
        { text: "Επί του Κρατικού Προϋπολογισμού ", style: "labelStyle" },
        { text: "\n\n" },
        htmlToPdfmake(req.body.field_16_kratikos_proypologismos, {
          window: window,
          replaceText: function (text, nodes) {
            return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
          },
        }),
        { text: "\n\n" },
        {
          text: "Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ",
          style: "labelStyle",
        },
        { text: "\n\n" },
        htmlToPdfmake(req.body.field_16_proypologismos_forea, {
          window: window,
          replaceText: function (text, nodes) {
            return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
          },
        }),
        { text: "\n\n" },
        {
          text: "Ο/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ",
          style: "labelStyle",
        },
        { text: "\n\n" },
        {
          columns: [
            { text: req.body.field_16_genikos_onoma, style: "textStyle" },
            { text: req.body.field_16_genikos_epitheto, style: "textStyle" },
            { text: req.body.field_16_genikos_date, style: "textStyle" },
          ],
          columnGap: 20,
          width: "*",
        },

        {
          text: "Γ. Ειδική Έκθεση (άρθρο 75 παρ. 3 του Συντάγματος)",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },

        {
          text: "Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου",
          style: "labelStyle",
        },
        { text: "\n\n" },
        { text: data.field_17_sxedio_nomou + "\n\n", style: "textStyle" },
        { text: "του Υπουργείου: ", style: "labelStyle" },
        { text: "\n\n" },
        { text: data.field_17_ypoyrgeio + "\n\n", style: "textStyle" },
        { text: "17.Οικονομικά αποτελέσματα ", style: "labelStyle" },
        { text: "\n\n" },
        htmlToPdfmake(req.body.field_17_oikonomika_apotelesmata, {
          window: window,
          replaceText: function (text, nodes) {
            return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
          },
        }),
        { text: "\n\n" },
        { text: "ΟΙ ΥΠΟΥΡΓΟΙ", style: "labelStyle" },
        { text: "\n\n" },
        // createSignatories(field_17_onoma, field_17_epitheto, field_17_idiotita),

        {
          text: "Δ. Έκθεση γενικών συνεπειών",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },

        { text: "18.Οφέλη αξιολογούμενης ρύθμισης", style: "labelStyle" },
        { text: "\n\n" },
        exportChckbxTables(checkbox_tables),

        {
          text: "Ε. Έκθεση διαβούλευσης",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },

        {
          text: "Στ. Έκθεση νομιμότητας",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },
        createContainerTableB(Report_E),
        { text: "\n\n" },
        createContainerTableB(Report_ST),

        {
          text: "Ζ. Πίνακας τροποποιούμενων ή καταργούμενων διατάξεων",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },
        { text: "29. Τροποποίηση – αντικατάσταση – συμπλήρωση διατάξεων" },
        createTables(field_29),
        { text: "\n\n" },
        { text: "30. Κατάργηση διατάξεων" },
        createTables(field_30),
        { text: "\n\n" },

        {
          text: "Η. Έκθεση εφαρμογής της ρύθμισης",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },

        {
          text: "31.Συναρμοδιότητα Υπουργείων / υπηρεσιών / φορέων",
          style: "labelStyle",
        },
        { text: "\n\n" },
        createTables(field_31),
        { text: "\n\n" },
        {
          text: "32.Έκδοση κανονιστικών πράξεων και εγκυκλίων",
          style: "labelStyle",
        },
        { text: "\n\n" },
        createTables(field_32),
        { text: "\n\n\n\n" },

        createContainerTable(Report_H),

        {
          text: "ΟΙ ΥΠΟΥΡΓΟΙ",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },
        { text: "\n\n" },
        // createSignatories(minister_name, minister_surname, ministry),

        {
          text: "Παράρτημα",
          style: "headerStyle",
          tocItem: true,
          tocStyle: { bold: true },
          tocMargin: [20, 0, 0, 0],
          pageBreak: "before",
        },
      ],
    ],
  };
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  var pdf_name = data.pdf_name + ".pdf";
  //pdf_name = pdf_name.replace(/\s+/g, '');
  var export_path = "public/pdf_exports/";
  var pdf_path = path.resolve(export_path, pdf_name);
  pdf_path = path.resolve(export_path, pdf_name);
  pdfDoc.pipe(fs.createWriteStream(pdf_path));
  pdfDoc.end();
  await new Promise((resolve) => setTimeout(resolve, 1000)); //add some extra delay

  try {
    let entry = await database.ekthesi.findOne({
      where: {
        id: req.params.entry_id,
      },
    });
    var merger = new PDFMerger();
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

function stripHTML(element) {
  element = element.replace(/(<([^>]+)>)/gi, "");
  return element;
}

function valIsUndefined(val) {
  let typeOfVal =
    typeof val === "undefined"
      ? {}
      : { text: val + "\n\n", style: "textStyle" };
  return typeOfVal;
}

function createContainerTableB(report) {
  const header = { text: report.header, fillColor: "#6c541e" }; //"#808080",}
  let reportTable = [];
  let table;
  let reportTables = [];

  // TODO: add header NOT as table row
  for (i in report.fields) {
    for (j in report.fields[i].category.categoryFields) {
      reportTable.push([
        {
          text: report.fields[i].category.categoryFields[j].field.fieldId,
          alignment: "center",
          fillColor: "#dcdcdc",
        },
        {
          text: report.fields[i].category.categoryFields[j].field.fieldHeader,
          alignment: "center",
          fillColor: "#dcdcdc",
          colSpan: 3,
        },
        { text: "" },
        { text: "" },
      ]);
      if (report.fields[i].category.categoryFields[j].field.fieldOptions) {
        for (k in report.fields[i].category.categoryFields[j].field
          .fieldOptions) {
          reportTable.push([
            { text: "" },
            { image: `./public/img/checkbox.jpg`, width: 30, height: 30 },
            {
              text: report.fields[i].category.categoryFields[j].field
                .fieldOptions[k].option,
              alignment: "center",
            },
            {
              text: report.fields[i].category.categoryFields[j].field
                .fieldOptions[k].optionText,
              alignment: "center",
            },
          ]);
        }
      } else if (
        report.fields[i].category.categoryFields[j].field.fieldOptionsCategories
      ) {
        for (k in report.fields[i].category.categoryFields[j].field
          .fieldOptionsCategories) {
          reportTable.push([
            { text: "" },
            {
              text: report.fields[i].category.categoryFields[j].field
                .fieldOptionsCategories[k].fieldOptionsCategory,
              alignment: "center",
              rowSpan: 3,
            },
            { text: "" },
            { text: "" },
          ]);
          // fieldOptionsCategories: [
          //                 {
          //                   fieldOptionsCategory:
          //                     "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
          //                   fieldOptions: [
          //                     {
          //                       option: "Αριθμός συμμετασχόντων",
          //                       optionText: data.field_23_arxes_symmetasxontes,
          //                     },
          //                     {
          //                       option: "Σχόλια που υιοθετήθηκαν",
          //                       optionText: data.field_23_arxes_sxolia_yiothetithikan,
          //                     },
          //                     {
          //                       option:
          //                         "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
          //                       optionText:
          //                         data.field_23_arxes_sxolia_den_yiothetithikan,
          //                     },
          //                   ],
          //                 },
          for (m in report.fields[i].category.categoryFields[j].field
            .fieldOptionsCategories[k].fieldOptions) {
          }
          reportTable.push([
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: report.fields[i].category.categoryFields[j].field
                .fieldOptionsCategories[k].fieldOptions[m].option,
              alignment: "center",
            },
            {
              text: report.fields[i].category.categoryFields[j].field
                .fieldOptionsCategories[k].fieldOptions[m].optionText,
              alignment: "center",
            },
          ]);
        }
      } else {
        reportTable.push([
          { text: "" },
          {
            text: report.fields[i].category.categoryFields[j].field.fieldText,
            alignment: "center",
            colSpan: 3,
          },
          { text: "" },
          { text: "" },
        ]);
      }
      table = {
        table: {
          headerRows: 1,
          widths: ["5%", "10%", "25%", "60%"],
          body: reportTable,
        },
      };
      reportTables.push(table);
      reportTable = [];
    }
  }

  return reportTables;
}

function createContainerTable(report) {
  const header = { text: report.header, fillColor: "#6c541e" }; //"#808080",}
  let reportTables = [];
  // TODO: add header NOT as table row
  for (i in report.fields) {
    // return reportTable;
    reportTables.push({ text: "\n\n" });
    reportTables.push(createTable(report.fields[i]));
  }

  return reportTables;
}

function createTable(categoryData) {
  let reportTable = [];
  let generatedFields;
  let columns;
  // handle 2colspans and 3colspans (i.e. field4 & field5 )
  reportTable.push([
    { text: "", fillColor: "#a9a9a9" },
    {
      text: categoryData.category.categoryHeader,
      alignment: "center",
      fillColor: "#a9a9a9",
      colSpan: 2,
    },
  ]);
  for (j in categoryData.category.categoryFields) {
    reportTable.push([
      {
        text: categoryData.category.categoryFields[j].field.fieldId,
        alignment: "center",
        fillColor: "#dcdcdc",
      },
      {
        text: categoryData.category.categoryFields[j].field.fieldHeader,
        alignment: "center",
        fillColor: "#dcdcdc",
        colSpan: 2,
      },
    ]);
    // {
    //           field: {
    //             fieldId: 9,
    //             fieldHeader:
    //               "Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης",
    //             fieldCreatedBy: createField9Tables(field_9_data),
    //           },
    //         },
    if (categoryData.category.categoryFields[j].field.fieldCreatedBy) {
      generatedFields = {
        id: categoryData.category.categoryFields[j].field.fieldId,
        data: categoryData.category.categoryFields[j].field.fieldCreatedBy,
      };
    }
    if (categoryData.category.categoryFields[j].field.fieldOptions) {
      for (k in categoryData.category.categoryFields[j].field.fieldOptions) {
        reportTable.push([
          { text: "" },
          {
            text: categoryData.category.categoryFields[j].field.fieldOptions[k]
              .option,
            alignment: "center",
          },
          {
            text: categoryData.category.categoryFields[j].field.fieldOptions[k]
              .optionText,
            alignment: "center",
          },
          // {}, {},{},{},{}
        ]);
      }
    } else {
      reportTable.push([
        { text: "" },
        {
          text: categoryData.category.categoryFields[j].field.fieldText,
          alignment: "center",
          colSpan: 2,
        },
      ]);
    }
  }

  let reportTables = {
    table: {
      headerRows: 1,
      widths: ["5%", "20%", "75%"], //widths: ["25%", "5%", "5%", "5%", "5%", "5%", "25%", "25%"],
      body: reportTable,
    },
  };
  return reportTables;
}
function exportColumns(data) {
  var columns = [];
  columns.push(
    {
      columns: [
        setGoalImage(data.field_7_goal_1, "goal-1"),
        setGoalImage(data.field_7_goal_2, "goal-2"),
        setGoalImage(data.field_7_goal_3, "goal-3"),
        setGoalImage(data.field_7_goal_4, "goal-4"),
        setGoalImage(data.field_7_goal_5, "goal-5"),
      ],
      columnGap: 10,
    },
    {
      columns: [
        setGoalImage(data.field_7_goal_6, "goal-6"),
        setGoalImage(data.field_7_goal_7, "goal-7"),
        setGoalImage(data.field_7_goal_8, "goal-8"),
        setGoalImage(data.field_7_goal_9, "goal-9"),
        setGoalImage(data.field_7_goal_10, "goal-10"),
      ],
      columnGap: 10,
    },
    {
      columns: [
        setGoalImage(data.field_7_goal_11, "goal-11"),
        setGoalImage(data.field_7_goal_12, "goal-12"),
        setGoalImage(data.field_7_goal_13, "goal-13"),
        setGoalImage(data.field_7_goal_14, "goal-14"),
        setGoalImage(data.field_7_goal_15, "goal-15"),
      ],
      columnGap: 10,
    },
    {
      columns: [
        setGoalImage(data.field_7_goal_16, "goal-16"),
        setGoalImage(data.field_7_goal_17, "goal-17"),
      ],
      columnGap: 10,
    }
  );
  return columns;
}

function setGoalImage(fieldName, img) {
  let image = `./public/img/gr-${img}.jpg`;
  if (fieldName) {
    return {
      image: image,
      width: 50,
      height: 50,
    };
  } else {
    return {
      image: image,
      width: 50,
      height: 50,
      opacity: 0.15,
    };
  }
}

function createTables(tableData) {
  var rows = [];
  let table;
  // { columns:2 ,data
  if (tableData.columns === 2) {
    for (let i = 1; i < tableData.data.length; i += 2) {
      rows.push([
        { text: "" },
        { text: tableData.data[i - 1], alignment: "center" },
        { text: tableData.data[i], alignment: "center" },
      ]);
    }
    table = {
      table: {
        widths: ["10%", "20%", "70%"],
        body: rows,
      },
    };
  } else if (tableData.columns === 3) {
    for (let i = 2; i < tableData.data.length; i += 3) {
      rows.push([
        { text: "" },
        { text: tableData.data[i - 2], alignment: "center" },
        { text: tableData.data[i - 1], alignment: "center" },
        { text: tableData.data[i], alignment: "center" },
      ]);
    }
    table = {
      table: {
        widths: ["10%", "30%", "30%", "30%"],
        body: rows,
      },
    };
  } else if (tableData.columns === 5) {
    for (let i = 4; i < tableData.data.length; i += 5) {
      rows.push([
        { text: "" },
        { text: tableData.data[i - 4], alignment: "center" },
        { text: tableData.data[i - 3], alignment: "center" },
        { text: tableData.data[i - 2], alignment: "center" },
        { text: tableData.data[i - 1], alignment: "center" },
        { text: tableData.data[i], alignment: "center" },
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

function createDynamicThreeColumnTable(
  header1,
  header2,
  header3,
  val1,
  val2,
  val3
) {
  var rows = [];
  rows.push([
    { text: header1, alignment: "center", bold: true },
    { text: header2, alignment: "center", bold: true },
    { text: header3, alignment: "center", bold: true },
  ]); //push headers

  for (var i in val1) {
    rows.push([
      Object.values(val1[i]),
      Object.values(val2[i]),
      Object.values(val3[i]),
    ]); //push values
  }
  var table = {
    table: {
      headerRows: 1,
      widths: ["*", "*", "*"],
      body: rows,
    },
  };
  return table;
}

function createDynamicFiveColumnTable(
  header1,
  header2,
  header3,
  header4,
  header5,
  val1,
  val2,
  val3,
  val4,
  val5
) {
  var rows = [];
  rows.push([
    { text: header1, alignment: "center", bold: true },
    { text: header2, alignment: "center", bold: true },
    { text: header3, alignment: "center", bold: true },
    { text: header4, alignment: "center", bold: true },
    { text: header5, alignment: "center", bold: true },
  ]); //push headers
  for (var i in val1) {
    rows.push([
      Object.values(val1[i]),
      Object.values(val2[i]),
      Object.values(val3[i]),
      Object.values(val4[i]),
      Object.values(val5[i]),
    ]); //push values
  }
  var table = {
    table: {
      headerRows: 1,
      widths: ["*", "*", "*", "*", "*"],
      body: rows,
    },
  };
  return table;
}

function createStaticTable(jsonTableData) {
  let tableRows = [];
  for (i in jsonTableData) {
    if (
      jsonTableData[i].header !== undefined &&
      jsonTableData[i].header !== null
    ) {
      tableRows.push([
        {
          text: jsonTableData[i].header,
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
    }
    tableRows.push([
      {
        text: jsonTableData[i].label,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[0].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[1].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[2].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[3].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[4].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[5].value,
        alignment: "center",
      },
      {
        text: jsonTableData[i].values[6].value,
        alignment: "center",
      },
    ]);
  }

  let table = {
    //layout: 'lightHorizontalLines',
    table: {
      headerRows: 1,
      widths: ["25%", "5%", "5%", "5%", "5%", "5%", "25%", "25%"],
      body: tableRows,
    },
  };
  return table;
}

function createField9Tables(josnData) {
  var tables = [];
  for (i in josnData) {
    tables.push({ text: "\n\n" });
    tables.push(createStaticTable(josnData[i]));
  }
  return tables;
}

function getCheckboxValues(values) {
  let vals = [];
  for (j in values) {
    if (values[j].value !== "") {
      vals.push("√");
    } else {
      vals.push(values[j].value);
    }
  }
  return vals;
}

// TODO: DEBUG
function exportChckbxTables(table) {
  let rows = [];
  let tableRows = [];

  tableRows.push([
    { text: "" },
    { text: "" },
    { text: "" },
    {
      text: "ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ",
      alignment: "center",
    },
    {
      text: "ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ",
      alignment: "center",
    },
    {
      text: "ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ",
      alignment: "center",
    },
    {
      text: "ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ",
      alignment: "center",
    },
    {
      text: "ΝΗΣΙΩΤΙΚΟΤΗΤΑ",
      alignment: "center",
    },
  ]);
  for (i in table[0].data[0].rows) {
    let checkboxValues = getCheckboxValues(table[0].data[0].rows[i].values);
    rows.push(
      { text: "" },
      { text: "" },
      {
        text: table[0].data[0].rows[i].label,
        alignment: "center",
      },
      {
        text: checkboxValues[0],
        alignment: "center",
      },
      {
        text: checkboxValues[1],
        alignment: "center",
      },
      {
        text: checkboxValues[2],
        alignment: "center",
      },
      {
        text: checkboxValues[3],
        alignment: "center",
      },
      {
        text: checkboxValues[4],
        alignment: "center",
      }
    );
    tableRows.push(rows);
    rows = [];
  }

  // tableRows.push(
  //   [
  //     {
  //       text: table[0].header,
  //       fillColor: "#7bb661",
  //       alignment: "center",
  //       bold: true,
  //       rowSpan: 5,
  //     },
  //     {
  //       text: table[0].data[0].subHeader,
  //       fillColor: "#7bb661",
  //       alignment: "center",
  //       bold: true,
  //       rowSpan: 5,
  //     },
  //   ],
  //   rows
  // );
  let tables = {
    table: {
      // headerRows: header,
      widths: [
        "12,5%",
        "12,5%",
        "12,5%",
        "12,5%",
        // "25%",
        // "25%",
        "12,5%",
        "12,5%",
        "12,5%",
        "12,5%",
      ],
      body: tableRows,
    },
  };

  return tables;
}

function createChckbxTable(table) {
  var rows = [];
  var header = 0;
  if (table[6]) {
    rows.push([
      {
        text: table[6],
        fillColor: "#7bb661",
        alignment: "center",
        bold: true,
        colSpan: 5,
      },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
    ]);
    header++;
  }
  if (table[7]) {
    rows.push([
      {
        text: table[7],
        colSpan: 5,
        fillColor: "#7bb661",
        alignment: "center",
        bold: true,
      },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
    ]);
    rows.push([
      {
        text: "ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ",
        alignment: "center",
        bold: true,
      },
      {
        text: "ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ",
        alignment: "center",
        bold: true,
      },
      { text: "ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ", alignment: "center", bold: true },
      {
        text: "ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ",
        alignment: "center",
        bold: true,
      },
      { text: "ΝΗΣΙΩΤΙΚΟΤΗΤΑ", alignment: "center", bold: true },
    ]);
    header++;
  }
  rows.push([
    { text: table[0], colSpan: 5, alignment: "center", bold: true },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ]);
  rows.push([
    { text: table[1], alignment: "center" },
    { text: table[2], alignment: "center" },
    { text: table[3], alignment: "center" },
    { text: table[4], alignment: "center" },
    { text: table[5], alignment: "center" },
  ]);

  var table = {
    table: {
      headerRows: header,
      widths: ["*", "*", "*", "*", "*"],
      body: rows,
    },
  };

  return table;
}

function createSignatories(fname, lname, position) {
  var length = fname.length;
  var signatories = [];
  if (length % 2 == 0) {
    for (var i = -1; i < length; i += 2) {
      if (i < 0) {
        continue;
      } else if (fname[i - 1]) {
        signatories.push({
          columns: [
            {
              text:
                Object.values(fname[i - 1]) +
                " " +
                Object.values(lname[i - 1]) +
                "\n\n\n\n\n" +
                Object.values(position[i - 1]),
              style: "signatoryStyle",
              alignment: "center",
            },
            {
              text:
                Object.values(fname[i]) +
                " " +
                Object.values(lname[i]) +
                "\n\n\n\n\n" +
                Object.values(position[i]),
              style: "signatoryStyle",
              alignment: "center",
            },
          ],
          columnGap: 15,
          width: "*",
        });
      } else {
        signatories.push({
          columns: [
            {
              text:
                Object.values(fname[i]) +
                " " +
                Object.values(lname[i]) +
                "\n\n\n\n\n" +
                Object.values(position[i]),
              style: "signatoryStyle",
              alignment: "center",
            },
          ],
          columnGap: 15,
          width: "*",
        });
      }
      signatories.push({ text: "\n" });
    }
  } else {
    for (var i = 0; i < length; i += 2) {
      if (fname[i - 1]) {
        signatories.push({
          columns: [
            {
              text:
                Object.values(fname[i - 1]) +
                " " +
                Object.values(lname[i - 1]) +
                "\n\n\n\n\n" +
                Object.values(position[i - 1]),
              style: "signatoryStyle",
              alignment: "center",
            },
            {
              text:
                Object.values(fname[i]) +
                " " +
                Object.values(lname[i]) +
                "\n\n\n\n\n" +
                Object.values(position[i]),
              style: "signatoryStyle",
              alignment: "center",
            },
          ],
          columnGap: 15,
          width: "*",
        });
      } else {
        signatories.push({
          columns: [
            {
              text:
                Object.values(fname[i]) +
                " " +
                Object.values(lname[i]) +
                "\n\n\n\n\n" +
                Object.values(position[i]),
              style: "signatoryStyle",
              alignment: "center",
            },
          ],
          columnGap: 15,
          width: "*",
        });
      }
      signatories.push({ text: "\n" });
    }
  }
  return signatories;
}
