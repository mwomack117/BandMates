var exports = module.exports = {}

module.exports = function (app, passport) {
    //get routes
    app.get('/index', function (req, res) {

        res.render('index');

    });

    app.get('/landing', function (req, res) {

        res.render('landing');

    });

    app.get('/dashboard', isLoggedIn, function (req, res) {

        res.render('dashboard');
    });

    app.get('/logout', function (req, res) {

        req.session.destroy(function (err) {

            res.redirect('/');

        });
    });
    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/landing');

    }
    //post routes
    app.post('/index', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/index'
    }));

    app.post('/landing', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/landing'
    }
 
));
}