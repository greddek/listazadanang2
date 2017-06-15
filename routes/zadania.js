var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//polaczenie sie z baza i wybranie kolekcji zadania
var db = mongojs('mongodb://LukaszJeziors:lukes1992@ds127962.mlab.com:27962/listazadan', ['zadania']);

router.get('/zadania', function(req, res, next){//znajdywanie wszystkich kolekcji bazy zadan
    db.zadania.find(function(err, zadania){
        if(err){
            res.send(err);
        }//jesli blad
        res.json(zadania);
    });
});

router.get('/zadanie/:id', function(req, res, next){//znajdywanie jednej kolekcji zadan
    db.zadania.findOne({_id: mongojs.ObjectId(req.params.id)},(function(err, zadanie){
        if(err){
            res.send(err);
        }//jesli blad
        res.json(zadanie);
    }));
});

router.post('/zadanie',function(req, res, next){//dodanie nowego zadania
  var zadanie = req.body;
  if(!zadanie.tytul || (zadanie.JestGotowe + '')){//sprawdzenie i wyslanie komunikatu
    res.status(400);
    res.json({
      "error": "Zle dane!"
    });
  }else{
    db.zadania.save(zadanie, function(err, zadanie){//jesli ok to
      if(err){
          res.send(err);
      }//jesli blad
      res.json(zadanie);
    });
  }
});

router.delete('/zadanie/:id', function(req, res, next){//usuwanie jednej kolekcji zadan
    db.zadania.remove({_id: mongojs.ObjectId(req.params.id)},(function(err, zadanie){
        if(err){
            res.send(err);
        }//jesli blad
        res.json(zadanie);
    }));
});

router.put('/zadanie/:id', function(req, res, next){//update jednej kolekcji zadan
  var zadanie = req.body;
  var nzad = {};

  if(zadanie.JestGotowe){
    nzad.JestGotowe = zadanie.JestGotowe;
  }

  if(zadanie.tytul){
    nzad.tytul = zadanie.tytul;
  }

  if(!nzad){
    res.status(400);
    res.jeson({
      "error":"Blad Danych!"
    });
  }else {

    db.zadania.update({_id: mongojs.ObjectId(req.params.id)},nzad,{}(function(err, zadanie){
        if(err){
            res.send(err);
        }//jesli blad
        res.json(zadanie);
    }));

  }
});




module.exports = router;
