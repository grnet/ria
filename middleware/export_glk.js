const fs = require('fs');
let database = require('../services/database');
let path = require('path');
var PdfPrinter = require('../node_modules/pdfmake/src/printer');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
const htmlToPdfmake = require("html-to-pdfmake");

exports.exportGlk = (async function (req, res, next) {
    let data = req.body;

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

        pageSize: 'A4',
        styles: {
            headerStyle: {
                fontSize: 15,
                alignment: 'left',
                decoration: 'underline',
            },
            labelStyle: {
                fontSize: 13,
                alignment: 'left',
                decoration: 'underline'
            },
            signatoryStyle: {
                fontSize: 13,
                alignment: 'left',
            },
            textStyle: {
                fontSize: 11,
                alignment: 'left'

            },
        },

        content: [
            [
                {
                    toc: {
                        title: { text: 'Πίνακας περιεχομένων', style: ['header', { bold: true }], fontSize: 18, decoration: 'underline', },
                    }
                },

                {
                    text: 'Β. Έκθεση Γενικού Λογιστηρίου του Κράτους (άρθρο 75 παρ. 1 ή 2 του Συντάγματος)',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: 'Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου', style: 'labelStyle' },
                { text: '\n\n' },
                { text: req.body.field_15_sxedio_nomou + '\n\n', style: 'textStyle' },
                { text: 'του Υπουργείου: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: req.body.field_15_ypoyrgeio + '\n\n', style: 'textStyle' },
                { text: '15.Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης ', style: 'labelStyle' },
                { text: '\n\n' },
                htmlToPdfmake(req.body.field_15_rythmiseis, { window: window, replaceText: function (text, nodes) { return text.replace(/(?:\r\n|\r|\n)/g, '<br>'); } }),
                { text: '\n\n' },

                { text: '16.Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Επί του Κρατικού Προϋπολογισμού ', style: 'labelStyle' },
                { text: '\n\n' },
                htmlToPdfmake(req.body.field_16_kratikos_proypologismos, { window: window, replaceText: function (text, nodes) { return text.replace(/(?:\r\n|\r|\n)/g, '<br>'); } }),
                { text: '\n\n' },
                { text: 'Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'labelStyle' },
                { text: '\n\n' },
                htmlToPdfmake(req.body.field_16_proypologismos_forea, { window: window, replaceText: function (text, nodes) { return text.replace(/(?:\r\n|\r|\n)/g, '<br>'); } }),
                { text: '\n\n' },
                { text: 'Ο/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: req.body.field_16_genikos_onoma + ' ' + req.body.field_16_genikos_epitheto, style: 'signatoryStyle', alignment: 'center'},
                { text: '\n\n\n\n' },
                { text: req.body.field_16_genikos_date, style: 'signatoryStyle', alignment:'center' }
            ]
        ]
    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    var pdf_name = data.glk_pdf_name + '.pdf';
    //pdf_name = pdf_name.replace(/\s+/g, '');
    var export_path = 'public/pdf_exports/';
    var pdf_path = path.resolve(export_path, pdf_name);
    pdf_path = path.resolve(export_path, pdf_name);
    pdfDoc.pipe(fs.createWriteStream(pdf_path));
    pdfDoc.end();

    if (fs.existsSync(pdf_path)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);

    }
})
