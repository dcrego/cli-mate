const express = require('express');
const app = express();
const port = 80;

function index(req, res) {
    res.send('Hello World!');
}
app.get('/', index);

app.listen(80, ()=>{
    console.log(`cli-mate app running on http://localhost:${port}/`);
});
