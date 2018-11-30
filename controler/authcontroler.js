var exports = module.exports = {}
 
 
exports.signup = function(req, res) {
 
    res.render('index');
 
}
 
exports.signin = function(req, res) {
 
    res.render('dashbord');
 
}
 
 
exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}