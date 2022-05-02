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

  let field_9_data = tablesLib.getDataForPdfField9(
    req.body,
    "_header",
    "_label",
    "_secondHeader"
  ); //data for field_9
  let field_18 = tablesLib.getPdfCheckboxTableData(req.body, "field_18");
  let field_19 = tablesLib.getPdfCheckboxTableData(req.body, "field_19");
  let field_20 = tablesLib.getPdfCheckboxTableData(req.body, "field_20");
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

  const Report = {
    reports: [
      {
        reportTitle: "Α. Αιτολογική έκθεση",
        fields: [
          {
            category: {
              categoryHeader: "Η «ταυτότητα» της αξιολογούμενης ρύθμισης",
              categoryFields: [
                {
                  field: {
                    fieldId: 1,
                    fieldHeader:
                      "Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση;",
                    fieldText: data.field_1,
                  },
                },
                {
                  field: {
                    fieldId: 2,
                    fieldHeader: "Γιατί αποτελεί πρόβλημα;",
                    fieldText: data.field_2,
                  },
                },
                {
                  field: {
                    fieldId: 3,
                    fieldHeader: "Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;",
                    fieldText: data.field_3,
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
                    fieldText: data.field_4_comments + "\n\n",
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
                        option: "i) σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ:",
                        optionText: data.field_6_1,
                      },
                      {
                        option: "ii) σε όργανα της Ε.Ε.:",
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
                    fieldCreatedBy: createField7(data),
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
                    fieldId: 8,
                    fieldHeader:
                      "Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης;",
                    fieldOptions: [
                      {
                        option: "i) βραχυπρόθεσμοι:",
                        optionText: data.field_8_1,
                      },
                      {
                        option: "ii) μακροπρόθεσμοι:",
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
                    fieldCreatedBy: createField9(field_9_data),
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
                    fieldOptions: [
                      {
                        option: "Εξηγήστε:",
                        optionText: data.field_11_comments,
                      },
                    ],
                  },
                },
                {
                  field: {
                    fieldId: 12,
                    fieldHeader: `Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα;     ΝΑΙ                 ΟΧΙ     `,
                    fieldOptions: [
                      {
                        option: "Αναφέρατε ποια είναι αυτά τα συστήματα:",
                        optionText: data.field_12_comments,
                      },
                    ],
                  },
                },
                {
                  field: {
                    fieldId: 13,
                    fieldHeader: `Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος;                           ΝΑΙ                 ΟΧΙ     `,
                    fieldOptions: [
                      {
                        option: "Εξηγήστε:",
                        optionText: data.field_13_comments,
                      },
                    ],
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
      },
      {
        reportTitle: "Δ.  Έκθεση γενικών συνεπειών ",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldId: 18,
                    fieldHeader:
                      "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                    fieldCreatedBy: createField18(field_18, data),
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
                    fieldId: 19,
                    fieldHeader:
                      "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                    fieldCreatedBy: createField19(field_19, data),
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
                    fieldId: 20,
                    fieldHeader:
                      "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                    fieldCreatedBy: createField20(field_20, data),
                  },
                },
              ],
            },
          },
        ],
      },
      {
        reportTitle: "Ε.  Έκθεση διαβούλευσης",
        fields: [
          {
            category: {
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
              categoryFields: [
                {
                  field: {
                    fieldId: 23,
                    fieldHeader:
                      "Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης)",
                    annex: "Παράρτημα Β",
                    fieldOptions: [
                      {
                        title:
                          "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
                        options: [
                          {
                            option: "Αριθμός συμμετασχόντων",
                            optionText: data.field_23_arxes_symmetasxontes,
                          },
                          {
                            option: "Σχόλια που υιοθετήθηκαν",
                            optionText:
                              data.field_23_arxes_sxolia_yiothetithikan,
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
                        title: "Επί των άρθρων της αξιολογούμενης ρύθμισης",
                        options: [
                          {
                            option: "Αριθμός συμμετασχόντων",
                            optionText: data.field_23_arthra_symmetasxontes,
                          },
                          {
                            option: "Σχόλια που υιοθετήθηκαν",
                            optionText:
                              data.field_23_arthra_sxolia_yiothetithikan,
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
      },
      {
        reportTitle: "Στ.  Έκθεση νομιμότητας ",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldId: 24,
                    fieldHeader: "Συναφείς συνταγματικές διατάξεις",
                    fieldText: data.field_24,
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
                    fieldHeader:
                      "Συναφείς διατάξεις διεθνών συνθηκών ή συμφωνιών",
                    fieldOptions: [
                      {
                        hasCheckbox: true,
                        option:
                          "Ευρωπαϊκή Σύμβαση των Δικαιωμάτων του Ανθρώπου",
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
      },
      {
        reportTitle: "Ζ.  Πίνακας τροποποιούμενων ή καταργούμενων διατάξεων",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldId: 29,
                    fieldHeader:
                      "Τροποποίηση – αντικατάσταση – συμπλήρωση διατάξεων",
                    fieldCreatedBy: createTables(field_29),
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
                    fieldId: 30,
                    fieldHeader: "Κατάργηση διατάξεων",
                    fieldCreatedBy: createTables(field_30),
                  },
                },
              ],
            },
          },
        ],
      },
      {
        reportTitle: "Η.  Έκθεση εφαρμογής της ρύθμισης",
        fields: [
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldId: 31,
                    fieldHeader:
                      "Συναρμοδιότητα Υπουργείων / υπηρεσιών / φορέων",
                    fieldCreatedBy: createTables(field_31),
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
                    fieldId: 32,
                    fieldHeader: "Έκδοση κανονιστικών πράξεων και εγκυκλίων",
                    fieldCreatedBy: createTables(field_32),
                  },
                },
              ],
            },
          },
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
                    annex: "Παράρτημα Γ",
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

        createContainerTable(Report),

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

function createContainerTable(report) {
  const header = { text: report.header, fillColor: "#6c541e" }; //"#808080",}
  let reportTables = [];
  let tempTables;
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
        headerRows: 0, //uncomment to have table header repeated on page break
        widths: ["5%", "10%", "25%", "60%"],
        body: reportTable,
      },
    };
  } else {
    reportTables = {
      table: {
        headerRows: 0, //uncomment to have table header repeated on page break
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

  if (category.field.fieldOptions) {
    if (category.field.fieldOptions[0].title) {
      reportTable[reportTable.length - 1][1].colSpan = 3; //update colspan for previous entry
      reportTable[reportTable.length - 1].push({ text: "" });
      // TODO: debug here
      for (fieldOption in category.field.fieldOptions) {
        reportTable.push([
          { text: "", border: [false, false, false, false] },
          {
            text: category.field.fieldOptions[fieldOption].title,
            alignment: "center",
            rowSpan: 3,
          },
          {
            text: category.field.fieldOptions[fieldOption].options[0].option,
          },
          {
            text: category.field.fieldOptions[fieldOption].options[0]
              .optionText,
          },
        ]);
        for (option in category.field.fieldOptions[fieldOption].options) {
          if (option !== "0") {
            reportTable.push([
              { text: "", border: [false, false, false, false] },
              {
                text: "",
              },
              {
                text: category.field.fieldOptions[fieldOption].options[option]
                  .option,
              },
              {
                text: category.field.fieldOptions[fieldOption].options[option]
                  .optionText,
              },
            ]);
          }
        }
      }
    } else {
      let alteredColumns = false;
      for (k in category.field.fieldOptions) {
        if (category.field.fieldOptions[k].hasCheckbox) {
          if (!alteredColumns) {
            reportTable[reportTable.length - 1][1].colSpan = 3;
            reportTable[reportTable.length - 1].push({ text: "" });
            alteredColumns = true;
          }
          reportTable.push([
            { text: "" },
            { image: `./public/img/empty-checkbox.jpg`, width: 30, height: 30 },
            {
              text: category.field.fieldOptions[k].option,
              alignment: "center",
            },
            {
              text: category.field.fieldOptions[k].optionText,
              alignment: "center",
            },
          ]);
        } else {
          reportTable.push([
            { text: "", border: [false, false, false, false] },
            {
              text: category.field.fieldOptions[k].option,
              alignment: "center",
            },
            {
              text: category.field.fieldOptions[k].optionText,
              alignment: "center",
            },
          ]);
        }
      }
    }
  } else {
    if (category.field.fieldText) {
      reportTable.push([
        { text: "", border: [false, false, false, false] },
        {
          text: category.field.fieldText,
          alignment: "center",
          colSpan: 2,
        },
        { text: "" },
      ]);
    }
  }
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

function setImage(fieldName) {
  if (fieldName) {
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

function createTables(tableData) {
  var rows = [];
  let table;
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

function createField9Tables(jsonTableData) {
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
    table: {
      // headerRows: 1,
      widths: ["25%", "5%", "5%", "5%", "5%", "5%", "25%", "25%"],
      body: tableRows,
    },
  };
  return table;
}

function createField9(josnData) {
  var tables = [];
  for (i in josnData) {
    tables.push({ text: "\n\n" });
    tables.push(createField9Tables(josnData[i]));
  }
  return tables;
}

function checkboxValue(value) {
  return value !== "" ? "√" : value;
}

function createField18(field_18, data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  let count = 11;

  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
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
  table.push([
    {
      text: "ΟΦΕΛΗ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 10,
      fillColor: "#93C572",
    },
    {
      text: "ΑΜΕΣΑ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#C1E1C1",
    },
    {
      text: field_18[0],
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[2]),
    },
    {
      text: checkboxValue(field_18[3]),
    },
    {
      text: checkboxValue(field_18[4]),
    },
    {
      text: checkboxValue(field_18[5]),
    },
  ]);
  for (let i = 0; i < 4; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_18[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 3]),
      },
      {
        text: checkboxValue(field_18[count - 2]),
      },
      {
        text: checkboxValue(field_18[count - 1]),
      },
      {
        text: checkboxValue(field_18[count]),
      },
    ]);
    count += 6;
  }
  table.push([
    {
      text: "",
    },
    {
      text: "ΕΜΜΕΣΑ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#C1E1C1",
    },
    {
      text: field_18[count - 5],
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count - 3]),
    },
    {
      text: checkboxValue(field_18[count - 2]),
    },
    {
      text: checkboxValue(field_18[count - 1]),
    },
    {
      text: checkboxValue(field_18[count]),
    },
  ]);
  count += 6;
  for (let i = 0; i < 4; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_18[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 3]),
      },
      {
        text: checkboxValue(field_18[count - 2]),
      },
      {
        text: checkboxValue(field_18[count - 1]),
      },
      {
        text: checkboxValue(field_18[count]),
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0, //uncomment to have table header repeated on page break
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\nΣχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[data.field_18_comments]],
    },
  });
  return fieldData;
}

function createField19(field_19, data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  let count = 11;

  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
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
  table.push([
    {
      text: "ΚΟΣΤΟΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 9,
      fillColor: "#EF9759",
    },
    {
      text: "ΓΙΑ ΤΗΝ ΕΝΑΡΞΗ ΕΦΑΡΜΟΓΗΣ ΤΗΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#F9B483",
    },
    {
      text: field_19[0],
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[2]),
    },
    {
      text: checkboxValue(field_19[3]),
    },
    {
      text: checkboxValue(field_19[4]),
    },
    {
      text: checkboxValue(field_19[5]),
    },
  ]);
  for (let i = 0; i < 4; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_19[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 3]),
      },
      {
        text: checkboxValue(field_19[count - 2]),
      },
      {
        text: checkboxValue(field_19[count - 1]),
      },
      {
        text: checkboxValue(field_19[count]),
      },
    ]);
    count += 6;
  }
  table.push([
    {
      text: "",
    },
    {
      text: "ΓΙΑ ΤΗ ΛΕΙΤΟΥΡΓΙΑ & ΑΠΟΔΟΣΗ ΤΗΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 4,
      fillColor: "#F9B483",
    },
    {
      text: field_19[count - 5],
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count - 3]),
    },
    {
      text: checkboxValue(field_19[count - 2]),
    },
    {
      text: checkboxValue(field_19[count - 1]),
    },
    {
      text: checkboxValue(field_19[count]),
    },
  ]);
  count += 6;
  for (let i = 0; i < 3; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_19[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 3]),
      },
      {
        text: checkboxValue(field_19[count - 2]),
      },
      {
        text: checkboxValue(field_19[count - 1]),
      },
      {
        text: checkboxValue(field_19[count]),
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0, //uncomment to have table header repeated on page break
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\nΣχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[data.field_19_comments]],
    },
  });
  return fieldData;
}

