const express = require('express');
const mongoose = require('mongoose')
const Product = require('../models/product')

//Router is a sub package of the express
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500)
        .json({
            error:err
        })
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {  
        res.status(200)
        .json({
            result: result
        })
    })
    .catch(err => {
        res.status(500)
        .json({
            error:err
        })
    })
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.update({_id:id},
        {$set:{
        name: req.body.name,
        price: req.body.price}
    })
    .exec()
    .then(result => {
         res.status(200).json(result)
    })
    .catch(err => {
        res.status(500)
        .json({
            error:err
        })
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(result => {
         res.status(200).json(result)
    })
    .catch(err => {
        res.status(500)
        .json({
            error:err
        })
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
    .exec()
    .then(result => {
         res.status(200).json(result)
    })
    .catch(err => {
        res.status(500)
        .json({
            error:err
        })
    })
});

module.exports = router;