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
    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));

    // Embed a font, set the font size, and render some text
    //find more fonts here: https://fonts.google.com/#UsePlace:use/Collection:Cardo
    let fontpath = ('./node_modules/pdfkit/js/data/Roboto-Regular.ttf');
    doc.font(fontpath);
 
    doc.text(`Τίτλος έκθεσης: `+data.title, {
        width: 410,
        align: 'left'
    });
    doc.end();

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