const authenticateJWT = require("../middleware/authenticateJwt");

const express   = require("express"),
      router    = express.Router(),
      Data   = require('../models/data');  
      authenticateJwt = require("../middleware/authenticateJwt");


router.get('/get', authenticateJWT,function(req, res) {
    let user_id = req.query.user_id;
  Data.find({user_id},function(err,products){
    if(err){
        res.status(500).send({error: err});
    } else {
        res.status(200).send(products);
    }
  });
});

router.post('/post', authenticateJWT,async function(req, res) {
    try{
        let data = {
            type: req.body.type,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date,
            user_id: req.body.userId,
        }
        let newData = await Data.create(data);
        res.status(200).send(newData);
    }catch(err){
        res.status(500).send({error: err});
    }
});

module.exports = router;