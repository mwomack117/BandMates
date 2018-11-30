var authController = require('../controler/authcontroler.js');

module.exports = function (app, passport) {
    //get routes
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/index'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/landing'
    }
    ));
 
    function isLoggedIn(req, res, next) {
        
        if (req.isAuthenticated())

            return next();

        res.redirect('/landing');

    }
}