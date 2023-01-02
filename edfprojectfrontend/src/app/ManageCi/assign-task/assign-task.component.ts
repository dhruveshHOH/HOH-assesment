import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  status:any=false
  assignStatus:any=false
  
  vManagerStatus:any=false
  vPlannerStatus:any=false
  FieldWorkerStatus:any=false
  AdminStatus:any=false

  approveAll :any=false

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

  constructor(private http:UserlogicService) { }

  ngOnInit(): void {
    this.getTasksAll()
    this.getCity()
    this.getWorkerByPlanner()

    if(this.http.getSessionToken() === 'Admin'){
      this.AdminStatus=true
    }

    if(this.http.getSessionToken() === 'VManeger'){
      this.vManagerStatus=true
    }

    if(this.http.getSessionToken() === 'Vplanner'){
      this.vPlannerStatus=true
    }

    if(this.http.getSessionToken() === 'FieldWorker'){
      this.FieldWorkerStatus=true
    }

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

    

    console.log(this.data)

    if(val===true){
      this.data.status=true
      let uniqueArray = Array.from(new Set(this.checkedBox));
      this.data.id=uniqueArray
      this.data.FieldWorker=this.Worker
      //this.data.FieldWorker=this.selectedWorker

      if(this.checkedAll===true){
        this.data.id=true
        this.http.ApproveAllWorker(this.data)
      }else{
        this.http.ApproveAllWorker(this.data)
      }
    }

  }

  assign(){
    let name = this.http.getSessionTokenName()

    let Role = this.http.getSessionToken()
    if(Role==='VManeger'){

      if(this.checkedBox.length===0 || this.selectedplanner===''){
        return alert("please Select Task OR Planner")
      }

      let uniqueArray = Array.from(new Set(this.checkedBox));
      this.vplannerData.id=uniqueArray
      this.vplannerData.Vplanner=this.selectedplanner
      console.log(this.vplannerData)
      
      if(this.checkedAll===true){
        this.vplannerData.id=this.checkedAll
        this.http.updateDataVplanner(this.vplannerData)
        this.getTasksAll()
      }
      this.http.updateDataVplanner(this.vplannerData)
      this.getTasksAll()

      
  }else if(Role==='Vplanner'){

    if(this.selectedWorker==='' || this.selectedWorker==='Select'){
      return alert('Please Select Field Worker')
    }

    

    let uniqueArray = Array.from(new Set(this.checkedBox));
    this.data.id=uniqueArray
    this.data.FieldWorker=this.selectedWorker
    
    
    
    if(this.checkedAll===true){
      this.data.id=this.checkedAll
      this.http.updateDataWorker(this.data)
      this.getTasksAll()
    }
    this.http.updateDataWorker(this.data)
    this.getTasksAll()

  }else if(Role==='FieldWorker'){


    

    let uniqueArray = Array.from(new Set(this.checkedBox));
    this.data.id=uniqueArray
    this.data.FieldWorker=this.selectedWorker
    
    console.log(this.data)
    
    if(this.checkedAll===true){
      this.data.id=this.checkedAll
      this.http.updateWorkerAssignToAssigned(this.data)
      this.getTasksAll()
    }
    this.http.updateWorkerAssignToAssigned(this.data)
    this.getTasksAll()

  }else{
    let uniqueArray = Array.from(new Set(this.checkedBox));
      this.data.id=uniqueArray
      this.data.vManager=this.selectedVender
      
      if(this.checkedAll===true){
        this.data.id=this.checkedAll
        this.http.updateDataVmanager(this.data)
        this.getTasksAll()
      }
      this.http.updateDataVmanager(this.data)
      this.getTasksAll()
      }
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

  getWorkerByPlanner(){
    let Role = this.http.getSessionToken()
    let name = this.http.getSessionTokenName()
    if(Role==='Vplanner'){

      this.http.getWorkerByVplanner(name).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        
        if(data==='No Data Found for Field Worker'){
          this.Worker.push(data)
        }else{

          for(let i of data){
            this.Worker.push(i.FirstName)
          }
          console.log(this.Worker)

        }

        
        
        
      })
    }

  }

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

  getTasksAll(){

    
    this.alltask=[]
    let Role = this.http.getSessionToken()
    let name = this.http.getSessionTokenName()
    
    if(Role==='VManeger'){

      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found"){
          return alert("No Data")
        }

        let filterData = data.filter((x:any)=>{
          return x.VenderManager === name.toLowerCase() && x.VenderPlanner === ''
        })

        console.log(filterData)

        for(let i of filterData){
          this.alltask.push(i)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of filterData){
            this.backupAllTask.push(i)
          }
  
        }

        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
      })
        
    }else if(Role === 'Vplanner'){

      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found"){
          return alert("No Data")
        }

        let filterData = data.filter((x:any)=>{
          return (x.VenderPlanner === name && x.FieldWorker ==='') && x.final_approval_vplanner !=='true'
        })

        console.log(filterData)

        for(let i of filterData){
          this.alltask.push(i)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of filterData){
            this.backupAllTask.push(i)
          }
  
        }

        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
      })

    }else if(Role === 'FieldWorker'){

      this.http.getWorkerAssign({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found for Field Worker"){
          return alert("No Data")
        }
        console.log(data)
        

        

        for(let i of data){
          this.alltask.push(i)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of data){
            this.backupAllTask.push(i)
          }
  
        }

        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
      })

    }else{

      this.http.getUnAssignedTask().pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found"){
          return alert("No Data")
        }
        console.log("Hello")
        for(let i of data){
          this.alltask.push(i)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of data){
            this.backupAllTask.push(i)
          }
        }
        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
  
      })
      
    }
    

  }

}
