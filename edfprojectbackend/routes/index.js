const express = require('express')
var router = express();
var db = require('../Database/dbConnection')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res)=>{
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const {FirstName, Password, Email} = req.body
    
    db.sqls.query(`SELECT FirstName FROM user WHERE FirstName='${FirstName}'`,(err,result)=>{
      if(err) throw err
      if(result.length===0){
        db.sqls.query(`INSERT INTO user(FirstName,Password,Email) VALUES('${FirstName}', '${Password}', '${Email}')`,(err,info)=>{
          if(err) throw err
          res.json("Successfully Added Data")
        })
      }else{
  
        res.json("User Already Exist")
  
      }
    })
  });

router.post('/login',(req,res)=>{
    const {FirstName,Password} = req.body
    db.sqls.query(`SELECT * FROM user WHERE FirstName='${FirstName}' AND Password='${Password}'`,(err,result)=>{
        if(err) throw err
        if(result.length === 0){
            res.json("Invalid Crediential")
        }else{

            jwt.sign({user:result[0].id},
                'SecretKey',
                {
                    expiresIn:'5hr'
                },(err,token)=>{
                    if(err) throw err
                    db.sqls.query(`UPDATE user SET Token='${token}' WHERE FirstName='${FirstName}'`,(err,info)=>{
                        if(err) throw err
                        res.json({FirstName: FirstName, Email :result[0].Email,Token:token, Role:result[0].Role})
                    })
                })
        }
    })

})


router.put('/changepass/:id',(req,res)=>{
  const ids=req.params['id']
  const {Password}=req.body

  db.sqls.query(`UPDATE user SET Password='${Password}' WHERE id=${ids}`,(err,response)=>{
      if(err) throw err
      if(response){
          res.json("sucessfully Changed Password")
      }
  })
})

module.exports=router