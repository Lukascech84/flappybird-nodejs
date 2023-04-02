const express = require("express");
const app = express();
const port = 3000;
const csvtojson = require('csvtojson');
const moment = require("moment"); 
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});
const fs = require("fs");
const path = require("path");

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))


let date = moment().format('YYYY-MM-DD-HH-mm-ss');

app.post("/savedata", urlencodedParser, (req, res) => {

    let data = `"${req.body.currscore}","${date}"\n`

    fs.appendFile(path.join(__dirname, "data/zapisy.csv"), data, (err) => {
        if(err){
        console.log('Nastala chyba: ', err);
        return res.status(400).json({
            success: false,
            message: "Nastala chyba při zapisu do souboru!"
        });
        };
        res.redirect(301, '/');
    });
});



app.get('/zapisy', (req,res) => {
    csvtojson({headers: ['score','date']})
    .fromFile(path.join(__dirname, "data/zapisy.csv"))
    .then( data =>{ 
        res.render('index', {nadpis: "Skóre ve hře Flappy Bird", zapisy: data});
    })
    .catch( error => { 
    console.log(error);
    })});



app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
});