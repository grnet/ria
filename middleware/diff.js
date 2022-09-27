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
  let ministers = tablesLib.getDiffMinisters(
    data,
    "minister_name",
    "minister_surname",
    "minister_ministry",
    "minister_role",
    "field_17"
  );
  let field_17_ministers = tablesLib.getDiffMinisters(
    data,
    "field_17_minister_name",
    "field_17_minister_surname",
    "field_17_minister_ministry",
    "field_17_minister_role"
  );
  let field_16_signatory = [
    getDiffText(data.field_16_genikos_onoma),
    getDiffText(data.field_16_genikos_epitheto),
  ];
  let field_9_data = tablesLib.getDataForPdfField9(
    data,
    "_header",
    "_label",
    "_secondHeader"
  ); //data for field_9
  let field_18 = tablesLib.getPdfCheckboxTableData(data, "field_18");
  let field_19 = tablesLib.getPdfCheckboxTableData(data, "field_19");
  let field_20 = tablesLib.getPdfCheckboxTableData(data, "field_20");
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

  let field_14_headers = ["Άρθρο", "Στόχος"];
  let field_29_headers = [
    "Διατάξεις αξιολογούμενης ρύθμισης",
    "Υφιστάμενες διατάξεις",
  ];
  let field_30_headers = [
    "Διατάξεις αξιολογούμενης ρύθμισης που προβλέπουν κατάργηση",
    "Καταργούμενες διατάξεις",
  ];
  let field_31_headers = [
    "Σχετική διάταξη αξιολογούμενης ρύθμισης",
    "Συναρμόδια Υπουργεία –Συναρμόδιες υπηρεσίες / φορείς",
    "Αντικείμενο συναρμοδιότητας",
  ];
  let field_32_headers = [
    "Εξουσιοδοτική διάταξη",
    "Είδος πράξης",
    "Αρμόδιο ή επισπεύδον Υπουργείο ή υπηρεσία",
    "Αντικείμενο",
    "Χρονοδιάγραμμα (ενδεικτική ή αποκλειστική προθεσμία)",
  ];
  const Report = {
    cover: createCover(data),
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
                    fieldText: isEmpty(getDiffText(data.field_1)),
                  },
                },
                {
                  field: {
                    fieldId: 2,
                    fieldHeader: "Γιατί αποτελεί πρόβλημα;",
                    fieldText: isEmpty(getDiffText(data.field_2)),
                  },
                },
                {
                  field: {
                    fieldId: 3,
                    fieldHeader: "Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;",
                    fieldText: isEmpty(getDiffText(data.field_3)),
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
                    fieldHeader: isSelect(
                      `Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; 
                      ΝΑΙ ΟΧΙ 
                      Εάν ΝΑΙ, ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα;`,
                      data.field_4
                    ),
                    fieldText: isEmpty(getDiffText(data.field_4_comments)),
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
                        optionText: getDiffText(data.field_5_1),
                      },
                      {
                        option:
                          "ii) με αλλαγή διοικητικής  πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας;",
                        optionText: getDiffText(data.field_5_2),
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
                    fieldHeader: isSelect(
                      `Έχετε λάβει υπόψη συναφείς πρακτικές;
                   ΝΑΙ  ΟΧΙ
                   Εάν ΝΑΙ, αναφέρατε συγκεκριμένα:`,
                      getDiffText(data.field_6)
                    ),
                    fieldOptions: [
                      {
                        option: "i) σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ:",
                        optionText: getDiffText(data.field_6_1),
                      },
                      {
                        option: "ii) σε όργανα της Ε.Ε.:",
                        optionText: getDiffText(data.field_6_2),
                      },
                      {
                        option: "iii) σε διεθνείς οργανισμούς:",
                        optionText: getDiffText(data.field_6_3),
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
                        optionText: getDiffText(data.field_8_1),
                      },
                      {
                        option: "ii) μακροπρόθεσμοι:",
                        optionText: getDiffText(data.field_8_2),
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
                    fieldHeader: isDirectOrIndirect(
                      `Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης:
                          ΑΜΕΣΗ ή/και ΕΜΜΕΣΗ`,
                      data.field_10_amesi,
                      data.field_10_emmesi
                    ),
                    fieldOptions: [
                      {
                        option: "i)  Εάν είναι άμεση, εξηγήστε:",
                        optionText: getDiffText(data.field_10_amesi_comments),
                      },
                      {
                        option: "ii)  Εάν είναι έμμεση, εξηγήστε:",
                        optionText: getDiffText(
                          data.field_10_emmesi_comments
                        ),
                      },
                    ],
                  },
                },
                {
                  field: {
                    fieldId: 11,
                    fieldHeader: isSelect(
                      `Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού);
                      ΝΑΙ  ΟΧΙ`,
                      data.field_11
                    ),
                    fieldOptions: [
                      {
                        option: "Εξηγήστε:",
                        optionText: getDiffText(data.field_11_comments),
                      },
                    ],
                  },
                },
                {
                  field: {
                    fieldId: 12,
                    fieldHeader: isSelect(
                      `Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα;
                          ΝΑΙ ΟΧΙ`,
                      data.field_12
                    ),
                    fieldOptions: [
                      {
                        option: "Αναφέρατε ποια είναι αυτά τα συστήματα:",
                        optionText: getDiffText(data.field_12_comments),
                      },
                    ],
                  },
                },
                {
                  field: {
                    fieldId: 13,
                    fieldHeader: isSelect(
                      `Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος;
                          ΝΑΙ ΟΧΙ`,
                      data.field_13
                    ),
                    fieldOptions: [
                      {
                        option: "Εξηγήστε:",
                        optionText: getDiffText(data.field_13_comments),
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
                    fieldCreatedBy: createTables(field_14, field_14_headers),
                  },
                },
              ],
            },
          },
        ],
      },
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
                    fieldText: isEmpty(
                      getDiffText(data.field_15_sxedio_nomou)
                    ),
                  },
                },
                {
                  field: {
                    fieldHeader: "του Υπουργείου:",
                    fieldText: isEmpty(getDiffText(data.field_15_ypoyrgeio)),
                  },
                },
                {
                  field: {
                    fieldId: 15,
                    fieldHeader:
                      "15.Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης",
                    fieldText: isEmpty(
                      getDiffText(data.field_15_rythmiseis),
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
                    fieldText: isEmpty(
                      getDiffText(data.field_16_kratikos_proypologismos)
                    ),
                    hasHTML: true,
                  },
                },
                {
                  field: {
                    fieldHeader:
                      "Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων",
                    fieldText: isEmpty(
                      getDiffText(data.field_16_proypologismos_forea),
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
                    fieldText: isEmpty(
                      getDiffText(data.field_17_sxedio_nomou)
                    ),
                  },
                },
                {
                  field: {
                    fieldHeader: "του Υπουργείου:",
                    fieldText: isEmpty(getDiffText(data.field_17_ypoyrgeio)),
                  },
                },
                {
                  field: {
                    fieldId: 17,
                    fieldHeader: "17.Οικονομικά αποτελέσματα ",
                    fieldText: isEmpty(
                      getDiffText(data.field_17_oikonomika_apotelesmata),
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
          {
            category: {
              categoryFields: [
                {
                  field: {
                    fieldId: 21,
                    fieldHeader:
                      "Γνώμες ή πορίσματα αρμόδιων υπηρεσιών και ανεξάρτητων αρχών (ηλεκτρονική επισύναψη). Ειδική αιτιολογία σε περίπτωση σημαντικής απόκλισης μεταξύ της γνωμοδότησης και της αξιολογούμενης ρύθμισης.",
                    fieldText: "Δείτε το Παράρτημα",
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
                        optionText: getDiffText(
                          data.field_22_sinergasia_ypoyrgeiwn
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option:
                          "Συνεργασία με κοινωνικούς φορείς / Ανεξάρτητες Αρχές",
                        optionText: getDiffText(
                          data.field_22_sinergasia_forewn_arxwn
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option: "Διεθνής διαβούλευση",
                        optionText: getDiffText(
                          data.field_22_diethnis_diavouleusi
                        ),
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
                    fieldOptions: [
                      {
                        title:
                          "Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμισης",
                        options: [
                          {
                            option: "Αριθμός συμμετασχόντων",
                            optionText: getDiffText(
                              data.field_23_arxes_symmetasxontes
                            ),
                          },
                          {
                            option: "Σχόλια που υιοθετήθηκαν",
                            optionText: getDiffText(
                              data.field_23_arxes_sxolia_yiothetithikan
                            ),
                          },
                          {
                            option:
                              "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                            optionText: getDiffText(
                              data.field_23_arxes_sxolia_den_yiothetithikan
                            ),
                          },
                        ],
                      },
                      {
                        title: "Επί των άρθρων της αξιολογούμενης ρύθμισης",
                        options: [
                          {
                            option: "Αριθμός συμμετασχόντων",
                            optionText: getDiffText(
                              data.field_23_arthra_symmetasxontes
                            ),
                          },
                          {
                            option: "Σχόλια που υιοθετήθηκαν",
                            optionText: getDiffText(
                              data.field_23_arthra_sxolia_yiothetithikan
                            ),
                          },
                          {
                            option:
                              "Σχόλια που δεν υιοθετήθηκαν (συμπεριλαμβανομένης επαρκούς αιτιολόγησης)",
                            optionText: getDiffText(
                              data.field_23_arthra_sxolia_den_yiothetithikan
                            ),
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
                    fieldText: isEmpty(getDiffText(data.field_24)),
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
                        optionText: getDiffText(data.field_25_dikaio_comment),
                      },
                      {
                        hasCheckbox: true,
                        option: "Κανονισμός",
                        optionText: getDiffText(
                          data.field_25_kanonismos_comment
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option: "Οδηγία/Ανακοινώσεις",
                        optionText: getDiffText(data.field_25_odigia_comment),
                      },
                      {
                        hasCheckbox: true,
                        option: "Απόφαση",
                        optionText: getDiffText(
                          data.field_25_apofasi_comment
                        ),
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
                        optionText: getDiffText(
                          data.field_26_antrwpina_dikaiwmata_comment
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option: "Διεθνείς συμβάσεις",
                        optionText: getDiffText(
                          data.field_26_symvaseis_comment
                        ),
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
                        optionText: getDiffText(
                          data.field_27_dikastirio_comment
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option: "Ανεξάρτητη Αρχή (αναφέρατε)",
                        optionText: getDiffText(data.field_27_arxi_comment),
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
                        optionText: getDiffText(
                          data.field_28_nomologia_comment
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option:
                          "Νομολογία Ευρωπαϊκού Δικαστηρίου Δικαιωμάτων του Ανθρώπου",
                        optionText: getDiffText(
                          data.field_28_nomologia_dikaiwmatwn_anthrwpou_comment
                        ),
                      },
                      {
                        hasCheckbox: true,
                        option:
                          "Άλλα ευρωπαϊκά ή διεθνή δικαστήρια ή διαιτητικά όργανα",
                        optionText: getDiffText(
                          data.field_28_alla_dikastiria_comment
                        ),
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
                    fieldCreatedBy: createTables(field_29, field_29_headers),
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
                    fieldCreatedBy: createTables(field_30, field_30_headers),
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
                    fieldCreatedBy: createTables(field_31, field_31_headers),
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
                    fieldCreatedBy: createTables(field_32, field_32_headers),
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
                    fieldText: isEmpty(getDiffText(data.field_33)),
                  },
                },
                {
                  field: {
                    fieldId: 34,
                    fieldHeader:
                      "Γιατί προτείνεται η σύσταση αυτού του νέου οργάνου και δεν επαρκούν οι υφιστάμενες διοικητικές δομές για να επιτευχθεί ο στόχος της αξιολογούμενης ρύθμισης;",
                    fieldText: isEmpty(getDiffText(data.field_34)),
                  },
                },
                {
                  field: {
                    fieldId: 35,
                    fieldHeader: "Χρόνος έναρξης λειτουργίας του νέου οργάνου",
                    fieldText: isEmpty(getDiffText(data.field_35)),
                  },
                },
                {
                  field: {
                    fieldId: 36,
                    fieldHeader: isSelect(
                      `Έχει γίνει η σχετική οικονομοτεχνική μελέτη αναφορικά με τη σύσταση του νέου οργάνου;
                        ΝΑΙ ΟΧΙ
                        Εάν ΝΑΙ, να επισυναφθεί ηλεκτρονικά.`,
                      data.field_36
                    ),
                    fieldText: "Δείτε το Παράρτημα",
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
                    fieldText: isEmpty(getDiffText(data.field_37)),
                  },
                },
                {
                  field: {
                    fieldId: 38,
                    fieldHeader: "Χώρος λειτουργίας του νέου οργάνου",
                    fieldText: isEmpty(getDiffText(data.field_38)),
                  },
                },
                {
                  field: {
                    fieldId: 39,
                    fieldHeader:
                      "Διασφάλιση επαρκούς υλικοτεχνικού & ηλεκτρονικού εξοπλισμού",
                    fieldText: isEmpty(getDiffText(data.field_39)),
                  },
                },
                {
                  field: {
                    fieldId: 40,
                    fieldHeader: "Τρόπος στελέχωσης του νέου οργάνου",
                    fieldText: isEmpty(getDiffText(data.field_40)),
                  },
                },
              ],
            },
          },
        ],
      },
    ],
    signatories: {
      createdBy: createSignatories(ministers),
    },
    annex: "Παράρτημα",
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
    // styles: {
    //   headerStyle: {
    //     fontSize: 15,
    //     alignment: "left",
    //     decoration: "underline",
    //   },
    //   labelStyle: {
    //     fontSize: 13,
    //     alignment: "left",
    //     decoration: "underline",
    //   },
    //   signatoryStyle: {
    //     fontSize: 13,
    //     alignment: "left",
    //   },
    //   textStyle: {
    //     fontSize: 11,
    //     alignment: "left",
    //   },
    //   diffAddedStyle: {
    //     fontSize: 11,
    //     alignment: "left",
    //     color: "green",
    //   },
    //   diffRemovedStyle: {
    //     fontSize: 11,
    //     alignment: "left",
    //     color: "red",
    //     decoration: "lineThrough",
    //   },
    // },

    content: [[createContainerTable(Report)]],
  };

  let pdfDoc = printer.createPdfKitDocument(docDefinition);
  let pdf_name = "diff.pdf";
  //pdf_name = pdf_name.replace(/\s+/g, '');
  let export_path = "public/pdf_exports/";
  let pdf_path = path.resolve(export_path, pdf_name);
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
  if (array && array.length && array[0].value === "Ναι") {
    newText = text.replace("ΝΑΙ", "ΝΑΙ  X   ");
  }
  if (array && array.length && array[0].value === "Όχι") {
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

function stripHTML(element) {
  element = element.replace(/(<([^>]+)>)/gi, "");
  return element;
}

function isEmpty(val, hasHTML) {
  let text;
  if (hasHTML) {
    // !htmlToPdfmake(val, { window: window }).length
    //   ? (text = "\n\n")
    //   : (text = val);
    return val;
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
      body: [[{ text: getDiffText(data.title), alignment: "center" }]],
    },
  });
  cover.push({
    text: "Επισπεύδον Υπουργείο:\n\n",
    alignment: "center",
    bold: true,
  });
  cover.push({
    text: getDiffText(data.epispeudon_foreas),
    fontSize: 15,
    bold: true,
    alignment: "center",
  });
  cover.push({
    text:
      "\nΣτοιχεία επικοινωνίας: ",
    alignment: "center",
    bold: true,
  });
  cover.push({
    text: getDiffText(data.stoixeia_epikoinwnias),
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
            text: checkboxValue(getDiffText(data.ekpedeusi_politismos)),
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
            text: checkboxValue(getDiffText(data.eksoteriki_politiki)),
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
            text: checkboxValue(getDiffText(data.forologiki_politiki)),
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
            text: checkboxValue(getDiffText(data.koinoniki_politiki)),
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
            text: checkboxValue(getDiffText(data.dimosia_dioikisi)),
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
            text: checkboxValue(getDiffText(data.anaptiksi)),
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
  for (let i in report.reports) {
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

  if (category.field.fieldOptions) {
    if (category.field.fieldOptions[0].title) {
      reportTable[reportTable.length - 1][1].colSpan = 3; //update colspan for previous entry
      reportTable[reportTable.length - 1].push({ text: "" });
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
      let retractPosition = 1; //last occurance of component with less than 3 columns
      if (category.field.fieldSubHeader) {
        reportTable.push([
          { text: "", border: [false, false, false, false] },
          { text: "" },
          { text: "" },
          {
            text: category.field.fieldSubHeader,
            alignment: "center",
          },
        ]);
        retractPosition = 2;
      }
      for (k in category.field.fieldOptions) {        
        if (category.field.fieldOptions[k].hasCheckbox) {
          if (!alteredColumns) {
            reportTable[reportTable.length - retractPosition][1].colSpan = 3; // increase column span
            reportTable[reportTable.length - retractPosition].push({
              // text will be overlapped by previous component's colSpan increase
              text: "",
            });
            alteredColumns = true;
          }
          reportTable.push([
            { text: "", border: [false, false, false, false] },
            {
              image: `./public/img/empty-checkbox.jpg`,
              width: 30,
              height: 30,
            },
            {
              text: category.field.fieldOptions[k].option,
            },
            {
              text: category.field.fieldOptions[k].optionText,
            },
          ]);
        } else {
          reportTable.push([
            { text: "", border: [false, false, false, false] },
            {
              text: category.field.fieldOptions[k].option,
            },
            {
              text: category.field.fieldOptions[k].optionText,
            },
          ]);
        }
      }
    }
  } else {
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
              { text: category.field.fieldText },
              // { text: category.field.fieldText },
              // htmlToPdfmake(category.field.fieldText, {
              //   window: window,
              //   replaceText: function (text) {
              //     return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
              //   },
              // }),
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
}

function hTMLPdf(data) {
  return {
    table: {
      widths: ["100%"],
      body: [htmlToPdfmake(data)],
    },
  };
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
      { text: headers[0], alignment: "center" },
      { text: headers[1], alignment: "center" },
    ]);
    let len = tableData.data.length;
    for (let i = 0; i < tableData.data.length / 2; i++) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getDiffText(tableData.data[i]) },
        { text: getDiffText(tableData.data[i + 3]) },
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
      { text: headers[0], alignment: "center" },
      { text: headers[1], alignment: "center" },
      { text: headers[2], alignment: "center" },
    ]);
    for (let i = 0; i < tableData.data.length / 3; i++) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getDiffText(tableData.data[i]) },
        { text: getDiffText(tableData.data[i + 3]) },
        { text: getDiffText(tableData.data[i + 6]) },
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
      { text: headers[0], alignment: "center" },
      { text: headers[1], alignment: "center" },
      { text: headers[2], alignment: "center" },
      { text: headers[3], alignment: "center" },
      { text: headers[4], alignment: "center" },
    ]);
    for (let i = 4; i < tableData.data.length; i += 5) {
      rows.push([
        { text: "", border: [false, false, false, false] },
        { text: getDiffText(tableData.data[i - 4]) },
        { text: getDiffText(tableData.data[i - 3]) },
        { text: getDiffText(tableData.data[i - 2]) },
        { text: getDiffText(tableData.data[i - 1]) },
        { text: getDiffText(tableData.data[i]) },
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
    if (!hasValidValue(jsonTableData[i].header)) {
      tableRows.push([
        {
          text: getDiffText(jsonTableData[i].header),
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
        text: isEmpty(getDiffText(jsonTableData[i].label)),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[0].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[1].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[2].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[3].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[4].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[5].value),
        alignment: "center",
        fontSize: 7,
      },
      {
        text: getDiffText(jsonTableData[i].values[6].value),
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
}

function createField9(josnData) {
  let tables = [];
  for (i in josnData) {
    tables.push({ text: "\n\n" });
    tables.push(createField9Tables(josnData[i]));
  }
  return tables;
}

function checkboxValue(array) {
  if (Array.isArray(array)) {
    return array[0].color ? { text: "X", color: array[0].color } : "";
  }
  return "";
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
      text: hasValidValue(field_18[0]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_18[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[5]),
      alignment: "center",
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
        text: hasValidValue(field_18[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_18[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count]),
        alignment: "center",
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
      fontSize: 10,
      fillColor: "#C1E1C1",
    },
    {
      text: hasValidValue(field_18[count - 5]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_18[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count - 3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count - 2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count - 1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_18[count]),
      alignment: "center",
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
        text: hasValidValue(field_18[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_18[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_18[count]),
        alignment: "center",
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\nΣχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[isEmpty(getDiffText(data.field_18_comments))]],
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
      fillColor: "#EF9759",
      fontSize: 10,
    },
    {
      text: "ΓΙΑ ΤΗΝ ΕΝΑΡΞΗ ΕΦΑΡΜΟΓΗΣ ΤΗΣ ΡΥΘΜΙΣΗΣ",
      alignment: "center",
      rowSpan: 5,
      fillColor: "#F9B483",
      fontSize: 10,
    },
    {
      text: hasValidValue(field_19[0]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_19[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[5]),
      alignment: "center",
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
        text: hasValidValue(field_19[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_19[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count]),
        alignment: "center",
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
      fontSize: 10,
    },
    {
      text: hasValidValue(field_19[count - 5]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_19[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count - 3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count - 2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count - 1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_19[count]),
      alignment: "center",
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
        text: hasValidValue(field_19[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_19[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_19[count]),
        alignment: "center",
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\n" });
  fieldData.push({ text: "Σχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[isEmpty(getDiffText(data.field_19_comments))]],
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
      fillColor: "#E5E510 ",
      fontSize: 10,
    },
    {
      text: "ΔΙΑΧΕΙΡΙΣΗ ΚΙΝΔΥΝΩΝ",
      alignment: "center",
      rowSpan: 4,
      fillColor: "#F4F410",
      fontSize: 10,
    },
    {
      text: hasValidValue(field_20[0]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_20[1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[5]),
      alignment: "center",
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
        text: hasValidValue(field_20[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_20[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count]),
        alignment: "center",
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
      fontSize: 10,
    },
    {
      text: hasValidValue(field_20[count - 5]),
      alignment: "center",
      fontSize: 8,
    },
    {
      text: checkboxValue(field_20[count - 4]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count - 3]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count - 2]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count - 1]),
      alignment: "center",
    },
    {
      text: checkboxValue(field_20[count]),
      alignment: "center",
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
        text: hasValidValue(field_20[count - 5]),
        alignment: "center",
        fontSize: 8,
      },
      {
        text: checkboxValue(field_20[count - 4]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 3]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 2]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count - 1]),
        alignment: "center",
      },
      {
        text: checkboxValue(field_20[count]),
        alignment: "center",
      },
    ]);
    count += 6;
  }
  fieldTable = {
    table: {
      headerRows: 0,
      widths: ["8%", "11%", "11%", "14%", "14%", "14%", "14%", "14%"],
      body: table,
    },
  };

  fieldData.push(fieldTable);
  fieldData.push({ text: "\nΣχολιασμός / ποιοτική αποτίμηση:" });
  fieldData.push({
    table: {
      widths: ["100%"],

      body: [[isEmpty(getDiffText(data.field_20_comments))]],
    },
  });
  return fieldData;
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
      { text: getDiffText(data[0]), width: "25%" },
      { text: getDiffText(data[1]), width: "25%" },
      { width: "20%", text: "" },
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
          text: getDiffText(ministers.ministers[i][2]),
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

function getDiffText(data) {
  let diffText = [];
  if (!data) return "\n\n";
  if (Array.isArray(data)) {
    for (let i in data) {
      if (data[i].text)
        diffText.push(applyTextDecorations(data[i].text, data[i].color));
      else diffText.push(applyTextDecorations(data[i].value, data[i].color));
    }
  } else {
    return data.value;
  }
  return diffText;
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
  // console.log(array[0].value);
  if (array === undefined) return "";
  return array[0].value;
  // array && array[0] === undefined ? "" : array[0].value;
}
