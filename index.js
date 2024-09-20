const express = require("express");
const {connectMongoDB} = require('./connect')
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const path = require('path');
const app =express();
const staticRoute = require('./routes/staticRouter');

PORT = 8000;

app.set('view engine', 'ejs');
app.set('views',path.resolve('views'));

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => {
    console.log("Connected to MongoDB")
})

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    // return res.end("<h1>Hey I from Server</h1>")
    return res.render('home2',{
        urls : allUrls,
    });
})

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/url',urlRoute);

app.use("/", staticRoute);

app.get('/url/:shortId',async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            },
        }, 
    })
    res.redirect(entry.redirectURL)
})

app.listen(PORT, function(req, res) {
    console.log(`Server is running on port ${PORT}`);
})