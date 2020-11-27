const routes = require('express').Router()
const PDFDocument = require('pdfkit');
const fs = require('fs');

routes.get('/:entry_id', async (req, res, next) => {
    var data = req.body;
    console.log(data)
    // Create a document
    // const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // doc.pipe(fs.createWriteStream('output.pdf'));

    // Embed a font, set the font size, and render some text
    //find more fonts here: https://fonts.google.com/#UsePlace:use/Collection:Cardo
    // let fontpath = ('Roboto-Regular.ttf');
    // doc.font(fontpath);

    // doc.text(`Τίτλος έκθεσης: `+data.title, {
    //     width: 410,
    //     align: 'left'
    // });
    // doc.end();

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
                { text: 'Εάν είναι έμμεση, εξηγήστε: \n\n', decoration: 'underline'}, 
                { text: data.field_10_emmesi_comments +"\n\n"},
                { text: '11. Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού); \n\n', decoration: 'underline'}, 
                { text: data.field_11 +"\n\n"},    
                { text: 'Εξηγήστε: \n\n', decoration: 'underline'}, 
                { text: data.field_11_comments +"\n\n"}, 
                { text: '12. Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα; \n\n', decoration: 'underline'}, 
                { text: data.field_12 +"\n\n"}, 
                { text: 'Εξηγήστε: \n\n', decoration: 'underline'}, 
                { text: data.field_12_comments +"\n\n"},
                { text: '13. Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος; \n\n', decoration: 'underline'}, 
                { text: data.field_13 +"\n\n"},         
                { text: 'Εξηγήστε: \n\n', decoration: 'underline'}, 
                { text: data.field_13_comments +"\n\n"},                                                    
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
                            width:  '*',
                            text: 'Iraklis Varlamis',
                            fontSize: 17,           
                        },
                        {
                            // auto-sized columns have their widths based on their content
                            width:  '*',
                            text: 'Ioannis V. Psarras',
                            fontSize: 17,           
                        },
                        {
                            width:  '*',
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

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdf_name = data.title+'.pdf';
    pdfDoc.pipe(fs.createWriteStream('../'+pdf_name));
    pdfDoc.end();

    res.download(pdf_name);
})

module.exports = routes;