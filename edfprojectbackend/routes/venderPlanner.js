const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/vplanner',(req,res)=>{

    const{FirstName, Mobile, City, venderManager, Username, Password}= req.body
    const Role='Vplanner'
    db.sqls.query(`SELECT * FROM user WHERE FirstName='${FirstName}'`,(err,response)=>{
        if(err) throw err
        if(response.length===0){

            db.sqls.query(`INSERT INTO user(FirstName, Mobile, City, VenderManager, Username, Password, Role) 
            VALUES('${FirstName}', ${Mobile}, '${City}', '${venderManager}', '${Username}', '${Password}', '${Role}')`,(er,info)=>{
                if(er) throw er
                res.json("Sucessfully Added Data")
            })

        }else{
            res.json("User Is Already Present")
        }
    })

})

router.get('/getvplanner',(req,res)=>{

    const Role='Vplanner'

    db.sqls.query(`SELECT * FROM user WHERE Role='${Role}'`,(err,response)=>{
        if(err) throw err
        if(response){
            res.json(response)
        }else{
            res.json("No Vender Planner Found")
        }
    })

})

router.get('/getvplannerfromcitask',(req,res)=>{

    const Vplanner = req.body.VenderPlanner
    //console.log(req.body)
    db.sqls.query(`SELECT * FROM ci_task WHERE VenderPlanner='${Vplanner}'`,(err,response)=>{
        if(err) throw err
        if(response){
            res.json(response)
        }else{
            res.json("No Vender Planner Found")
        }
    })

})

router.get('/getvplannerfromanager/:manager',(req,res)=>{

    const param = req.params['manager']
    const param2 = req.params['city']
    const Role ='Vplanner'
    db.sqls.query(`SELECT * FROM user WHERE VenderManager='${param}' AND Role='${Role}'`,(err,response)=>{
        if(err) throw err
        if(response){
            
            res.json(response)
        }else{
            res.json("No Vender Manager Found")
        }
    })

})


router.post('/getvplannerfromvmcity',(req,res)=>{

    const {Vmanager, City} = req.body
    //console.log(req.body)
    db.sqls.query(`SELECT DISTINCT FirstName FROM user WHERE VenderManager='${Vmanager}' AND City='${City}'`,(err,response)=>{
        if(err) throw err
        if(response.length===0){
            res.json("No Data Found")
        }else{
            
            res.json(response)
        }
    })
})

router.post('/getvplannerapprove',(req,res)=>{

    const {Vplanner} = req.body
    console.log('task',req.body)
    db.sqls.query(`SELECT * FROM ci_task WHERE VenderPlanner='${Vplanner}'`,(err,response)=>{
        if(err) throw err
        if(response.length===0){
            res.json("No Data Found")
        }else{
            res.json(response)
        }
    })

})

router.post('/updateStatus',(req,res)=>{

    const{id}=req.body
    for(let i=0;i<id.length;i++){
        db.sqls.query(`UPDATE ci_task SET Vplanner_Approve='true' WHERE id=${id}`,(err,resposne)=>{
            if(err) throw err
            if(i===id.length-1){
                res.json("SuccessFully Approved")
            }
        })
    }
    

})

router.post('/updatesinglerejectedstatus',(req,res)=>{

    const{id}=req.body
    console.log(req.body)
    
    db.sqls.query(`UPDATE ci_task SET Reject='true' WHERE id=${id}`,(err,resposne)=>{
        if(err) throw err
        res.json("SuccessFully Rejected")
    })
})


router.post('/getRejectedVplanner',(req,res)=>{

    const{Vplanner}=req.body
    console.log(req.body)
    
    db.sqls.query(`SELECT * FROM ci_task WHERE VenderPlanner='${Vplanner}' AND Reject='true'`,(err,resposne)=>{
        if(err) throw err
        res.json(resposne)
    })
})


module.exports=router