const express = require('express');
const config = require('./config')

const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({message: 'Working ...'})
})

app.listen(9000, ()=> {
    console.log(`Server runing at port ${config.PORT}`)
})