import User from "../models/user.js";

const getLogin = (req, res, next) => {
    res.render('auth/login', {
        title: 'Login',
        path: '/login',
        isAuthenticated: false,
    });
}

const postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    User.findById('5f1d8de3420dfb17f71efe9a').then(user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save(() => {
            res.redirect('/');
        });
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

export default {
    getLogin,
    postLogin,
    logOut
}