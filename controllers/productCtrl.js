const Product = require('../models/productModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString } // queryString = req.query

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        // gte = greater than or equal
        // lte = lesser than or equal
        // lt = lesser than
        // gt = greater than
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    pagginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Product.find(), req.query).filtering().sorting().pagginating()
            const products = await features.query

            res.status(200).json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, description, content, price, images, category } = req.body
            if (!images) return res.status(400).json({ msg: 'No image upload' })

            const product = await Product.findOne({ product_id })
            if (product) return res.status(400).json({ msg: 'Product with this ID already exists' })

            const newProduct = new Product({
                product_id, title: title.toLowerCase(), description, content, price, images, category
            })
            await newProduct.save()

            res.status(201).json({ msg: 'Product has been created' })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let productID = req.params.id.split(',')
            if(productID.length > 1) { // delete some products
                const product = await Product.deleteMany({ _id: productID})
                if (!product) return res.status(400).json({ msg: 'Products not found' })
                return res.status(200).json({ msg: "Products has been deleted" })
            } else {
                const product = await Product.findByIdAndDelete({ _id: productID })
                if (!product) return res.status(400).json({ msg: 'Product not found' })
                return res.status(200).json({ msg: "Product has been deleted" })
            }
        } catch (err) {
            console.log({ msg: err.message })
            res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, description, content, price, images, category } = req.body
            if (!images) return res.status(400).json({ msg: 'No image upload' })

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