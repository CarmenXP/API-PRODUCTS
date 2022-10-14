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

const productById = (req, res) => {
    const id = req.params.id

    productsControllers.getProductById(id)
    .then(data => {
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({message: 'Id invalido'})
        }
    })
    .catch(err => {
        res.status(404).json({message: err.message})
    })
}

const patchProduct = (req, res) =>{
    const id = req.params.id
    const {name, category, price, isAvailable} = req.body

    productsControllers.editProduct(id, {name, category, price, isAvailable})
        .then((response) => {
            if(response[0]){
                res.status(200).json({
                    message: `El producto con el id ${id} ha sido modificado`
                })
            }else {
                res.status(404).json({message: 'Id invalido'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const putProduct = (req, res) => {
    const id = req.params.id
    const {name, category, price, isAvailable} = req.body

    if(name && category && price && isAvailable){
        productsControllers.editProduct(id, {name, category, price, isAvailable})
        .then(response =>{
            if(response[0]){
                res.status(200).json({message: `Producto con ID ${id} ha diso editado`})
            }else {
                res.status(400).json({message: 'Id invalido'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    } else {
        res.status(400).json({message: 'Missing data', fields: {
            name: 'string',
            category: 'string',
            price: 'interger',
            isAvailable: 'booleano'
        }})
    }
}

const deleteProduct = (req, res) => {
    const id = req.params.id
    productsControllers.deleteProduct(id)
        .then(response => {
            if(response) {
                res.status(204).json()
            }else {
                res.status(400).json({message: 'Id invalido'})
            }
        })
        .catch( err => {
            res.status(400).json(err)
        })
}

module.exports = {
    allProducts,
    productById,
    postProducts,
    patchProduct,
    putProduct,
    deleteProduct
}