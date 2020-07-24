import express from 'express';
import path from 'path';

// import expressHdr from 'express-handlebars'; //Handle Bars Import

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorController from './controllers/error.js'
import seq from './util/database.js';
import Product from './models/product.js';
import User from './models/user.js';
const app = express();

//Handle Bars Import
/* app.engine('hbs', expressHdr({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
}));

app.set('view engine', 'hbs'); */
// app.set('view engine', 'pug'); //Template Enfing for Dynamic contnet
app.set('view engine', 'ejs');

app.set('views', 'views') //Where to find html template

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true })); // Get data from request parameter
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res, next) => {
    User.findByPk(1).then(user => {
        req.user = user; //user is a sequalize menthod so later we can use other utilities
        next();
    }).catch(e => {
        console.log(e)
    })
})
app.use('/admin',adminRouter.router);
app.use(shopRouter);

app.use(errorController.get404)

// const server = createServer(app);
// server.listen(3000);
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE' // If user is deleted all products created by user should also be deleted. 
});
User.hasMany(Product);

seq.sequelize.sync().then(res => {
    // console.log(res);
    return User.findByPk(1);
}).then(user => {
    if(!user) {
        return User.create({
            name: 'Dixit',
            email:'dixit@gmail.com'
        })
    } else {
        return Promise.resolve(user);
    }
}).then((user) => {
    app.listen(3000);
}).catch(e => {
    console.log(e);
}); // Sync MOdel to DB and create models