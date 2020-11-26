const Product = require('../models/productModel')

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()

            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, description, content, price, images, category } = req.body
            if (!images) return res.status(400).json('No image upload')

            const product = await Product.findOne({ product_id })
            if (product) return res.status(400).json('Product with this ID already exists')

            const newProduct = new Product({
                product_id, title: title.toLowerCase(), description, content, price, images, category
            })

            await newProduct.save()
            res.status(201).json('Product has been created')
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete({ _id: req.params.id })
            if (!product) return res.status(400).json('Product not found')

            res.json("Product has been deleted")
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, description, content, price, images, category } = req.body
            if (!images) return res.status(400).json('No image upload')

            await Product.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description, content, price, images, category
            })

            res.status(200).json({ msg: 'Product has been updated' })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = productCtrl