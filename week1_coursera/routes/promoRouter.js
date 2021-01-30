const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all((req,
      res,
      next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type","plain/text");
    next();
})
.get(((req,
       res,
       next) => {
    res.end("We ll send you all the promotions");
}))
.post((req, res, next) => {
    res.end("Posting all promotions");
})
.put((req, res, next) => {
    res.end("Updating all promotions");
})
.delete((req, res, next) => {
    res.end("Deleting all promotions");
});

//====================================================

promoRouter.route("/:promoId")
.get((req, res, next) => {
    res.end("we are sending you the promotion with id: " + req.params.promoId);
})
.post((req, res, next) => {
    res.end("We are posting SPECIFIC promotion with name: " + req.body.name +
        " and description: " + req.body.description)  ;
})
.put((req, res, next) => {
    res.end("We'll update promo with id : " + req.params.promoId + "to : \n" +
        "Name: " + req.body.name + " and description : " + req.body.description
    )
})
.delete((req, res, next) => {
    res.end("We ll delete promo with id : " + req.params.promoId)
})

module.exports = promoRouter;




