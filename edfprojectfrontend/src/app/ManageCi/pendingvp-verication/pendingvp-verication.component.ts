import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserlogicService } from 'src/app/services/userlogic.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pendingvp-verication',
  templateUrl: './pendingvp-verication.component.html',
  styleUrls: ['./pendingvp-verication.component.css']
})
export class PendingvpVericationComponent implements OnInit {
  dialogStatus:any=false
  status:any=false
  assignStatus:any=false
  ExportStatus:any=false
  vManagerStatus:any=false
  vPlannerStatus:any=false

  approveAll :any=false

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

  vplannerData:any={
    Vmanager:'',
    City:'',
    id:'',
    Vplanner:''
  }

  data:any={
    id:'',
    vManager:''
  }

  p: number = 1;
  alltask:any[]=[]
  city:any[]=[]
  area:any[]=[]
  MRU:any[]=[]
  Vmanager:any[]=[]
  Vplanner:any[]=[]
  Worker:any[]=[]

  backupAllTask:any[]=[]
  checkedBox:any[]=[]
  checkedAll:Boolean=false
  selectedCity:any=''
  selectedArea:any=''
  selectedCustomer:any=''
  selectedVender:any=''
  selectedplanner:any=''
  selectedWorker:any=''
  editData:any={}
  constructor(private http:UserlogicService) { }

  ngOnInit(): void {
    
    this.getCity()
    this.approvedVplanner()

    if(this.http.getSessionToken()==='Vplanner'){
      this.ExportStatus=true
    }
  }

  exportExcel(){
   
    
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(this.Vplanner);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.writeFile(workBook, 'PendingVpVerification.xlsx');
  }

  rejectSingleTask(){
    this.http.updateRejectFlag({id:this.workerFinalData.id})
  }

  submitDialog(){
    this.validation()
    this.http.regWorkerTask(this.workerFinalData)
    this.dialogStatus=false
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
    
  }

  assign(){

    this.http.updateVplannerVerification({id:this.checkedBox})

  }

  approvedVplanner(){
    let name = this.http.getSessionTokenName()

    this.http.getVplannerApproved({Vplanner:name}).subscribe((response)=>{
      let data=JSON.parse(JSON.stringify(response))

      let filtered= data.filter((x:any)=>{
        return x.filled==='true' && x.final_approval_vplanner !=='true' && x.Reject !== 'true'
      })
      
      for(let i of filtered){
        this.Vplanner.push(i)
      }

      if(this.backupAllTask.length===0){
        for(let i of filtered){
          this.backupAllTask.push(i)
        }

      }
    })
  }

