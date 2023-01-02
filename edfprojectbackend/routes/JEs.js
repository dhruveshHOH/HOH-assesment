const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/regjes',(req,res)=>{
    const {FirstName, Mobile, Area, City, Username, Password, confirmPassword} = req.body
    console.log(req.body)
    const Role = "jes"

    db.sqls.query(`SELECT * FROM user WHERE FirstName='${FirstName}'`,(err,next)=>{
        if(err) throw err
        if(next.length===0){
            db.sqls.query(`INSERT INTO user(FirstName, Mobile, Area, City, Username, Password,Role)
            VALUES('${FirstName}',${Mobile},'${Area}','${City}','${Username}','${Password}','${Role}')`,(er,response)=>{
                if(er) throw er
                res.json(response)
            })
        }else{
            res.json("JE's Already Register")
        }
    })
})



router.get('/getjes',(req,res)=>{
    const Role = "jes"
    db.sqls.query(`SELECT * FROM USER WHERE Role='${Role}'`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json(response)
        }else{
            res.json("No Data Found For JE's")
        }

    })
})


router.get('/getVplannerApprovedTask',(req,res)=>{
    const Role = "jes"
    db.sqls.query(`SELECT * FROM ci_task WHERE final_approval_vplanner='true' AND Reject!='true'`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json(response)
        }else{
            res.json("No Data Found For JE's")
        }

    })
})

router.post('/approveJesTask',(req,res)=>{
    const Role = "jes"
    const {id} = req.body
    db.sqls.query(`UPDATE ci_task SET SmartmeterApproved='true' WHERE id=${id}`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json("Sucessfully Approved")
        }else{
            res.json("Failed To Approve")
        }

    })
})

router.post('/approveJesFromRejectTask',(req,res)=>{
    const Role = "jes"
    const {id} = req.body
    db.sqls.query(`UPDATE ci_task SET SmartmeterApproved='Reject', final_approval_vplanner='' WHERE id=${id}`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json("Sucessfully Approved")
        }else{
            res.json("Failed To Approve")
        }

    })
})

router.post('/RejectJesTask',(req,res)=>{
    const Role = "jes"
    const {id} = req.body
    db.sqls.query(`UPDATE ci_task SET SmartmeterApproved='false' WHERE id=${id}`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json("Sucessfully Rejected")
        }else{
            res.json("Failed To Reject")
        }

    })
})

router.get('/getNotAprovedAndReject',(req,res)=>{
    const Role = "jes"
    db.sqls.query(`SELECT * FROM ci_task WHERE SmartmeterApproved='' AND final_approval_vplanner='true' AND SmartmeterApproved !='true'`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json(response)
        }else{
            res.json("No Data Found For JE's")
        }

    })
})

router.get('/getjesAprovedTask',(req,res)=>{
    const Role = "jes"
    db.sqls.query(`SELECT * FROM ci_task WHERE SmartmeterApproved='true'`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json(response)
        }else{
            res.json("No Data Found For JE's")
        }

    })
})

router.get('/getjesRejectedTask',(req,res)=>{
    const Role = "jes"
    db.sqls.query(`SELECT * FROM ci_task WHERE SmartmeterApproved='false'`,(err,response)=>{
        if(err) throw err

        if(response){
            res.json(response)
        }else{
            res.json("No Data Found For JE's")
        }

    })
})

module.exports=router