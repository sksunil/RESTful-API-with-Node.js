const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const User = require('../models/user');

router.post('/singup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500)
                .json({
                    error: err
                });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201)
                        .json({
                            message: "User created"
                        });
                })
                .catch(err => {
                    res.status(500)
                        .json({
                            error: err
                        });
                });
        }
    });
})

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.param.userId })
        .exec()
        .then(result => {
            res.status(200)
                .json({
                    message: 'User deleted'
                })
        })
        .catch(err => {
            res.status(500)
                .json({
                    error: err
                });
        });
})

module.exports = router;