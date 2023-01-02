

const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/regorigin',(req,res)=>{
    const {OriginId,OriginName} = req.body

    //const Role = "jes"

    db.sqls.query(`SELECT * FROM origin WHERE OriginName='${OriginName}'`,(err,next)=>{
        if(err) throw err
        if(next.length===0){
            db.sqls.query(`INSERT INTO origin(OriginId,OriginName)
            VALUES(${OriginId},'${OriginName}')`,(er,response)=>{
                if(er) throw er
                res.json(response)
            })
        }else{
            res.json("OriginId Already Register")
        }
    })
})

router.get('/getorigin',(req,res)=>{

    db.sqls.query(`SELECT OriginId,OriginName FROM origin`,(err,response)=>{

        if(err) throw err
        if(response.length===0){
            res.json("Not Found")
        }else{
            let data = response.filter((x)=>{
                return x.OriginName !== ''
            })
            //console.log(data)
            res.json(data)
        }

    })

})

module.exports=router