import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import mongodbSessionStore from 'connect-mongodb-session';
import csrf from 'csurf';
// import expressHdr from 'express-handlebars'; //Handle Bars Import

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import loginRouter from './routes/login.js';

import errorController from './controllers/error.js'
import User from './models/user.js';
const app = express();
const uri = 'mongodb+srv://bafna:testtest@cluster0.upt3y.mongodb.net/shop?retryWrites=true&w=majority';
app.set('view engine', 'ejs');

app.set('views', 'views') //Where to find html template

const csrfProtection = csrf();
const __dirname = path.resolve();
const sessionStore = mongodbSessionStore(session);
const store = new sessionStore({
    uri,
    collection: 'sessions'
});
app.use(session({
    secret: 'my secret',
    resave: false, // Session will not be saved on every req/res but only on sae changes to sesson
    saveUninitialized: false,
    store: store,
}));
// app.use(csrfProtection);
app.use((req, res, next) => {
    if(req.session.user) {
        User.findById(req.session.user._id).then(user => {
            req.user = user;
            next();
        }).catch(e => {
            console.log(e);
        });
    } else {
        next();
    }
});
app.use(express.urlencoded({ extended: true })); // Get data from request parameter
app.use(express.static(path.join(__dirname, 'public'))); // Public files like css
app.use(loginRouter);
app.use('/admin',adminRouter.router);
app.use(shopRouter);

app.use(errorController.get404)

mongoose.connect(uri)
.then(() => {
    app.listen(3000);
}).catch(e => {
    console.log(e);
});