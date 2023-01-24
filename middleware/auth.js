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

exports.authAdmin = (

    async function (req, res, next) {
        if (!req.session.user.isAdmin) {
            req.session.errors = [];
            req.session.errors.push({ msg: 'Δεν έχετε δικαιώματα διαχείρισης.' })
            return res.redirect("./dashboard");
        } else {
            return next();
        }
    }
)

exports.authRole = async function (req, res, next) {
  if (!req.session.user.role) {
    req.session.errors = [];
    req.session.errors.push({
      msg: "Δε σας έχει ανατεθεί ρόλος για να περιηγηθείτε στην εφαρμογή.",
    });
    return res.redirect("/login");
  } else {
    return next();
  }
};

exports.authAgency = async function (req, res, next) {
  if (!req.session.user.agency) {
    req.session.errors = [];
    req.session.errors.push({
      msg: "Δε σας έχει ανατεθεί φορέας για να περιηγηθείτε στην εφαρμογή.",
    });
    return res.redirect("/login");
  } else {
    return next();
  }
};