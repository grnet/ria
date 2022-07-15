let database = require("../services/database")

exports.authUser = (

    async function (req, res, next) {
        if (req.session.user == null) {
            req.session.errors = [];
            req.session.errors.push({ msg: 'Πρέπει να είστε συνδεδεμένος για να περιηγηθείτε στην εφαρμογή.' })//custom error message
            //return res.render("login");
            res.redirect('/login');
        } else {
            return next();
        }
    }
)

exports.authRole = (

    async function (req, res, next) {
        if (!req.session.dikaiwmata_diaxeirisis) {
            req.session.errors = [];
            req.session.errors.push({ msg: 'Δεν έχετε δικαιώματα διαχείρισης.' })
            return res.redirect("./dashboard");
        } else {
            return next();
        }
    }
)