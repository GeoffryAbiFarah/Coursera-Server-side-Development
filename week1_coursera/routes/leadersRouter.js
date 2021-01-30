const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route("/")
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
        res.end("We ll send you all the leaders");
    }))
    .post((req, res, next) => {
        res.end("Posting all leaders");
    })
    .put((req, res, next) => {
        res.end("Updating all leaders");
    })
    .delete((req, res, next) => {
        res.end("Deleting all leaders");
    });

//====================================================

leadersRouter.route("/:leaderId")
    .get((req, res, next) => {
        res.end("we are sending you the leader with id: " + req.params.leaderId);
    })
    .post((req, res, next) => {
        res.end("We are posting SPECIFIC leader with name: " + req.body.name +
            " and description: " + req.body.description)  ;
    })
    .put((req, res, next) => {
        res.end("We'll update leader with id : " + req.params.leaderId + "to : \n" +
            "Name: " + req.body.name + " and description : " + req.body.description
        )
    })
    .delete((req, res, next) => {
        res.end("We ll delete leader with id : " + req.params.leaderId)
    })

module.exports = leadersRouter;