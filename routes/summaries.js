const routes = require('express').Router()
const { authUser, authRole } = require('../controllers/auth');
let database = require('../services/database')

routes.get('/', authUser, authRole, async (req,res,next) =>{
    let entries = await database.ekthesi.count()
    let prosxedio = await database.ekthesi.count({ where: {typos_analysis: 'Προσχέδιο νόμου'}})
    let tropologies_vouleftwn = await database.ekthesi.count({ where: {typos_analysis: 'Τροπολογίες Βουλευτών'}})
    let tropologies_upourgwn = await database.ekthesi.count({ where: {typos_analysis: 'Τροπολογίες Υπουργών'}})
    let sxedio = await database.ekthesi.count({ where: {typos_analysis: 'Σχέδιο νόμου'}})
    let kateythintiries = await database.ekthesi.count({ where: {typos_analysis: 'Κατευθυντήριες γραμμές'}})
    let protasi = await database.ekthesi.count({ where: {typos_analysis: 'Πρόταση νόμου'}})
    let epeigon = await database.ekthesi.count({ where: {typos_analysis: 'Επείγον ή κατεπείγον νομοσχέδιο'}})
    let symvaseis = await database.ekthesi.count({ where: {typos_analysis: 'Διεθνείς συμβάσεις'}})

    let user = await database.user.findOne({where:{
        username: req.session.username
    }})
    res.render("user_views/summaries",{entries:entries, user:user, prosxedio:prosxedio, sxedio:sxedio, protasi:protasi,
    kateythintiries:kateythintiries, epeigon:epeigon, symvaseis:symvaseis, tropologies_upourgwn:tropologies_upourgwn, tropologies_vouleftwn:tropologies_vouleftwn})
});

module.exports = routes;
