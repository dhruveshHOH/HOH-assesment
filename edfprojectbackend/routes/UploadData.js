const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/regdata',(req,res)=>{

    const Status = "New"
    var time = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    const token = req.header('Authorization') 
    if(token===''){
        console.log("pure")
        for(let i of req.body){
        
    
            db.sqls.query(`INSERT INTO ci_task (UtilityID,SubDivisionID,SectionID,MRU,AreaType,CustomerId,InstallationId,Name,Address,MobileNumber,BillingDate,Connectiontype,Netmetering,CategoryCode,Phase,Loadss,LoadUnit,MailingAddress,MeterNumber,Metermake,LastMeterReading,MS_UM,Latitude,Longitude,AccountStatus,MeterOwner,TOD,location,District,Division,CircleID,city,area,Status,CreatedData) VALUES ('${i.UtilityID}','${i.SubDivisionID}','${i.SectionID}',
                            '${i.MRU}','${i.AreaType}','${i.ConsumerID}','${i.InstallationNumber}',
                            '${i.Name}','${i.Address}',${i.MobileNumber},${i.BillingDate},'${i.Connectiontype}',
                            '${i.Netmetering}','${i.CategoryCode}',${i.Phase},${i.Load},'${i.LoadUnit}','${i.MailingAddress}',
                            '${i.MeterNumber}','${i.Metermake}',${i.LastMeterReading},'${i.MS_UM}','${i.Latitude}','${i.Longitude}',
                           '${i.AccountStatus}','${i.MeterOwner}','${i.TOD}','${i.location}','${i.District}','${i.Division}','${i.CircleID}',
                            '${i.city}','${i.area}','${Status}','${time}')`,(err,response)=>{
        
                                if(err) throw err
                                
                                    
                                
            })
        }
        res.json("Successfully Stored Data")

    }else if(token === 'checkData'){
        console.log("Duplicate")

        for(let i of req.body){
            
            db.sqls.query(`SELECT CustomerId, InstallationId FROM ci_task WHERE CustomerId='${i.ConsumerID}' AND InstallationId='${i.InstallationNumber}'`,(err2,response2)=>{
                if(err2) throw err2
                if(response2.length===0){

                    db.sqls.query(`INSERT INTO ci_task (UtilityID,SubDivisionID,SectionID,MRU,AreaType,CustomerId,InstallationId,Name,Address,MobileNumber,BillingDate,Connectiontype,Netmetering,CategoryCode,Phase,Loadss,LoadUnit,MailingAddress,MeterNumber,Metermake,LastMeterReading,MS_UM,Latitude,Longitude,AccountStatus,MeterOwner,TOD,location,District,Division,CircleID,city,area,Status,CreatedData) VALUES ('${i.UtilityID}','${i.SubDivisionID}','${i.SectionID}',
                            '${i.MRU}','${i.AreaType}','${i.ConsumerID}','${i.InstallationNumber}',
                            '${i.Name}','${i.Address}',${i.MobileNumber},${i.BillingDate},'${i.Connectiontype}',
                            '${i.Netmetering}','${i.CategoryCode}',${i.Phase},${i.Load},'${i.LoadUnit}','${i.MailingAddress}',
                            '${i.MeterNumber}','${i.Metermake}',${i.LastMeterReading},'${i.MS_UM}','${i.Latitude}','${i.Longitude}',
                           '${i.AccountStatus}','${i.MeterOwner}','${i.TOD}','${i.location}','${i.District}','${i.Division}','${i.CircleID}',
                            '${i.city}','${i.area}','${Status}','${time}')`,(err,response)=>{
        
                                if(err) throw err
                                
                    })

                }
            })

        }
        res.json("Successfully Stored Data")


    }
    
})

router.get('/getalltask',(req,res)=>{
    
    db.sqls.query(`SELECT * FROM ci_task`,(err,response)=>{
        if(err) throw err
        if(response.length===0){
            res.json("NoData Found")
        }else{
            res.json(response)
        }
    })
})

router.get('/getunassign',(req,res)=>{
    
    db.sqls.query(`SELECT * FROM ci_task WHERE VenderManager=''`,(err,response)=>{
        if(err) throw err
        if(response.length===0){
            res.json("No Data Found")
        }else{
            res.json(response)
        }
    })
})



