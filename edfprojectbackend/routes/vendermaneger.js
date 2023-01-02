const express = require('express')
var router = express();
var db = require('../Database/dbConnection')



router.post('/regVender',(req,res)=>{
    const {FirstName, Mobile, OriginId, City, Username, Password, confirmPassword}=req.body
    const Role = 'VManeger'

    db.sqls.query(`SELECT FirstName FROM user WHERE FirstName='${FirstName}'`,(err,result)=>{
        if(err) throw err
        if(result.length === 0){
            db.sqls.query(`INSERT INTO user(FirstName, Mobile, OriginId, City, Username, Password, Role)
            VALUES('${FirstName}', ${Mobile}, ${OriginId}, '${City}', '${Username}', '${Password}', '${Role}')`,(er,info)=>{
                if(er) throw er
                res.json("Vender Manager Sucessfully Registered")
            })
        }else{
            res.json("Vender Manager Already Registered")
        }
    })
    
})




router.get('/getvmanager',(req,res)=>{
    const ROLE='VManeger'
    db.sqls.query(`SELECT * FROM user WHERE ROLE='${ROLE}'`,(err,result)=>{
        if(err) throw err
        if(result){
            res.json(result)
        }else{
            res.json("Result not Found")
        }
    })

})

router.get('/getvmanagerfromcity/:city',(req,res)=>{

    const param = req.params['city']
    const Role = 'VManeger'
    
    db.sqls.query(`SELECT * FROM user WHERE (city='${param}' AND Role='${Role}')`,(err,response)=>{
        if(err) throw err
        if(response){
          
            res.json(response)
        }else{
            res.json("No Vender Manager Found")
        }
    })
    
})

module.exports=router