routes.post('/', async function (req, res, next) {
    req.session = null;
    res.render("login");    
});