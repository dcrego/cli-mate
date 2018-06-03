const express = require('express');
const app = express();
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

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.listen(port, ()=>{
    console.log(`cli-mate app running on http://localhost:${port}/`);
});
