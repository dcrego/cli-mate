const fs = require('fs');
const express = require('express');
const app = express();
const pexels = require('./resources/pexels/index.json');
var port = 80; // Default port
console.log(process.argv);
if (process.argv.length>2) {
    var portArg = process.argv[2];
    try {
        portArg = parseInt(portArg);
        if (portArg>0) {
            port = portArg;
        } else {
            throw new Error('Port number not allowed');
        }
    } catch (error) {
        console.error(error);
        console.log(`Default port is ${port}`);
    }
}

app.get('/bg/:id', (req, res) => {
    res.sendFile(__dirname+'/resources/pexels/'+pexels[req.params.id].src);
});

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.listen(port, ()=>{
    console.log(`cli-mate app running on http://localhost:${port}/`);
});
