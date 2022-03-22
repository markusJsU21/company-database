const express = require('express')
const app = express()
const database = require('database')
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('./views/home.ejs')
})