const express = require('express');
const app = express();
const bosyParser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db');

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:'main', extname:'hbs'}));
app.set('view engine',"hbs");
app.set('views','views')

app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({});
    const books = await cursor.toArray();

    let message = 'done';
    res.render('main',{message,books});
})

app.listen(8000,()=>{console.log("running");})