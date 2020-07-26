import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// import expressHdr from 'express-handlebars'; //Handle Bars Import

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorController from './controllers/error.js'
import User from './models/user.js';
const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views') //Where to find html template

const __dirname = path.resolve();
app.use((req, res, next) => {
    User.findById('5f1d8de3420dfb17f71efe9a').then(user => {
        req.user = user;
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

mongoose.connect('mongodb+srv://bafna:testtest@cluster0.upt3y.mongodb.net/shop?retryWrites=true&w=majority').then(() => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Dixit',
                email: 'dixit@gmail.com',
                cart: {
                    items: []
                }
            })
            return user.save();
        }
    })
}).then(() => {
    app.listen(3000);
}).catch(e => {
    console.log(e);
});