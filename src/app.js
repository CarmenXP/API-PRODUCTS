const express = require('express')
const db = require('./utils/database')

const initModels = require('./models/initModels')
const config = require('./config')
const productsRouter = require('./products/products.router')
const { PORT } = require('./config')

const app = express()

db.authenticate()
    .then(() => console.log('DB connected ...'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('DB synced'))
    .catch((err) => console.log(err))

initModels()

app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({message: 'Working ...'})
})

app.use('/products', productsRouter)

app.listen(config.PORT, ()=> {
    console.log(`Server runing at port ${config.PORT}`)
})