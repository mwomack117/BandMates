//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, musician) {
    var Musician = musician;
    var LocalStrategy = require("passport-local").Strategy;
    passport.use("local-signup", new LocalStrategy(
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
                    username: userName
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
        },
    ));
    //serialize
    passport.serializeUser(function (musician, done) {

        done(null, user.id);

    });
    // deserialize user 
    passport.deserializeUser(function (id, done) {

        Musician.findById(id).then(function (musician) {

            if (musician) {

                done(null, musician.get());

            } else {

                done(musician.errors, null);

            }

        });

    });
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'userName',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function (req, userName, password, done) {

            var isValidPassword = function (userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            Musician.findOne({
                where: {
                    username: userName
                }
            }).then(function (musician) {

                if (!musician) {

                    return done(null, false, {
                        message: 'That User name does not exist'
                    });

                }

                if (!isValidPassword(musician.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = musician.get();
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));
}