import User from "../models/user.js";
import bcrypt from 'bcryptjs';

const getLogin = (req, res, next) => {
    let errorMessage = req.flash('error');
    if(errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }
    res.render('auth/login', {
        title: 'Login',
        path: '/login',
        isAuthenticated: false,
        errorMessage
    });
}

const postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    User.findOne({
        email: req.body.email,
    }).then(user => {
        if(!user) {
            req.flash('error', 'Invalid Email');
            return res.redirect('/login')
        }
        bcrypt.compare(req.body.password, user.password).then(result => {
            if(result) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                return req.session.save(() => {
                     res.redirect('/');
                });
            } else {
                req.flash('error', 'Invalid Password');
                res.redirect('/login')
            }
        })
        .catch(e => {
            return res.redirect('/login')
        })
    }).catch(e => {
        console.log(e);
    });
}

const logOut = (req,res,next) => {
    console.log('logout');
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}

const getSignUp = (req, res, next) => {
    let errorMessage = req.flash('error');
    if(errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }
    res.render('auth/signup', {
        title: 'Sing Up',
        path: '/signUp',
        isAuthenticated: false,
        errorMessage
    });
}

const postSignUp = (req, res, next) => {
    if(req.body.password === req.body.confirmPassword) {
        const { email, password} = req.body;
        User.findOne({
            email
        }).then(user => {
            if(user) {
               req.flash('error', 'E-Mail Exisit');
               return res.redirect('/signUp');
            } else {
                return bcrypt.hash(password, 12).then(hash => {
                    const user = new User({
                        email, password: hash, cart: {items: []}
                    });
                    return user.save();
                }).then(() => {
                    res.redirect('/login');
                });
            }
        }).catch(e => {
            console.log(e);
        });
    } else {
        req.flash('error', 'Password Do not match');
        res.redirect('/signUp');
    }
}

export default {
    getLogin,
    postLogin,
    logOut,
    getSignUp,
    postSignUp
}
