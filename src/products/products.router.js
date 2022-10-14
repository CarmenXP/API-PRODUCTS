const router = require('express').Router()

const productsServices = require('./products.services')

router.get('/', productsServices.allProducts)
router.post('/', productsServices.postProducts)

router.get('/:id', productsServices.productById)
router.delete('/:id', productsServices.deleteProduct)
router.patch('/:id', productsServices.patchProduct)
router.put('/:id', productsServices.putProduct)

module.exports = router