const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db');

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:'main', extname:'hbs'}));
app.set('view engine',"hbs");
app.set('views','views')
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({});
    const books = await cursor.toArray();

    let message = '';
    switch (req.query.status) {
        case '1':
            message = 'Insert Completed'
            break;
    
        default:
            break;
    }
    
    res.render('main',{message,books});
})

app.post('/store_book',async(req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const book = {title: req.body.title, author: req.body.author};
    await collection.insertOne(book);
    return res.redirect('/?status=1');
})

app.listen(8000,()=>{console.log("running");})