  getVplannerByCityAndManager(val:any){
    let Role = this.http.getSessionToken()
    let name = this.http.getSessionTokenName()

    //console.log(val)
    if(Role==='VManeger'){
      this.Vplanner=[]
      this.vplannerData.Vmanager=name
      this.vplannerData.City=val
      console.log(this.vplannerData)
      this.http.getVplannerFromVmanagerAndCity(this.vplannerData).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        if(data==='No Data Found'){
          this.Vplanner.push('No Data Found')
        }else{

          for(let i of data){
          
            if(i.VenderPlanner !== '' && i.VenderPlanner !== 'null' && i.VenderPlanner !== null){
              
              this.Vplanner.push(i.FirstName)
  
            }
          }
        }
      })
    }

  }

  checkboxstatus(){
    if(this.checkedAll===true){
      this.assignStatus=true
    }else{
      this.assignStatus=false
    }
  }

  checkbox(event:any){

    if(this.assignStatus===false){
      this.assignStatus=true
    }
    let id =event.target.value
    
    if(event.target.checked===false){
      const index = this.checkedBox.indexOf(id);
      if (index > -1) {
        this.checkedBox.splice(index, 1);
      }
    }else{
      this.checkedBox.push(id)
    }
    if(this.checkedBox.length===0){
      this.assignStatus=false
    }
    

  }

  approveAllWorker(val:any){
    
    
    if(val==='done'){

      this.data.id=this.workerFinalData.id
      //this.data.FieldWorker=this.workerFinalData
      this.data.status = true
      this.http.ApproveAllWorker(this.data)


    }else{
      if(this.checkedBox.length === 0){
        return alert("Please Select some data")
      }
      if(val===true){
        this.data.status=true
        let uniqueArray = Array.from(new Set(this.checkedBox));
        this.data.id=uniqueArray
        this.data.FieldWorker=this.Worker[0]
  
        if(this.checkedAll===true){
          this.data.id=true
          this.http.ApproveAllWorker(this.data)
        }else{
          this.http.ApproveAllWorker(this.data)
        }
      }
  
    }

    

    console.log(this.data)

    
  }

 

  submit(){
    
    if(this.selectedArea==='Select'){
      this.selectedArea=''
    }

    if(this.selectedCity==='Select'){
      this.selectedCity=''
    }

    console.log(this.selectedCustomer,this.selectedArea,this.selectedCity)
    if(this.selectedArea==='' && this.selectedCity==='' && this.selectedCustomer===''){
      return alert("Please Fill All Detail")
    }

    if(this.selectedCity!=='' && this.selectedCustomer==='' && this.selectedArea!==''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity && x.Area.trim()===this.selectedArea
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }else if(this.selectedCity==='' && this.selectedCustomer!=='' && this.selectedArea===''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.CustomerId === Number(this.selectedCustomer)
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }else if(this.selectedCity!=='' && this.selectedCustomer==='' && this.selectedArea===''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }else{
      
      let filtered= this.backupAllTask.filter((x)=>{
        return x.CustomerId === Number(this.selectedCustomer) && x.City===this.selectedCity && x.Area.trim()===this.selectedArea
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }

  }

  // getWorkerByPlanner(){
  //   let Role = this.http.getSessionToken()
  //   let name = this.http.getSessionTokenName()
  //   console.log(this.Vplanner[0])
  //   if(Role==='Vplanner'){

  //     this.http.getWorkerAssigned({name:name}).pipe(first()).subscribe((response)=>{
  //       let data=JSON.parse(JSON.stringify(response))
  //       console.log(data)
  //       if(data==='No Data Found for Field Worker'){
  //         this.Worker.push(data)
  //       }else{

  //         // for(let i of data){
  //         //   this.Worker.push(i.FirstName)
  //         // }
  //         // console.log(this.Worker)

  //       }

  //       let filtered= data.filter((x:any)=>{
  //         return x.final_approval_vplanner==='true'
  //       })
  
      
  
        
  
        
  //       if(this.backupAllTask.length===0){
  //         for(let i of filtered){
  //           this.backupAllTask.push(i)
  //         }
  
  //       }

        
  //       //let uniqueCity = Array.from(new Set(this.city));
  //       //this.Worker=uniqueCity
        
  //     })
  //   }

  // }

  getCity(){
    this.city=[]
    this.http.getCity().pipe(first()).subscribe((response)=>{
      let data=JSON.parse(JSON.stringify(response))

      for(let i of data.details){
        this.city.push(i.City)
      }

      let uniqueCity = Array.from(new Set(this.city));
      this.city=uniqueCity

    })
  }

  getVmanagerByCity(val:any){
    let Role = this.http.getSessionToken()

    if(Role === 'Admin'){

      this.status=true
      this.Vmanager=[]
      this.http.getManagerFromCity(val).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        console.log(data)
        for(let i of data){
          this.Vmanager.push(i.FirstName)
        }

      })
    }
    
  }

  getAreaByCity(val:any){
    this.area=[]
    let filtered=this.alltask.filter((x)=>{
      return x.City===val
    })

    for(let i of filtered){
      this.area.push(i.Area)
    }

    let uniqueArea = Array.from(new Set(this.area));
    this.area=uniqueArea

  

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
