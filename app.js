import express from 'express';
import path from 'path';

// import expressHdr from 'express-handlebars'; //Handle Bars Import

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorController from './controllers/error.js'
import mongo from './util/database.js';
import User from './models/user.js';
const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views') //Where to find html template

const __dirname = path.resolve();
app.use((req, res, next) => {
    User.findByUserId('5f1c4c1ffdfab62b3abffbd0').then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }).catch(e => {
        console.log(e);
    });
})
app.use(express.urlencoded({ extended: true })); // Get data from request parameter
app.use(express.static(path.join(__dirname, 'public'))); // Public files like css
app.use('/admin',adminRouter.router);
app.use(shopRouter);

app.use(errorController.get404)

mongo.mongoConnect(() => {
    app.listen(3000);
});