const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route("/")
// .all((req,
//       res,
//       next) =>{
//     res.statusCode = 200;
//     res.setHeader("Content-Type","plain/text");
//     next();
// })
.get((req,
       res,
       next) => {
    Promotions.find()
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promos);
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
        .then((promo) => {
            console.log("PROMOTION CREATED : " , promo)
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err))
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end("Put operation not supported on promotions");
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.remove()
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err))
});

//====================================================

promoRouter.route("/:promoId")
.get((req, res, next) => {
    Promotions.findById(req.params.promoId)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on /promo/:promoId");
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
       new: true
    })
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = promoRouter;




