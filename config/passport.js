var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, musician) {
    var Musician = musician;
    var LocalsStrategy = require("passport-local").Strategy;
    passport.use("local-signup", new LocalsStrategy(
        {
            usernameField: "userName",
            PasswordField: "password",
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            Musician.findOne({
                where: {
                    username: username
                }
            }).then(function (musician) {

                if (musician) {

                    return done(null, false, {
                        message: 'That User Name is already taken'
                    });

                } else {

                    var userPassword = generateHash(password);

                    var data =

                    {
                        username: username,

                        password: userPassword,

                    };


                    Musician.create(data).then(function (newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }
                    });
                }
            });
        }
    ));
}