import express from 'express';
import path from 'path';

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';

const app = express();
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true })); // Get data from request parameter
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRouter);
app.use(shopRouter);

app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
})

// const server = createServer(app);
// server.listen(3000);

app.listen(3000);