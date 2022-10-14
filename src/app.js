const express = require('express')

const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('./config')
const productsRouter = require('./products/products.router')

const app = express()

db.authenticate()
    .then(() => console.log('DB auntenticación éxitosa'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.log(err))

initModels()

app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({message: 'Working ...'})
})

app.use('/products', productsRouter)

app.listen(9000, ()=> {
    console.log(`Server runing at port ${config.PORT}`)
})