function createField20(field_20, data) {
  let table = [];
  let fieldTable;
  let fieldData = [];
  let count = 11;

  table.push([
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
    { text: "", border: [false, false, false, false] },
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
  table.push([
    {
      text: "ΚΙΝΔΥΝΟΙ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 8,
      fillColor: "#E5E510 ",
    },
    {
      text: "ΔΙΑΧΕΙΡΙΣΗ ΚΙΝΔΥΝΩΝ",
      alignment: "center",
      rowSpan: 4,
      fillColor: "#F4F410",
    },
    {
      text: field_20[0],
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[2]),
    },
    {
      text: checkboxValue(field_20[3]),
    },
    {
      text: checkboxValue(field_20[4]),
    },
    {
      text: checkboxValue(field_20[5]),
    },
  ]);
  for (let i = 0; i < 3; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_20[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 3]),
      },
      {
        text: checkboxValue(field_20[count - 2]),
      },
      {
        text: checkboxValue(field_20[count - 1]),
      },
      {
        text: checkboxValue(field_20[count]),
      },
    ]);
    count += 6;
  }
  table.push([
    {
      text: "",
    },
    {
      text: "ΜΕΙΩΣΗ ΚΙΝΔΥΝΩΝ",
      alignment: "center",
      rowSpan: 4,
      fillColor: "#F4F410",
    },
    {
      text: field_20[count - 5],
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count - 3]),
    },
    {
      text: checkboxValue(field_20[count - 2]),
    },
    {
      text: checkboxValue(field_20[count - 1]),
    },
    {
      text: checkboxValue(field_20[count]),
    },
  ]);
  count += 6;
  for (let i = 0; i < 3; i++) {
    table.push([
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: field_20[count - 5],
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 3]),
      },
      {
        text: checkboxValue(field_20[count - 2]),
      },
      {
        text: checkboxValue(field_20[count - 1]),
      },
      {
        text: checkboxValue(field_20[count]),
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0, //uncomment to have table header repeated on page break
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\nΣχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[data.field_20_comments]],
    },
  });
  return fieldData;
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