router.post('/getassignedtask',(req,res)=>{

    const {name} = req.body

    db.sqls.query(`SELECT * FROM ci_task`,(err,response)=>{
        if(err) throw err
        res.json(response)
    })

})


router.post('/updatevmanager',(req,res)=>{
    //const ids = req.params['id']
    
    const{id,vManager}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET VenderManager='${vManager}'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Assigned TO All')
            
        })
        
        

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET VenderManager='${vManager}' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",i)
                if(i===id.length-1){
                    res.json("SuccessFully Added")
                }
            })
        }
    }

})


router.post('/approveworker',(req,res)=>{
    //const ids = req.params['id']
    
    const{id,status,FieldWorker}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET final_approval_vplanner='${status}' Where FieldWorker='${FieldWorker}'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Approved All')
            
        })
        
        

    }else{
        console.log(typeof(id))
        if(id.length===undefined){
            console.log("running else1")

            db.sqls.query(`UPDATE ci_task SET final_approval_vplanner='${status}' Where id=${id}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id)
                
                res.json("SuccessFully Approved")
                
            })
        }else{
            console.log("running else2")

            for(let i=0;i<id.length;i++){
                db.sqls.query(`UPDATE ci_task SET final_approval_vplanner='${status}' Where id=${id[i]}`,(err,response)=>{
                    if(err) throw err
                    console.log("Updated Id",id[i])
                    if(i===id.length-1){
                        res.json("SuccessFully Approved")
                    }
                })
            }

        }
        
        
    }

})


router.post('/updatevplanner',(req,res)=>{
    //const ids = req.params['id']
    
    const{id,Vplanner}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET VenderPlanner='${Vplanner}'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Assigned TO All')
            
        })
        
        

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET VenderPlanner='${Vplanner}' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id[i])
                if(i===id.length-1){
                    res.json("SuccessFully Added")
                }
            })
        }
    }

})

router.post('/updatefieldworker',(req,res)=>{
    //const ids = req.params['id']
    
    const{id,FieldWorker}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET FieldWorker='${FieldWorker}', isVplannerApproved='true'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Assigned TO All')
            
        })
        
        

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET FieldWorker='${FieldWorker}', isVplannerApproved='true' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id[i])
                if(i===id.length-1){
                    res.json("SuccessFully Added")
                }
            })
        }
    }

})

router.post('/assignedtounassign',(req,res)=>{
    //const ids = req.params['id']
    
    const{id,vManager}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET VenderManager='',VenderPlanner='' WHERE flag !='true'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Unasigned TO All')
            
        })

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET VenderManager='',VenderPlanner='' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id[i])
                if(i===id.length-1){
                    res.json("SuccessFully Unassigned")
                }
            })
        }
    }

})

router.post('/assignedtounassignvplanner',(req,res)=>{
    
    const{id,vManager}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET VenderPlanner='', flag='false'`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Unasigned TO All')
            
        })

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET VenderPlanner='' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id[i])
                if(i===id.length-1){
                    res.json("SuccessFully Unassigned")
                }
            })
        }
    }

})

router.post('/assignedtounassignworker',(req,res)=>{
    
    const{id,FieldWorker,Vplanner}=req.body
    console.log(req.body)
    
    if(id===true){
        console.log("Running if")

       
        db.sqls.query(`UPDATE ci_task SET FieldWorker='',flag='false' WHERE VenderPlanner=${Vplanner}`,(err,response)=>{
            if(err) throw err
            res.json('Successfully Unasigned TO All')
            
        })

    }else{
        console.log("running else")
        
        for(let i=0;i<id.length;i++){
            db.sqls.query(`UPDATE ci_task SET FieldWorker='',flag='false' WHERE id=${id[i]}`,(err,response)=>{
                if(err) throw err
                console.log("Updated Id",id[i])
                if(i===id.length-1){
                    res.json("SuccessFully Unassigned")
                }
            })
        }
    }

})
const Excel = require('exceljs');


router.post('/exportfile',(req,res)=>{

    const {data} = req.body



})


module.exports=router