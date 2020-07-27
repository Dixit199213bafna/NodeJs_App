const isAuth = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/login')
    } else {
        next();
    }
}

export default isAuth;