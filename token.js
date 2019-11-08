var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
var config = require('./config');
var jwt = require('jsonwebtoken')

router.post("/validate", function(req,res){
    var token = req.headers["x-access-token"]
    if(!token) return res.status(401).send({auth:false,message:"Unathorized"})

    jwt.verify(token,config.secret,function(err,decoded){
        if (err) return res.status(500).send({auth:false,message:"Error to auth Token"})
        res.status(200).send({auth:true})
    })
})

router.get('/create_token', function(req,res){
        var token = jwt.sign({id:200}, config.secret,{
            expiresIn:3600
        })

        res.status(200).send({auth:true, token:token})
})

module.exports = router
