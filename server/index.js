const express= require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express() 
const mongoose = require('mongoose')
const apiPort = process.env.PORT || 8080;
const loginrouter= require('./routes/login_routes')
const uri = "mongodb://localhost:27017"
//const uri = "mongodb+srv://User_sree:hsrpqwert1@cluster0.zodxr.mongodb.net/Email_IDS?retryWrites=true&w=majority"
//const uri = "mongodb+srv://sumanthsk04:*****@cluster0.4tbdc.mongodb.net/test?authSource=admin&replicaSet=atlas-5unq8f-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
//const uri = "mongodb+srv://Sumanthsk:Sumanth@8197@cluster0.gq2sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(bodyParser.json())
/*
app.get('/',(req,res) =>{
        res.send('hello world')
})
*/
app.use('/api',loginrouter)





// step 3: Heroku 

 

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })

}






app.listen(apiPort,() => console.log(`server started at port ${apiPort}`))