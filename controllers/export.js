const fs = require('fs');

exports.exportPDF = (async function (req, res, next) {

    let data = req.body;//assign req.body to variable
    let keys = Object.keys(data);//get keys 
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
    let value, key;
    for (i in keys) {//iterate through keys
        // console.log(i + " " + keys[i])
        if (keys[i].includes("field_14_arthro")) {
            value = data[keys[i]];//get value from pair
            key = keys[i];//get key 
            field_14_arthro.push({ key: value });
        } else if (keys[i].includes("field_14_stoxos")) {
            value = data[keys[i]];
            key = keys[i];
            field_14_stoxos.push({ key: value });
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

        pageSize: 'A2',
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

                { text: '8. Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης; \n\n', decoration: 'underline' },
                { text: '8.1 βραχυπρόθεσμοι: \n\n', decoration: 'underline' },
                { text: data.field_8_1 + "\n\n" },
                { text: '8.2 μακροπρόθεσμοι: \n\n', decoration: 'underline' },
                { text: data.field_8_2 + "\n\n" },
                { text: '9. Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης \n\n', decoration: 'underline' },
                exportTables9(data,keys),
                createTableFieldNine('ΑΛΛΟΙ ΠΡΟΤΕΙΝΟΜΕΝΟΙ ΔΕΙΚΤΕΣ', req.body.allos_deiktis1, req.body.allos_deiktis1_year1, req.body.allos_deiktis1_year2, req.body.allos_deiktis1_year3, req.body.allos_deiktis1_year4, req.body.allos_deiktis1_year5, '654', '84684'),
                { text: "\n\n" },
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

                createTable('Άρθρο', 'Στόχος', field_14_arthro, field_14_stoxos), //create table for field 14
                // createTable('Άρθρο','Στόχος',field_14_arthro, field_14_stoxos), //create table for field 29
                // createTable('Άρθρο','Στόχος',field_14_arthro, field_14_stoxos), //create table for field 30
                // createTable('Άρθρο','Στόχος',field_14_arthro, field_14_stoxos), //create table for field 31
                // createTable('Άρθρο','Στόχος',field_14_arthro, field_14_stoxos), //create table for field 32


                // layout: 'lightHorizontalLines', // optional
                // table: {
                //     // headers are automatically repeated if the table spans over multiple pages
                //     // you can declare how many rows should be treated as headers
                //     headerRows: 2,
                //     widths: ['*', '*'],

                //     body: [
                //         ['Άρθρο', 'Στόχος'],
                //         [
                //             buildTableBody(field_14_arthro,['key','value'])                                
                //         ]
                //         //[buildTableBody(field_14_arthro, field_14_stoxos)]
                //     ]
                // }

                //buildTableBody(field_14_arthro, field_14_stoxos)
                { text: '18. Οφέλη αξιολογούμενης ρύθμισης \n\n', decoration: 'underline' },
                createCheckBoxTable('ΟΦΕΛΗ ΡΥΘΜΙΣΗΣ', 'ΑΜΕΣΑ', 'Αύξηση εσόδων', req.body.field_18_amesa_esoda_thesmoi, req.body.field_18_amesa_esoda_oikonomia, req.body.field_18_amesa_esoda_kinonia, req.body.field_18_amesa_esoda_perivallon, req.body.field_18_amesa_esoda_nisiwtika),

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


function setPdfImage(fieldName) {
    if (fieldName) {
        return ({
            image: './public/img/gr-' + fieldName + '.jpg',
            width: 100,
            height: 100
        });
    }
}

function createTable(header1, header2, article, goal) {
    var rows = [];
    rows.push(['#', header1, header2]);

    for (var i in article) {
        rows.push([i, article[i].key, goal[i].key]);
    }
    console.log(rows)
    var table = {
        //layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: rows
        }

    }
    return table;
}

function createTableFieldNine(tableGroup, tableName, val1, val2, val3, val4, val5, val6, val7) {
    var rows = [];
    rows.push([tableGroup, 'Εξέλιξη την τελευταία 5ετία', 'Πρόσφατα στοιχεία', 'Επιδιωκόμενος στόχος (3ετία)']);
    rows.push([tableName, ['έτος 1: ' + val1, 'έτος 2: ' + val2, 'έτος 3: ' + val3, 'έτος 4: ' + val4, 'έτος 5: ' + val5], val6, val7]);

    var table = {
        //layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: rows
        }

    }
    return table;
}

function createCheckBoxTable(tableHeader, tableGroup, rowName, val1, val2, val3, val4, val5) {
    var params = [val1, val2, val3, val4, val5]
    
    var rows = [];
    var checked = [];    
    //rows.push([tableHeader, tableGroup, rowName]);
    rows.push(['#', 'ΘΕΣΜΟΙ ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ', 'ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ', 'ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ', 'ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ', 'ΝΗΣΙΩΤΙΚΟΤΗΤΑ']);
    
    for (var i in params) {        
        if (params[i]) { //if checkbox is checked
            console.log(params[i])
            checked.push('√')
        } else {
            checked.push('X')
        }
    }    
    checked.unshift(rowName);//rowName as 1st element     
    if (checked && checked.length) {
        rows.push(checked);//push whole row 
    }
    console.log(rows)

    var table = {
        //layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            body: rows,
            widths: ['*', '*', '*', '*', '*', '*']
            // styles: {
            //     tableHeader: {
            //         alignment: 'center'
            //     },
            // }    
        }    
    }
    return table;
}

function exportTables9 (data,keys) {
    var table = [];
    var row = [];
    var prefix;
    for (var i in keys) {

        if (keys[i].includes('_header')) {
            row.push(data[keys[i]]);//might get duplicates?
        }

        if (keys[i].includes('_label')) {
            if (row) {
                table.push([row]);//found header, hence a new table. Push row to table and then empty. 
                row = [];
            }
            prefix = keys[i].split('_label');
            prefix = prefix.slice(0,-1);//remove last character, a comma produced by split()
        }

        if (prefix) {
            if (keys[i].includes(prefix)) {//group same row elements
                row.push([data[keys[i]]]);  
            }
        }                
    }
    console.log( table[0]);
    console.log( table[1]);
    console.log('prefix: '+prefix);
}
