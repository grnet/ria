const fs = require('fs');
let database = require('../services/database');
let path = require('path');
const PDFMerger = require('pdf-merger-js');
//const { sign } = require('crypto');

exports.exportPDF = (async function (req, res, next) {
    let data = req.body;//assign req.body to variable
    
    let field_15_rythmiseis = stripHTML(data.field_15_rythmiseis);
    let field_16_kratikos_proypologismos = stripHTML(data.field_16_kratikos_proypologismos);
    let field_16_proypologismos_forea = stripHTML(data.field_16_proypologismos_forea);
    let field_17_oikonomika_apotelesmata = stripHTML(data.field_17_oikonomika_apotelesmata);

    let keys = Object.keys(data);//get keys 
    let field_14_arthro = [];
    let field_14_stoxos = [];
    let field_17_onoma = [];
    let field_17_epitheto = [];
    let field_17_idiotita = [];
    let minister_surname = [];
    let minister_name = [];
    let ministry = [];
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
    let table = [];
    let row = [];
    let prefix, header, secondHeader;
    let cbxtable = [];
    let cbxrow = [];
    let cbxlabels = [];
    let cbxprefix, cbxHeader, cbxsecondHeader;
    for (i in keys) {//iterate through keys
        if (keys[i].includes("field_14_arthro")) {
            value = data[keys[i]];//get value from pair
            key = keys[i];//get key 
            field_14_arthro.push({ [key]: value });
        } else if (keys[i].includes("field_14_stoxos")) {
            value = data[keys[i]];
            key = keys[i];
            field_14_stoxos.push({ [key]: value });
        } else if (keys[i].includes("field_17_onoma")) {
            value = data[keys[i]];
            key = keys[i];
            field_17_onoma.push({ [key]: value });
        } else if (keys[i].includes("field_17_epitheto")) {
            value = data[keys[i]];
            key = keys[i];
            field_17_epitheto.push({ [key]: value });
        } else if (keys[i].includes("field_17_idiotita")) {
            value = data[keys[i]];
            key = keys[i];
            field_17_idiotita.push({ [key]: value });
        } else if (keys[i].includes("minister_name")) {
            value = data[keys[i]];
            key = keys[i];
            minister_name.push({ [key]: value });
        } else if (keys[i].includes("minister_surname")) {
            value = data[keys[i]];
            key = keys[i];
            minister_surname.push({ [key]: value });
        } else if (keys[i].includes("ministry")) {
            value = data[keys[i]];
            key = keys[i];
            ministry.push({ [key]: value });
        } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
            value = data[keys[i]];
            key = keys[i];
            field_29_diatakseis_rythmisis.push({ [key]: value });
        } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
            value = data[keys[i]];
            key = keys[i];
            field_29_yfistamenes_diatakseis.push({ [key]: value });
        } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
            value = data[keys[i]];
            key = keys[i];
            field_30_diatakseis_katargisi.push({ [key]: value });
        } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
            value = data[keys[i]];
            key = keys[i];
            field_30_katargoumenes_diatakseis.push({ [key]: value });
        } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
            value = data[keys[i]];
            key = keys[i];
            field_31_sxetiki_diataksi.push({ [key]: value });
        } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
            value = data[keys[i]];
            key = keys[i];
            field_31_synarmodia_ypoyrgeia.push({ [key]: value });
        } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
            value = data[keys[i]];
            key = keys[i];
            field_31_antikeimeno_synarmodiotitas.push({ [key]: value });
        } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
            value = data[keys[i]];
            key = keys[i];
            field_32_eksousiodotiki_diataksi.push({ [key]: value });
        } else if (keys[i].includes("field_32_eidos_praksis")) {
            value = data[keys[i]];
            key = keys[i];
            field_32_eidos_praksis.push({ [key]: value });
        } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
            value = data[keys[i]];
            key = keys[i];
            field_32_armodio_ypoyrgeio.push({ [key]: value });
        } else if (keys[i].includes("field_32_antikeimeno")) {
            value = data[keys[i]];
            key = keys[i];
            field_32_antikeimeno.push({ [key]: value });
        } else if (keys[i].includes("field_32_xronodiagramma")) {
            value = data[keys[i]];
            key = keys[i];
            field_32_xronodiagramma.push({ [key]: value });
        }
        if (keys[i].includes('_label')) {//label acts as a row separator
            if (row.length) {
                if (header) {
                    row.push(header);
                    header = null;
                }
                if (secondHeader) {
                    row.push(secondHeader);
                    secondHeader = null;
                }
                table.push(row);//found label, hence a new row. Push row to table and then empty. 
                row = [];
            }
            prefix = keys[i].split('_label');
            prefix = prefix.slice(0, -1);//remove last character, a comma produced by split()
        }
        if (prefix) {
            if (keys[i].includes(prefix)) {
                if (keys[i].includes('_header')) {//field is table's header
                    header = data[keys[i]];
                } else if (keys[i].includes('_secondHeader')) {//field is table's header
                    secondHeader = data[keys[i]];
                } else if (data[keys[i]]) {
                    row.push(data[keys[i]]);
                } else {
                    if (!keys[i].includes('_label')) {
                        row.push(' ');//value is undefined
                    }
                }
            }
        }

        if (keys[i].includes('_cbxlabel')) {//gather all labels from tables with checkboxes
            cbxprefix = keys[i].split('_cbxlabel');
            cbxprefix = cbxprefix.slice(0, -1);//remove last character, a comma produced by split()
            cbxlabels.push(cbxprefix);
        }
    }

    for (var i in cbxlabels) {
        for (var j in keys) {

            if (keys[j].includes('_cbxlabel') && (keys[j].includes(cbxlabels[i]))) {//if label is target cbxlabel
                if (cbxrow.length) {
                    if (cbxHeader) {
                        cbxrow.push(cbxHeader);
                        cbxHeader = null;
                    }
                    if (cbxsecondHeader) {
                        cbxrow.push(cbxsecondHeader);
                        cbxsecondHeader = null;
                    }
                    cbxtable.push(cbxrow);
                    cbxrow = [];
                }
            }

            if (keys[j].includes(cbxlabels[i])) {
                if (keys[j].includes('_cbxHeader')) {
                    cbxHeader = data[keys[j]];
                } else if (keys[j].includes('_cbxsecondHeader')) {
                    cbxsecondHeader = data[keys[j]];
                } else if (keys[j].includes('_cbxlabel')) {
                    cbxrow.push(data[keys[j]]);
                } else if (data[keys[j]]) {
                    cbxrow.push('√');
                } else {
                    cbxrow.push(' ');//value is undefined
                }

            }
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

        pageSize: 'A4',
        //watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
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
                    text: 'Αρχική σελίδα',
                    style: 'header',
                    fontSize: 16,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                {
                    text: "\n\n" + 'Τίτλος αξιολογούμενης ρύθμισης: ' + data.title + "\n\n" + 'Ονοματεπώνυμο συγγραφέα: ' + req.session.lname + ' ' + req.session.fname + "\n\n" +
                        'Αρχική καταχώρηση: ' + data.initial_submit + "\n\n" + 'Τελευταία ενημέρωση: ' + data.last_updated + "\n\n" +
                        'Επισπεύδων φορέας: ' + data.epispeudon_foreas + "\n\n" + 'Ρύθμιση την οποία αφορά: ' + data.rythmisi_pou_afora + "\n\n" + 'Στοιχεία επικοινωνίας: ' + data.stoixeia_epikoinwnias + "\n\n", style: 'textStyle'
                }, //, pageBreak:'after',                                    

                {
                    text: 'Α. Αιτολογική έκθεση',
                    style: 'header',
                    fontSize: 16,
                    tocItem: true,
                    tocStyle: { bold: true },
                    decoration: 'underline',
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                { text: '\n\n' },
                { text: '1. Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση; ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_1 + '\n\n', style: 'textStyle' }, //, pageBreak:'after',  
                { text: '2. Γιατί αποτελεί πρόβλημα; ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_2 + '\n\n', style: 'textStyle' },
                { text: '3. Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_3 + '\n\n', style: 'textStyle' },
                { text: '4. Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_4),
                { text: '\n\n' },
                { text: '4.1 Ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα;', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_4_comments + '\n\n', style: 'textStyle' },
                { text: '5. Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας:', style: 'labelStyle' },
                { text: '\n\n' },
                { text: '5.1 με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης; ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_5_1 + '\n\n', style: 'textStyle' },
                { text: '5.2 με αλλαγή διοικητικής πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας; ', decoration: 'underline', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_5_2 + '\n\n', style: 'textStyle' },
                { text: '5.3 με διάθεση περισσότερων ανθρώπινων και υλικών πόρων;', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_5_3 + '\n\n', style: 'textStyle' },
                { text: '6. Έχετε λάβει υπόψη συναφείς πρακτικές; ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_6),
                { text: '\n\n' },
                { text: '6.1 Σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_6_1 + '\n\n', style: 'textStyle' },
                { text: '6.2 Σε όργανα της Ε.Ε.: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_6_2 + '\n\n', style: 'textStyle' },
                { text: '\n\n' },
                { text: '6.3 Σε διεθνείς οργανισμούς:', style: 'labelStyle' },
                { text: data.field_6_3 + '\n\n', style: 'textStyle' },
                { text: '\n\n' },
                { text: '7. Σημειώστε ποιοι από τους στόχους βιώσιμης ανάπτυξης των Ηνωμένων Εθνών επιδιώκονται με την αξιολογούμενη ρύθμιση:', decoration: 'underline', style: 'labelStyle' },
                { text: '\n\n' },
                exportColumns(data),
                { text: '\n\n' },
                { text: '8. Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης; ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: '8.1 βραχυπρόθεσμοι: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_8_1 + '\n\n', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_8_2 + '\n\n', style: 'textStyle' },
                { text: '9. Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης ', style: 'labelStyle' },
                { text: '\n\n' },
                exportStaticTables(table),
                { text: '\n\n' },
                { text: '10. Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης:', style: 'labelStyle' },
                { text: '\n\n' },
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
                { text: 'Εάν είναι άμεση, εξηγήστε: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_10_amesi_comments + '\n\n' },
                { text: 'Εάν είναι έμμεση, εξηγήστε: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_10_emmesi_comments + '\n\n' },
                { text: '11. Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού); ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_11),
                { text: '\n\n' },
                { text: 'Εξηγήστε: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_11_comments + '\n\n' },
                { text: '12. Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα; ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_12),
                { text: '\n\n' },
                { text: 'Εξηγήστε: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_12_comments + '\n\n' },
                { text: '13. Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος; ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_13),
                { text: '\n\n' },
                { text: 'Εξηγήστε: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_13_comments + '\n\n' },

                { text: '14. Σύνοψη στόχων κάθε άρθρου ', style: 'labelStyle' },
                { text: '\n\n' },
                createDynamicTwoColumnTable('Άρθρο', 'Στόχος', field_14_arthro, field_14_stoxos), //create table for field 14                                

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
                { text: field_15_rythmiseis + '\n\n' },

                { text: '16.Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Επί του Κρατικού Προϋπολογισμού ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: field_16_kratikos_proypologismos + '\n\n', style: 'textStyle' },
                { text: 'Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: field_16_proypologismos_forea + '\n\n', style: 'textStyle' },
                { text: 'Ο/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ', style: 'labelStyle' },
                { text: '\n\n' },
                {
                    columns:
                        [{ text: req.body.field_16_genikos_onoma, style: 'textStyle' }, { text: req.body.field_16_genikos_epitheto, style: 'textStyle' }, { text: req.body.field_16_genikos_date, style: 'textStyle' }],
                    columnGap: 20, width: '*'
                },

                {
                    text: 'Γ. Ειδική Έκθεση (άρθρο 75 παρ. 3 του Συντάγματος)',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: 'Στο σχέδιο νόμου ή στην τροπολογία επί του σχεδίου νόμου', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_17_sxedio_nomou + '\n\n', style: 'textStyle' },
                { text: 'του Υπουργείου: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_17_ypoyrgeio + '\n\n', style: 'textStyle' },
                { text: '17.Οικονομικά αποτελέσματα ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: field_17_oikonomika_apotelesmata+ '\n\n\n', style: 'textStyle' }, ,
                { text: 'ΟΙ ΥΠΟΥΡΓΟΙ', style: 'labelStyle' },
                { text: "\n\n" },
                createSignatories(field_17_onoma, field_17_epitheto, field_17_idiotita),


                {
                    text: 'Δ. Έκθεση γενικών συνεπειών',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '18.Οφέλη αξιολογούμενης ρύθμισης', style: 'labelStyle' },
                { text: '\n\n' },
                exportChckbxTables(cbxtable),

                {
                    text: 'Ε. Έκθεση διαβούλευσης',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '22.Διαβούλευση κατά τη διάρκεια της νομοπαρασκευαστικής διαδικασίας από την έναρξη κατάρτισης της αξιολογούμενης ρύθμισης μέχρι την υπογραφή από τους συναρμόδιους Υπουργούς \n\n', style: 'labelStyle' },
                { text: 'Συνεργασία με άλλα υπουργεία / υπηρεσίες \n\n', style: 'labelStyle' },
                { text: data.field_22_sinergasia_ypoyrgeiwn + '\n\n', style: 'textStyle' },
                { text: 'Συνεργασία με κοινωνικούς φορείς / Ανεξάρτητες Αρχές \n\n', style: 'labelStyle' },
                { text: data.field_22_sinergasia_forewn_arxwn + '\n\n', style: 'textStyle' },
                { text: 'Διεθνής διαβούλευση \n\n', style: 'labelStyle' },
                { text: data.field_22_diethnis_diavouleusi + '\n\n', style: 'textStyle' },

                { text: '23.Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης) \n\n', style: 'labelStyle' },
                { text: 'Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμιση ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Αριθμός συμμετασχόντων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_symmetasxontes + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που υιοθετήθηκαν ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_sxolia_yiothetithikan + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που δεν υιοθετήθηκαν ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_sxolia_den_yiothetithikan + '\n\n', style: 'textStyle' },

                { text: 'Επί των άρθρων της αξιολογούμενης ρύθμισης \n\n', style: 'labelStyle' },
                { text: 'Αριθμός συμμετασχόντων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arthra_symmetasxontes + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που υιοθετήθηκαν ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arthra_sxolia_yiothetithikan + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που δεν υιοθετήθηκαν ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_23_arthra_sxolia_den_yiothetithikan + '\n\n', style: 'textStyle' },

                {
                    text: 'Στ. Έκθεση νομιμότητας',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '24.Συναφείς συνταγματικές διατάξεις ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_24 + '\n\n', style: 'textStyle' },

                { text: '25.Ενωσιακό δίκαιο ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Πρωτογενές ενωσιακό δίκαιο (συμπεριλαμβανομένου του Χάρτη Θεμελιωδών Δικαιωμάτων) ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_25_dikaio_comment + '\n\n', style: 'textStyle' },
                { text: 'Κανονισμός ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_25_kanonismos_comment + '\n\n', style: 'textStyle' },
                { text: 'Οδηγία ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_25_odigia_comment + '\n\n', style: 'textStyle' },
                { text: 'Απόφαση ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_25_apofasi_comment + '\n\n', style: 'textStyle' },

                { text: '26.Συναφείς διατάξεις διεθνών συνθηκών ή συμφωνιών ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Ευρωπαϊκή Σύμβαση των Δικαιωμάτων του Ανθρώπου ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_26_antrwpina_dikaiwmata_comment + '\n\n', style: 'textStyle' },
                { text: 'Διεθνείς συμβάσεις ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_26_symvaseis_comment + '\n\n', style: 'textStyle' },

                { text: '27.Συναφής νομολογία των ανωτάτων και άλλων εθνικών δικαστηρίων, καθώς και αποφάσεις των Ανεξάρτητων Αρχών ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Ανώτατο ή άλλο εθνικό δικαστήριο  ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_27_dikastirio_comment + '\n\n', style: 'textStyle' },
                { text: 'Ανεξάρτητη Αρχή ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_27_arxi_comment + '\n\n', style: 'textStyle' },

                { text: '28.Συναφής ευρωπαϊκή και διεθνής νομολογία', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Νομολογία Δικαστηρίου Ε.Ε.', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_28_nomologia_comment + '\n\n', style: 'textStyle' },
                { text: 'Νομολογία Ευρωπαϊκού Δικαστηρίου Δικαιωμάτων του Ανθρώπου', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_28_nomologia_dikaiwmatwn_anthrwpou_comment + '\n\n', style: 'textStyle' },
                { text: 'Άλλα ευρωπαϊκά ή διεθνή δικαστήρια ή διαιτητικά όργανα ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_28_alla_dikastiria_comment + '\n\n', style: 'textStyle' },


                {
                    text: 'Ζ. Πίνακας τροποποιούμενων ή καταργούμενων διατάξεων',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '29.Τροποποίηση – αντικατάσταση – συμπλήρωση διατάξεων', style: 'labelStyle' },
                { text: '\n\n' },
                createDynamicTwoColumnTable('Διατάξεις αξιολογούμενης ρύθμισης', 'Υφιστάμενες διατάξεις', field_29_diatakseis_rythmisis, field_29_yfistamenes_diatakseis),
                { text: '\n\n' },
                { text: '30.Κατάργηση διατάξεων', style: 'labelStyle' },
                { text: '\n\n' },
                createDynamicTwoColumnTable('Διατάξεις αξιολογούμενης ρύθμισης που προβλέπουν κατάργηση', 'Καταργούμενες διατάξεις', field_30_diatakseis_katargisi, field_30_katargoumenes_diatakseis),
                { text: '\n\n' },

                {
                    text: 'Η. Έκθεση εφαρμογής της ρύθμισης',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '31.Συναρμοδιότητα Υπουργείων / υπηρεσιών / φορέων', style: 'labelStyle' },
                { text: '\n\n' },
                createDynamicThreeColumnTable('Σχετική διάταξη αξιολογούμενης ρύθμισης', 'Συναρμόδια Υπουργεία – Συναρμόδιες υπηρεσίες / φορείς', 'Αντικείμενο συναρμοδιότητας', field_31_sxetiki_diataksi, field_31_synarmodia_ypoyrgeia, field_31_antikeimeno_synarmodiotitas),
                { text: '\n\n' },
                { text: '32.Έκδοση κανονιστικών πράξεων και εγκυκλίων', style: 'labelStyle' },
                { text: '\n\n' },
                createDynamicFiveColumnTable('Εξουσιοδοτική διάταξη', 'Είδος πράξης', 'Αρμόδιο ή επισπεύδον Υπουργείο ή υπηρεσία', 'Αντικείμενο', 'Χρονοδιάγραμμα (ενδεικτική ή αποκλειστική προθεσμία)', field_32_eksousiodotiki_diataksi, field_32_eidos_praksis, field_32_armodio_ypoyrgeio, field_32_antikeimeno, field_32_xronodiagramma),
                { text: '\n\n\n\n' },

                { text: 'Ανάγκη σύστασης νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας', style: 'labelStyle' },
                { text: '\n\n' },
                { text: '33.Ποιες διατάξεις της αξιολογούμενης ρύθμισης προβλέπουν τη σύσταση νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας;', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_33 + '\n\n', style: 'textStyle' },
                { text: '34.Γιατί προτείνεται η σύσταση αυτού του νέου οργάνου και δεν επαρκούν οι υφιστάμενες διοικητικές δομές για να επιτευχθεί ο στόχος της αξιολογούμενης ρύθμισης;', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_34 + '\n\n', style: 'textStyle' },
                { text: '35.Χρόνος έναρξης λειτουργίας του νέου οργάνου: ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_35 + '\n\n', style: 'textStyle' },
                { text: '36. Έχει γίνει η σχετική οικονομοτεχνική μελέτη αναφορικά με τη σύσταση του νέου οργάνου; ', style: 'labelStyle' },
                { text: '\n\n' },
                valIsUndefined(data.field_36),
                { text: '\n\n' },
                { text: 'Στοιχεία νέου νομικού προσώπου, ανώνυμης εταιρίας ή δημόσιας υπηρεσίας', style: 'labelStyle' },
                { text: '\n\n' },
                { text: '37.Επωνυμία ή ονομασία και νομική μορφή', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_37 + '\n\n', style: 'textStyle' },
                { text: '38.Χώρος λειτουργίας του νέου οργάνου', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_38 + '\n\n', style: 'textStyle' },
                { text: '39.Διασφάλιση επαρκούς υλικοτεχνικού & ηλεκτρονικού εξοπλισμού', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_39 + '\n\n', style: 'textStyle' },
                { text: '40.Τρόπος στελέχωσης του νέου οργάνου', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_40 + '\n\n', style: 'textStyle' },

                {
                    text: 'ΟΙ ΥΠΟΥΡΓΟΙ',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                { text: "\n\n" },
                createSignatories(minister_name, minister_surname, ministry),

                {
                    text: 'Παράρτημα',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
            ]
        ]
    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    var pdf_name = data.pdf_name + '.pdf';
    //pdf_name = pdf_name.replace(/\s+/g, '');
    var export_path = 'public/pdf_exports/';
    var pdf_path = path.resolve(export_path, pdf_name);
    pdf_path = path.resolve(export_path, pdf_name);
    pdfDoc.pipe(fs.createWriteStream(pdf_path));
    pdfDoc.end();
    await new Promise(resolve => setTimeout(resolve, 1000));//add some extra delay

    try {
        let entry = await database.ekthesi.findOne({
            where: {
                id: req.params.entry_id
            }
        });
        var merger = new PDFMerger();
        merger.add(pdf_path);
        if (entry.dataValues.field_21_upload) {
            for (i in entry.dataValues.field_21_upload) {

                merger.add('public/uploads/' + entry.field_21_upload[i]);

            }
        }
        if (entry.dataValues.field_23_upload) {
            for (i in entry.dataValues.field_23_upload) {

                merger.add('public/uploads/' + entry.field_23_upload[i]);

            }
        }
        if (entry.dataValues.field_36_upload) {
            for (i in entry.dataValues.field_36_upload) {

                merger.add('public/uploads/' + entry.field_36_upload[i]);

            }
        }
        await merger.save(pdf_path); //save under given name
        // merger.add('./public/pdf_exports/' + pdf_name);
        // merger.add('/home/mariosven/Desktop/As I Lay Dying ( PDFDrive.com ).pdf');
        // merger.add('/home/mariosven/Desktop/jrc_channelling_government_digital_transformation_through_apis_online.pdf');        
        // await merger.save('merged.pdf'); //save under given name

        if (fs.existsSync(pdf_path)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);

        }
    } catch (err) {
        console.log(err)
    }

})

////////////////////////FUNCTIONS////////////////////////////////

function stripHTML (element) {

    element = element.replace(/(<([^>]+)>)/gi, "");
    return element;
}

function valIsUndefined(val) {
    let typeOfVal = typeof val === "undefined" ? {} : { text: val + '\n\n', style: 'textStyle' };
    return (val);
}

function exportColumns(data) {
    var columns = [];
    columns.push( {
        columns: [setGoalImage(data.field_7_goal_1, 'goal-1'), setGoalImage(data.field_7_goal_2, 'goal-2'), setGoalImage(data.field_7_goal_3, 'goal-3'), setGoalImage(data.field_7_goal_4, 'goal-4'), setGoalImage(data.field_7_goal_5, 'goal-5')
        ], columnGap: 10
    },
    {
        columns: [setGoalImage(data.field_7_goal_6, 'goal-6'), setGoalImage(data.field_7_goal_7, 'goal-7'), setGoalImage(data.field_7_goal_8, 'goal-8'), setGoalImage(data.field_7_goal_9, 'goal-9'), setGoalImage(data.field_7_goal_10, 'goal-10')
        ], columnGap: 10
    },
    {
        columns: [setGoalImage(data.field_7_goal_11, 'goal-11'), setGoalImage(data.field_7_goal_12, 'goal-12'), setGoalImage(data.field_7_goal_13, 'goal-13'), setGoalImage(data.field_7_goal_14, 'goal-14'), setGoalImage(data.field_7_goal_15, 'goal-15')
        ], columnGap: 10
    },
    {
        columns: [setGoalImage(data.field_7_goal_16, 'goal-16'), setGoalImage(data.field_7_goal_17, 'goal-17')
        ], columnGap: 10
    });
    return columns;
}

function setGoalImage(fieldName,img) {

    let image = `./public/img/gr-${img}.jpg`
    if (fieldName) {
        return ({
            image: image,
            width: 100,
            height: 100
        });
    } else {
        return ({
            image: image,
            width: 100,
            height: 100,
            opacity: 0.15
        });
    }
}

function createDynamicTwoColumnTable(header1, header2, val1, val2) {
    var rows = [];
    rows.push([{ text: header1, alignment: 'center', bold: true }, { text: header2, alignment: 'center', bold: true }]);

    for (var i in val1) {
        rows.push([Object.values(val1[i]), Object.values(val2[i])]);
    }
    var table = {
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: rows
        }
    }
    return table;
}

function createDynamicThreeColumnTable(header1, header2, header3, val1, val2, val3) {
    var rows = [];
    rows.push([{ text: header1, alignment: 'center', bold: true }, { text: header2, alignment: 'center', bold: true }, { text: header3, alignment: 'center', bold: true }]);//push headers

    for (var i in val1) {
        rows.push([Object.values(val1[i]), Object.values(val2[i]), Object.values(val3[i])]);//push values
    }
    var table = {
        table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: rows
        }
    }
    return table;
}

function createDynamicFiveColumnTable(header1, header2, header3, header4, header5, val1, val2, val3, val4, val5) {
    var rows = [];
    rows.push([{ text: header1, alignment: 'center', bold: true }, { text: header2, alignment: 'center', bold: true }, { text: header3, alignment: 'center', bold: true }, { text: header4, alignment: 'center', bold: true }, { text: header5, alignment: 'center', bold: true }]);//push headers
    for (var i in val1) {
        rows.push([Object.values(val1[i]), Object.values(val2[i]), Object.values(val3[i]), Object.values(val4[i]), Object.values(val5[i])]);//push values
    }
    var table = {
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: rows
        }
    }
    return table;
}

function createStaticTable(table) {
    var rows = [];
    var years = ['έτος 1: ' + table[1], 'έτος 2: ' + table[2], 'έτος 3: ' + table[3], 'έτος 4: ' + table[4], 'έτος 5: ' + table[5]];

    if (table[8]) {
        rows.push([{ text: table[8], alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Εξέλιξη την τελευταία 5ετία', alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Πρόσφατα στοιχεία', alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Επιδιωκόμενος στόχος (3ετία)', alignment: 'center', fillColor: '#87CEEB', bold: true }]);
    }
    if (table[9]) {

        rows.push([{ text: table[9], colSpan: 4, alignment: 'center', bold: true }]);
    }


    rows.push([table[0], years, table[6], table[7]]);
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

function exportStaticTables(table) {

    var tables = [];
    for (i in table) {
        tables.push(createStaticTable(table[i]));
    }
    return tables;
}


function exportChckbxTables(table) {

    var tables = [];
    for (i in table) {
        tables.push(createChckbxTable(table[i]));
    }
    return tables;
}

function createChckbxTable(table) {
    var rows = [];
    var header = 0;
    if (table[6]) {
        rows.push([{ text: table[6], fillColor: '#7bb661', alignment: 'center', bold: true, colSpan: 5 }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
        header++;
    }
    if (table[7]) {
        rows.push([{ text: table[7], colSpan: 5, fillColor: '#7bb661', alignment: 'center', bold: true }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
        rows.push([{ text: 'ΘΕΣΜΟΙ, ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ, ΔΙΑΦΑΝΕΙΑ', alignment: 'center', bold: true }, { text: 'ΑΓΟΡΑ, ΟΙΚΟΝΟΜΙΑ, ΑΝΤΑΓΩΝΙΣΜΟΣ', alignment: 'center', bold: true }, { text: 'ΚΟΙΝΩΝΙΑ & ΚΟΙΝΩΝΙΚΕΣ ΟΜΑΔΕΣ', alignment: 'center', bold: true }, { text: 'ΦΥΣΙΚΟ, ΑΣΤΙΚΟ ΚΑΙ ΠΟΛΙΤΙΣΤΙΚΟ ΠΕΡΙΒΑΛΛΟΝ', alignment: 'center', bold: true }, { text: 'ΝΗΣΙΩΤΙΚΟΤΗΤΑ', alignment: 'center', bold: true }]);
        header++;
    }
    rows.push([{ text: table[0], colSpan: 5, alignment: 'center', bold: true }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    rows.push([{ text: table[1], alignment: 'center' }, { text: table[2], alignment: 'center' }, { text: table[3], alignment: 'center' }, { text: table[4], alignment: 'center' }, { text: table[5], alignment: 'center' }]);

    var table = {
        table: {
            headerRows: header,
            widths: ['*', '*', '*', '*', '*'],
            body: rows
        }
    }

    return table;
}

function createSignatories(fname, lname, position) {
    var length = fname.length;
    var signatories = [];
    if (length % 2 == 0) {
        for (var i = -1; i < length; i += 2) {
            if (i < 0) {
                continue;
            }
            else if (fname[i - 1]) {
                signatories.push({
                    columns:
                        [{ text: Object.values(fname[i - 1]) + ' ' + Object.values(lname[i - 1]) + '\n\n\n\n\n' + Object.values(position[i - 1]), style: 'signatoryStyle', alignment: 'center' },
                        { text: Object.values(fname[i]) + ' ' + Object.values(lname[i]) + '\n\n\n\n\n' + Object.values(position[i]), style: 'signatoryStyle', alignment: 'center' }
                        ], columnGap: 15, width: '*'
                })
            } else {
                signatories.push({
                    columns:
                        [{ text: Object.values(fname[i]) + ' ' + Object.values(lname[i]) + '\n\n\n\n\n' + Object.values(position[i]), style: 'signatoryStyle', alignment: 'center' }], columnGap: 15, width: '*'
                })
            }
            signatories.push({ text: '\n' })
        }
    } else {
        for (var i = 0; i < length; i += 2) {
            if (fname[i - 1]) {
                signatories.push({
                    columns:
                        [{ text: Object.values(fname[i - 1]) + ' ' + Object.values(lname[i - 1]) + '\n\n\n\n\n' + Object.values(position[i - 1]), style: 'signatoryStyle', alignment: 'center' },
                        { text: Object.values(fname[i]) + ' ' + Object.values(lname[i]) + '\n\n\n\n\n' + Object.values(position[i]), style: 'signatoryStyle', alignment: 'center' },
                        ], columnGap: 15, width: '*'
                })
            } else {
                signatories.push({
                    columns:
                        [{ text: Object.values(fname[i]) + ' ' + Object.values(lname[i]) + '\n\n\n\n\n' + Object.values(position[i]), style: 'signatoryStyle', alignment: 'center' }], columnGap: 15, width: '*'
                })
            }
            signatories.push({ text: '\n' })
        }
    }
    return signatories;
}