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
        styles: {
            headerStyle: {
                fontSize: 17,
                alignment: 'left',
                decoration: 'underline',
            },
            labelStyle: {
                fontSize: 15,
                alignment: 'left',
                decoration: 'underline'
            },
            textStyle: {
                fontSize: 13,
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
                        'Επισπεύδων φορέας: ' + data.epispeudon_foreas + "\n\n" + 'Ρύθμιση την οποία αφορά: ' + data.rythmisi_pou_afora + "\n\n" + 'Στοιχεία επικοινωνίας: ' + data.stoixeia_epikoinwnias + "\n\n"
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
                { text: '\n\n' },
                { text: '1. Ποιο ζήτημα αντιμετωπίζει η αξιολογούμενη ρύθμιση; ', decoration: 'underline', },
                { text: '\n\n' },
                { text: data.field_1 + '\n\n' }, //, pageBreak:'after',  
                { text: '2. Γιατί αποτελεί πρόβλημα; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_2 + '\n\n' },
                { text: '3. Ποιους φορείς ή πληθυσμιακές ομάδες αφορά;', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_3 + '\n\n' },
                { text: '4. Το εν λόγω ζήτημα έχει αντιμετωπιστεί με νομοθετική ρύθμιση στο παρελθόν; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_4 + '\n\n' },
                { text: '4.1 Ποιο είναι το ισχύον νομικό πλαίσιο που ρυθμίζει το ζήτημα; \n\n', decoration: 'underline' },
                { text: data.field_4_comments + '\n\n' },
                { text: '5. Γιατί δεν είναι δυνατό να αντιμετωπιστεί στο πλαίσιο της υφιστάμενης νομοθεσίας:', decoration: 'underline' },
                { text: '\n\n' },
                { text: '5.1 με αλλαγή προεδρικού διατάγματος, υπουργικής απόφασης ή άλλης κανονιστικής πράξης; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_5_1 + '\n\n' },
                { text: '5.2 με αλλαγή διοικητικής πρακτικής συμπεριλαμβανομένης της δυνατότητας νέας ερμηνευτικής προσέγγισης της υφιστάμενης νομοθεσίας; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_5_2 + '\n\n' },
                { text: '5.3 με διάθεση περισσότερων ανθρώπινων και υλικών πόρων;', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_5_3 + '\n\n' },
                { text: '6. Έχετε λάβει υπόψη συναφείς πρακτικές; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_6 + '\n\n' },
                { text: '6.1 Σε άλλη/ες χώρα/ες της Ε.Ε. ή του ΟΟΣΑ: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_6_1 + '\n\n' },
                { text: '6.2 Σε όργανα της Ε.Ε.: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_6_2 + '\n\n' },
                { text: '\n\n' },
                { text: '6.3 Σε διεθνείς οργανισμούς:', decoration: 'underline' },
                { text: data.field_6_3 + '\n\n' },
                { text: '7. Σημειώστε ποιοι από τους στόχους βιώσιμης ανάπτυξης των Ηνωμένων Εθνών επιδιώκονται με την αξιολογούμενη ρύθμιση:', decoration: 'underline' },
                { text: '\n\n' },
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

                { text: '8. Ποιοι είναι οι στόχοι της αξιολογούμενης ρύθμισης; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: '8.1 βραχυπρόθεσμοι: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_8_1 + '\n\n' },
                { text: '8.2 μακροπρόθεσμοι: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_8_2 + '\n\n' },
                { text: '9. Ειδικότεροι στόχοι ανάλογα με τον τομέα νομοθέτησης ', decoration: 'underline' },
                { text: '\n\n' },
                //exportStaticTables(data, keys),
                //createTableFieldNine('ΑΛΛΟΙ ΠΡΟΤΕΙΝΟΜΕΝΟΙ ΔΕΙΚΤΕΣ', req.body.allos_deiktis1, req.body.allos_deiktis1_year1, req.body.allos_deiktis1_year2, req.body.allos_deiktis1_year3, req.body.allos_deiktis1_year4, req.body.allos_deiktis1_year5, '654', '84684'),
                { text: '\n\n' },
                { text: '10. Σε περίπτωση που προβλέπεται η χρήση πληροφοριακού συστήματος, ποια θα είναι η συμβολή αυτού στην επίτευξη των στόχων της αξιολογούμενης ρύθμισης:', decoration: 'underline' },
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
                { text: 'Εάν είναι άμεση, εξηγήστε: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_10_amesi_comments + '\n\n' },
                { text: 'Εάν είναι έμμεση, εξηγήστε: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_10_emmesi_comments + '\n\n' },
                { text: '11. Το προβλεπόμενο πληροφοριακό σύστημα είναι συμβατό με την εκάστοτε ψηφιακή στρατηγική της χώρας (Βίβλος Ψηφιακού Μετασχηματισμού); ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_11 + '\n\n' },
                { text: 'Εξηγήστε: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_11_comments + '\n\n' },
                { text: '12. Διασφαλίζεται η διαλειτουργικότητα του εν λόγω πληροφοριακού συστήματος με άλλα υφιστάμενα συστήματα; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_12 + '\n\n' },
                { text: 'Εξηγήστε: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_12_comments + '\n\n' },
                { text: '13. Έχει προηγηθεί μελέτη βιωσιμότητας του προβλεπόμενου πληροφοριακού συστήματος; ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_13 + '\n\n' },
                { text: 'Εξηγήστε: ', decoration: 'underline' },
                { text: '\n\n' },
                { text: data.field_13_comments + '\n\n' },

                { text: '14. Σύνοψη στόχων κάθε άρθρου ', decoration: 'underline' },
                { text: '\n\n' },
                createDynamicTable('Άρθρο', 'Στόχος', field_14_arthro, field_14_stoxos), //create table for field 14                

                // { text: '18. Οφέλη αξιολογούμενης ρύθμισης \n\n', decoration: 'underline' },
                // createCheckBoxTable('ΟΦΕΛΗ ΡΥΘΜΙΣΗΣ', 'ΑΜΕΣΑ', 'Αύξηση εσόδων', req.body.field_18_amesa_esoda_thesmoi, req.body.field_18_amesa_esoda_oikonomia, req.body.field_18_amesa_esoda_kinonia, req.body.field_18_amesa_esoda_perivallon, req.body.field_18_amesa_esoda_nisiwtika),

                {
                    text: 'Έκθεση Γενικού Λογιστηρίου του Κράτους (άρθρο 75 παρ. 1 ή 2 του Συντάγματος)',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },
                { text: 'Έκθεση Γενικού Λογιστηρίου του Κράτους ', style: 'labelStyle' },
                { text: '\n\n\n\n' },

                { text: 'Στο σχέδιο νόμου του Υπουργείου ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_15_ypoyrgeio + '\n\n', style: 'textStyle' },
                { text: 'ή επί τροπολογίας στο σχέδιο νόμου του Υπουργείου: ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_15_sxedio_nomou + '\n\n', style: 'textStyle' },
                { text: '15.Συνοπτική ανάλυση των άρθρων της αξιολογούμενης ρύθμισης ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_15_sxedio_nomou + '\n\n' },

                { text: '16.Οικονομικά αποτελέσματα επί του Κρατικού Προϋπολογισμού ή/και επί του προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: 'Από τις προτεινόμενες διατάξεις προκαλούνται τα ακόλουθα οικονομικά αποτελέσματα: ', style: 'textStyle' },
                { text: '\n\n' },
                { text: 'Επί του Κρατικού Προϋπολογισμού ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_16_kratikos_proypologismos + '\n\n', style: 'textStyle' },
                { text: 'Επί του Προϋπολογισμού του/των αρμόδιου/ων φορέα/ων ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_16_proypologismos_forea + '\n\n', style: 'textStyle' },
                { text: 'Ο/Η ΥΠΟΓΡΑΦΩΝ/ΟΥΣΑ ΓΕΝΙΚΟΣ/Η ΔΙΕΥΘΥΝΤΗΣ/ΡΙΑ (Όνομα Επώνυμο Ιδιότητα) ', style: 'labelStyle' },
                { text: '\n\n' },
                {
                    table: {

                        headerRows: 1,
                        widths: [ '*', '*', '*' ],
                
                        body: [
                          [ 'Όνομα', 'Επώνυμο', 'Ιδιότητα' ],
                          [{ text: data.field_16_genikos_onoma, style:'textStyle'}, { text: data.field_16_genikos_epitheto, style:'textStyle'}, { text: data.field_16_genikos_idiototita, style:'textStyle'} ],
                          
                        ]
                      }
                },

                {
                    text: 'Γ. Ειδική Έκθεση (άρθρο 75 παρ. 3 του Συντάγματος)',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: 'Στο σχέδιο νόμου του Υπουργείου ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_17_ypoyrgeio + '\n\n', style: 'textStyle' },
                { text: 'ή επί τροπολογίας στο σχέδιο νόμου του Υπουργείου: ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_17_sxedio_nomou + '\n\n', style: 'textStyle' },
                { text: '17.Οικονομικά αποτελέσματα ', style: 'labelStyle' },
                { text: '\n\n' },
                { text: data.field_17_oikonomika_apotelesmata + '\n\n' },
                
                //TODO: FIELDS 18-21!!!

                {
                    text: 'Ε. Έκθεση διαβούλευσης',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

                { text: '22.Διαβούλευση κατά τη διάρκεια της νομοπαρασκευαστικής διαδικασίας από την έναρξη κατάρτισης της αξιολογούμενης ρύθμισης μέχρι την υπογραφή από τους συναρμόδιους Υπουργούς \n\n', style: 'labelStyle' },
                { text: 'Συνεργασία με άλλα υπουργεία / υπηρεσίες \n\n', style: 'textStyle' },
                { text: data.field_22_sinergasia_ypoyrgeiwn + '\n\n', style: 'textStyle' },
                { text: 'Συνεργασία με κοινωνικούς φορείς / Ανεξάρτητες Αρχές \n\n', style: 'textStyle' },
                { text: data.field_22_sinergasia_forewn_arxwn + '\n\n', style: 'textStyle' },
                { text: 'Διεθνής διαβούλευση \n\n', style: 'textStyle' },
                { text: data.field_22_diethnis_diavouleusi + '\n\n', style: 'textStyle' },

                { text: '23.Σχόλια στο πλαίσιο της διαβούλευσης μέσω της ηλεκτρονικής πλατφόρμας www.opengov.gr (ηλεκτρονική επισύναψη της έκθεσης) \n\n', style: 'labelStyle' },
                //TODO: field23 uploads
                { text: 'Επί των γενικών αρχών («επί της αρχής») της αξιολογούμενης ρύθμιση ', style: 'textStyle' },
                { text: '\n\n' },
                { text: 'Αριθμός συμμετασχόντων ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_symmetasxontes + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που υιοθετήθηκαν ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_sxolia_yiothetithikan + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που δεν υιοθετήθηκαν ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_23_arxes_sxolia_den_yiothetithikan + '\n\n', style: 'textStyle' },

                { text: 'Επί των άρθρων της αξιολογούμενης ρύθμισης \n\n', style: 'textStyle' },
                { text: 'Αριθμός συμμετασχόντων ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_23_arthra_symmetasxontes + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που υιοθετήθηκαν ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_23_arthra_sxolia_yiothetithikan + '\n\n', style: 'textStyle' },
                { text: 'Σχόλια που δεν υιοθετήθηκαν ', style: 'textStyle' },
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
                { text: 'Πρωτογενές ενωσιακό δίκαιο (συμπεριλαμβανομένου του Χάρτη Θεμελιωδών Δικαιωμάτων) ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_25_dikaio_comment + '\n\n', style: 'textStyle' },
                { text: 'Κανονισμός ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_25_kanonismos_comment + '\n\n', style: 'textStyle' },
                { text: 'Οδηγία ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_25_odigia_comment + '\n\n', style: 'textStyle' },
                { text: 'Απόφαση ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_25_apofasi_comment + '\n\n', style: 'textStyle' },

                { text: '26.Συναφείς διατάξεις διεθνών συνθηκών ή συμφωνιών ', style: 'textStyle' },
                { text: '\n\n' },
                { text: 'Ευρωπαϊκή Σύμβαση των Δικαιωμάτων του Ανθρώπου ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_26_antrwpina_dikaiwmata_comment + '\n\n', style: 'textStyle' },
                { text: 'Διεθνείς συμβάσεις ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_26_symvaseis_comment + '\n\n', style: 'textStyle' },

                { text: '27.Συναφής νομολογία των ανωτάτων και άλλων εθνικών δικαστηρίων, καθώς και αποφάσεις των Ανεξάρτητων Αρχών ', style: 'textStyle' },
                { text: '\n\n' },
                { text: 'Ανώτατο ή άλλο εθνικό δικαστήριο  ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_27_dikastirio_comment + '\n\n', style: 'textStyle' },
                { text: 'Ανεξάρτητη Αρχή ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_27_arxi_comment + '\n\n', style: 'textStyle' },

                { text: '28.Συναφής ευρωπαϊκή και διεθνής νομολογία', style: 'textStyle' },
                { text: '\n\n' },
                { text: 'Νομολογία Δικαστηρίου Ε.Ε.', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_28_nomologia_comment + '\n\n', style: 'textStyle' },
                { text: 'Νομολογία Ευρωπαϊκού Δικαστηρίου Δικαιωμάτων του Ανθρώπου', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_28_nomologia_dikaiwmatwn_anthrwpou_comment + '\n\n', style: 'textStyle' },
                { text: 'Άλλα ευρωπαϊκά ή διεθνή δικαστήρια ή διαιτητικά όργανα ', style: 'textStyle' },
                { text: '\n\n' },
                { text: data.field_28_alla_dikastiria_comment + '\n\n', style: 'textStyle' },

                //TODO: TABLES 29,30,31,32


                {
                    text: 'Η. Έκθεση εφαρμογής της ρύθμισης',
                    style: 'headerStyle',
                    tocItem: true,
                    tocStyle: { bold: true },
                    tocMargin: [20, 0, 0, 0],
                    pageBreak: 'before'
                },

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

function createDynamicTable(header1, header2, article, goal) {
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

function createStaticTable(table) {
    var rows = [];
    var years = ['έτος 1: ' + table[1], 'έτος 2: ' + table[2], 'έτος 3: ' + table[3], 'έτος 4: ' + table[4], 'έτος 5: ' + table[5]];
    if (table[8]) {
        rows.push([{ text: table[8], alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Εξέλιξη την τελευταία 5ετία', alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Πρόσφατα στοιχεία', alignment: 'center', fillColor: '#87CEEB', bold: true }, { text: 'Επιδιωκόμενος στόχος (3ετία)', alignment: 'center', fillColor: '#87CEEB', bold: true }]);
    }
    rows.push([table[0], years, table[6], table[7]]);
    console.log(rows)
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

function exportStaticTables(data, keys) {
    var table = [];
    var row = [];
    var prefix, header;
    var tables = [];
    for (var i in keys) {

        if (keys[i].includes('_label')) {//label acts as a row separator
            if (row.length) {
                if (header) {
                    row.push(header);
                    header = null;
                }
                table.push(row);//found label, hence a new row. Push row to table and then empty. 
                row = [];
            }
            prefix = keys[i].split('_label');
            prefix = prefix.slice(0, -1);//remove last character, a comma produced by split()
        }
        if (prefix) {
            if (keys[i].includes(prefix) && data[keys[i]]) {
                if (keys[i].includes('_header')) {
                    header = data[keys[i]];
                } else {
                    row.push(data[keys[i]]);
                }
            }
        }
    }
    for (i in table) {
        console.log(i + ': ' + table[i])
        //TODO: CALL FUNCTION WITH 9 PARAMS  
        tables.push(createStaticTable(table[i]));
    }
    console.log(table);
    //console.log( table[1]);
    console.log('prefix: ' + prefix);
    return tables;
}
