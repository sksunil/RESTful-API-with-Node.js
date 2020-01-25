const express = require('express');

// Router is a sub package of the express
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /orders'
    })
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PATCH requests to /orders'
    })
});

router.get('/:produectId', (req, res, next) => {
    res.status(200).json({
        message: 'Get single information requests to /orders'
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete single product requests to /orders'
    })
});

module.exports = router;