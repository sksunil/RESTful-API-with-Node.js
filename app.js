const express = require('express');
const app = express();
const morgan = require("morgan")  //using this package for logging request in the terminal
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const checkAuth = require('./api/middleware/check-auth')

mongoose.connect('mongodb://127.0.0.1:27017/restful-api')
mongoose.Promise = global.Promise

app.use(morgan('dev')); //it's shows incoming request in the terminal

//extract json data from request in readable format
app.use(bodyParser.urlencoded({ extended: false }))
//increse payload size
app.use(bodyParser.json({limit:'50mb'}));
app.use('/uploads', express.static('uploads'))

//Handle CORS with every request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Mehtods", 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Routes with should handle request
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

// middleware
app.use('/products', checkAuth, productRoutes)
app.use('/orders', checkAuth, orderRoutes)
app.use('/user', userRoutes)

//call this method, when we dose not found any route
app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app