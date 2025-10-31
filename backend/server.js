require('dotenv').config()
const chalk=require('chalk')
const mongoose=require('mongoose')
const express=require('express')
const router = require('./routes/router')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
app.use('/', router);

const dbUrl=process.env.DB_URL
const port=process.env.PORT || 5000

mongoose.connect(dbUrl)
.then(()=>console.log(chalk.blue("DataBase connected")))
.catch((err)=>console.log(chalk.red("Something went wrong: "+err)))
app.listen(port,()=>console.log(chalk.green(`Listening on port ${port}`)))
