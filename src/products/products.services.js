const productsControllers = require('./products.controllers')

const allProducts = (req, res) =>{
    productsControllers.getAllProducts()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) =>{
        res.status(400).json({message: err.message})
    })
}

const postProducts = (req, res) =>{
    const data = req.body
    if(data.name && data.category && data.price && data.isAvailable){
        productsControllers.createProduct(data)
        .then(response => {
            res.status(201).json(response)
        })
        .catch( err =>{
            res.status(400).json({message: err.message})
        })
    }else {
        res.status(400).json({message: 'Missing data'})
    }
}