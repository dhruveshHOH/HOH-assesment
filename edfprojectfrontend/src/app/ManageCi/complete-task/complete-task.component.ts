import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserlogicService } from 'src/app/services/userlogic.service';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.css']
})
export class CompleteTaskComponent implements OnInit {
  dialogStatus:any=false

  alltask:any[]=[]
  backupAllTask:any[]=[]

  workerFinalData:any={
    dt_code:'',
    email:'',
    feeder_code:'',
    feeder_name:'',
    gprs:'',
    installation_number:'',
    latitude:'',
    load:'',
    load_unit:'',
    location:'',
    longitude:'',
    meter_make:'',
    meter_picture:'',
    meter_reading_kvah:'',
    meter_reading_kwh:'',
    meter_status:'',
    mobile:'',
    ms_um:'',
    neutral_cable:'',
    phase:'',
    pole:''
  }

  editData:any={
    
  }
  p:any=0

  constructor(private http:UserlogicService) { }

  ngOnInit(): void {
    this.getAllTask()
  }

  dialogStatusChange(id:any){
    if(this.dialogStatus===false){
      this.dialogStatus=true
    }else{
      this.dialogStatus=false
    }
    let filtered = this.backupAllTask.filter((x:any)=>{

      return x.id === id

    })
    this.editData=filtered
    this.workerFinalData.id= id
    console.log(this.editData)
    //this.workerFinalData.id=id
  }

  submitDialog(){
    this.validation()
    this.http.regWorkerTask(this.workerFinalData)
    this.dialogStatus=false
  }


  getAllTask(){
    let name = this.http.getSessionTokenName()
    this.http.getCompleteWorker({name:name}).pipe(first()).subscribe((response)=>{
      let data=JSON.parse(JSON.stringify(response))

      if(data==="No Data Found for Field Worker"){
        return alert(data)
      }


      for(let i of data){
        this.alltask.push(i)
    
      }
      if(this.backupAllTask.length===0){
        for(let i of data){
          this.backupAllTask.push(i)
        }

      }
      
    })
  }

  validation(){
    if(this.workerFinalData.dt_code===''){
      this.workerFinalData.dt_code=this.editData[0].ci_dt_code
    }

    if(this.workerFinalData.email===''){
      this.workerFinalData.email=this.editData[0].ci_email
    }

    if(this.workerFinalData.feeder_code===''){
      this.workerFinalData.feeder_code=this.editData[0].ci_feeder_code
    }

    if(this.workerFinalData.feeder_name===''){
      this.workerFinalData.feeder_name=this.editData[0].ci_feeder_name
    }

    if(this.workerFinalData.gprs===''){
      this.workerFinalData.gprs=this.editData[0].ci_gprs
    }

    if(this.workerFinalData.installation_number===''){
      this.workerFinalData.installation_number=this.editData[0].ci_installation_number
    }

    if(this.workerFinalData.latitude===''){
      this.workerFinalData.latitude=this.editData[0].Latitude
    }

    if(this.workerFinalData.load===''){
      this.workerFinalData.load=this.editData[0].Loadss
    }


    if(this.workerFinalData.load_unit===''){
      this.workerFinalData.load_unit=this.editData[0].LoadUnit
    }

    if(this.workerFinalData.location===''){
      this.workerFinalData.location=this.editData[0].location
    }

    if(this.workerFinalData.longitude===''){
      this.workerFinalData.longitude=this.editData[0].Longitude
    }

    if(this.workerFinalData.meter_make===''){
      this.workerFinalData.meter_make=this.editData[0].Metermake
    }

    if(this.workerFinalData.meter_picture===''){
      this.workerFinalData.meter_picture=this.editData[0].ci_meter_picture
    }

    if(this.workerFinalData.meter_reading_kvah===''){
      this.workerFinalData.meter_reading_kvah=this.editData[0].ci_meter_reading_kvah
    }

    if(this.workerFinalData.meter_reading_kwh===''){
      this.workerFinalData.meter_reading_kwh=this.editData[0].ci_meter_reading_kwh
    }

    if(this.workerFinalData.meter_status===''){
      this.workerFinalData.meter_status=this.editData[0].ci_meter_status
    }

    if(this.workerFinalData.mobile===''){
      this.workerFinalData.mobile=this.editData[0].ci_mobile
    }

    if(this.workerFinalData.ms_um===''){
      this.workerFinalData.ms_um=this.editData[0].ci_ms_um
    }

    if(this.workerFinalData.neutral_cable===''){
      this.workerFinalData.neutral_cable=this.editData[0].ci_neutral_cable
    }

    if(this.workerFinalData.phase===''){
      this.workerFinalData.phase=this.editData[0].ci_phase
    }

    if(this.workerFinalData.pole===''){
      this.workerFinalData.pole=this.editData[0].ci_pole
    }
  }

}
