const routes = require('express').Router()
let database = require('../services/database');
const fs = require('fs');
const csv = require('csv-parser')

routes.get('/:entry_id', async (req, res, next) => {

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
    if (entry && entry.dataValues&&readCSV) {
        req.session.ekthesi_id = req.params.entry_id;
        res.render("form_a", { data: entry.dataValues, rolos: req.session.rolos, tooltips:readCSV});
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
            normal: './node_modules/pdfmake/fonts/Roboto-Regular.ttf',
            bold: 'node_modules/pdfmake/fonts/Roboto-Bold.ttf',
            italics: 'node_modules/pdfmake/fonts/Roboto-Italic.ttf',
            medium: 'node_modules/pdfmake/fonts/Roboto-Medium.ttf',
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
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*'],

                        body: [
                            //['Άρθρο', 'Στόχος'],
                            //[buildTableBody(field_14_arthro), buildTableBody(field_14_stoxos)],
                            field_14_arthro.forEach(value => {
                                [
                                 { text: value.text, style: 'cell' },
                                 { text: value.status, },
                                ]
                            })    
                        ]
                    }
                },

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

})

routes.put('/:entry_id', async function (req, res, next) {

    ekthesi_id = req.params.entry_id;
    console.log("req.body: " + Object.keys(req.body) + Object.values(req.body));
    console.log("status: " + req.body.status_ekthesis);
    console.log("id: " + req.body.id);
    let ekthesi = await database.ekthesi.update(req.body, {
        where: {
            id: ekthesi_id
        }, include: [{ model: database.rythmiseis }, { model: database.field_9 }], returning: true, plain: true
    })
    //console.log(req.sessionID)

    //console.log(ekthesi.dataValues)
    if (!ekthesi) {
        res.status(404).send("Error in updating ekthesi.");
    } else {
        res.send({ redirect: "./user_views/history" });
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