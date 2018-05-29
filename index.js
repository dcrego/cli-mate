const express = require('express');
const app = express();
const port = 80;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.listen(80, ()=>{
    console.log(`cli-mate app running on http://localhost:${port}/`);
});
