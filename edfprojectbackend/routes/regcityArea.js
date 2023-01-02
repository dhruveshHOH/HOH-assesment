const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/regcityarea',(req,res)=>{
    

    let uniqueArray = Array.from(new Set(req.body.map(JSON.stringify)), JSON.parse);
    console.log(uniqueArray);
    
    
    for(let i of req.body){
        db.sqls.query(`SELECT * FROM cityarea WHERE City='${i}'`,(err,next)=>{
            if(err) throw err
            if(next.length===0){
                db.sqls.query(`INSERT INTO cityarea(City,Area)
                VALUES('${i[0]}','${i[1]}')`,(er,response)=>{
                    if(er) throw er
                    
                })
            }else{
                res.json("City And Area Already Register")
            }
        })
    }
    res.json(response)
    
})


router.get('/getcity',(req,res)=>{
    
    db.sqls.query(`SELECT City FROM cityarea`,(err,response)=>{
        if(err) throw err
        if(response){
            //console.log(JSON.stringify(response))
            res.json({details: response})
        }else{
            res.json('No Data Found')
        }
    })


})


router.get('/getarea/:id',(req,res)=>{

    const param = req.params['id']


    
    db.sqls.query(`SELECT DISTINCT Area FROM cityarea WHERE city='${param}'`,(err,response)=>{
        if(err) throw err
        if(response){
            
            res.json(response)
        }else{
            res.json('No Data Found')
        }
    })


})


module.exports=router