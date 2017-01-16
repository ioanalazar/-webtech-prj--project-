var models  = require('../models');
var express = require('express');
var router  = express.Router();

var cazare = models.Cazare;


router.post('/cazare', function(request,response) {
  cazare.create(request.body).then(function(cazare) {
      cazare.findById(cazare.id).then(function(cazare) {
          response.status(201).send(cazare);
      });
  });
});


router.get('/cazare', function(request,response){
       cazare.findAll().then(function(cazare){
        response.status(200).send(cazare);
    });
});


router.get('/cazare/:id', function(request,response){
    cazare.findById(request.params.id).then(function(cazare){
        if(cazare) {
            response.status(200).send(cazare);
        } else {
            response.status(404).send();
        }
    });
});

router.put('/cazare/:id', function(request,response){
    cazare
        .findById(request.params.id)
        .then(function(cazare){
            if(cazare) {
                cazare
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(202).send('updated');
                    })
                    .catch(function(error){
                        console.warn(error);
                        response.status(400).send('server error');
                    });
            } else {
                response.status(404).send();
            }
        });
});


router.delete('/cazare/:id', function(req,res){
    cazare
        .findById(req.params.id)
        .then(function(cazare){
            if(cazare) {
                cazare
                    .destroy()
                    .then(function(){
                        res.status(204).send();
                    })
                    .catch(function(error){
                        console.warn(error);
                        res.status(400).send('server error');
                    });
            } else {
                res.status(404).send();
            }
        });
});

module.exports = router;
