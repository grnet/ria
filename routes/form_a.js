const routes = require('express').Router()
const session = require('express-session');
let database = require('../services/database');
const PDFDocument = require('pdfkit');
const fs = require('fs');

routes.get('/:entry_id', async (req, res, next) => {

    let entry = await database.ekthesi.findOne({
        where: {
            id: req.params.entry_id
        }, include: [{ model: database.rythmiseis }, { model: database.field_9 }]
    })
    // var myFile = fs.readFile("./" + entry.field_23_upload[0] , function (err,data){
    //     res.contentType("application/pdf");
    //     console.log(data)
    // });
    //https://bezkoder.com/node-js-express-file-upload/
    //https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express?rq=1
    //console.log("myFile: " + myFile)
    //res.sendFile("./" + entry.field_23_upload[0], { root : 'uploads'});
    var url = "/:" + req.params.entry_id

    //const filename = await pdf(url, req);
    //res.contentType("application/pdf");
    //res.sendFile(path.join(__dirname, filename)); // if 'public/temp/...' path is not relative to cur dir, make relevant change here.
    //console.log(entry) , file:myFile
    if (entry && entry.dataValues) {
        req.session.ekthesi_id = req.params.entry_id;
        res.render("form_a", { data: entry.dataValues, rolos: req.session.rolos });
    } else {
        res.status(404).send("Not found")
    }
});

routes.post('/:entry_id', async (req, res, next) => {
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
    var fs = require('fs');

    var docDefinition = {
        watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
        content: [
            [               
                {
                    toc: {
                        title: {text: 'Πίνακας περιεχομένων', style: ['header', {bold: true}], fontSize: 18, decoration: 'underline', },
                    }
                },
                {
                    text: 'Αρχική σελίδα',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: {bold: true},
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                    {text: "\n\n" + 'Τίτλος αξιολογούμενης ρύθμισης: ' + data.title +"\n\n" +  'Ονοματεπώνυμο συγγραφέα: ' + req.session.lname + ' ' + req.session.fname +"\n\n" + 
                    'Επισπεύδον φορέας: ' + data.epispeudon_foreas +"\n\n" + 'Ρύθμιση την οποία αφορά: ' + data.rythmisi_pou_afora +"\n\n" + 'Στοιχεία επικοινωνίας: ' + data.stoixeia_epikoinwnias +"\n\n"}, //, pageBreak:'after',                                    
        
                {
                    text: 'Αιτολογική έκθεση',
                    style: 'header',
                    fontSize: 17,
                    tocItem: true,
                    tocStyle: {bold: true},
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                {text: "\n\n" + '1. Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση; \n' + data.field_1 +"\n\n" +  '2. Γιατί αποτελεί πρόβλημα; \n' + data.field_2 +"\n\n" + 
                '3. Ποιους φορείς ή πληθυσμιακές ομάδες αφορά; \n' + data.field_3 +"\n\n" + '4. Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; \n' + data.field_4 +"\n\n" + '4.1 Ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα; \n' + data.field_4_comments +"\n\n"
                + '5. Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας: \n'+ '5.1 με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης; \n' + data.field_5_1 +"\n\n" }, //, pageBreak:'after',                                    
        
                {
                    text: 'Έκθεση ΓΛΚ',
                    tocItem: true,
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                'TODO: get glk data',
            
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
    pdfDoc.pipe(fs.createWriteStream('pdfmake.pdf'));
    pdfDoc.end();

    res.send({ redirect: "./user_views/history" });
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
module.exports = routes;