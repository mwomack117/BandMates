var exports = module.exports = {}
 
module.exports = function(app,passport) {
    
    app.get('/signup', function(req, res) {
 
        res.render('signup');
        
    } );

    app.get('/landing', function(req, res) {
 
        res.render('landing');
     
    } );

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signup'
    }
 
));
 
}