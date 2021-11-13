const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth');
const curdRouter = require('./routes/CURD');


// env
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL= process.env.MONGO_URL;

// middleware

app.use(express.urlencoded({extended:false}))
app.use(express.json())


// routes middlewares
app.use('/',authRouter);
app.use('/',curdRouter);


// mongoose connected to data base
mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Database Connected");
                app.listen(PORT,() => {
                    console.log(`Server Connected at ${PORT}`);
                })
        })
        .catch((err) => {console.log(err),process.exit(0);})