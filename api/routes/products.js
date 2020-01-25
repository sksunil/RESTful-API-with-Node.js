const express = require('express');

// Router is a sub package of the express
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /products'
    })
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PATCH requests to /products'
    })
});

router.get('/:produectId', (req, res, next) => {
    res.status(200).json({
        message: 'Get single information requests to /products'
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete single product requests to /products'
    })
});

module.exports = router;