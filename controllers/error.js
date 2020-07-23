const get404 = (req,res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        path: '/error'
    })
    // res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
}

export default {
    get404
}