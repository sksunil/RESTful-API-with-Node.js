const express = require('express');
const multer = require('multer')
const ProductsController = require('../controllers/products');

//storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
//mimetype validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, //filesize limit
    fileFilter: fileFilter
})

//Router is a sub package of the express
const router = express.Router();

router.get("/", ProductsController.products_get_all)
router.post("/", upload.single('productImage'), ProductsController.products_create_product);
router.get("/:productId", ProductsController.products_get_product);
router.patch("/:productId", ProductsController.products_update_product);
router.delete("/:productId", ProductsController.products_delete);

module.exports = router;