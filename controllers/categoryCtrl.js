const Category = require("../models/categoryModel")
const Products = require("../models/productModel")

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createCategory: async (req, res) => {
    try {
      // if userhave  role === 1 ---> admin
      // only admin can create, update and delete category
      const { name } = req.body
      const сategory = await Category.findOne({ name })
      if (сategory) return res.status(400).json({ msg: "Сategory with this name already exists" })

      const newCategory = new Category({
        name,
      })
      await newCategory.save()
      
      res.status(201).json({ msg: `Category: ${name} has been created` })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      // if user have  role === 1 ---> admin
      // only admin can create, update and delete category
      const category = await Category.findById(req.params.id)
      if(!category) return res.status(400).json({msg: 'Сategory not found'})

      const products = await Products.findOne({category: category.name})
      if(products) return res.status(400).json({msg: 'Remove all products from this product category'})
      
      await Category.findByIdAndDelete(req.params.id)

      res.status(200).json({ msg: 'Category has been deleted'})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      // if user have  role === 1 ---> admin
      // only admin can create, update and delete category
      const name = req.body.name
      await Category.findByIdAndUpdate({ _id: req.params.id }, {name})
      res.status(200).json({ msg: 'Category has been updated'})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
};

module.exports = categoryCtrl
