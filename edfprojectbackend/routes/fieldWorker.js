const express = require('express')
var router = express();
var db = require('../Database/dbConnection')


router.post('/regfw',(req,res)=>{
    const {FirstName,Mobile,Area,City,VenderManager,VenderPlanner,Username,Password} = req.body
    const Role='FieldWorker'
    db.sqls.query(`SELECT * FROM user WHERE FirstName='${FirstName}'`,(err,response)=>{
        if(err) throw err
        if(response.length===0){
            db.sqls.query(`INSERT INTO user(FirstName,Mobile,Area,City,VenderManager,VenderPlanner,Username,Password,Role)
            VALUES('${FirstName}', '${Mobile}', '${Area}', '${City}', '${VenderManager}', '${VenderPlanner}', '${Username}', '${Password}','${Role}')`,(er,result)=>{
                if(er) throw er
                if(result){
                    res.json("Sucessfully Added Field Worker")
                }else{
                    res.json("Failed To add Field Worker")
                }
            })
        }else{
            res.json("Field Worker Already Present")
        }
    })
})

router.get('/getworker',(req,res)=>{
    const Role='FieldWorker'

    db.sqls.query(`SELECT * FROM user WHERE AssignToWorker='true'`,(err,response)=>{
        if(err) throw err

        if(response.length===0){
            res.json("No Data Found for Field Worker")
        }else{
            res.json(response)
        }
    })
})

router.post('/updateworkerflag',(req,res)=>{
    const Role='FieldWorker'
    const {id} = req.body
    for(let i=0;i<id.length;i++){

        db.sqls.query(`UPDATE ci_task SET AssignToWorker='true' WHERE id=${id}`,(err,response)=>{
            if(err) throw err
    
            if(i===id.length-1){
                res.json("SuccessFully Approved")
            }
        })


    }
    
})

router.post('/updateworkerflagTofalse',(req,res)=>{
    const Role='FieldWorker'
    const {id} = req.body
    for(let i=0;i<id.length;i++){

        db.sqls.query(`UPDATE ci_task SET AssignToWorker='' WHERE id=${id}`,(err,response)=>{
            if(err) throw err
    
            if(i===id.length-1){
                res.json("SuccessFully Approved")
            }
        })


    }
    
})

router.post('/getworkertask',(req,res)=>{
    const Role='FieldWorker'
    const {name} = req.body
    db.sqls.query(`SELECT * FROM ci_task WHERE FieldWorker='${name}' AND AssignToWorker !='true'`,(err,response)=>{
        if(err) throw err

        if(response.length===0){
            res.json("No Data Found for Field Worker")
        }else{
            console.log(response)
            res.json(response)
        }
    })
})

router.post('/getassignedworkertask',(req,res)=>{
    const Role='FieldWorker'
    const {name} = req.body
    console.log(req.body)
    db.sqls.query(`SELECT * FROM ci_task WHERE FieldWorker='${name}' AND AssignToWorker='true'`,(err,response)=>{
        if(err) throw err

        if(response.length===0){
            res.json("No Data Found for Field Worker")
        }else{
            res.json(response)
        }
    })
})

router.post('/getcompleteworkertask',(req,res)=>{
    const Role='FieldWorker'
    const {name} = req.body
    console.log(req.body)
    db.sqls.query(`SELECT * FROM ci_task WHERE FieldWorker='${name}' AND filled='true'`,(err,response)=>{
        if(err) throw err

        if(response.length===0){
            res.json("No Data Found for Field Worker")
        }else{
            res.json(response)
        }
    })
})

router.post('/getworkerbyvplanner',(req,res)=>{
    const Role='FieldWorker'
    const {Vplanner} = req.body
    console.log(req.body)
    db.sqls.query(`SELECT FirstName FROM user WHERE VenderPlanner='${Vplanner}'`,(err,response)=>{
        if(err) throw err

        if(response.length===0){
            res.json("No Data Found for Field Worker")
        }else{
            res.json(response)
        }
    })
})

router.post('/regworkertask',(req,res)=>{

    const {dt_code,feeder_code,feeder_name,
        pole,installation_number,mobile,
        email,meter_make,load_unit,
        load,meter_picture,location,
        longitude,latitude,meter_reading_kwh,
        meter_reading_kvah,ms_um,phase,
        gprs,meter_status,neutral_cable,id} = req.body

    const task_current_status="VM CI Assigned"
    const last_updated_at=''

    console.log(req.body)
    db.sqls.query(`UPDATE ci_task SET ci_dt_code='${dt_code}',ci_feeder_code='${feeder_code}',ci_feeder_name='${feeder_name}',ci_pole='${pole}',
        ci_installation_number='${installation_number}',ci_mobile=${mobile},ci_email='${email}',ci_meter_picture='${meter_picture}',ci_meter_reading_kwh='${meter_reading_kwh}',
        ci_meter_reading_kvah='${meter_reading_kvah}',ci_ms_um='${ms_um}',ci_phase=${phase},ci_gprs=${gprs},ci_meter_status='${meter_status}',ci_neutral_cable='${neutral_cable}',
        task_current_status='${task_current_status}',last_updated_by='${last_updated_at}',Metermake='${meter_make}',LoadUnit='${load_unit}',Loadss='${load}',location='${location}',
        Latitude='${latitude}',Longitude='${longitude}',filled='true' WHERE id=${id}`,(err,response)=>{
                if(err) throw err
                res.json("Sucessfully Uploaded")
            })
})




module.exports=router