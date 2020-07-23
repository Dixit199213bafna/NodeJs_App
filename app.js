import express from 'express';
import path from 'path';
// import expressHdr from 'express-handlebars'; //Handle Bars Import

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';

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
app.use('/admin',adminRouter.router);
app.use(shopRouter);

app.use((req,res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
    })
    // res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
})

// const server = createServer(app);
// server.listen(3000);

app.listen(3000);