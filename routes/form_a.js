const routes = require('express').Router()
let database = require('../services/database');
const fs = require('fs');
const csv = require('csv-parser')
const { body, check, validationResult } = require('express-validator');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)//Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
    }
})

var upload = multer({ storage: storage }).fields([{ name: 'field_21_upload', maxCount: 10 }, { name: 'field_23_upload', maxCount: 10 }, { name: 'field_36_upload', maxCount: 10 }]);

routes.get('/:entry_id', async (req, res, next) => {

    const validation_errors = req.session.errors;
    req.session.errors = null;
    try {

        const results = [];

        var readCSV = fs.createReadStream('public/csvs/tooltips.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });

    } catch (err) {
        console.log('Csv error: ' + err)
    }

    let entry = await database.ekthesi.findOne({
        where: {
            id: req.params.entry_id
        }, include: [{ model: database.rythmiseis }, { model: database.field_9 }]
    })
    pdf_name = entry.title + '.pdf';
    pdf_name = pdf_name.replace(/\s+/g, '');
    var pdf_exists;
    try {
        if (fs.existsSync('./public/pdf_exports/' + pdf_name)) {

            console.log("The file exists.");
            pdf_exists = true;
        } else {
            console.log("The file does not exist.");
            pdf_exists = false;
        }
    } catch (err) {
        console.log(err)
    }
    console.log(pdf_exists);
    if (entry && entry.dataValues && readCSV) {
        req.session.ekthesi_id = req.params.entry_id;
        res.render("form_a", { data: entry.dataValues, rolos: req.session.rolos, tooltips: readCSV, pdf_exists: pdf_exists, errors: validation_errors });
    } else {
        res.status(404).send("Not found")
    }
});

routes.post('/:entry_id', async (req, res, next) => {
    var data = req.body;
    //console.log(data)

    let req_body = req.body;//assign req.body to variable
    let keys = Object.keys(req_body);//get keys 
    let field_14_arthro = [];
    let field_14_stoxos = [];
    let field_17_onoma = [];
    let field_17_epitheto = [];
    let field_17_idiotita = [];
    let field_29_diatakseis_rythmisis = [];
    let field_29_yfistamenes_diatakseis = [];
    let field_30_diatakseis_katargisi = [];
    let field_30_katargoumenes_diatakseis = [];
    let field_31_sxetiki_diataksi = [];
    let field_31_synarmodia_ypoyrgeia = [];
    let field_31_antikeimeno_synarmodiotitas = [];
    let field_32_eksousiodotiki_diataksi = [];
    let field_32_eidos_praksis = [];
    let field_32_armodio_ypoyrgeio = [];
    let field_32_antikeimeno = [];
    let field_32_xronodiagramma = [];
    let value, temp;
    for (i in keys) {//iterate through keys
        // console.log(i + " " + keys[i])
        if (keys[i].includes("field_14_arthro")) {
            //console.log("FOUND ROW "+keys[i]);
            value = req_body[keys[i]];//get value from pair
            //console.log(" FOUND val "+value);
            temp = keys[i];//get key 
            field_14_arthro.push({ temp: value });
        } else if (keys[i].includes("field_14_stoxos")) {
            value = req_body[keys[i]];
            temp = keys[i];
            field_14_stoxos.push({ temp: value });
        } else if (keys[i].includes("field_17_onoma")) {
            value = req_body[keys[i]];
            temp = keys[i];
            field_17_onoma.push({ temp: value });
        } else if (keys[i].includes("field_17_epitheto")) {
            value = req_body[keys[i]];
            temp = keys[i];
            field_17_epitheto.push({ temp: value });
        } else if (keys[i].includes("field_17_idiotita")) {
            value = req_body[keys[i]];
            temp = keys[i];
            field_17_idiotita.push({ temp: value });
        } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_29_diatakseis_rythmisis.push({ temp: value });
        } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_29_yfistamenes_diatakseis.push({ temp: value });
        } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_30_diatakseis_katargisi.push({ temp: value });
        } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_30_katargoumenes_diatakseis.push({ temp: value });
        } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_31_sxetiki_diataksi.push({ temp: value });
        } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_31_synarmodia_ypoyrgeia.push({ temp: value });
        } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_31_antikeimeno_synarmodiotitas.push({ temp: value });
        } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_32_eksousiodotiki_diataksi.push({ temp: value });
        } else if (keys[i].includes("field_32_eidos_praksis")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_32_eidos_praksis.push({ temp: value });
        } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_32_armodio_ypoyrgeio.push({ temp: value });
        } else if (keys[i].includes("field_32_antikeimeno")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_32_antikeimeno.push({ temp: value });
        } else if (keys[i].includes("field_32_xronodiagramma")) {
            console.log("FOUND ROW " + keys[i]);
            value = req_body[keys[i]];
            temp = keys[i];
            field_32_xronodiagramma.push({ temp: value });
        }
    }
    var PdfPrinter = require('../node_modules/pdfmake/src/printer');
    // download default Roboto font from cdnjs.com
    fonts = {
        Roboto: {
            normal: 'public/fonts/Roboto-Regular.ttf',
            bold: 'public/fonts/Roboto-Bold.ttf',
            italics: 'public/fonts/Roboto-Italic.ttf',
            medium: 'public/fonts/Roboto-Medium.ttf',
        }
    }
    var printer = new PdfPrinter(fonts);

    var docDefinition = {
        watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
        content: [
            [
                {
                    toc: {
                        title: { text: 'Πίνακας περιεχομένων', style: ['header', { bold: true }], fontSize: 18, decoration: 'underline', },
                    }
                },
                {
                    text: 'Αρχική σελίδα',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                {
                    text: "\n\n" + 'Τίτλος αξιολογούμενης ρύθμισης: ' + data.title + "\n\n" + 'Ονοματεπώνυμο συγγραφέα: ' + req.session.lname + ' ' + req.session.fname + "\n\n" +
                        'Αρχική καταχώρηση: ' + data.initial_submit + "\n\n" + 'Τελευταία ενημέρωση: ' + data.last_updated + "\n\n" +
                        'Επισπεύδον φορέας: ' + data.epispeudon_foreas + "\n\n" + 'Ρύθμιση την οποία αφορά: ' + data.rythmisi_pou_afora + "\n\n" + 'Στοιχεία επικοινωνίας: ' + data.stoixeia_epikoinwnias + "\n\n"
                }, //, pageBreak:'after',                                    

                {
                    text: 'Αιτολογική έκθεση',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                { text: "\n\n" + '1. Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση; \n\n', decoration: 'underline', },
                { text: data.field_1 + "\n\n" }, //, pageBreak:'after',  
                { text: '2. Γιατί αποτελεί πρόβλημα; \n\n', decoration: 'underline' },
                { text: data.field_2 + "\n\n" },
                { text: '3. Ποιους φορείς ή πληθυσμιακές ομάδες αφορά; \n\n', decoration: 'underline' },
                { text: data.field_3 + "\n\n" },
                { text: '4. Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; \n\n', decoration: 'underline' },
                { text: data.field_4 + "\n\n" },
                { text: '4.1 Ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα; \n\n', decoration: 'underline' },
                { text: data.field_4_comments + "\n\n" },
                { text: '5. Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας: \n\n', decoration: 'underline' },
                { text: '5.1 με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης; \n\n', decoration: 'underline' },
                { text: data.field_5_1 + "\n\n" },
                { text: '5.2 με αλλαγή διοικητικής πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας; \n\n', decoration: 'underline' },
                { text: data.field_5_2 + "\n\n" },
                { text: '5.3 με διάθεση περισσότερων ανθρώπινων και υλικών πόρων; \n\n', decoration: 'underline' },
                { text: data.field_5_3 + "\n\n" },
                { text: '6. Έχετε λάβει υπόψη συναφείς πρακτικές; \n\n', decoration: 'underline' },
                { text: data.field_6 + "\n\n" },
                { text: '6.1 Σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ: \n\n', decoration: 'underline' },
                { text: data.field_6_1 + "\n\n" },
                { text: '6.2 Σε όργανα της Ε.Ε.: \n\n', decoration: 'underline' },
                { text: data.field_6_2 + "\n\n" },
                { text: '6.3 Σε διεθνείς οργανισμούς: \n\n', decoration: 'underline' },
                { text: data.field_6_3 + "\n\n" },
                { text: '7. Σημειώστε ποιοι από τους στόχους βιώσιμης ανάπτυξης των Ηνωμένων Εθνών επιδιώκονται με την αξιολογούμενη ρύθμιση: \n\n', decoration: 'underline' },
                {
                    columns: [setPdfImage(data.field_7_goal_1), setPdfImage(data.field_7_goal_2), setPdfImage(data.field_7_goal_3), setPdfImage(data.field_7_goal_4), setPdfImage(data.field_7_goal_5)
                    ], columnGap: 10
                },
                {
                    columns: [setPdfImage(data.field_7_goal_6), setPdfImage(data.field_7_goal_7), setPdfImage(data.field_7_goal_8), setPdfImage(data.field_7_goal_9), setPdfImage(data.field_7_goal_10)
                    ], columnGap: 10
                },
                {
                    columns: [setPdfImage(data.field_7_goal_11), setPdfImage(data.field_7_goal_12), setPdfImage(data.field_7_goal_13), setPdfImage(data.field_7_goal_14), setPdfImage(data.field_7_goal_15)
                    ], columnGap: 10
                },
                {
                    columns: [setPdfImage(data.field_7_goal_16), setPdfImage(data.field_7_goal_17)
                    ], columnGap: 10
                },
                // },
                // {
                //     columns: [
                //         {
                //             image: setPdfImage(data.field_7_goal_5)
                //         },
                //         {
                //             image: setPdfImage(data.field_7_goal_6)
                //         },
                //         {
                //             image: setPdfImage(data.field_7_goal_7)
                //         },
                //         {
                //             image: setPdfImage(data.field_7_goal8)
                //         },
                //     ], columnGap: 10
                // },
                // {
                //     columns: [
                //         {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_9)
                //         },
                //         {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_10)
                //         },
                //         {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_11),
                //         }, {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_12)
                //         },
                //     ], columnGap: 10
                // },
                // {
                //     columns: [
                //         {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_13)
                //         }, {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_14)
                //         }, {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_15)
                //         }, {
                //             width: 100, height: 100,
                //             image: setPdfImage(data.field_7_goal_15)
                //         },
                //     ], columnGap: 10
                // },
                // {
                //     columns: [{
                //         width: 100, height: 100,
                //         image: setPdfImage(data.field_7_goal_17)
                //     },
                //     ], columnGap: 10
                // },

                //{image: setPdfImage(data.field_7_goal_2, './public/img/gr-goal-2.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_3, './public/img/gr-goal-3.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_4, './public/img/gr-goal-4.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_5, './public/img/gr-goal-5.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_6, './public/img/gr-goal-6.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_7, './public/img/gr-goal-7.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_8, './public/img/gr-goal-8.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_9, './public/img/gr-goal-9.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_10, './public/img/gr-goal-10.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_11, './public/img/gr-goal-11.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_12, './public/img/gr-goal-12.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_13, './public/img/gr-goal-13.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_14, './public/img/gr-goal-14.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_15, './public/img/gr-goal-15.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_16, './public/img/gr-goal-16.jpg'), width: 150, height: 150},
                // {image: setPdfImage(data.field_7_goal_17, './public/img/gr-goal-17.jpg'), width: 150, height: 150},

                { text: '8. Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης; \n\n', decoration: 'underline' },
                { text: '8.1 βραχυπρόθεσμοι: \n\n', decoration: 'underline' },
                { text: data.field_8_1 + "\n\n" },
                { text: '8.2 μακροπρόθεσμοι: \n\n', decoration: 'underline' },
                { text: data.field_8_2 + "\n\n" },
                { text: '10. Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης: \n\n', decoration: 'underline' },
                {
                    columns: [
                        {
                            // auto-sized columns have their widths based on their content
                            width: 'auto',
                            text: data.field_10_amesi
                        },
                        {
                            width: 'auto',
                            text: data.field_10_emmesi
                        }]
                },
                { text: 'Εάν είναι άμεση, εξηγήστε: \n\n', decoration: 'underline' },
                { text: data.field_10_amesi_comments + "\n\n" },
                { text: 'Εάν είναι έμμεση, εξηγήστε: \n\n', decoration: 'underline' },
                { text: data.field_10_emmesi_comments + "\n\n" },
                { text: '11. Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού); \n\n', decoration: 'underline' },
                { text: data.field_11 + "\n\n" },
                { text: 'Εξηγήστε: \n\n', decoration: 'underline' },
                { text: data.field_11_comments + "\n\n" },
                { text: '12. Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα; \n\n', decoration: 'underline' },
                { text: data.field_12 + "\n\n" },
                { text: 'Εξηγήστε: \n\n', decoration: 'underline' },
                { text: data.field_12_comments + "\n\n" },
                { text: '13. Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος; \n\n', decoration: 'underline' },
                { text: data.field_13 + "\n\n" },
                { text: 'Εξηγήστε: \n\n', decoration: 'underline' },
                { text: data.field_13_comments + "\n\n" },

                { text: '14. Σύνοψη στόχων κάθε άρθρου \n\n', decoration: 'underline' },
                // {
                //     layout: 'lightHorizontalLines', // optional
                //     table: {
                //         // headers are automatically repeated if the table spans over multiple pages
                //         // you can declare how many rows should be treated as headers
                //         headerRows: 1,
                //         widths: ['*', 'auto', 100, '*'],

                //         body: [
                //             //['Άρθρο', 'Στόχος'],
                //             //[buildTableBody(field_14_arthro), buildTableBody(field_14_stoxos)],
                //             field_14_arthro.forEach(value => {
                //                 [
                //                  { text: value.text, style: 'cell' },
                //                  { text: value.status, },
                //                 ]
                //             })    
                //         ]
                //     }
                // },

                {
                    text: 'Έκθεση ΓΛΚ',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                'TODO: get glk data',
                {
                    text: 'Υπογράφοντες \n\n',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                {
                    columns: [
                        {
                            // auto-sized columns have their widths based on their content
                            width: '*',
                            text: 'Iraklis Varlamis',
                            fontSize: 17,
                        },
                        {
                            // auto-sized columns have their widths based on their content
                            width: '*',
                            text: 'Ioannis V. Psarras',
                            fontSize: 17,
                        },
                        {
                            width: '*',
                            text: 'Marios T. Venetsianos',
                            fontSize: 17,
                        }]
                },

                // {
                //     ul: [

                //         {
                //             toc: {
                //                 id: 'mainToc',
                //                 title: { text: 'ITEM 1', style: 'header' }
                //             }
                //         },
                //         {
                //             toc: {
                //                 id: 'subToc',
                //                 title: { text: 'ITEM 2', style: 'header' },
                //                 pageBreak:'after'
                //             }
                //         },
                //     ]
                // },                
            ]
        ]
    };
    //setPdfImage(data.field_7_goal_1, docDefinition);
    // setPdfImage(data.field_7_goal_2, docDefinition);
    // setPdfImage(data.field_7_goal_3, docDefinition);
    // setPdfImage(data.field_7_goal_4, docDefinition);
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdf_name = data.title + '.pdf';
    pdf_name = pdf_name.replace(/\s+/g, '');

    pdfDoc.pipe(fs.createWriteStream('./public/pdf_exports/' + pdf_name));
    pdfDoc.end();
    //res.header('content-type', 'application/pdf');
    //res.download(pdf_name);

    try {
        if (fs.existsSync('./public/pdf_exports/' + pdf_name)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);

        }
    } catch (err) {
        console.log(err)
    }
})

routes.put('/:entry_id', upload,
    [check('title', 'Title is required').notEmpty(),
    check('epispeudon_foreas', 'Epispeudon foreas is required').notEmpty(),
    //  check(body(), 'req.body is empty!!!').notEmpty()
    body('field_10_amesi_comments').if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Εάν είναι άμεση, εξηγήστε.'),
    body('field_10_emmesi_comments').if(body('field_10_emmesi').notEmpty()).notEmpty().withMessage('Εάν είναι έμμεση, εξηγήστε.'),
    body('field_11_comments')
        .if(body('field_10_emmesi').notEmpty())//if user checked field_10_amesi
        .if(body('field_10_amesi').notEmpty())//or if user checked field_10_emmesi
        .notEmpty().withMessage('Το πεδίο 11 είναι υποχρεωτικό.'),//field_11 must be filled in      
    body('field_12_comments').if(body('field_10_emmesi').notEmpty()).if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Το πεδίο 12 είναι υποχρεωτικό.'),
    body('field_13_comments').if(body('field_10_emmesi').notEmpty()).if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Το πεδίο 13 είναι υποχρεωτικό.'),

    body('field_34').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 34 είναι υποχρεωτικό.'),
    body('field_35').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 35 είναι υποχρεωτικό.'),
    body('field_36').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 36 είναι υποχρεωτικό.'),
    body('field_37').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 37 είναι υποχρεωτικό.'),
    body('field_38').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 38 είναι υποχρεωτικό.'),
    body('field_39').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 39 είναι υποχρεωτικό.'),
    body('field_40').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 40 είναι υποχρεωτικό.'),
    ],
    async function (req, res, next) {
        let ekthesi_id = req.params.entry_id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // if array exists
            console.log(errors);
            req.session.errors = errors.array();
            //res.render("create",{ data:data, analysis: req.params.analysis, rolos: req.session.rolos, errors: errors.array() });
            res.send({ redirect: "../form_a/" + ekthesi_id });
        } else {
            console.log('no errors');
            //next();

            try {
                console.log("req.body: " + Object.keys(req.body) + Object.values(req.body));
                console.log("status: " + req.body.status_ekthesis);
                console.log("ekpedeusi_politismos: " + req.body.ekpedeusi_politismos);
                let ekthesi = await database.ekthesi.update(req.body, {
                    where: {
                        id: ekthesi_id
                    }, include: [{ model: database.rythmiseis }, { model: database.field_9 }], returning: true, plain: true
                })

                let field21 = [];
                let field23 = [];
                let field36 = [];
                try {

                    const file = req.files;
                    if (file.field_21_upload) {
                        for (i in file.field_21_upload) {
                            field21.push(file.field_21_upload[i].filename)
                        }
                        console.log("field21: " + field21);
                        // const error = new Error('Please upload a file')
                        // error.httpStatusCode = 400
                        // return next(error)

                    }
                    if (file.field_23_upload) {
                        for (i in file.field_23_upload) {
                            field23.push(file.field_23_upload[i].filename)
                            console.log(file.field_23_upload[i].path);
                        }
                        console.log("field23: " + field23);
                    }
                    if (file.field_36_upload) {
                        for (i in file.field_36_upload) {
                            field36.push(file.field_36_upload[i].filename)
                        }
                        console.log("field36: " + field36);
                    }
                } catch (e) {
                    console.log("Error message: " + e.message);
                }
                //groupings for field9
                //ergasiakes_sxeseis_table
                let symvaseis = JSON.stringify([{ "symvaseis_year1": req.body.symvaseis_year1 }, { "symvaseis_year2": req.body.symvaseis_year2 }, { "symvaseis_year3": req.body.symvaseis_year3 }, { "symvaseis_year4": req.body.symvaseis_year4 }, { "symvaseis_year5": req.body.symvaseis_year5 }, { "symvaseis_prosfata_stoixeia": req.body.symvaseis_prosfata_stoixeia }, { "symvaseis_epidiwkomenos_stoxos": req.body.symvaseis_epidiwkomenos_stoxos }])
                let sse_diamesolavisi = JSON.stringify([{ "sse_diamesolavisi_year1": req.body.sse_diamesolavisi_year1 }, { "sse_diamesolavisi_year2": req.body.sse_diamesolavisi_year2 }, { "sse_diamesolavisi_year3": req.body.sse_diamesolavisi_year3 }, { "sse_diamesolavisi_year4": req.body.sse_diamesolavisi_year4 }, { "sse_diamesolavisi_year5": req.body.sse_diamesolavisi_year5 }, { "sse_diamesolavisi_prosfata_stoixeia": req.body.sse_diamesolavisi_prosfata_stoixeia }, { "sse_diamesolavisi_epidiwkomenos_stoxos": req.body.sse_diamesolavisi_epidiwkomenos_stoxos }])
                let sse_diaitisia = JSON.stringify([{ "sse_diaitisia_year1": req.body.sse_diaitisia_year1 }, { "sse_diaitisia_year2": req.body.sse_diaitisia_year2 }, { "sse_diaitisia_year3": req.body.sse_diaitisia_year3 }, { "sse_diaitisia_year4": req.body.sse_diaitisia_year4 }, { "sse_diaitisia_year5": req.body.sse_diaitisia_year5 }, { "sse_diaitisia_prosfata_stoixeia": req.body.sse_diaitisia_prosfata_stoixeia }, { "sse_diaitisia_epidiwkomenos_stoxos": req.body.sse_diaitisia_epidiwkomenos_stoxos }])
                let mesos_xronos_mesolavisis = JSON.stringify([{ "mesos_xronos_mesolavisis_year1": req.body.mesos_xronos_mesolavisis_year1 }, { "mesos_xronos_mesolavisis_year2": req.body.mesos_xronos_mesolavisis_year2 }, { "mesos_xronos_mesolavisis_year3": req.body.mesos_xronos_mesolavisis_year3 }, { "mesos_xronos_mesolavisis_year4": req.body.mesos_xronos_mesolavisis_year4 }, { "mesos_xronos_mesolavisis_year5": req.body.mesos_xronos_mesolavisis_year5 }, { "mesos_xronos_mesolavisis_prosfata_stoixeia": req.body.mesos_xronos_mesolavisis_prosfata_stoixeia }, { "mesos_xronos_mesolavisis_epidiwkomenos_stoxos": req.body.mesos_xronos_mesolavisis_epidiwkomenos_stoxos }])
                let mesos_xronos_diaitisias = JSON.stringify([{ "mesos_xronos_diaitisias_year1": req.body.mesos_xronos_diaitisias_year1 }, { "mesos_xronos_diaitisias_year2": req.body.mesos_xronos_diaitisias_year2 }, { "mesos_xronos_diaitisias_year3": req.body.mesos_xronos_diaitisias_year3 }, { "mesos_xronos_diaitisias_year4": req.body.mesos_xronos_diaitisias_year4 }, { "mesos_xronos_diaitisias_year5": req.body.mesos_xronos_diaitisias_year5 }, { "mesos_xronos_diaitisias_prosfata_stoixeia": req.body.mesos_xronos_diaitisias_prosfata_stoixeia }, { "mesos_xronos_diaitisias_epidiwkomenos_stoxos": req.body.mesos_xronos_diaitisias_epidiwkomenos_stoxos }])
                let diarkeia_sse = JSON.stringify([{ "diarkeia_sse_year1": req.body.diarkeia_sse_year1 }, { "diarkeia_sse_year2": req.body.diarkeia_sse_year2 }, { "diarkeia_sse_year3": req.body.diarkeia_sse_year3 }, { "diarkeia_sse_year4": req.body.diarkeia_sse_year4 }, { "diarkeia_sse_year5": req.body.diarkeia_sse_year5 }, { "diarkeia_sse_prosfata_stoixeia": req.body.diarkeia_sse_prosfata_stoixeia }, { "diarkeia_sse_epidiwkomenos_stoxos": req.body.diarkeia_sse_epidiwkomenos_stoxos }])
                let wres_ergasias = JSON.stringify([{ "wres_ergasias_year1": req.body.wres_ergasias_year1 }, { "wres_ergasias_year2": req.body.wres_ergasias_year2 }, { "wres_ergasias_year3": req.body.wres_ergasias_year3 }, { "wres_ergasias_year4": req.body.wres_ergasias_year4 }, { "wres_ergasias_year5": req.body.wres_ergasias_year5 }, { "wres_ergasias_prosfata_stoixeia": req.body.wres_ergasias_prosfata_stoixeia }, { "wres_ergasias_epidiwkomenos_stoxos": req.body.wres_ergasias_epidiwkomenos_stoxos }])
                let ameivomenes_yperwries = JSON.stringify([{ "ameivomenes_yperwries_year1": req.body.ameivomenes_yperwries_year1 }, { "ameivomenes_yperwries_year2": req.body.ameivomenes_yperwries_year2 }, { "ameivomenes_yperwries_year3": req.body.ameivomenes_yperwries_year3 }, { "ameivomenes_yperwries_year4": req.body.ameivomenes_yperwries_year4 }, { "ameivomenes_yperwries_year5": req.body.ameivomenes_yperwries_year5 }, { "ameivomenes_yperwries_prosfata_stoixeia": req.body.ameivomenes_yperwries_prosfata_stoixeia }, { "ameivomenes_yperwries_epidiwkomenos_stoxos": req.body.ameivomenes_yperwries_epidiwkomenos_stoxos }])
                let atyximata = JSON.stringify([{ "atyximata_year1": req.body.atyximata_year1 }, { "atyximata_year2": req.body.atyximata_year2 }, { "atyximata_year3": req.body.atyximata_year3 }, { "atyximata_year4": req.body.atyximata_year4 }, { "atyximata_year5": req.body.atyximata_year5 }, { "atyximata_prosfata_stoixeia": req.body.atyximata_prosfata_stoixeia }, { "atyximata_epidiwkomenos_stoxos": req.body.atyximata_epidiwkomenos_stoxos }])

                //apasxolisi_table
                let anergia = JSON.stringify([{ "anergia_year1": req.body.anergia_year1 }, { "anergia_year2": req.body.anergia_year2 }, { "anergia_year3": req.body.anergia_year3 }, { "anergia_year4": req.body.anergia_year4 }, { "anergia_year5": req.body.anergia_year5 }, { "anergia_prosfata_stoixeia": req.body.anergia_prosfata_stoixeia }, { "anergia_epidiwkomenos_stoxos": req.body.anergia_epidiwkomenos_stoxos }])
                let makroxronia_anergoi = JSON.stringify([{ "makroxronia_anergoi_year1": req.body.makroxronia_anergoi_year1 }, { "makroxronia_anergoi_year2": req.body.makroxronia_anergoi_year2 }, { "makroxronia_anergoi_year3": req.body.makroxronia_anergoi_year3 }, { "makroxronia_anergoi_year4": req.body.makroxronia_anergoi_year4 }, { "makroxronia_anergoi_year5": req.body.makroxronia_anergoi_year5 }, { "makroxronia_anergoi_prosfata_stoixeia": req.body.makroxronia_anergoi_prosfata_stoixeia }, { "makroxronia_anergoi_epidiwkomenos_stoxos": req.body.makroxronia_anergoi_epidiwkomenos_stoxos }])
                let anergia_newn = JSON.stringify([{ "anergia_newn_year1": req.body.anergia_newn_year1 }, { "anergia_newn_year2": req.body.anergia_newn_year2 }, { "anergia_newn_year3": req.body.anergia_newn_year3 }, { "anergia_newn_year4": req.body.anergia_newn_year4 }, { "anergia_newn_year5": req.body.anergia_newn_year5 }, { "anergia_newn_prosfata_stoixeia": req.body.anergia_newn_prosfata_stoixeia }, { "anergia_newn_epidiwkomenos_stoxos": req.body.anergia_newn_epidiwkomenos_stoxos }])
                let anergia_gynaikwn = JSON.stringify([{ "anergia_gynaikwn_year1": req.body.anergia_gynaikwn_year1 }, { "anergia_gynaikwn_year2": req.body.anergia_gynaikwn_year2 }, { "anergia_gynaikwn_year3": req.body.anergia_gynaikwn_year3 }, { "anergia_gynaikwn_year4": req.body.anergia_gynaikwn_year4 }, { "anergia_gynaikwn_year5": req.body.anergia_gynaikwn_year5 }, { "anergia_gynaikwn_prosfata_stoixeia": req.body.anergia_gynaikwn_prosfata_stoixeia }, { "anergia_gynaikwn_epidiwkomenos_stoxos": req.body.anergia_gynaikwn_epidiwkomenos_stoxos }])
                let anergia_ana_perifereia = JSON.stringify([{ "anergia_ana_perifereia_year1": req.body.anergia_ana_perifereia_year1 }, { "anergia_ana_perifereia_year2": req.body.anergia_ana_perifereia_year2 }, { "anergia_ana_perifereia_year3": req.body.anergia_ana_perifereia_year3 }, { "anergia_ana_perifereia_year4": req.body.anergia_ana_perifereia_year4 }, { "anergia_ana_perifereia_year5": req.body.anergia_ana_perifereia_year5 }, { "anergia_ana_perifereia_prosfata_stoixeia": req.body.anergia_ana_perifereia_prosfata_stoixeia }, { "anergia_ana_perifereia_epidiwkomenos_stoxos": req.body.anergia_ana_perifereia_epidiwkomenos_stoxos }])
                let anergia_morfwsi = JSON.stringify([{ "anergia_morfwsi_year1": req.body.anergia_morfwsi_year1 }, { "anergia_morfwsi_year2": req.body.anergia_morfwsi_year2 }, { "anergia_morfwsi_year3": req.body.anergia_morfwsi_year3 }, { "anergia_morfwsi_year4": req.body.anergia_morfwsi_year4 }, { "anergia_morfwsi_year5": req.body.anergia_morfwsi_year5 }, { "anergia_morfwsi_prosfata_stoixeia": req.body.anergia_morfwsi_prosfata_stoixeia }, { "anergia_morfwsi_epidiwkomenos_stoxos": req.body.anergia_morfwsi_epidiwkomenos_stoxos }])
                let deiktis_apasxolisis = JSON.stringify([{ "deiktis_apasxolisis_year1": req.body.deiktis_apasxolisis_year1 }, { "deiktis_apasxolisis_year2": req.body.deiktis_apasxolisis_year2 }, { "deiktis_apasxolisis_year3": req.body.deiktis_apasxolisis_year3 }, { "deiktis_apasxolisis_year4": req.body.deiktis_apasxolisis_year4 }, { "deiktis_apasxolisis_year5": req.body.deiktis_apasxolisis_year5 }, { "deiktis_apasxolisis_prosfata_stoixeia": req.body.deiktis_apasxolisis_prosfata_stoixeia }, { "deiktis_apasxolisis_epidiwkomenos_stoxos": req.body.deiktis_apasxolisis_epidiwkomenos_stoxos }])
                let meriki_apasxolisi = JSON.stringify([{ "meriki_apasxolisi_year1": req.body.meriki_apasxolisi_year1 }, { "meriki_apasxolisi_year2": req.body.meriki_apasxolisi_year2 }, { "meriki_apasxolisi_year3": req.body.meriki_apasxolisi_year3 }, { "meriki_apasxolisi_year4": req.body.meriki_apasxolisi_year4 }, { "meriki_apasxolisi_year5": req.body.meriki_apasxolisi_year5 }, { "meriki_apasxolisi_prosfata_stoixeia": req.body.meriki_apasxolisi_prosfata_stoixeia }, { "meriki_apasxolisi_epidiwkomenos_stoxos": req.body.meriki_apasxolisi_epidiwkomenos_stoxos }])
                let symvasi_orismenoy_xronoy = JSON.stringify([{ "symvasi_orismenoy_xronoy_year1": req.body.symvasi_orismenoy_xronoy_year1 }, { "symvasi_orismenoy_xronoy_year2": req.body.symvasi_orismenoy_xronoy_year2 }, { "symvasi_orismenoy_xronoy_year3": req.body.symvasi_orismenoy_xronoy_year3 }, { "symvasi_orismenoy_xronoy_year4": req.body.symvasi_orismenoy_xronoy_year4 }, { "symvasi_orismenoy_xronoy_year5": req.body.symvasi_orismenoy_xronoy_year5 }, { "symvasi_orismenoy_xronoy_prosfata_stoixeia": req.body.symvasi_orismenoy_xronoy_prosfata_stoixeia }, { "symvasi_orismenoy_xronoy_epidiwkomenos_stoxos": req.body.symvasi_orismenoy_xronoy_epidiwkomenos_stoxos }])

                //koinwniki_asfalisi_table
                let ypsos_syntaksewn = JSON.stringify([{ "ypsos_syntaksewn_year1": req.body.ypsos_syntaksewn_year1 }, { "ypsos_syntaksewn_year2": req.body.ypsos_syntaksewn_year2 }, { "ypsos_syntaksewn_year3": req.body.ypsos_syntaksewn_year3 }, { "ypsos_syntaksewn_year4": req.body.ypsos_syntaksewn_year4 }, { "ypsos_syntaksewn_year5": req.body.ypsos_syntaksewn_year5 }, { "ypsos_syntaksewn_prosfata_stoixeia": req.body.ypsos_syntaksewn_prosfata_stoixeia }, { "ypsos_syntaksewn_epidiwkomenos_stoxos": req.body.ypsos_syntaksewn_epidiwkomenos_stoxos }])
                let ypsos_eisforwn = JSON.stringify([{ "ypsos_eisforwn_year1": req.body.ypsos_eisforwn_year1 }, { "ypsos_eisforwn_year2": req.body.ypsos_eisforwn_year2 }, { "ypsos_eisforwn_year3": req.body.ypsos_eisforwn_year3 }, { "ypsos_eisforwn_year4": req.body.ypsos_eisforwn_year4 }, { "ypsos_eisforwn_year5": req.body.ypsos_eisforwn_year5 }, { "ypsos_eisforwn_prosfata_stoixeia": req.body.ypsos_eisforwn_prosfata_stoixeia }, { "ypsos_eisforwn_epidiwkomenos_stoxos": req.body.ypsos_eisforwn_epidiwkomenos_stoxos }])
                let ilikia_syntaksiodotisis = JSON.stringify([{ "ilikia_syntaksiodotisis_year1": req.body.ilikia_syntaksiodotisis_year1 }, { "ilikia_syntaksiodotisis_year2": req.body.ilikia_syntaksiodotisis_year2 }, { "ilikia_syntaksiodotisis_year3": req.body.ilikia_syntaksiodotisis_year3 }, { "ilikia_syntaksiodotisis_year4": req.body.ilikia_syntaksiodotisis_year4 }, { "ilikia_syntaksiodotisis_year5": req.body.ilikia_syntaksiodotisis_year5 }, { "ilikia_syntaksiodotisis_prosfata_stoixeia": req.body.ilikia_syntaksiodotisis_prosfata_stoixeia }, { "ilikia_syntaksiodotisis_epidiwkomenos_stoxos": req.body.ilikia_syntaksiodotisis_epidiwkomenos_stoxos }])
                let aponomi_syntaksis = JSON.stringify([{ "aponomi_syntaksis_year1": req.body.aponomi_syntaksis_year1 }, { "aponomi_syntaksis_year2": req.body.aponomi_syntaksis_year2 }, { "aponomi_syntaksis_year3": req.body.aponomi_syntaksis_year3 }, { "aponomi_syntaksis_year4": req.body.aponomi_syntaksis_year4 }, { "aponomi_syntaksis_year5": req.body.aponomi_syntaksis_year5 }, { "aponomi_syntaksis_prosfata_stoixeia": req.body.aponomi_syntaksis_prosfata_stoixeia }, { "aponomi_syntaksis_epidiwkomenos_stoxos": req.body.aponomi_syntaksis_epidiwkomenos_stoxos }])
                let syntaksiodotiki_dapani = JSON.stringify([{ "syntaksiodotiki_dapani_year1": req.body.syntaksiodotiki_dapani_year1 }, { "syntaksiodotiki_dapani_year2": req.body.syntaksiodotiki_dapani_year2 }, { "syntaksiodotiki_dapani_year3": req.body.syntaksiodotiki_dapani_year3 }, { "syntaksiodotiki_dapani_year4": req.body.syntaksiodotiki_dapani_year4 }, { "syntaksiodotiki_dapani_year5": req.body.syntaksiodotiki_dapani_year5 }, { "syntaksiodotiki_dapani_prosfata_stoixeia": req.body.syntaksiodotiki_dapani_prosfata_stoixeia }, { "syntaksiodotiki_dapani_epidiwkomenos_stoxos": req.body.syntaksiodotiki_dapani_epidiwkomenos_stoxos }])
                let prosfyges_syntaksis = JSON.stringify([{ "prosfyges_syntaksis_year1": req.body.prosfyges_syntaksis_year1 }, { "prosfyges_syntaksis_year2": req.body.prosfyges_syntaksis_year2 }, { "prosfyges_syntaksis_year3": req.body.prosfyges_syntaksis_year3 }, { "prosfyges_syntaksis_year4": req.body.prosfyges_syntaksis_year4 }, { "prosfyges_syntaksis_year5": req.body.prosfyges_syntaksis_year5 }, { "prosfyges_syntaksis_prosfata_stoixeia": req.body.prosfyges_syntaksis_prosfata_stoixeia }, { "prosfyges_syntaksis_epidiwkomenos_stoxos": req.body.prosfyges_syntaksis_epidiwkomenos_stoxos }])

                //koinwniki_pronoia_table
                let kathestws_ftwxeias = JSON.stringify([{ "kathestws_ftwxeias_year1": req.body.kathestws_ftwxeias_year1 }, { "kathestws_ftwxeias_year2": req.body.kathestws_ftwxeias_year2 }, { "kathestws_ftwxeias_year3": req.body.kathestws_ftwxeias_year3 }, { "kathestws_ftwxeias_year4": req.body.kathestws_ftwxeias_year4 }, { "kathestws_ftwxeias_year5": req.body.kathestws_ftwxeias_year5 }, { "kathestws_ftwxeias_prosfata_stoixeia": req.body.kathestws_ftwxeias_prosfata_stoixeia }, { "kathestws_ftwxeias_epidiwkomenos_stoxos": req.body.kathestws_ftwxeias_epidiwkomenos_stoxos }])
                let sterisi_vasikwn_agathwn = JSON.stringify([{ "sterisi_vasikwn_agathwn_year1": req.body.sterisi_vasikwn_agathwn_year1 }, { "sterisi_vasikwn_agathwn_year2": req.body.sterisi_vasikwn_agathwn_year2 }, { "sterisi_vasikwn_agathwn_year3": req.body.sterisi_vasikwn_agathwn_year3 }, { "sterisi_vasikwn_agathwn_year4": req.body.sterisi_vasikwn_agathwn_year4 }, { "sterisi_vasikwn_agathwn_year5": req.body.sterisi_vasikwn_agathwn_year5 }, { "sterisi_vasikwn_agathwn_prosfata_stoixeia": req.body.sterisi_vasikwn_agathwn_prosfata_stoixeia }, { "sterisi_vasikwn_agathwn_epidiwkomenos_stoxos": req.body.sterisi_vasikwn_agathwn_epidiwkomenos_stoxos }])
                let noikokyria_ektaktes_anagkes = JSON.stringify([{ "noikokyria_ektaktes_anagkes_year1": req.body.noikokyria_ektaktes_anagkes_year1 }, { "noikokyria_ektaktes_anagkes_year2": req.body.noikokyria_ektaktes_anagkes_year2 }, { "noikokyria_ektaktes_anagkes_year3": req.body.noikokyria_ektaktes_anagkes_year3 }, { "noikokyria_ektaktes_anagkes_year4": req.body.noikokyria_ektaktes_anagkes_year4 }, { "noikokyria_ektaktes_anagkes_year5": req.body.noikokyria_ektaktes_anagkes_year5 }, { "noikokyria_ektaktes_anagkes_prosfata_stoixeia": req.body.noikokyria_ektaktes_anagkes_prosfata_stoixeia }, { "noikokyria_ektaktes_anagkes_epidiwkomenos_stoxos": req.body.noikokyria_ektaktes_anagkes_epidiwkomenos_stoxos }])
                let epidomata_dapani = JSON.stringify([{ "epidomata_dapani_year1": req.body.epidomata_dapani_year1 }, { "epidomata_dapani_year2": req.body.epidomata_dapani_year2 }, { "epidomata_dapani_year3": req.body.epidomata_dapani_year3 }, { "epidomata_dapani_year4": req.body.epidomata_dapani_year4 }, { "epidomata_dapani_year5": req.body.epidomata_dapani_year5 }, { "epidomata_dapani_prosfata_stoixeia": req.body.epidomata_dapani_prosfata_stoixeia }, { "epidomata_dapani_epidiwkomenos_stoxos": req.body.epidomata_dapani_epidiwkomenos_stoxos }])
                let paidia_se_orfanotrofeia = JSON.stringify([{ "paidia_se_orfanotrofeia_year1": req.body.paidia_se_orfanotrofeia_year1 }, { "paidia_se_orfanotrofeia_year2": req.body.paidia_se_orfanotrofeia_year2 }, { "paidia_se_orfanotrofeia_year3": req.body.paidia_se_orfanotrofeia_year3 }, { "paidia_se_orfanotrofeia_year4": req.body.paidia_se_orfanotrofeia_year4 }, { "paidia_se_orfanotrofeia_year5": req.body.paidia_se_orfanotrofeia_year5 }, { "paidia_se_orfanotrofeia_prosfata_stoixeia": req.body.paidia_se_orfanotrofeia_prosfata_stoixeia }, { "paidia_se_orfanotrofeia_epidiwkomenos_stoxos": req.body.paidia_se_orfanotrofeia_epidiwkomenos_stoxos }])
                let astegoi_sitisi = JSON.stringify([{ "astegoi_sitisi_year1": req.body.astegoi_sitisi_year1 }, { "astegoi_sitisi_year2": req.body.astegoi_sitisi_year2 }, { "astegoi_sitisi_year3": req.body.astegoi_sitisi_year3 }, { "astegoi_sitisi_year4": req.body.astegoi_sitisi_year4 }, { "astegoi_sitisi_year5": req.body.astegoi_sitisi_year5 }, { "astegoi_sitisi_prosfata_stoixeia": req.body.astegoi_sitisi_prosfata_stoixeia }, { "astegoi_sitisi_epidiwkomenos_stoxos": req.body.astegoi_sitisi_epidiwkomenos_stoxos }])
                let proswrini_katoikia = JSON.stringify([{ "proswrini_katoikia_year1": req.body.proswrini_katoikia_year1 }, { "proswrini_katoikia_year2": req.body.proswrini_katoikia_year2 }, { "proswrini_katoikia_year3": req.body.proswrini_katoikia_year3 }, { "proswrini_katoikia_year4": req.body.proswrini_katoikia_year4 }, { "proswrini_katoikia_year5": req.body.proswrini_katoikia_year5 }, { "proswrini_katoikia_prosfata_stoixeia": req.body.proswrini_katoikia_prosfata_stoixeia }, { "proswrini_katoikia_epidiwkomenos_stoxos": req.body.proswrini_katoikia_epidiwkomenos_stoxos }])
                let kostos_frontidas = JSON.stringify([{ "kostos_frontidas_year1": req.body.kostos_frontidas_year1 }, { "kostos_frontidas_year2": req.body.kostos_frontidas_year2 }, { "kostos_frontidas_year3": req.body.kostos_frontidas_year3 }, { "kostos_frontidas_year4": req.body.kostos_frontidas_year4 }, { "kostos_frontidas_year5": req.body.kostos_frontidas_year5 }, { "kostos_frontidas_prosfata_stoixeia": req.body.kostos_frontidas_prosfata_stoixeia }, { "kostos_frontidas_epidiwkomenos_stoxos": req.body.kostos_frontidas_epidiwkomenos_stoxos }])

                //ygeia_table
                let astheneis = JSON.stringify([{ "astheneis_year1": req.body.astheneis_year1 }, { "astheneis_year2": req.body.astheneis_year2 }, { "astheneis_year3": req.body.astheneis_year3 }, { "astheneis_year4": req.body.astheneis_year4 }, { "astheneis_year5": req.body.astheneis_year5 }, { "astheneis_prosfata_stoixeia": req.body.astheneis_prosfata_stoixeia }, { "astheneis_epidiwkomenos_stoxos": req.body.astheneis_epidiwkomenos_stoxos }])
                let paidiki_thnisimotita = JSON.stringify([{ "paidiki_thnisimotita_year1": req.body.paidiki_thnisimotita_year1 }, { "paidiki_thnisimotita_year2": req.body.paidiki_thnisimotita_year2 }, { "paidiki_thnisimotita_year3": req.body.paidiki_thnisimotita_year3 }, { "paidiki_thnisimotita_year4": req.body.paidiki_thnisimotita_year4 }, { "paidiki_thnisimotita_year5": req.body.paidiki_thnisimotita_year5 }, { "paidiki_thnisimotita_prosfata_stoixeia": req.body.paidiki_thnisimotita_prosfata_stoixeia }, { "paidiki_thnisimotita_epidiwkomenos_stoxos": req.body.paidiki_thnisimotita_epidiwkomenos_stoxos }])
                let dapanes_ygeias = JSON.stringify([{ "dapanes_ygeias_year1": req.body.dapanes_ygeias_year1 }, { "dapanes_ygeias_year2": req.body.dapanes_ygeias_year2 }, { "dapanes_ygeias_year3": req.body.dapanes_ygeias_year3 }, { "dapanes_ygeias_year4": req.body.dapanes_ygeias_year4 }, { "dapanes_ygeias_year5": req.body.dapanes_ygeias_year5 }, { "dapanes_ygeias_prosfata_stoixeia": req.body.dapanes_ygeias_prosfata_stoixeia }, { "dapanes_ygeias_epidiwkomenos_stoxos": req.body.dapanes_ygeias_epidiwkomenos_stoxos }])
                let dapanes_farmakwn = JSON.stringify([{ "dapanes_farmakwn_year1": req.body.dapanes_farmakwn_year1 }, { "dapanes_farmakwn_year2": req.body.dapanes_farmakwn_year2 }, { "dapanes_farmakwn_year3": req.body.dapanes_farmakwn_year3 }, { "dapanes_farmakwn_year4": req.body.dapanes_farmakwn_year4 }, { "dapanes_farmakwn_year5": req.body.dapanes_farmakwn_year5 }, { "dapanes_farmakwn_prosfata_stoixeia": req.body.dapanes_farmakwn_prosfata_stoixeia }, { "dapanes_farmakwn_epidiwkomenos_stoxos": req.body.dapanes_farmakwn_epidiwkomenos_stoxos }])
                let arithmos_iatrwn_ana_1000_katoikous = JSON.stringify([{ "arithmos_iatrwn_ana_1000_katoikous_year1": req.body.arithmos_iatrwn_ana_1000_katoikous_year1 }, { "arithmos_iatrwn_ana_1000_katoikous_year2": req.body.arithmos_iatrwn_ana_1000_katoikous_year2 }, { "arithmos_iatrwn_ana_1000_katoikous_year3": req.body.arithmos_iatrwn_ana_1000_katoikous_year3 }, { "arithmos_iatrwn_ana_1000_katoikous_year4": req.body.arithmos_iatrwn_ana_1000_katoikous_year4 }, { "arithmos_iatrwn_ana_1000_katoikous_year5": req.body.arithmos_iatrwn_ana_1000_katoikous_year5 }, { "arithmos_iatrwn_ana_1000_katoikous_prosfata_stoixeia": req.body.arithmos_iatrwn_ana_1000_katoikous_prosfata_stoixeia }, { "arithmos_iatrwn_ana_1000_katoikous_epidiwkomenos_stoxos": req.body.arithmos_iatrwn_ana_1000_katoikous_epidiwkomenos_stoxos }])
                let arithmos_klinwn_ana_1000_katoikous = JSON.stringify([{ "arithmos_klinwn_ana_1000_katoikous_year1": req.body.arithmos_klinwn_ana_1000_katoikous_year1 }, { "arithmos_klinwn_ana_1000_katoikous_year2": req.body.arithmos_klinwn_ana_1000_katoikous_year2 }, { "arithmos_klinwn_ana_1000_katoikous_year3": req.body.arithmos_klinwn_ana_1000_katoikous_year3 }, { "arithmos_klinwn_ana_1000_katoikous_year4": req.body.arithmos_klinwn_ana_1000_katoikous_year4 }, { "arithmos_klinwn_ana_1000_katoikous_year5": req.body.arithmos_klinwn_ana_1000_katoikous_year5 }, { "arithmos_klinwn_ana_1000_katoikous_prosfata_stoixeia": req.body.arithmos_klinwn_ana_1000_katoikous_prosfata_stoixeia }, { "arithmos_klinwn_ana_1000_katoikous_epidiwkomenos_stoxos": req.body.arithmos_klinwn_ana_1000_katoikous_epidiwkomenos_stoxos }])
                let diarkeia_epeigousas_nosileias = JSON.stringify([{ "diarkeia_epeigousas_nosileias_year1": req.body.diarkeia_epeigousas_nosileias_year1 }, { "diarkeia_epeigousas_nosileias_year2": req.body.diarkeia_epeigousas_nosileias_year2 }, { "diarkeia_epeigousas_nosileias_year3": req.body.diarkeia_epeigousas_nosileias_year3 }, { "diarkeia_epeigousas_nosileias_year4": req.body.diarkeia_epeigousas_nosileias_year4 }, { "diarkeia_epeigousas_nosileias_year5": req.body.diarkeia_epeigousas_nosileias_year5 }, { "diarkeia_epeigousas_nosileias_prosfata_stoixeia": req.body.diarkeia_epeigousas_nosileias_prosfata_stoixeia }, { "diarkeia_epeigousas_nosileias_epidiwkomenos_stoxos": req.body.diarkeia_epeigousas_nosileias_epidiwkomenos_stoxos }])
                let eidikes_nosileutikes_ypiresies = JSON.stringify([{ "eidikes_nosileutikes_ypiresies_year1": req.body.eidikes_nosileutikes_ypiresies_year1 }, { "eidikes_nosileutikes_ypiresies_year2": req.body.eidikes_nosileutikes_ypiresies_year2 }, { "eidikes_nosileutikes_ypiresies_year3": req.body.eidikes_nosileutikes_ypiresies_year3 }, { "eidikes_nosileutikes_ypiresies_year4": req.body.eidikes_nosileutikes_ypiresies_year4 }, { "eidikes_nosileutikes_ypiresies_year5": req.body.eidikes_nosileutikes_ypiresies_year5 }, { "eidikes_nosileutikes_ypiresies_prosfata_stoixeia": req.body.eidikes_nosileutikes_ypiresies_prosfata_stoixeia }, { "eidikes_nosileutikes_ypiresies_epidiwkomenos_stoxos": req.body.eidikes_nosileutikes_ypiresies_epidiwkomenos_stoxos }])
                let anamoni_asthenwn = JSON.stringify([{ "anamoni_asthenwn_year1": req.body.anamoni_asthenwn_year1 }, { "anamoni_asthenwn_year2": req.body.anamoni_asthenwn_year2 }, { "anamoni_asthenwn_year3": req.body.anamoni_asthenwn_year3 }, { "anamoni_asthenwn_year4": req.body.anamoni_asthenwn_year4 }, { "anamoni_asthenwn_year5": req.body.anamoni_asthenwn_year5 }, { "anamoni_asthenwn_prosfata_stoixeia": req.body.anamoni_asthenwn_prosfata_stoixeia }, { "anamoni_asthenwn_epidiwkomenos_stoxos": req.body.anamoni_asthenwn_epidiwkomenos_stoxos }])
                let arithmos_nosileiwn_ana_1000_katoikous = JSON.stringify([{ "arithmos_nosileiwn_ana_1000_katoikous_year1": req.body.arithmos_nosileiwn_ana_1000_katoikous_year1 }, { "arithmos_nosileiwn_ana_1000_katoikous_year2": req.body.arithmos_nosileiwn_ana_1000_katoikous_year2 }, { "arithmos_nosileiwn_ana_1000_katoikous_year3": req.body.arithmos_nosileiwn_ana_1000_katoikous_year3 }, { "arithmos_nosileiwn_ana_1000_katoikous_year4": req.body.arithmos_nosileiwn_ana_1000_katoikous_year4 }, { "arithmos_nosileiwn_ana_1000_katoikous_year5": req.body.arithmos_nosileiwn_ana_1000_katoikous_year5 }, { "arithmos_nosileiwn_ana_1000_katoikous_prosfata_stoixeia": req.body.arithmos_nosileiwn_ana_1000_katoikous_prosfata_stoixeia }, { "arithmos_nosileiwn_ana_1000_katoikous_epidiwkomenos_stoxos": req.body.arithmos_nosileiwn_ana_1000_katoikous_epidiwkomenos_stoxos }])
                let arithmos_klinwn_ana_ypiresia = JSON.stringify([{ "arithmos_klinwn_ana_ypiresia_year1": req.body.arithmos_klinwn_ana_ypiresia_year1 }, { "arithmos_klinwn_ana_ypiresia_year2": req.body.arithmos_klinwn_ana_ypiresia_year2 }, { "arithmos_klinwn_ana_ypiresia_year3": req.body.arithmos_klinwn_ana_ypiresia_year3 }, { "arithmos_klinwn_ana_ypiresia_year4": req.body.arithmos_klinwn_ana_ypiresia_year4 }, { "arithmos_klinwn_ana_ypiresia_year5": req.body.arithmos_klinwn_ana_ypiresia_year5 }, { "arithmos_klinwn_ana_ypiresia_prosfata_stoixeia": req.body.arithmos_klinwn_ana_ypiresia_prosfata_stoixeia }, { "arithmos_klinwn_ana_ypiresia_epidiwkomenos_stoxos": req.body.arithmos_klinwn_ana_ypiresia_epidiwkomenos_stoxos }])

                //isotita_fylwn_table
                let apasxolisi_fylwn_synolika = JSON.stringify([{ "apasxolisi_fylwn_synolika_year1": req.body.apasxolisi_fylwn_synolika_year1 }, { "apasxolisi_fylwn_synolika_year2": req.body.apasxolisi_fylwn_synolika_year2 }, { "apasxolisi_fylwn_synolika_year3": req.body.apasxolisi_fylwn_synolika_year3 }, { "apasxolisi_fylwn_synolika_year4": req.body.apasxolisi_fylwn_synolika_year4 }, { "apasxolisi_fylwn_synolika_year5": req.body.apasxolisi_fylwn_synolika_year5 }, { "apasxolisi_fylwn_synolika_prosfata_stoixeia": req.body.apasxolisi_fylwn_synolika_prosfata_stoixeia }, { "apasxolisi_fylwn_synolika_epidiwkomenos_stoxos": req.body.apasxolisi_fylwn_synolika_epidiwkomenos_stoxos }])
                let apasxolisi_fylwn_perifereia = JSON.stringify([{ "apasxolisi_fylwn_perifereia_year1": req.body.apasxolisi_fylwn_perifereia_year1 }, { "apasxolisi_fylwn_perifereia_year2": req.body.apasxolisi_fylwn_perifereia_year2 }, { "apasxolisi_fylwn_perifereia_year3": req.body.apasxolisi_fylwn_perifereia_year3 }, { "apasxolisi_fylwn_perifereia_year4": req.body.apasxolisi_fylwn_perifereia_year4 }, { "apasxolisi_fylwn_perifereia_year5": req.body.apasxolisi_fylwn_perifereia_year5 }, { "apasxolisi_fylwn_perifereia_prosfata_stoixeia": req.body.apasxolisi_fylwn_perifereia_prosfata_stoixeia }, { "apasxolisi_fylwn_perifereia_epidiwkomenos_stoxos": req.body.apasxolisi_fylwn_perifereia_epidiwkomenos_stoxos }])
                let apasxolisi_fylwn_oikonomia = JSON.stringify([{ "apasxolisi_fylwn_oikonomia_year1": req.body.apasxolisi_fylwn_oikonomia_year1 }, { "apasxolisi_fylwn_oikonomia_year2": req.body.apasxolisi_fylwn_oikonomia_year2 }, { "apasxolisi_fylwn_oikonomia_year3": req.body.apasxolisi_fylwn_oikonomia_year3 }, { "apasxolisi_fylwn_oikonomia_year4": req.body.apasxolisi_fylwn_oikonomia_year4 }, { "apasxolisi_fylwn_oikonomia_year5": req.body.apasxolisi_fylwn_oikonomia_year5 }, { "apasxolisi_fylwn_oikonomia_prosfata_stoixeia": req.body.apasxolisi_fylwn_oikonomia_prosfata_stoixeia }, { "apasxolisi_fylwn_oikonomia_epidiwkomenos_stoxos": req.body.apasxolisi_fylwn_oikonomia_epidiwkomenos_stoxos }])
                let apasxolisi_fylwn_ilikia = JSON.stringify([{ "apasxolisi_fylwn_ilikia_year1": req.body.apasxolisi_fylwn_ilikia_year1 }, { "apasxolisi_fylwn_ilikia_year2": req.body.apasxolisi_fylwn_ilikia_year2 }, { "apasxolisi_fylwn_ilikia_year3": req.body.apasxolisi_fylwn_ilikia_year3 }, { "apasxolisi_fylwn_ilikia_year4": req.body.apasxolisi_fylwn_ilikia_year4 }, { "apasxolisi_fylwn_ilikia_year5": req.body.apasxolisi_fylwn_ilikia_year5 }, { "apasxolisi_fylwn_ilikia_prosfata_stoixeia": req.body.apasxolisi_fylwn_ilikia_prosfata_stoixeia }, { "apasxolisi_fylwn_ilikia_epidiwkomenos_stoxos": req.body.apasxolisi_fylwn_ilikia_epidiwkomenos_stoxos }])
                let anergia_fylwn_synolika = JSON.stringify([{ "anergia_fylwn_synolika_year1": req.body.anergia_fylwn_synolika_year1 }, { "anergia_fylwn_synolika_year2": req.body.anergia_fylwn_synolika_year2 }, { "anergia_fylwn_synolika_year3": req.body.anergia_fylwn_synolika_year3 }, { "anergia_fylwn_synolika_year4": req.body.anergia_fylwn_synolika_year4 }, { "anergia_fylwn_synolika_year5": req.body.anergia_fylwn_synolika_year5 }, { "anergia_fylwn_synolika_prosfata_stoixeia": req.body.anergia_fylwn_synolika_prosfata_stoixeia }, { "anergia_fylwn_synolika_epidiwkomenos_stoxos": req.body.anergia_fylwn_synolika_epidiwkomenos_stoxos }])
                let anergia_fylwn_perifereia = JSON.stringify([{ "anergia_fylwn_perifereia_year1": req.body.anergia_fylwn_perifereia_year1 }, { "anergia_fylwn_perifereia_year2": req.body.anergia_fylwn_perifereia_year2 }, { "anergia_fylwn_perifereia_year3": req.body.anergia_fylwn_perifereia_year3 }, { "anergia_fylwn_perifereia_year4": req.body.anergia_fylwn_perifereia_year4 }, { "anergia_fylwn_perifereia_year5": req.body.anergia_fylwn_perifereia_year5 }, { "anergia_fylwn_perifereia_prosfata_stoixeia": req.body.anergia_fylwn_perifereia_prosfata_stoixeia }, { "anergia_fylwn_perifereia_epidiwkomenos_stoxos": req.body.anergia_fylwn_perifereia_epidiwkomenos_stoxos }])
                let anergia_fylwn_oikonomia = JSON.stringify([{ "anergia_fylwn_oikonomia_year1": req.body.anergia_fylwn_oikonomia_year1 }, { "anergia_fylwn_oikonomia_year2": req.body.anergia_fylwn_oikonomia_year2 }, { "anergia_fylwn_oikonomia_year3": req.body.anergia_fylwn_oikonomia_year3 }, { "anergia_fylwn_oikonomia_year4": req.body.anergia_fylwn_oikonomia_year4 }, { "anergia_fylwn_oikonomia_year5": req.body.anergia_fylwn_oikonomia_year5 }, { "anergia_fylwn_oikonomia_prosfata_stoixeia": req.body.anergia_fylwn_oikonomia_prosfata_stoixeia }, { "anergia_fylwn_oikonomia_epidiwkomenos_stoxos": req.body.anergia_fylwn_oikonomia_epidiwkomenos_stoxos }])
                let anergia_fylwn_ilikia = JSON.stringify([{ "anergia_fylwn_ilikia_year1": req.body.anergia_fylwn_ilikia_year1 }, { "anergia_fylwn_ilikia_year2": req.body.anergia_fylwn_ilikia_year2 }, { "anergia_fylwn_ilikia_year3": req.body.anergia_fylwn_ilikia_year3 }, { "anergia_fylwn_ilikia_year4": req.body.anergia_fylwn_ilikia_year4 }, { "anergia_fylwn_ilikia_year5": req.body.anergia_fylwn_ilikia_year5 }, { "anergia_fylwn_ilikia_prosfata_stoixeia": req.body.anergia_fylwn_ilikia_prosfata_stoixeia }, { "anergia_fylwn_ilikia_epidiwkomenos_stoxos": req.body.anergia_fylwn_ilikia_epidiwkomenos_stoxos }])
                let autoapasxoloymenoi_fylo = JSON.stringify([{ "autoapasxoloymenoi_fylo_year1": req.body.autoapasxoloymenoi_fylo_year1 }, { "autoapasxoloymenoi_fylo_year2": req.body.autoapasxoloymenoi_fylo_year2 }, { "autoapasxoloymenoi_fylo_year3": req.body.autoapasxoloymenoi_fylo_year3 }, { "autoapasxoloymenoi_fylo_year4": req.body.autoapasxoloymenoi_fylo_year4 }, { "autoapasxoloymenoi_fylo_year5": req.body.autoapasxoloymenoi_fylo_year5 }, { "autoapasxoloymenoi_fylo_prosfata_stoixeia": req.body.autoapasxoloymenoi_fylo_prosfata_stoixeia }, { "autoapasxoloymenoi_fylo_epidiwkomenos_stoxos": req.body.autoapasxoloymenoi_fylo_epidiwkomenos_stoxos }])
                let ergodotes_fylo = JSON.stringify([{ "ergodotes_fylo_year1": req.body.ergodotes_fylo_year1 }, { "ergodotes_fylo_year2": req.body.ergodotes_fylo_year2 }, { "ergodotes_fylo_year3": req.body.ergodotes_fylo_year3 }, { "ergodotes_fylo_year4": req.body.ergodotes_fylo_year4 }, { "ergodotes_fylo_year5": req.body.ergodotes_fylo_year5 }, { "ergodotes_fylo_prosfata_stoixeia": req.body.ergodotes_fylo_prosfata_stoixeia }, { "ergodotes_fylo_epidiwkomenos_stoxos": req.body.ergodotes_fylo_epidiwkomenos_stoxos }])
                let ds_fylo = JSON.stringify([{ "ds_fylo_year1": req.body.ds_fylo_year1 }, { "ds_fylo_year2": req.body.ds_fylo_year2 }, { "ds_fylo_year3": req.body.ds_fylo_year3 }, { "ds_fylo_year4": req.body.ds_fylo_year4 }, { "ds_fylo_year5": req.body.ds_fylo_year5 }, { "ds_fylo_prosfata_stoixeia": req.body.ds_fylo_prosfata_stoixeia }, { "ds_fylo_epidiwkomenos_stoxos": req.body.ds_fylo_epidiwkomenos_stoxos }])
                let symvoulia_fylo = JSON.stringify([{ "symvoulia_fylo_year1": req.body.symvoulia_fylo_year1 }, { "symvoulia_fylo_year2": req.body.symvoulia_fylo_year2 }, { "symvoulia_fylo_year3": req.body.symvoulia_fylo_year3 }, { "symvoulia_fylo_year4": req.body.symvoulia_fylo_year4 }, { "symvoulia_fylo_year5": req.body.symvoulia_fylo_year5 }, { "symvoulia_fylo_prosfata_stoixeia": req.body.symvoulia_fylo_prosfata_stoixeia }, { "symvoulia_fylo_epidiwkomenos_stoxos": req.body.symvoulia_fylo_epidiwkomenos_stoxos }])

                //metanasteytiki_prosfygiki_politiki
                let aitimata_asyloy = JSON.stringify([{ "aitimata_asyloy_year1": req.body.aitimata_asyloy_year1 }, { "aitimata_asyloy_year2": req.body.aitimata_asyloy_year2 }, { "aitimata_asyloy_year3": req.body.aitimata_asyloy_year3 }, { "aitimata_asyloy_year4": req.body.aitimata_asyloy_year4 }, { "aitimata_asyloy_year5": req.body.aitimata_asyloy_year5 }, { "aitimata_asyloy_prosfata_stoixeia": req.body.aitimata_asyloy_prosfata_stoixeia }, { "aitimata_asyloy_epidiwkomenos_stoxos": req.body.aitimata_asyloy_epidiwkomenos_stoxos }])
                let metanasteytikes_roes = JSON.stringify([{ "metanasteytikes_roes_year1": req.body.metanasteytikes_roes_year1 }, { "metanasteytikes_roes_year2": req.body.metanasteytikes_roes_year2 }, { "metanasteytikes_roes_year3": req.body.metanasteytikes_roes_year3 }, { "metanasteytikes_roes_year4": req.body.metanasteytikes_roes_year4 }, { "metanasteytikes_roes_year5": req.body.metanasteytikes_roes_year5 }, { "metanasteytikes_roes_prosfata_stoixeia": req.body.metanasteytikes_roes_prosfata_stoixeia }, { "metanasteytikes_roes_epidiwkomenos_stoxos": req.body.metanasteytikes_roes_epidiwkomenos_stoxos }])
                let apelaseis = JSON.stringify([{ "apelaseis_year1": req.body.apelaseis_year1 }, { "apelaseis_year2": req.body.apelaseis_year2 }, { "apelaseis_year3": req.body.apelaseis_year3 }, { "apelaseis_year4": req.body.apelaseis_year4 }, { "apelaseis_year5": req.body.apelaseis_year5 }, { "apelaseis_prosfata_stoixeia": req.body.apelaseis_prosfata_stoixeia }, { "apelaseis_epidiwkomenos_stoxos": req.body.apelaseis_epidiwkomenos_stoxos }])
                let monades_filoksenias = JSON.stringify([{ "monades_filoksenias_year1": req.body.monades_filoksenias_year1 }, { "monades_filoksenias_year2": req.body.monades_filoksenias_year2 }, { "monades_filoksenias_year3": req.body.monades_filoksenias_year3 }, { "monades_filoksenias_year4": req.body.monades_filoksenias_year4 }, { "monades_filoksenias_year5": req.body.monades_filoksenias_year5 }, { "monades_filoksenias_prosfata_stoixeia": req.body.monades_filoksenias_prosfata_stoixeia }, { "monades_filoksenias_epidiwkomenos_stoxos": req.body.monades_filoksenias_epidiwkomenos_stoxos }])
                let filoksenia_paravatikotita = JSON.stringify([{ "filoksenia_paravatikotita_year1": req.body.filoksenia_paravatikotita_year1 }, { "filoksenia_paravatikotita_year2": req.body.filoksenia_paravatikotita_year2 }, { "filoksenia_paravatikotita_year3": req.body.filoksenia_paravatikotita_year3 }, { "filoksenia_paravatikotita_year4": req.body.filoksenia_paravatikotita_year4 }, { "filoksenia_paravatikotita_year5": req.body.filoksenia_paravatikotita_year5 }, { "filoksenia_paravatikotita_prosfata_stoixeia": req.body.filoksenia_paravatikotita_prosfata_stoixeia }, { "filoksenia_paravatikotita_epidiwkomenos_stoxos": req.body.filoksenia_paravatikotita_epidiwkomenos_stoxos }])

                //dimosia_dioikisi_table
                let dimosioi_ypalliloi = JSON.stringify([{ "dimosioi_ypalliloi_year1": req.body.dimosioi_ypalliloi_year1 }, { "dimosioi_ypalliloi_year2": req.body.dimosioi_ypalliloi_year2 }, { "dimosioi_ypalliloi_year3": req.body.dimosioi_ypalliloi_year3 }, { "dimosioi_ypalliloi_year4": req.body.dimosioi_ypalliloi_year4 }, { "dimosioi_ypalliloi_year5": req.body.dimosioi_ypalliloi_year5 }, { "dimosioi_ypalliloi_prosfata_stoixeia": req.body.dimosioi_ypalliloi_prosfata_stoixeia }, { "dimosioi_ypalliloi_epidiwkomenos_stoxos": req.body.dimosioi_ypalliloi_epidiwkomenos_stoxos }])
                let monimoi_metaklitoi = JSON.stringify([{ "monimoi_metaklitoi_year1": req.body.monimoi_metaklitoi_year1 }, { "monimoi_metaklitoi_year2": req.body.monimoi_metaklitoi_year2 }, { "monimoi_metaklitoi_year3": req.body.monimoi_metaklitoi_year3 }, { "monimoi_metaklitoi_year4": req.body.monimoi_metaklitoi_year4 }, { "monimoi_metaklitoi_year5": req.body.monimoi_metaklitoi_year5 }, { "monimoi_metaklitoi_prosfata_stoixeia": req.body.monimoi_metaklitoi_prosfata_stoixeia }, { "monimoi_metaklitoi_epidiwkomenos_stoxos": req.body.monimoi_metaklitoi_epidiwkomenos_stoxos }])
                let analogia_ypallilwn = JSON.stringify([{ "analogia_ypallilwn_year1": req.body.analogia_ypallilwn_year1 }, { "analogia_ypallilwn_year2": req.body.analogia_ypallilwn_year2 }, { "analogia_ypallilwn_year3": req.body.analogia_ypallilwn_year3 }, { "analogia_ypallilwn_year4": req.body.analogia_ypallilwn_year4 }, { "analogia_ypallilwn_year5": req.body.analogia_ypallilwn_year5 }, { "analogia_ypallilwn_prosfata_stoixeia": req.body.analogia_ypallilwn_prosfata_stoixeia }, { "analogia_ypallilwn_epidiwkomenos_stoxos": req.body.analogia_ypallilwn_epidiwkomenos_stoxos }])
                let prosvasi_internet = JSON.stringify([{ "prosvasi_internet_year1": req.body.prosvasi_internet_year1 }, { "prosvasi_internet_year2": req.body.prosvasi_internet_year2 }, { "prosvasi_internet_year3": req.body.prosvasi_internet_year3 }, { "prosvasi_internet_year4": req.body.prosvasi_internet_year4 }, { "prosvasi_internet_year5": req.body.prosvasi_internet_year5 }, { "prosvasi_internet_prosfata_stoixeia": req.body.prosvasi_internet_prosfata_stoixeia }, { "prosvasi_internet_epidiwkomenos_stoxos": req.body.prosvasi_internet_epidiwkomenos_stoxos }])
                let intranet = JSON.stringify([{ "intranet_year1": req.body.intranet_year1 }, { "intranet_year2": req.body.intranet_year2 }, { "intranet_year3": req.body.intranet_year3 }, { "intranet_year4": req.body.intranet_year4 }, { "intranet_year5": req.body.intranet_year5 }, { "intranet_prosfata_stoixeia": req.body.intranet_prosfata_stoixeia }, { "intranet_epidiwkomenos_stoxos": req.body.intranet_epidiwkomenos_stoxos }])
                let analogia_ypologistwn = JSON.stringify([{ "analogia_ypologistwn_year1": req.body.analogia_ypologistwn_year1 }, { "analogia_ypologistwn_year2": req.body.analogia_ypologistwn_year2 }, { "analogia_ypologistwn_year3": req.body.analogia_ypologistwn_year3 }, { "analogia_ypologistwn_year4": req.body.analogia_ypologistwn_year4 }, { "analogia_ypologistwn_year5": req.body.analogia_ypologistwn_year5 }, { "analogia_ypologistwn_prosfata_stoixeia": req.body.analogia_ypologistwn_prosfata_stoixeia }, { "analogia_ypologistwn_epidiwkomenos_stoxos": req.body.analogia_ypologistwn_epidiwkomenos_stoxos }])
                let istoselides = JSON.stringify([{ "istoselides_year1": req.body.istoselides_year1 }, { "istoselides_year2": req.body.istoselides_year2 }, { "istoselides_year3": req.body.istoselides_year3 }, { "istoselides_year4": req.body.istoselides_year4 }, { "istoselides_year5": req.body.istoselides_year5 }, { "istoselides_prosfata_stoixeia": req.body.istoselides_prosfata_stoixeia }, { "istoselides_epidiwkomenos_stoxos": req.body.istoselides_epidiwkomenos_stoxos }])
                let kentra_pliroforisis = JSON.stringify([{ "kentra_pliroforisis_year1": req.body.kentra_pliroforisis_year1 }, { "kentra_pliroforisis_year2": req.body.kentra_pliroforisis_year2 }, { "kentra_pliroforisis_year3": req.body.kentra_pliroforisis_year3 }, { "kentra_pliroforisis_year4": req.body.kentra_pliroforisis_year4 }, { "kentra_pliroforisis_year5": req.body.kentra_pliroforisis_year5 }, { "kentra_pliroforisis_prosfata_stoixeia": req.body.kentra_pliroforisis_prosfata_stoixeia }, { "kentra_pliroforisis_epidiwkomenos_stoxos": req.body.kentra_pliroforisis_epidiwkomenos_stoxos }])
                let eksypiretisi_ypiresies = JSON.stringify([{ "eksypiretisi_ypiresies_year1": req.body.eksypiretisi_ypiresies_year1 }, { "eksypiretisi_ypiresies_year2": req.body.eksypiretisi_ypiresies_year2 }, { "eksypiretisi_ypiresies_year3": req.body.eksypiretisi_ypiresies_year3 }, { "eksypiretisi_ypiresies_year4": req.body.eksypiretisi_ypiresies_year4 }, { "eksypiretisi_ypiresies_year5": req.body.eksypiretisi_ypiresies_year5 }, { "eksypiretisi_ypiresies_prosfata_stoixeia": req.body.eksypiretisi_ypiresies_prosfata_stoixeia }, { "eksypiretisi_ypiresies_epidiwkomenos_stoxos": req.body.eksypiretisi_ypiresies_epidiwkomenos_stoxos }])
                let kostos_proswpikou = JSON.stringify([{ "kostos_proswpikou_year1": req.body.kostos_proswpikou_year1 }, { "kostos_proswpikou_year2": req.body.kostos_proswpikou_year2 }, { "kostos_proswpikou_year3": req.body.kostos_proswpikou_year3 }, { "kostos_proswpikou_year4": req.body.kostos_proswpikou_year4 }, { "kostos_proswpikou_year5": req.body.kostos_proswpikou_year5 }, { "kostos_proswpikou_prosfata_stoixeia": req.body.kostos_proswpikou_prosfata_stoixeia }, { "kostos_proswpikou_epidiwkomenos_stoxos": req.body.kostos_proswpikou_epidiwkomenos_stoxos }])
                let kostos_diaxirisis_proswpikou = JSON.stringify([{ "kostos_diaxirisis_proswpikou": req.body.kostos_diaxirisis_proswpikou }, { "kostos_diaxirisis_proswpikou_year2": req.body.kostos_diaxirisis_proswpikou_year2 }, { "kostos_diaxirisis_proswpikou_year3": req.body.kostos_diaxirisis_proswpikou_year3 }, { "kostos_diaxirisis_proswpikou_year4": req.body.kostos_diaxirisis_proswpikou_year4 }, { "kostos_diaxirisis_proswpikou_year5": req.body.kostos_diaxirisis_proswpikou_year5 }, { "kostos_diaxirisis_proswpikou_prosfata_stoixeia": req.body.kostos_diaxirisis_proswpikou_prosfata_stoixeia }, { "kostos_diaxirisis_proswpikou_epidiwkomenos_stoxos": req.body.kostos_diaxirisis_proswpikou_epidiwkomenos_stoxos }])

                //dimosia_asfaleia_table
                let drastes_adikimata = JSON.stringify([{ "drastes_adikimata_year1": req.body.drastes_adikimata_year1 }, { "drastes_adikimata_year2": req.body.drastes_adikimata_year2 }, { "drastes_adikimata_year3": req.body.drastes_adikimata_year3 }, { "drastes_adikimata_year4": req.body.drastes_adikimata_year4 }, { "drastes_adikimata_year5": req.body.drastes_adikimata_year5 }, { "drastes_adikimata_prosfata_stoixeia": req.body.drastes_adikimata_prosfata_stoixeia }, { "drastes_adikimata_epidiwkomenos_stoxos": req.body.drastes_adikimata_epidiwkomenos_stoxos }])
                let adikimata_poinikoy_kwdika = JSON.stringify([{ "adikimata_poinikoy_kwdika_year1": req.body.adikimata_poinikoy_kwdika_year1 }, { "adikimata_poinikoy_kwdika_year2": req.body.adikimata_poinikoy_kwdika_year2 }, { "adikimata_poinikoy_kwdika_year3": req.body.adikimata_poinikoy_kwdika_year3 }, { "adikimata_poinikoy_kwdika_year4": req.body.adikimata_poinikoy_kwdika_year4 }, { "adikimata_poinikoy_kwdika_year5": req.body.adikimata_poinikoy_kwdika_year5 }, { "adikimata_poinikoy_kwdika_prosfata_stoixeia": req.body.adikimata_poinikoy_kwdika_prosfata_stoixeia }, { "adikimata_poinikoy_kwdika_epidiwkomenos_stoxos": req.body.adikimata_poinikoy_kwdika_epidiwkomenos_stoxos }])
                let diapraxthenta_adikimata = JSON.stringify([{ "diapraxthenta_adikimata_year1": req.body.diapraxthenta_adikimata_year1 }, { "diapraxthenta_adikimata_year2": req.body.diapraxthenta_adikimata_year2 }, { "diapraxthenta_adikimata_year3": req.body.diapraxthenta_adikimata_year3 }, { "diapraxthenta_adikimata_year4": req.body.diapraxthenta_adikimata_year4 }, { "diapraxthenta_adikimata_year5": req.body.diapraxthenta_adikimata_year5 }, { "diapraxthenta_adikimata_prosfata_stoixeia": req.body.diapraxthenta_adikimata_prosfata_stoixeia }, { "diapraxthenta_adikimata_epidiwkomenos_stoxos": req.body.diapraxthenta_adikimata_epidiwkomenos_stoxos }])
                let etisia_statistika = JSON.stringify([{ "etisia_statistika_year1": req.body.etisia_statistika_year1 }, { "etisia_statistika_year2": req.body.etisia_statistika_year2 }, { "etisia_statistika_year3": req.body.etisia_statistika_year3 }, { "etisia_statistika_year4": req.body.etisia_statistika_year4 }, { "etisia_statistika_year5": req.body.etisia_statistika_year5 }, { "etisia_statistika_prosfata_stoixeia": req.body.etisia_statistika_prosfata_stoixeia }, { "etisia_statistika_epidiwkomenos_stoxos": req.body.etisia_statistika_epidiwkomenos_stoxos }])
                let adikimata_paranomi_eisodos = JSON.stringify([{ "adikimata_paranomi_eisodos_year1": req.body.adikimata_paranomi_eisodos_year1 }, { "adikimata_paranomi_eisodos_year2": req.body.adikimata_paranomi_eisodos_year2 }, { "adikimata_paranomi_eisodos_year3": req.body.adikimata_paranomi_eisodos_year3 }, { "adikimata_paranomi_eisodos_year4": req.body.adikimata_paranomi_eisodos_year4 }, { "adikimata_paranomi_eisodos_year5": req.body.adikimata_paranomi_eisodos_year5 }, { "adikimata_paranomi_eisodos_prosfata_stoixeia": req.body.adikimata_paranomi_eisodos_prosfata_stoixeia }, { "adikimata_paranomi_eisodos_epidiwkomenos_stoxos": req.body.adikimata_paranomi_eisodos_epidiwkomenos_stoxos }])
                let syxnotita_egklimatwn = JSON.stringify([{ "syxnotita_egklimatwn_year1": req.body.syxnotita_egklimatwn_year1 }, { "syxnotita_egklimatwn_year2": req.body.syxnotita_egklimatwn_year2 }, { "syxnotita_egklimatwn_year3": req.body.syxnotita_egklimatwn_year3 }, { "syxnotita_egklimatwn_year4": req.body.syxnotita_egklimatwn_year4 }, { "syxnotita_egklimatwn_year5": req.body.syxnotita_egklimatwn_year5 }, { "syxnotita_egklimatwn_prosfata_stoixeia": req.body.syxnotita_egklimatwn_prosfata_stoixeia }, { "syxnotita_egklimatwn_epidiwkomenos_stoxos": req.body.syxnotita_egklimatwn_epidiwkomenos_stoxos }])
                let eksixniasmena_egklimata = JSON.stringify([{ "eksixniasmena_egklimata_year1": req.body.eksixniasmena_egklimata_year1 }, { "eksixniasmena_egklimata_year2": req.body.eksixniasmena_egklimata_year2 }, { "eksixniasmena_egklimata_year3": req.body.eksixniasmena_egklimata_year3 }, { "eksixniasmena_egklimata_year4": req.body.eksixniasmena_egklimata_year4 }, { "eksixniasmena_egklimata_year5": req.body.eksixniasmena_egklimata_year5 }, { "eksixniasmena_egklimata_prosfata_stoixeia": req.body.eksixniasmena_egklimata_prosfata_stoixeia }, { "eksixniasmena_egklimata_epidiwkomenos_stoxos": req.body.eksixniasmena_egklimata_epidiwkomenos_stoxos }])
                let ergazomenoi_asfaleia = JSON.stringify([{ "ergazomenoi_asfaleia_year1": req.body.ergazomenoi_asfaleia_year1 }, { "ergazomenoi_asfaleia_year2": req.body.ergazomenoi_asfaleia_year2 }, { "ergazomenoi_asfaleia_year3": req.body.ergazomenoi_asfaleia_year3 }, { "ergazomenoi_asfaleia_year4": req.body.ergazomenoi_asfaleia_year4 }, { "ergazomenoi_asfaleia_year5": req.body.ergazomenoi_asfaleia_year5 }, { "ergazomenoi_asfaleia_prosfata_stoixeia": req.body.ergazomenoi_asfaleia_prosfata_stoixeia }, { "ergazomenoi_asfaleia_epidiwkomenos_stoxos": req.body.ergazomenoi_asfaleia_epidiwkomenos_stoxos }])
                let katoikoi_ana_astynomiko = JSON.stringify([{ "katoikoi_ana_astynomiko_year1": req.body.katoikoi_ana_astynomiko_year1 }, { "katoikoi_ana_astynomiko_year2": req.body.katoikoi_ana_astynomiko_year2 }, { "katoikoi_ana_astynomiko_year3": req.body.katoikoi_ana_astynomiko_year3 }, { "katoikoi_ana_astynomiko_year4": req.body.katoikoi_ana_astynomiko_year4 }, { "katoikoi_ana_astynomiko_year5": req.body.katoikoi_ana_astynomiko_year5 }, { "katoikoi_ana_astynomiko_prosfata_stoixeia": req.body.katoikoi_ana_astynomiko_prosfata_stoixeia }, { "katoikoi_ana_astynomiko_epidiwkomenos_stoxos": req.body.katoikoi_ana_astynomiko_epidiwkomenos_stoxos }])
                let analogia_astynomikwn_ana_1000_katoikoys = JSON.stringify([{ "analogia_astynomikwn_ana_1000_katoikoys_year1": req.body.analogia_astynomikwn_ana_1000_katoikoys_year1 }, { "analogia_astynomikwn_ana_1000_katoikoys_year2": req.body.analogia_astynomikwn_ana_1000_katoikoys_year2 }, { "analogia_astynomikwn_ana_1000_katoikoys_year3": req.body.analogia_astynomikwn_ana_1000_katoikoys_year3 }, { "analogia_astynomikwn_ana_1000_katoikoys_year4": req.body.analogia_astynomikwn_ana_1000_katoikoys_year4 }, { "analogia_astynomikwn_ana_1000_katoikoys_year5": req.body.analogia_astynomikwn_ana_1000_katoikoys_year5 }, { "analogia_astynomikwn_ana_1000_katoikoys_prosfata_stoixeia": req.body.analogia_astynomikwn_ana_1000_katoikoys_prosfata_stoixeia }, { "analogia_astynomikwn_ana_1000_katoikoys_epidiwkomenos_stoxos": req.body.analogia_astynomikwn_ana_1000_katoikoys_epidiwkomenos_stoxos }])
                let dapanes_astynomias = JSON.stringify([{ "dapanes_astynomias_year1": req.body.dapanes_astynomias_year1 }, { "dapanes_astynomias_year2": req.body.dapanes_astynomias_year2 }, { "dapanes_astynomias_year": req.body.dapanes_astynomias_year3 }, { "dapanes_astynomias_year4": req.body.dapanes_astynomias_year4 }, { "dapanes_astynomias_year5": req.body.dapanes_astynomias_year5 }, { "dapanes_astynomias_prosfata_stoixeia": req.body.dapanes_astynomias_prosfata_stoixeia }, { "dapanes_astynomias_epidiwkomenos_stoxos": req.body.dapanes_astynomias_epidiwkomenos_stoxos }])
                let poroi_antimetwpisis = JSON.stringify([{ "poroi_antimetwpisis_year1": req.body.poroi_antimetwpisis_year1 }, { "poroi_antimetwpisis_year2": req.body.poroi_antimetwpisis_year2 }, { "poroi_antimetwpisis_year3": req.body.poroi_antimetwpisis_year3 }, { "poroi_antimetwpisis_year4": req.body.poroi_antimetwpisis_year4 }, { "poroi_antimetwpisis_year5": req.body.poroi_antimetwpisis_year5 }, { "poroi_antimetwpisis_prosfata_stoixeia": req.body.poroi_antimetwpisis_prosfata_stoixeia }, { "poroi_antimetwpisis_epidiwkomenos_stoxos": req.body.poroi_antimetwpisis_epidiwkomenos_stoxos }])

                //dikaiosini_table
                let arithmos_diaforwn = JSON.stringify([{ "arithmos_diaforwn_year1": req.body.arithmos_diaforwn_year1 }, { "arithmos_diaforwn_year2": req.body.arithmos_diaforwn_year2 }, { "arithmos_diaforwn_year3": req.body.arithmos_diaforwn_year3 }, { "arithmos_diaforwn_year4": req.body.arithmos_diaforwn_year4 }, { "arithmos_diaforwn_year5": req.body.arithmos_diaforwn_year5 }, { "arithmos_diaforwn_prosfata_stoixeia": req.body.arithmos_diaforwn_prosfata_stoixeia }, { "arithmos_diaforwn_epidiwkomenos_stoxos": req.body.arithmos_diaforwn_epidiwkomenos_stoxos }])
                let dioikitikes_periptwseis = JSON.stringify([{ "dioikitikes_periptwseis_year1": req.body.dioikitikes_periptwseis_year1 }, { "dioikitikes_periptwseis_year2": req.body.dioikitikes_periptwseis_year2 }, { "dioikitikes_periptwseis_year3": req.body.dioikitikes_periptwseis_year3 }, { "dioikitikes_periptwseis_year4": req.body.dioikitikes_periptwseis_year4 }, { "dioikitikes_periptwseis_year5": req.body.dioikitikes_periptwseis_year5 }, { "dioikitikes_periptwseis_prosfata_stoixeia": req.body.dioikitikes_periptwseis_prosfata_stoixeia }, { "dioikitikes_periptwseis_epidiwkomenos_stoxos": req.body.dioikitikes_periptwseis_epidiwkomenos_stoxos }])
                let xronos_epilysis_ypothesewn = JSON.stringify([{ "xronos_epilysis_ypothesewn_year1": req.body.xronos_epilysis_ypothesewn_year1 }, { "arithmos_diaforwn_year2": req.body.xronos_epilysis_ypothesewn_year2 }, { "xronos_epilysis_ypothesewn_year3": req.body.xronos_epilysis_ypothesewn_year3 }, { "xronos_epilysis_ypothesewn_year4": req.body.xronos_epilysis_ypothesewn_year4 }, { "xronos_epilysis_ypothesewn_year5": req.body.xronos_epilysis_ypothesewn_year5 }, { "xronos_epilysis_ypothesewn_prosfata_stoixeia": req.body.xronos_epilysis_ypothesewn_prosfata_stoixeia }, { "xronos_epilysis_ypothesewn_epidiwkomenos_stoxos": req.body.xronos_epilysis_ypothesewn_epidiwkomenos_stoxos }])
                let ekdosi_apofasewn = JSON.stringify([{ "ekdosi_apofasewn_year1": req.body.ekdosi_apofasewn_year1 }, { "ekdosi_apofasewn_year2": req.body.ekdosi_apofasewn_year2 }, { "ekdosi_apofasewn_year3": req.body.ekdosi_apofasewn_year3 }, { "ekdosi_apofasewn_year4": req.body.ekdosi_apofasewn_year4 }, { "ekdosi_apofasewn_year5": req.body.ekdosi_apofasewn_year5 }, { "ekdosi_apofasewn_prosfata_stoixeia": req.body.ekdosi_apofasewn_prosfata_stoixeia }, { "mo_ypotheswn_dikasti_prosfata_stoixeia": req.body.mo_ypotheswn_dikasti_prosfata_stoixeia }])
                let mo_ypotheswn_dikasti = JSON.stringify([{ "mo_ypotheswn_dikasti_year1": req.body.mo_ypotheswn_dikasti_year1 }, { "mo_ypotheswn_dikasti_year2": req.body.mo_ypotheswn_dikasti_year2 }, { "mo_ypotheswn_dikasti_year3": req.body.mo_ypotheswn_dikasti_year3 }, { "mo_ypotheswn_dikasti_year4": req.body.mo_ypotheswn_dikasti_year4 }, { "mo_ypotheswn_dikasti_year5": req.body.mo_ypotheswn_dikasti_year5 }, { "mo_ypotheswn_dikasti_prosfata_stoixeia": req.body.mo_ypotheswn_dikasti_prosfata_stoixeia }, { "mo_ypotheswn_dikasti_epidiwkomenos_stoxos": req.body.mo_ypotheswn_dikasti_epidiwkomenos_stoxos }])
                let akyrwsi_apofasewn = JSON.stringify([{ "akyrwsi_apofasewn_year1": req.body.akyrwsi_apofasewn_year1 }, { "akyrwsi_apofasewn_year2": req.body.akyrwsi_apofasewn_year2 }, { "akyrwsi_apofasewn_year3": req.body.akyrwsi_apofasewn_year3 }, { "akyrwsi_apofasewn_year4": req.body.akyrwsi_apofasewn_year4 }, { "akyrwsi_apofasewn_year5": req.body.akyrwsi_apofasewn_year5 }, { "akyrwsi_apofasewn_prosfata_stoixeia": req.body.akyrwsi_apofasewn_prosfata_stoixeia }, { "akyrwsi_apofasewn_epidiwkomenos_stoxos": req.body.akyrwsi_apofasewn_epidiwkomenos_stoxos }])
                let ekswdikastikos_symvivasmos = JSON.stringify([{ "ekswdikastikos_symvivasmos_year1": req.body.ekswdikastikos_symvivasmos_year1 }, { "ekswdikastikos_symvivasmos_year2": req.body.ekswdikastikos_symvivasmos_year2 }, { "ekswdikastikos_symvivasmos_year3": req.body.ekswdikastikos_symvivasmos_year3 }, { "ekswdikastikos_symvivasmos_year4": req.body.ekswdikastikos_symvivasmos_year4 }, { "ekswdikastikos_symvivasmos_year5": req.body.ekswdikastikos_symvivasmos_year5 }, { "ekswdikastikos_symvivasmos_prosfata_stoixeia": req.body.ekswdikastikos_symvivasmos_prosfata_stoixeia }, { "ekswdikastikos_symvivasmos_epidiwkomenos_stoxos": req.body.ekswdikastikos_symvivasmos_epidiwkomenos_stoxos }])
                let enallaktiki_epilysi_diaforwn = JSON.stringify([{ "enallaktiki_epilysi_diaforwn_year1": req.body.enallaktiki_epilysi_diaforwn_year1 }, { "enallaktiki_epilysi_diaforwn_year2": req.body.enallaktiki_epilysi_diaforwn_year2 }, { "enallaktiki_epilysi_diaforwn_year3": req.body.enallaktiki_epilysi_diaforwn_year3 }, { "enallaktiki_epilysi_diaforwn_year4": req.body.enallaktiki_epilysi_diaforwn_year4 }, { "enallaktiki_epilysi_diaforwn_year5": req.body.enallaktiki_epilysi_diaforwn_year5 }, { "enallaktiki_epilysi_diaforwn_prosfata_stoixeia": req.body.enallaktiki_epilysi_diaforwn_prosfata_stoixeia }, { "enallaktiki_epilysi_diaforwn_epidiwkomenos_stoxos": req.body.enallaktiki_epilysi_diaforwn_epidiwkomenos_stoxos }])
                let nomiki_prostasia = JSON.stringify([{ "nomiki_prostasia_year1": req.body.nomiki_prostasia_year1 }, { "nomiki_prostasia_year2": req.body.nomiki_prostasia_year2 }, { "nomiki_prostasia_year3": req.body.nomiki_prostasia_year3 }, { "nomiki_prostasia_year4": req.body.nomiki_prostasia_year4 }, { "nomiki_prostasia_year5": req.body.nomiki_prostasia_year5 }, { "nomiki_prostasia_prosfata_stoixeia": req.body.nomiki_prostasia_prosfata_stoixeia }, { "nomiki_prostasia_epidiwkomenos_stoxos": req.body.nomiki_prostasia_epidiwkomenos_stoxos }])
                let kostos_prosfygis = JSON.stringify([{ "kostos_prosfygis_year1": req.body.kostos_prosfygis_year1 }, { "kostos_prosfygis_year2": req.body.kostos_prosfygis_year2 }, { "kostos_prosfygis_year3": req.body.kostos_prosfygis_year3 }, { "kostos_prosfygis_year4": req.body.kostos_prosfygis_year4 }, { "kostos_prosfygis_year5": req.body.kostos_prosfygis_year5 }, { "kostos_prosfygis_prosfata_stoixeia": req.body.kostos_prosfygis_prosfata_stoixeia }, { "kostos_prosfygis_epidiwkomenos_stoxos": req.body.kostos_prosfygis_epidiwkomenos_stoxos }])
                let ilektroniki_ypovoli_dikografwn = JSON.stringify([{ "ilektroniki_ypovoli_dikografwn_year1": req.body.ilektroniki_ypovoli_dikografwn_year1 }, { "ilektroniki_ypovoli_dikografwn_year2": req.body.ilektroniki_ypovoli_dikografwn_year2 }, { "ilektroniki_ypovoli_dikografwn_year3": req.body.ilektroniki_ypovoli_dikografwn_year3 }, { "ilektroniki_ypovoli_dikografwn_year4": req.body.ilektroniki_ypovoli_dikografwn_year4 }, { "ilektroniki_ypovoli_dikografwn_year5": req.body.ilektroniki_ypovoli_dikografwn_year5 }, { "ilektroniki_ypovoli_dikografwn_prosfata_stoixeia": req.body.ilektroniki_ypovoli_dikografwn_prosfata_stoixeia }, { "ilektroniki_ypovoli_dikografwn_epidiwkomenos_stoxos": req.body.ilektroniki_ypovoli_dikografwn_epidiwkomenos_stoxos }])
                let diekperaiwsi_ypothesewn = JSON.stringify([{ "diekperaiwsi_ypothesewn_year1": req.body.diekperaiwsi_ypothesewn_year1 }, { "diekperaiwsi_ypothesewn_year2": req.body.diekperaiwsi_ypothesewn_year2 }, { "diekperaiwsi_ypothesewn_year3": req.body.diekperaiwsi_ypothesewn_year3 }, { "diekperaiwsi_ypothesewn_year4": req.body.diekperaiwsi_ypothesewn_year4 }, { "diekperaiwsi_ypothesewn_year5": req.body.diekperaiwsi_ypothesewn_year5 }, { "diekperaiwsi_ypothesewn_prosfata_stoixeia": req.body.diekperaiwsi_ypothesewn_prosfata_stoixeia }, { "diekperaiwsi_ypothesewn_epidiwkomenos_stoxos": req.body.diekperaiwsi_ypothesewn_epidiwkomenos_stoxos }])
                let poines_se_xrima = JSON.stringify([{ "poines_se_xrima_year1": req.body.poines_se_xrima_year1 }, { "poines_se_xrima_year2": req.body.poines_se_xrima_year2 }, { "poines_se_xrima_year3": req.body.poines_se_xrima_year3 }, { "poines_se_xrima_year4": req.body.poines_se_xrima_year4 }, { "poines_se_xrima_year5": req.body.poines_se_xrima_year5 }, { "poines_se_xrima_prosfata_stoixeia": req.body.poines_se_xrima_prosfata_stoixeia }, { "poines_se_xrima_epidiwkomenos_stoxos": req.body.poines_se_xrima_epidiwkomenos_stoxos }])
                let kostos_swfronismou = JSON.stringify([{ "kostos_swfronismou_year1": req.body.kostos_swfronismou_year1 }, { "kostos_swfronismou_year2": req.body.kostos_swfronismou_year2 }, { "kostos_swfronismou_year3": req.body.kostos_swfronismou_year3 }, { "kostos_swfronismou_year4": req.body.kostos_swfronismou_year4 }, { "kostos_swfronismou_year5": req.body.kostos_swfronismou_year5 }, { "kostos_swfronismou_prosfata_stoixeia": req.body.kostos_swfronismou_prosfata_stoixeia }, { "kostos_swfronismou_epidiwkomenos_stoxos": req.body.kostos_swfronismou_epidiwkomenos_stoxos }])
                let analogia_fylakwn_kratoumenwn = JSON.stringify([{ "analogia_fylakwn_kratoumenwn_year1": req.body.analogia_fylakwn_kratoumenwn_year1 }, { "analogia_fylakwn_kratoumenwn_year2": req.body.analogia_fylakwn_kratoumenwn_year2 }, { "analogia_fylakwn_kratoumenwn_year3": req.body.analogia_fylakwn_kratoumenwn_year3 }, { "analogia_fylakwn_kratoumenwn_year4": req.body.analogia_fylakwn_kratoumenwn_year4 }, { "analogia_fylakwn_kratoumenwn_year5": req.body.analogia_fylakwn_kratoumenwn_year5 }, { "analogia_fylakwn_kratoumenwn_prosfata_stoixeia": req.body.analogia_fylakwn_kratoumenwn_prosfata_stoixeia }, { "analogia_fylakwn_kratoumenwn_epidiwkomenos_stoxos": req.body.analogia_fylakwn_kratoumenwn_epidiwkomenos_stoxos }])

                //ependytiki_drastiriotita_table
                let pagkosmia_antagwnistikotita = JSON.stringify([{ "pagkosmia_antagwnistikotita_year1": req.body.pagkosmia_antagwnistikotita_year1 }, { "pagkosmia_antagwnistikotita_year2": req.body.pagkosmia_antagwnistikotita_year2 }, { "pagkosmia_antagwnistikotita_year3": req.body.pagkosmia_antagwnistikotita_year3 }, { "pagkosmia_antagwnistikotita_year4": req.body.pagkosmia_antagwnistikotita_year4 }, { "pagkosmia_antagwnistikotita_year5": req.body.pagkosmia_antagwnistikotita_year5 }, { "pagkosmia_antagwnistikotita_prosfata_stoixeia": req.body.pagkosmia_antagwnistikotita_prosfata_stoixeia }, { "pagkosmia_antagwnistikotita_epidiwkomenos_stoxos": req.body.pagkosmia_antagwnistikotita_epidiwkomenos_stoxos }])
                let ependyseis = JSON.stringify([{ "ependyseis_year1": req.body.ependyseis_year1 }, { "ependyseis_year2": req.body.ependyseis_year2 }, { "ependyseis_year3": req.body.ependyseis_year3 }, { "ependyseis_year4": req.body.ependyseis_year4 }, { "ependyseis_year5": req.body.ependyseis_year5 }, { "ependyseis_prosfata_stoixeia": req.body.ependyseis_prosfata_stoixeia }, { "ependyseis_epidiwkomenos_stoxos": req.body.ependyseis_epidiwkomenos_stoxos }])
                let ameses_ependyseis = JSON.stringify([{ "ameses_ependyseis_year1": req.body.ameses_ependyseis_year1 }, { "ameses_ependyseis_year2": req.body.ameses_ependyseis_year2 }, { "ameses_ependyseis_year3": req.body.ameses_ependyseis_year3 }, { "ameses_ependyseis_year4": req.body.ameses_ependyseis_year4 }, { "ameses_ependyseis_year5": req.body.ameses_ependyseis_year5 }, { "ameses_ependyseis_prosfata_stoixeia": req.body.ameses_ependyseis_prosfata_stoixeia }, { "ameses_ependyseis_epidiwkomenos_stoxos": req.body.ameses_ependyseis_epidiwkomenos_stoxos }])
                let nees_epixeiriseis = JSON.stringify([{ "nees_epixeiriseis_year1": req.body.nees_epixeiriseis_year1 }, { "nees_epixeiriseis_year2": req.body.nees_epixeiriseis_year2 }, { "nees_epixeiriseis_year3": req.body.nees_epixeiriseis_year3 }, { "nees_epixeiriseis_year4": req.body.nees_epixeiriseis_year4 }, { "nees_epixeiriseis_year5": req.body.nees_epixeiriseis_year5 }, { "nees_epixeiriseis_prosfata_stoixeia": req.body.nees_epixeiriseis_prosfata_stoixeia }, { "nees_epixeiriseis_epidiwkomenos_stoxos": req.body.nees_epixeiriseis_epidiwkomenos_stoxos }])
                let kleistes_epixeiriseis = JSON.stringify([{ "kleistes_epixeiriseis_year1": req.body.kleistes_epixeiriseis_year1 }, { "kleistes_epixeiriseis_year2": req.body.kleistes_epixeiriseis_year2 }, { "kleistes_epixeiriseis_year3": req.body.kleistes_epixeiriseis_year3 }, { "kleistes_epixeiriseis_year4": req.body.kleistes_epixeiriseis_year4 }, { "kleistes_epixeiriseis_year5": req.body.kleistes_epixeiriseis_year5 }, { "kleistes_epixeiriseis_prosfata_stoixeia": req.body.kleistes_epixeiriseis_prosfata_stoixeia }, { "kleistes_epixeiriseis_epidiwkomenos_stoxos": req.body.kleistes_epixeiriseis_epidiwkomenos_stoxos }])
                let dioikitiko_kostos = JSON.stringify([{ "dioikitiko_kostos_year1": req.body.dioikitiko_kostos_year1 }, { "dioikitiko_kostos_year2": req.body.dioikitiko_kostos_year2 }, { "dioikitiko_kostos_year3": req.body.dioikitiko_kostos_year3 }, { "dioikitiko_kostos_year4": req.body.dioikitiko_kostos_year4 }, { "dioikitiko_kostos_year5": req.body.dioikitiko_kostos_year5 }, { "dioikitiko_kostos_prosfata_stoixeia": req.body.dioikitiko_kostos_prosfata_stoixeia }, { "dioikitiko_kostos_epidiwkomenos_stoxos": req.body.dioikitiko_kostos_epidiwkomenos_stoxos }])
                let mx_systasis_epixeirisis = JSON.stringify([{ "mx_systasis_epixeirisis_year1": req.body.mx_systasis_epixeirisis_year1 }, { "mx_systasis_epixeirisis_year2": req.body.mx_systasis_epixeirisis_year2 }, { "mx_systasis_epixeirisis_year3": req.body.mx_systasis_epixeirisis_year3 }, { "mx_systasis_epixeirisis_year4": req.body.mx_systasis_epixeirisis_year4 }, { "mx_systasis_epixeirisis_year5": req.body.mx_systasis_epixeirisis_year5 }, { "mx_systasis_epixeirisis_prosfata_stoixeia": req.body.mx_systasis_epixeirisis_prosfata_stoixeia }, { "mx_systasis_epixeirisis_epidiwkomenos_stoxos": req.body.mx_systasis_epixeirisis_epidiwkomenos_stoxos }])

                //perivallon_energeia_table
                let atmosfairiki_rypansi = JSON.stringify([{ "atmosfairiki_rypansi_year1": req.body.atmosfairiki_rypansi_year1 }, { "atmosfairiki_rypansi_year2": req.body.atmosfairiki_rypansi_year2 }, { "atmosfairiki_rypansi_year3": req.body.atmosfairiki_rypansi_year3 }, { "atmosfairiki_rypansi_year4": req.body.atmosfairiki_rypansi_year4 }, { "atmosfairiki_rypansi_year5": req.body.atmosfairiki_rypansi_year5 }, { "atmosfairiki_rypansi_prosfata_stoixeia": req.body.atmosfairiki_rypansi_prosfata_stoixeia }, { "atmosfairiki_rypansi_epidiwkomenos_stoxos": req.body.atmosfairiki_rypansi_epidiwkomenos_stoxos }])
                let viologikoi_katharismoi = JSON.stringify([{ "viologikoi_katharismoi_year1": req.body.viologikoi_katharismoi_year1 }, { "viologikoi_katharismoi_year2": req.body.viologikoi_katharismoi_year2 }, { "viologikoi_katharismoi_year3": req.body.viologikoi_katharismoi_year3 }, { "viologikoi_katharismoi_year4": req.body.viologikoi_katharismoi_year4 }, { "viologikoi_katharismoi_year5": req.body.viologikoi_katharismoi_year5 }, { "viologikoi_katharismoi_prosfata_stoixeia": req.body.viologikoi_katharismoi_prosfata_stoixeia }, { "viologikoi_katharismoi_epidiwkomenos_stoxos": req.body.viologikoi_katharismoi_epidiwkomenos_stoxos }])
                let katallhles_aktes = JSON.stringify([{ "katallhles_aktes_year1": req.body.katallhles_aktes_year1 }, { "katallhles_aktes_year2": req.body.katallhles_aktes_year2 }, { "katallhles_aktes_year3": req.body.katallhles_aktes_year3 }, { "katallhles_aktes_year4": req.body.katallhles_aktes_year4 }, { "katallhles_aktes_year5": req.body.katallhles_aktes_year5 }, { "katallhles_aktes_prosfata_stoixeia": req.body.katallhles_aktes_prosfata_stoixeia }, { "katallhles_aktes_epidiwkomenos_stoxos": req.body.katallhles_aktes_epidiwkomenos_stoxos }])
                let katallilotita_diktyoy_ydreysis = JSON.stringify([{ "katallilotita_diktyoy_ydreysis_year1": req.body.katallilotita_diktyoy_ydreysis_year1 }, { "katallilotita_diktyoy_ydreysis_year2": req.body.katallilotita_diktyoy_ydreysis_year2 }, { "katallilotita_diktyoy_ydreysis_year3": req.body.katallilotita_diktyoy_ydreysis_year3 }, { "katallilotita_diktyoy_ydreysis_year4": req.body.katallilotita_diktyoy_ydreysis_year4 }, { "katallilotita_diktyoy_ydreysis_year5": req.body.katallilotita_diktyoy_ydreysis_year5 }, { "katallilotita_diktyoy_ydreysis_prosfata_stoixeia": req.body.katallilotita_diktyoy_ydreysis_prosfata_stoixeia }, { "katallilotita_diktyoy_ydreysis_epidiwkomenos_stoxos": req.body.katallilotita_diktyoy_ydreysis_epidiwkomenos_stoxos }])
                let xrisi_aporrimmatwn = JSON.stringify([{ "xrisi_aporrimmatwn_year1": req.body.xrisi_aporrimmatwn_year1 }, { "xrisi_aporrimmatwn_year2": req.body.xrisi_aporrimmatwn_year2 }, { "xrisi_aporrimmatwn_year3": req.body.xrisi_aporrimmatwn_year3 }, { "xrisi_aporrimmatwn_year4": req.body.xrisi_aporrimmatwn_year4 }, { "xrisi_aporrimmatwn_year5": req.body.xrisi_aporrimmatwn_year5 }, { "xrisi_aporrimmatwn_prosfata_stoixeia": req.body.xrisi_aporrimmatwn_prosfata_stoixeia }, { "xrisi_aporrimmatwn_epidiwkomenos_stoxos": req.body.xrisi_aporrimmatwn_epidiwkomenos_stoxos }])
                let aporrimmata_xyta = JSON.stringify([{ "aporrimmata_xyta_year1": req.body.aporrimmata_xyta_year1 }, { "aporrimmata_xyta_year2": req.body.aporrimmata_xyta_year2 }, { "aporrimmata_xyta_year3": req.body.aporrimmata_xyta_year3 }, { "aporrimmata_xyta_year4": req.body.aporrimmata_xyta_year4 }, { "aporrimmata_xyta_year5": req.body.aporrimmata_xyta_year5 }, { "aporrimmata_xyta_prosfata_stoixeia": req.body.aporrimmata_xyta_prosfata_stoixeia }, { "aporrimmata_xyta_epidiwkomenos_stoxos": req.body.aporrimmata_xyta_epidiwkomenos_stoxos }])
                let katastrofi_dasikwn_ektasewn = JSON.stringify([{ "katastrofi_dasikwn_ektasewn_year1": req.body.katastrofi_dasikwn_ektasewn_year1 }, { "katastrofi_dasikwn_ektasewn_year2": req.body.katastrofi_dasikwn_ektasewn_year2 }, { "katastrofi_dasikwn_ektasewn_year3": req.body.katastrofi_dasikwn_ektasewn_year3 }, { "katastrofi_dasikwn_ektasewn_year4": req.body.katastrofi_dasikwn_ektasewn_year4 }, { "katastrofi_dasikwn_ektasewn_year5": req.body.katastrofi_dasikwn_ektasewn_year5 }, { "katastrofi_dasikwn_ektasewn_prosfata_stoixeia": req.body.katastrofi_dasikwn_ektasewn_prosfata_stoixeia }, { "katastrofi_dasikwn_ektasewn_epidiwkomenos_stoxos": req.body.katastrofi_dasikwn_ektasewn_epidiwkomenos_stoxos }])
                let anadaswseis = JSON.stringify([{ "anadaswseis_year1": req.body.anadaswseis_year1 }, { "anadaswseis_year2": req.body.anadaswseis_year2 }, { "anadaswseis_year3": req.body.anadaswseis_year3 }, { "anadaswseis_year4": req.body.anadaswseis_year4 }, { "anadaswseis_year5": req.body.anadaswseis_year5 }, { "anadaswseis_prosfata_stoixeia": req.body.anadaswseis_prosfata_stoixeia }, { "anadaswseis_epidiwkomenos_stoxos": req.body.anadaswseis_epidiwkomenos_stoxos }])
                let prostateuomenes_perioxes = JSON.stringify([{ "prostateuomenes_perioxes_year1": req.body.prostateuomenes_perioxes_year1 }, { "prostateuomenes_perioxes_year2": req.body.prostateuomenes_perioxes_year2 }, { "prostateuomenes_perioxes_year3": req.body.prostateuomenes_perioxes_year3 }, { "prostateuomenes_perioxes_year4": req.body.prostateuomenes_perioxes_year4 }, { "prostateuomenes_perioxes_year5": req.body.prostateuomenes_perioxes_year5 }, { "prostateuomenes_perioxes_prosfata_stoixeia": req.body.prostateuomenes_perioxes_prosfata_stoixeia }, { "prostateuomenes_perioxes_epidiwkomenos_stoxos": req.body.prostateuomenes_perioxes_epidiwkomenos_stoxos }])
                let proypologismos_prostasias_perivallontos = JSON.stringify([{ "proypologismos_prostasias_perivallontos_year1": req.body.proypologismos_prostasias_perivallontos_year1 }, { "proypologismos_prostasias_perivallontos_year2": req.body.proypologismos_prostasias_perivallontos_year2 }, { "proypologismos_prostasias_perivallontos_year3": req.body.proypologismos_prostasias_perivallontos_year3 }, { "proypologismos_prostasias_perivallontos_year4": req.body.proypologismos_prostasias_perivallontos_year4 }, { "proypologismos_prostasias_perivallontos_year5": req.body.proypologismos_prostasias_perivallontos_year5 }, { "proypologismos_prostasias_perivallontos_prosfata_stoixeia": req.body.proypologismos_prostasias_perivallontos_prosfata_stoixeia }, { "proypologismos_prostasias_perivallontos_epidiwkomenos_stoxos": req.body.proypologismos_prostasias_perivallontos_epidiwkomenos_stoxos }])
                let katanalwsi_energeias_kata_kefali = JSON.stringify([{ "katanalwsi_energeias_kata_kefali_year1": req.body.katanalwsi_energeias_kata_kefali_year1 }, { "katanalwsi_energeias_kata_kefali_year2": req.body.katanalwsi_energeias_kata_kefali_year2 }, { "katanalwsi_energeias_kata_kefali_year3": req.body.katanalwsi_energeias_kata_kefali_year3 }, { "katanalwsi_energeias_kata_kefali_year4": req.body.katanalwsi_energeias_kata_kefali_year4 }, { "katanalwsi_energeias_kata_kefali_year5": req.body.katanalwsi_energeias_kata_kefali_year5 }, { "katanalwsi_energeias_kata_kefali_prosfata_stoixeia": req.body.katanalwsi_energeias_kata_kefali_prosfata_stoixeia }, { "katanalwsi_energeias_kata_kefali_epidiwkomenos_stoxos": req.body.katanalwsi_energeias_kata_kefali_epidiwkomenos_stoxos }])
                let katanalwsi_energeias_ana_morfi = JSON.stringify([{ "katanalwsi_energeias_ana_morfi_year1": req.body.katanalwsi_energeias_ana_morfi_year1 }, { "katanalwsi_energeias_ana_morfi_year2": req.body.katanalwsi_energeias_ana_morfi_year2 }, { "katanalwsi_energeias_ana_morfi_year3": req.body.katanalwsi_energeias_ana_morfi_year3 }, { "katanalwsi_energeias_ana_morfi_year4": req.body.katanalwsi_energeias_ana_morfi_year4 }, { "katanalwsi_energeias_ana_morfi_year5": req.body.katanalwsi_energeias_ana_morfi_year5 }, { "katanalwsi_energeias_ana_morfi_prosfata_stoixeia": req.body.katanalwsi_energeias_ana_morfi_prosfata_stoixeia }, { "katanalwsi_energeias_ana_morfi_epidiwkomenos_stoxos": req.body.katanalwsi_energeias_ana_morfi_epidiwkomenos_stoxos }])
                let katanalwsi_energeias_apo_ananewsimes_piges = JSON.stringify([{ "katanalwsi_energeias_apo_ananewsimes_piges_year1": req.body.katanalwsi_energeias_apo_ananewsimes_piges_year1 }, { "katanalwsi_energeias_apo_ananewsimes_piges_year2": req.body.katanalwsi_energeias_apo_ananewsimes_piges_year2 }, { "katanalwsi_energeias_apo_ananewsimes_piges_year3": req.body.katanalwsi_energeias_apo_ananewsimes_piges_year3 }, { "katanalwsi_energeias_apo_ananewsimes_piges_year4": req.body.katanalwsi_energeias_apo_ananewsimes_piges_year4 }, { "katanalwsi_energeias_apo_ananewsimes_piges_year5": req.body.katanalwsi_energeias_apo_ananewsimes_piges_year5 }, { "katanalwsi_energeias_apo_ananewsimes_piges_prosfata_stoixeia": req.body.katanalwsi_energeias_apo_ananewsimes_piges_prosfata_stoixeia }, { "katanalwsi_energeias_apo_ananewsimes_piges_epidiwkomenos_stoxos": req.body.katanalwsi_energeias_apo_ananewsimes_piges_epidiwkomenos_stoxos }])
                let meiwsi_ekpompwn_thermokipioy = JSON.stringify([{ "meiwsi_ekpompwn_thermokipioy_year1": req.body.meiwsi_ekpompwn_thermokipioy_year1 }, { "meiwsi_ekpompwn_thermokipioy_year2": req.body.meiwsi_ekpompwn_thermokipioy_year2 }, { "meiwsi_ekpompwn_thermokipioy_year3": req.body.meiwsi_ekpompwn_thermokipioy_year3 }, { "meiwsi_ekpompwn_thermokipioy_year4": req.body.meiwsi_ekpompwn_thermokipioy_year4 }, { "meiwsi_ekpompwn_thermokipioy_year5": req.body.meiwsi_ekpompwn_thermokipioy_year5 }, { "meiwsi_ekpompwn_thermokipioy_prosfata_stoixeia": req.body.meiwsi_ekpompwn_thermokipioy_prosfata_stoixeia }, { "meiwsi_ekpompwn_thermokipioy_epidiwkomenos_stoxos": req.body.meiwsi_ekpompwn_thermokipioy_epidiwkomenos_stoxos }])

                allos_deiktis1 = JSON.stringify([{ "allos_deiktis1": req.body.allos_deiktis1 }, { "allos_deiktis1_year1": req.body.allos_deiktis1_year1 }, { "allos_deiktis1_year2": req.body.allos_deiktis1_year2 }, { "allos_deiktis1_year3": req.body.allos_deiktis1_year3 }, { "allos_deiktis1_year4": req.body.allos_deiktis1_year4 }, { "allos_deiktis1_year5": req.body.allos_deiktis1_year5 }, { "allos_deiktis1_prosfata_stoixeia": req.body.allos_deiktis1_prosfata_stoixeia }, { "allos_deiktis1_epidiwkomenos_stoxos": req.body.allos_deiktis1_epidiwkomenos_stoxos }])
                allos_deiktis2 = JSON.stringify([{ "allos_deiktis2": req.body.allos_deiktis2 }, { "allos_deiktis2_year1": req.body.allos_deiktis2_year1 }, { "allos_deiktis2_year2": req.body.allos_deiktis2_year2 }, { "allos_deiktis2_year3": req.body.allos_deiktis2_year3 }, { "allos_deiktis2_year4": req.body.allos_deiktis2_year4 }, { "allos_deiktis2_year5": req.body.allos_deiktis2_year5 }, { "allos_deiktis2_prosfata_stoixeia": req.body.allos_deiktis2_prosfata_stoixeia }, { "allos_deiktis2_epidiwkomenos_stoxos": req.body.allos_deiktis2_epidiwkomenos_stoxos }])
                allos_deiktis3 = JSON.stringify([{ "allos_deiktis3": req.body.allos_deiktis3 }, { "allos_deiktis3_year1": req.body.allos_deiktis3_year1 }, { "allos_deiktis3_year2": req.body.allos_deiktis3_year2 }, { "allos_deiktis3_year3": req.body.allos_deiktis3_year3 }, { "allos_deiktis3_year4": req.body.allos_deiktis3_year4 }, { "allos_deiktis3_year5": req.body.allos_deiktis3_year5 }, { "allos_deiktis3_prosfata_stoixeia": req.body.allos_deiktis3_prosfata_stoixeia }, { "allos_deiktis3_epidiwkomenos_stoxos": req.body.allos_deiktis3_epidiwkomenos_stoxos }])
                allos_deiktis4 = JSON.stringify([{ "allos_deiktis4": req.body.allos_deiktis4 }, { "allos_deiktis4_year1": req.body.allos_deiktis4_year1 }, { "allos_deiktis4_year2": req.body.allos_deiktis4_year2 }, { "allos_deiktis4_year3": req.body.allos_deiktis4_year3 }, { "allos_deiktis4_year4": req.body.allos_deiktis4_year4 }, { "allos_deiktis4_year5": req.body.allos_deiktis4_year5 }, { "allos_deiktis4_prosfata_stoixeia": req.body.allos_deiktis4_prosfata_stoixeia }, { "allos_deiktis4_epidiwkomenos_stoxos": req.body.allos_deiktis4_epidiwkomenos_stoxos }])
                allos_deiktis5 = JSON.stringify([{ "allos_deiktis5": req.body.allos_deiktis5 }, { "allos_deiktis5_year1": req.body.allos_deiktis5_year1 }, { "allos_deiktis5_year2": req.body.allos_deiktis5_year2 }, { "allos_deiktis5_year3": req.body.allos_deiktis5_year3 }, { "allos_deiktis5_year4": req.body.allos_deiktis5_year4 }, { "allos_deiktis5_year5": req.body.allos_deiktis5_year5 }, { "allos_deiktis5_prosfata_stoixeia": req.body.allos_deiktis5_prosfata_stoixeia }, { "allos_deiktis5_epidiwkomenos_stoxos": req.body.allos_deiktis5_epidiwkomenos_stoxos }])
                //console.log("allos_deiktis1: " + allos_deiktis1)


                //grouping each value of each row of table 18 
                let auksisi_esodwn = JSON.stringify([{ "field_18_amesa_esoda_thesmoi": req.body.field_18_amesa_esoda_thesmoi }, { "field_18_amesa_esoda_oikonomia": req.body.field_18_amesa_esoda_oikonomia }, { "field_18_amesa_esoda_kinonia": req.body.field_18_amesa_esoda_kinonia }, { "field_18_amesa_esoda_perivallon": req.body.field_18_amesa_esoda_perivallon }, { "field_18_amesa_esoda_nisiwtika": req.body.field_18_amesa_esoda_nisiwtika }])
                let meiwsi_dapanwn = JSON.stringify([{ "field_18_amesa_dapanes_thesmoi": req.body.field_18_amesa_dapanes_thesmoi }, { "field_18_amesa_dapanes_oikonomia": req.body.field_18_amesa_dapanes_oikonomia }, { "field_18_amesa_dapanes_kinonia": req.body.field_18_amesa_dapanes_kinonia }, { "field_18_amesa_dapanes_perivallon": req.body.field_18_amesa_dapanes_perivallon }, { "field_18_amesa_dapanes_nisiwtika": req.body.field_18_amesa_dapanes_nisiwtika }])
                let eksikonomisi_xronou = JSON.stringify([{ "field_18_amesa_eksikonomisi_xronou_thesmoi": req.body.field_18_amesa_eksikonomisi_xronou_thesmoi }, { "field_18_amesa_eksikonomisi_xronou_oikonomia": req.body.field_18_amesa_eksikonomisi_xronou_oikonomia }, { "field_18_amesa_eksikonomisi_xronou_kinonia": req.body.field_18_amesa_eksikonomisi_xronou_kinonia }, { "field_18_amesa_eksikonomisi_xronou_perivallon": req.body.field_18_amesa_eksikonomisi_xronou_perivallon }, { "field_18_amesa_eksikonomisi_xronou_nisiwtika": req.body.field_18_amesa_eksikonomisi_xronou_nisiwtika }])
                let apodotikotita = JSON.stringify([{ "field_18_amesa_apodotikotita_thesmoi": req.body.field_18_amesa_apodotikotita_thesmoi }, { "field_18_amesa_apodotikotita_oikonomia": req.body.field_18_amesa_apodotikotita_oikonomia }, { "field_18_amesa_apodotikotita_kinonia": req.body.field_18_amesa_apodotikotita_kinonia }, { "field_18_amesa_apodotikotita_perivallon": req.body.field_18_amesa_apodotikotita_perivallon }, { "field_18_amesa_apodotikotita_nisiwtika": req.body.field_18_amesa_apodotikotita_nisiwtika }])
                let amesa_allo = JSON.stringify([{ "field_18_amesa_allo_thesmoi": req.body.field_18_amesa_allo_thesmoi }, { "field_18_amesa_allo_oikonomia": req.body.field_18_amesa_allo_oikonomia }, { "field_18_amesa_allo_kinonia": req.body.field_18_amesa_allo_kinonia }, { "field_18_amesa_allo_perivallon": req.body.field_18_amesa_allo_perivallon }, { "field_18_amesa_allo_nisiwtika": req.body.field_18_amesa_allo_nisiwtika }])
                let veltiwsi_ypiresiwn = JSON.stringify([{ "field_18_emmesa_veltiosi_thesmoi": req.body.field_18_emmesa_veltiosi_thesmoi }, { "field_18_emmesa_veltiosi_oikonomia": req.body.field_18_emmesa_veltiosi_oikonomia }, { "field_18_emmesa_veltiosi_kinonia": req.body.field_18_emmesa_veltiosi_kinonia }, { "field_18_emmesa_veltiosi_perivallon": req.body.field_18_emmesa_veltiosi_perivallon }, { "field_18_emmesa_veltiosi_nisiwtika": req.body.field_18_emmesa_veltiosi_nisiwtika }])
                let metaxirisi_politwn = JSON.stringify([{ "field_18_emmesa_metaxirisi_thesmoi": req.body.field_18_emmesa_metaxirisi_thesmoi }, { "field_18_emmesa_metaxirisi_oikonomia": req.body.field_18_emmesa_metaxirisi_oikonomia }, { "field_18_emmesa_metaxirisi_kinonia": req.body.field_18_emmesa_metaxirisi_kinonia }, { "field_18_emmesa_metaxirisi_perivallon": req.body.field_18_emmesa_metaxirisi_perivallon }, { "field_18_emmesa_metaxirisi_nisiwtika": req.body.field_18_emmesa_metaxirisi_nisiwtika }])
                let diafania_thesmwn = JSON.stringify([{ "field_18_emmesa_diafania_thesmoi": req.body.field_18_emmesa_diafania_thesmoi }, { "field_18_emmesa_diafania_oikonomia": req.body.field_18_emmesa_diafania_oikonomia }, { "field_18_emmesa_diafania_kinonia": req.body.field_18_emmesa_diafania_kinonia }, { "field_18_emmesa_diafania_perivallon": req.body.field_18_emmesa_diafania_perivallon }, { "field_18_emmesa_diafania_nisiwtika": req.body.field_18_emmesa_diafania_nisiwtika }])
                let diaxirisi_kindynwn = JSON.stringify([{ "field_18_emmesa_diaxirisi_kindinwn_thesmoi": req.body.field_18_emmesa_diaxirisi_kindinwn_thesmoi }, { "field_18_emmesa_diaxirisi_kindinwn_oikonomia": req.body.field_18_emmesa_diaxirisi_kindinwn_oikonomia }, { "field_18_emmesa_diaxirisi_kindinwn_kinonia": req.body.field_18_emmesa_diaxirisi_kindinwn_kinonia }, { "field_18_emmesa_diaxirisi_kindinwn_perivallon": req.body.field_18_emmesa_diaxirisi_kindinwn_perivallon }, { "field_18_emmesa_diaxirisi_kindinwn_nisiwtika": req.body.field_18_emmesa_diaxirisi_kindinwn_nisiwtika }])
                let emmesa_allo = JSON.stringify([{ "field_18_emmesa_allo_thesmoi": req.body.field_18_emmesa_allo_thesmoi }, { "field_18_emmesa_allo_oikonomia": req.body.field_18_emmesa_allo_oikonomia }, { "field_18_emmesa_allo_kinonia": req.body.field_18_emmesa_allo_kinonia }, { "field_18_emmesa_allo_perivallon": req.body.field_18_emmesa_allo_perivallon }, { "field_18_emmesa_allo_nisiwtika": req.body.field_18_emmesa_allo_nisiwtika }])

                //grouping table 19 
                let proetimasia = JSON.stringify([{ "field_19_efarmogi_proetimasia_thesmoi": req.body.field_19_efarmogi_proetimasia_thesmoi }, { "field_19_efarmogi_proetimasia_oikonomia": req.body.field_19_efarmogi_proetimasia_oikonomia }, { "field_19_efarmogi_proetimasia_kinonia": req.body.field_19_efarmogi_proetimasia_kinonia }, { "field_19_efarmogi_proetimasia_perivallon": req.body.field_19_efarmogi_proetimasia_perivallon }, { "field_19_efarmogi_proetimasia_nisiwtika": req.body.field_19_efarmogi_proetimasia_nisiwtika }])
                let ypodomi = JSON.stringify([{ "field_19_efarmogi_ypodomi_thesmoi": req.body.field_19_efarmogi_ypodomi_thesmoi }, { "field_19_efarmogi_ypodomi_oikonomia": req.body.field_19_efarmogi_ypodomi_oikonomia }, { "field_19_efarmogi_ypodomi_kinonia": req.body.field_19_efarmogi_ypodomi_kinonia }, { "field_19_efarmogi_ypodomi_perivallon": req.body.field_19_efarmogi_ypodomi_perivallon }, { "field_19_efarmogi_ypodomi_nisiwtika": req.body.field_19_efarmogi_ypodomi_nisiwtika }])
                let kinitikotita = JSON.stringify([{ "field_19_efarmogi_kinitikotita_thesmoi": req.body.field_19_efarmogi_kinitikotita_thesmoi }, { "field_19_efarmogi_kinitikotita_oikonomia": req.body.field_19_efarmogi_kinitikotita_oikonomia }, { "field_19_efarmogi_kinitikotita_kinonia": req.body.field_19_efarmogi_kinitikotita_kinonia }, { "field_19_efarmogi_kinitikotita_perivallon": req.body.field_19_efarmogi_kinitikotita_perivallon }, { "field_19_efarmogi_kinitikotita_nisiwtika": req.body.field_19_efarmogi_kinitikotita_nisiwtika }])
                let emplekomenoi = JSON.stringify([{ "field_19_efarmogi_emplekomenoi_thesmoi": req.body.field_19_efarmogi_emplekomenoi_thesmoi }, { "field_19_efarmogi_emplekomenoi_oikonomia": req.body.field_19_efarmogi_emplekomenoi_oikonomia }, { "field_19_efarmogi_emplekomenoi_kinonia": req.body.field_19_efarmogi_emplekomenoi_kinonia }, { "field_19_efarmogi_emplekomenoi_perivallon": req.body.field_19_efarmogi_emplekomenoi_perivallon }, { "field_19_efarmogi_emplekomenoi_nisiwtika": req.body.field_19_efarmogi_emplekomenoi_nisiwtika }])
                let efarmogi_allo = JSON.stringify([{ "field_19_efarmogi_allo_thesmoi": req.body.field_19_efarmogi_allo_thesmoi }, { "field_19_efarmogi_allo_oikonomia": req.body.field_19_efarmogi_allo_oikonomia }, { "field_19_efarmogi_allo_kinonia": req.body.field_19_efarmogi_allo_kinonia }, { "field_19_efarmogi_allo_perivallon": req.body.field_19_efarmogi_allo_perivallon }, { "field_19_efarmogi_allo_nisiwtika": req.body.field_19_efarmogi_allo_nisiwtika }])
                let apodosi_diaxirisis = JSON.stringify([{ "field_19_apodosi_diaxirisis_thesmoi": req.body.field_19_apodosi_diaxirisis_thesmoi }, { "field_19_apodosi_diaxirisis_oikonomia": req.body.field_19_apodosi_diaxirisis_oikonomia }, { "field_19_apodosi_diaxirisis_kinonia": req.body.field_19_apodosi_diaxirisis_kinonia }, { "field_19_apodosi_diaxirisis_perivallon": req.body.field_19_apodosi_diaxirisis_perivallon }, { "field_19_apodosi_diaxirisis_nisiwtika": req.body.field_19_apodosi_diaxirisis_nisiwtika }])
                let ektelesi = JSON.stringify([{ "field_19_apodosi_ektelesi_thesmoi": req.body.field_19_apodosi_ektelesi_thesmoi }, { "field_19_apodosi_ektelesi_oikonomia": req.body.field_19_apodosi_ektelesi_oikonomia }, { "field_19_apodosi_ektelesi_kinonia": req.body.field_19_apodosi_ektelesi_kinonia }, { "field_19_apodosi_ektelesi_perivallon": req.body.field_19_apodosi_ektelesi_perivallon }, { "field_19_apodosi_ektelesi_nisiwtika": req.body.field_19_apodosi_ektelesi_nisiwtika }])
                let apodosi_kostos = JSON.stringify([{ "field_19_apodosi_kostos_thesmoi": req.body.field_19_apodosi_kostos_thesmoi }, { "field_19_apodosi_kostos_oikonomia": req.body.field_19_apodosi_kostos_oikonomia }, { "field_19_apodosi_kostos_kinonia": req.body.field_19_apodosi_kostos_kinonia }, { "field_19_apodosi_kostos_perivallon": req.body.field_19_apodosi_kostos_perivallon }, { "field_19_apodosi_kostos_nisiwtika": req.body.field_19_apodosi_kostos_nisiwtika }])
                let apodosi_allo = JSON.stringify([{ "field_19_apodosi_allo_thesmoi": req.body.field_19_apodosi_allo_thesmoi }, { "field_19_apodosi_allo_oikonomia": req.body.field_19_apodosi_allo_oikonomia }, { "field_19_apodosi_allo_kinonia": req.body.field_19_apodosi_allo_kinonia }, { "field_19_apodosi_allo_perivallon": req.body.field_19_apodosi_allo_perivallon }, { "field_19_apodosi_allo_nisiwtika": req.body.field_19_apodosi_allo_nisiwtika }])

                //------------------------------------------------------------------------------//
                //add row to ekthesi model, map values from req.body & set foreign key equal to session username to get author 

                let req_body = req.body;//assign req.body to variable
                let keys = Object.keys(req_body);//get keys 
                let field_14_arthro = [];
                let field_14_stoxos = [];
                let field_17_onoma = [];
                let field_17_epitheto = [];
                let field_17_idiotita = [];
                let field_29_diatakseis_rythmisis = [];
                let field_29_yfistamenes_diatakseis = [];
                let field_30_diatakseis_katargisi = [];
                let field_30_katargoumenes_diatakseis = [];
                let field_31_sxetiki_diataksi = [];
                let field_31_synarmodia_ypoyrgeia = [];
                let field_31_antikeimeno_synarmodiotitas = [];
                let field_32_eksousiodotiki_diataksi = [];
                let field_32_eidos_praksis = [];
                let field_32_armodio_ypoyrgeio = [];
                let field_32_antikeimeno = [];
                let field_32_xronodiagramma = [];
                let value, temp;
                for (i in keys) {//iterate through keys
                    // console.log(i + " " + keys[i])
                    if (keys[i].includes("field_14_arthro")) {
                        //console.log("FOUND ROW "+keys[i]);
                        value = req_body[keys[i]];//get value from pair
                        //console.log(" FOUND val "+value);
                        temp = keys[i];//get key 
                        field_14_arthro.push({ temp: value });
                    } else if (keys[i].includes("field_14_stoxos")) {
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_14_stoxos.push({ temp: value });
                    } else if (keys[i].includes("field_17_onoma")) {
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_17_onoma.push({ temp: value });
                    } else if (keys[i].includes("field_17_epitheto")) {
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_17_epitheto.push({ temp: value });
                    } else if (keys[i].includes("field_17_idiotita")) {
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_17_idiotita.push({ temp: value });
                    } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_29_diatakseis_rythmisis.push({ temp: value });
                    } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_29_yfistamenes_diatakseis.push({ temp: value });
                    } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_30_diatakseis_katargisi.push({ temp: value });
                    } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_30_katargoumenes_diatakseis.push({ temp: value });
                    } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_31_sxetiki_diataksi.push({ temp: value });
                    } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_31_synarmodia_ypoyrgeia.push({ temp: value });
                    } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_31_antikeimeno_synarmodiotitas.push({ temp: value });
                    } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_32_eksousiodotiki_diataksi.push({ temp: value });
                    } else if (keys[i].includes("field_32_eidos_praksis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_32_eidos_praksis.push({ temp: value });
                    } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_32_armodio_ypoyrgeio.push({ temp: value });
                    } else if (keys[i].includes("field_32_antikeimeno")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_32_antikeimeno.push({ temp: value });
                    } else if (keys[i].includes("field_32_xronodiagramma")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        temp = keys[i];
                        field_32_xronodiagramma.push({ temp: value });
                    }
                }
                //console.log("field_29_diatakseis_rythmisis: " + field_29_diatakseis_rythmisis);
                var author = req.session.username;
                await database.ekthesi.update({
                    author: author, field_14_arthro: field_14_arthro, field_14_stoxos: field_14_stoxos, field_17_onoma: field_17_onoma, field_17_epitheto: field_17_epitheto, field_17_idiotita: field_17_idiotita, field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis, field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis, field_30_diatakseis_katargisi: field_30_diatakseis_katargisi, field_30_katargoumenes_diatakseis: field_30_katargoumenes_diatakseis,
                    field_31_sxetiki_diataksi: field_31_sxetiki_diataksi, field_31_synarmodia_ypoyrgeia: field_31_synarmodia_ypoyrgeia, field_31_antikeimeno_synarmodiotitas: field_31_antikeimeno_synarmodiotitas, field_32_eksousiodotiki_diataksi: field_32_eksousiodotiki_diataksi, field_32_eidos_praksis: field_32_eidos_praksis, field_32_armodio_ypoyrgeio: field_32_armodio_ypoyrgeio, field_32_antikeimeno: field_32_antikeimeno, field_32_xronodiagramma: field_32_xronodiagramma,
                    field_21_upload: field21, field_23_upload: field23, field_36_upload: field36
                },
                    {
                        where: {
                            id: ekthesi_id
                        }, include: [{ model: database.rythmiseis }, { model: database.field_9 }], returning: true, plain: true
                    })

                //map variables to model's fields
                let rythmiseis_data = await database.rythmiseis.update({
                    auksisi_esodwn: auksisi_esodwn, meiwsi_dapanwn: meiwsi_dapanwn, eksikonomisi_xronou: eksikonomisi_xronou, apodotikotita: apodotikotita, amesa_allo: amesa_allo,
                    veltiwsi_ypiresiwn: veltiwsi_ypiresiwn, metaxirisi_politwn: metaxirisi_politwn, diafania_thesmwn: diafania_thesmwn, diaxirisi_kindynwn: diaxirisi_kindynwn, emmesa_allo: emmesa_allo,
                    proetimasia: proetimasia, ypodomi: ypodomi, kinitikotita: kinitikotita, emplekomenoi: emplekomenoi, efarmogi_allo: efarmogi_allo, apodosi_diaxirisis: apodosi_diaxirisis, ektelesi: ektelesi, apodosi_kostos: apodosi_kostos, apodosi_allo: apodosi_allo
                }, {
                    where: {
                        id: ekthesi_id
                    }, include: [{ model: database.ekthesi }], returning: true, plain: true
                })

                let field_9_data = await database.field_9.update({
                    symvaseis: symvaseis, sse_diamesolavisi: sse_diamesolavisi, sse_diaitisia: sse_diaitisia, mesos_xronos_mesolavisis: mesos_xronos_mesolavisis, mesos_xronos_diaitisias: mesos_xronos_diaitisias, diarkeia_sse: diarkeia_sse, wres_ergasias: wres_ergasias, ameivomenes_yperwries: ameivomenes_yperwries, atyximata: atyximata,
                    ypsos_syntaksewn: ypsos_syntaksewn, ypsos_eisforwn: ypsos_eisforwn, ilikia_syntaksiodotisis: ilikia_syntaksiodotisis, aponomi_syntaksis: aponomi_syntaksis, syntaksiodotiki_dapani: syntaksiodotiki_dapani, prosfyges_syntaksis: prosfyges_syntaksis,
                    anergia: anergia, makroxronia_anergoi: makroxronia_anergoi, anergia_newn: anergia_newn, anergia_gynaikwn: anergia_gynaikwn, anergia_ana_perifereia: anergia_ana_perifereia, anergia_morfwsi: anergia_morfwsi, deiktis_apasxolisis: deiktis_apasxolisis, meriki_apasxolisi: meriki_apasxolisi, symvasi_orismenoy_xronoy: symvasi_orismenoy_xronoy,
                    kathestws_ftwxeias: kathestws_ftwxeias, sterisi_vasikwn_agathwn: sterisi_vasikwn_agathwn, noikokyria_ektaktes_anagkes: noikokyria_ektaktes_anagkes, epidomata_dapani: epidomata_dapani, paidia_se_orfanotrofeia: paidia_se_orfanotrofeia, astegoi_sitisi: astegoi_sitisi, proswrini_katoikia: proswrini_katoikia, kostos_frontidas: kostos_frontidas,
                    astheneis: astheneis, paidiki_thnisimotita: paidiki_thnisimotita, dapanes_ygeias: dapanes_ygeias, dapanes_farmakwn: dapanes_farmakwn, arithmos_iatrwn_ana_1000_katoikous: arithmos_iatrwn_ana_1000_katoikous, arithmos_klinwn_ana_1000_katoikous: arithmos_klinwn_ana_1000_katoikous, diarkeia_epeigousas_nosileias: diarkeia_epeigousas_nosileias, eidikes_nosileutikes_ypiresies: eidikes_nosileutikes_ypiresies, anamoni_asthenwn: anamoni_asthenwn, arithmos_nosileiwn_ana_1000_katoikous: arithmos_nosileiwn_ana_1000_katoikous, arithmos_klinwn_ana_ypiresia: arithmos_klinwn_ana_ypiresia,
                    apasxolisi_fylwn_synolika: apasxolisi_fylwn_synolika, apasxolisi_fylwn_perifereia: apasxolisi_fylwn_perifereia, apasxolisi_fylwn_oikonomia: apasxolisi_fylwn_oikonomia, apasxolisi_fylwn_ilikia: apasxolisi_fylwn_ilikia, anergia_fylwn_synolika: anergia_fylwn_synolika, anergia_fylwn_perifereia: anergia_fylwn_perifereia, anergia_fylwn_oikonomia: anergia_fylwn_oikonomia, anergia_fylwn_ilikia: anergia_fylwn_ilikia, autoapasxoloymenoi_fylo: autoapasxoloymenoi_fylo, ergodotes_fylo: ergodotes_fylo, ds_fylo: ds_fylo, symvoulia_fylo: symvoulia_fylo,
                    aitimata_asyloy: aitimata_asyloy, metanasteytikes_roes: metanasteytikes_roes, apelaseis: apelaseis, monades_filoksenias: monades_filoksenias, filoksenia_paravatikotita: filoksenia_paravatikotita,
                    dimosioi_ypalliloi: dimosioi_ypalliloi, monimoi_metaklitoi: monimoi_metaklitoi, analogia_ypallilwn: analogia_ypallilwn, prosvasi_internet: prosvasi_internet, intranet: intranet, analogia_ypologistwn: analogia_ypologistwn, istoselides: istoselides, kentra_pliroforisis: kentra_pliroforisis, eksypiretisi_ypiresies: eksypiretisi_ypiresies, kostos_proswpikou: kostos_proswpikou, kostos_diaxirisis_proswpikou: kostos_diaxirisis_proswpikou,
                    drastes_adikimata: drastes_adikimata, adikimata_poinikoy_kwdika: adikimata_poinikoy_kwdika, diapraxthenta_adikimata: diapraxthenta_adikimata, etisia_statistika: etisia_statistika, adikimata_paranomi_eisodos: adikimata_paranomi_eisodos, syxnotita_egklimatwn: syxnotita_egklimatwn, eksixniasmena_egklimata: eksixniasmena_egklimata, ergazomenoi_asfaleia: ergazomenoi_asfaleia, katoikoi_ana_astynomiko: katoikoi_ana_astynomiko, analogia_astynomikwn_ana_1000_katoikoys: analogia_astynomikwn_ana_1000_katoikoys, dapanes_astynomias: dapanes_astynomias, poroi_antimetwpisis: poroi_antimetwpisis,
                    arithmos_diaforwn: arithmos_diaforwn, dioikitikes_periptwseis: dioikitikes_periptwseis, xronos_epilysis_ypothesewn: xronos_epilysis_ypothesewn, ekdosi_apofasewn: ekdosi_apofasewn, mo_ypotheswn_dikasti: mo_ypotheswn_dikasti, akyrwsi_apofasewn: akyrwsi_apofasewn, ekswdikastikos_symvivasmos: ekswdikastikos_symvivasmos, enallaktiki_epilysi_diaforwn: enallaktiki_epilysi_diaforwn, nomiki_prostasia: nomiki_prostasia, kostos_prosfygis: kostos_prosfygis, ilektroniki_ypovoli_dikografwn: ilektroniki_ypovoli_dikografwn, diekperaiwsi_ypothesewn: diekperaiwsi_ypothesewn, poines_se_xrima: poines_se_xrima, kostos_swfronismou: kostos_swfronismou, analogia_fylakwn_kratoumenwn: analogia_fylakwn_kratoumenwn,
                    pagkosmia_antagwnistikotita: pagkosmia_antagwnistikotita, ependyseis: ependyseis, ameses_ependyseis: ameses_ependyseis, nees_epixeiriseis: nees_epixeiriseis, kleistes_epixeiriseis: kleistes_epixeiriseis, dioikitiko_kostos: dioikitiko_kostos, mx_systasis_epixeirisis: mx_systasis_epixeirisis,
                    atmosfairiki_rypansi: atmosfairiki_rypansi, viologikoi_katharismoi: viologikoi_katharismoi, katallhles_aktes: katallhles_aktes, katallilotita_diktyoy_ydreysis: katallilotita_diktyoy_ydreysis, xrisi_aporrimmatwn: xrisi_aporrimmatwn, aporrimmata_xyta: aporrimmata_xyta, katastrofi_dasikwn_ektasewn: katastrofi_dasikwn_ektasewn, anadaswseis: anadaswseis, prostateuomenes_perioxes: prostateuomenes_perioxes, proypologismos_prostasias_perivallontos: proypologismos_prostasias_perivallontos, katanalwsi_energeias_kata_kefali: katanalwsi_energeias_kata_kefali, katanalwsi_energeias_ana_morfi: katanalwsi_energeias_ana_morfi, katanalwsi_energeias_apo_ananewsimes_piges: katanalwsi_energeias_apo_ananewsimes_piges, meiwsi_ekpompwn_thermokipioy: meiwsi_ekpompwn_thermokipioy,
                    allos_deiktis1: allos_deiktis1, allos_deiktis2: allos_deiktis2, allos_deiktis3: allos_deiktis3, allos_deiktis4: allos_deiktis4, allos_deiktis5: allos_deiktis5,
                }, {
                    where: {
                        id: ekthesi_id
                    }, include: [{ model: database.ekthesi }], returning: true, plain: true
                })
                //console.log(req.sessionID)

                //console.log(ekthesi.dataValues)
                if (!ekthesi) {
                    res.status(404).send("Error in updating ekthesi.");
                } else {
                    res.send({ redirect: "../user_views/history" });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

function setPdfImage(fieldName) {
    console.log(fieldName);
    if (fieldName) {
        return ({
            image: './public/img/gr-' + fieldName + '.jpg',
            width: 100,
            height: 100
        });
    }
}

function buildTableBody(data) {
    var body = [];
    for (var i in data) {
        body.push(data[i].temp);
    }
    console.log(body);
    return body;
}

module.exports = routes;