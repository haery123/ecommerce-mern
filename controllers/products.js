const async = require("hbs/lib/async");
const Product = require("../models/Products")

const returnProducts = async(req, res) => {
    let products = await Product.find();
    let { limit } = req.query
    let newProducts = products.map((product) => {
        let { id, title, price, category, image } = product
        return { id, title, price, category, image }
    })
    if (limit) {
        newProducts = newProducts.slice(0, Number(limit))
    }
    res.json(newProducts)
}

const returnSingleProduct = async(req, res) => {
    let { productID } = req.params
    const selectedProduct = await Product.findById(productID)
    res.json(selectedProduct)
}

const createProduct = async(req, res) => {
    let result = await Product.create({
        title: req.body.title,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price
    });
    res.status(201).send(result)
}

const updateProduct = async(req, res) => {
    let { productID } = req.params
    let result = await Product.findByIdAndUpdate(productID, req.body)
    res.json(result)
}

const deleteProduct = async(req, res) => {
    let { productID } = req.params
    let result = await Product.findByIdAndRemove(productID, req.body)
    res.json(result)
}
module.exports = { returnProducts, returnSingleProduct, createProduct, updateProduct, deleteProduct }