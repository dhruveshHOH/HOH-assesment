import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.css']
})
export class AssignedTaskComponent implements OnInit {

  dialogStatus:any=false
  status:any=false
  VplannerStatus:any = false
  fieldWorkerStatus:any=false
  VManagerStatus:any=false
  AdminStatus:any=false
  assignStatus:any=false

  unassignStatus:any=false

  workerFinalData:any={}

  demo:any='cannot assign'
  

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

  backupAllTask:any[]=[]
  checkedBox:any[]=[]
  checkedAll:Boolean=false
  selectedCity:any=''
  selectedArea:any=''
  selectedCustomer:any=''
  selectedVender:any=''
  selectedplanner:any=''


  constructor(private http:UserlogicService) { }

  ngOnInit(): void {
    this.getTasksAll()

    let Role = this.http.getSessionToken()

    if(Role ==='Admin'){
      this.AdminStatus=true
    }

    if(Role ==='VManeger'){
      this.VManagerStatus=true
    }

    if(Role ==='Vplanner'){
      this.VplannerStatus=true
    }

    if(Role ==='FieldWorker'){
      this.fieldWorkerStatus=true
    }
  }

  submitDialog(){
    this.http.regWorkerTask(this.workerFinalData)
    this.dialogStatus=false
  }

  dialogStatusChange(id:any){
    if(this.dialogStatus===false){
      this.dialogStatus=true
    }else{
      this.dialogStatus=false
    }

    this.workerFinalData.id=id
  }

  checkboxStatus(){
    
    if(this.assignStatus==true){
      this.assignStatus=false
    }else{
      this.assignStatus=true
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
    ; 

  }

  assign(){
    let Name = this.http.getSessionTokenName()
    let Role = this.http.getSessionToken()
    if(Role==='VManeger'){

      let uniqueArray = Array.from(new Set(this.checkedBox));
      this.vplannerData.id=uniqueArray
      //this.vplannerData.Vplanner=this.selectedplanner
      console.log(this.vplannerData)
      
      if(this.checkedAll===true){
        this.vplannerData.id=this.checkedAll
        this.http.updateAssignedToAssignVplanner(this.vplannerData)
        this.getTasksAll()
      }
      this.http.updateAssignedToAssignVplanner(this.vplannerData)
      this.getTasksAll()

      
  }else if(Role==='Vplanner'){

    let uniqueArray = Array.from(new Set(this.checkedBox));
    this.vplannerData.id=uniqueArray
    //this.vplannerData.Vplanner=this.selectedplanner
    console.log(this.vplannerData)
    
    if(this.checkedAll===true){
      this.vplannerData.id=this.checkedAll
      this.vplannerData.Vplanner=Name
      this.http.updateAssignedToAssignWorker(this.vplannerData)
      this.getTasksAll()
    }
    this.http.updateAssignedToAssignWorker(this.vplannerData)
    this.getTasksAll()

  }else if(Role==='FieldWorker'){

    let uniqueArray = Array.from(new Set(this.checkedBox));
    this.vplannerData.id=uniqueArray
    //this.vplannerData.Vplanner=this.selectedplanner
    console.log(this.vplannerData)
    
    if(this.checkedAll===true){
      this.vplannerData.id=this.checkedAll
      this.vplannerData.Vplanner=Name
      this.http.updateAssignedToWorkerFlag(this.vplannerData)
      this.getTasksAll()
    }
    this.http.updateAssignedToWorkerFlag(this.vplannerData)
    this.getTasksAll()

  }
  else{
    let uniqueArray = Array.from(new Set(this.checkedBox));
      this.data.id=uniqueArray
      this.data.vManager=this.selectedVender
      
      if(this.checkedAll===true){
        this.data.id=this.checkedAll
        this.http.updateAssignedToAssign(this.data)
        this.getTasksAll()
      }
      this.http.updateAssignedToAssign(this.data)
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
    
    if(this.selectedVender==='Select'){
      this.selectedVender=''
    }

    //console.log(this.selectedCustomer,this.selectedArea,this.selectedCity)
    if(this.selectedArea==='' && this.selectedCity==='' && this.selectedCustomer==='' && this.selectedVender===''){
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


    }else if(this.selectedCity!=='' && this.selectedCustomer==='' && this.selectedArea==='' && this.selectedVender===''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered


    }else if(this.selectedCity!=='' && this.selectedVender!=='' && this.selectedCustomer==='' && this.selectedArea===''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity && x.VenderManager===this.selectedVender
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered

      
    }else{
      
      let filtered= this.backupAllTask.filter((x)=>{
        return x.CustomerId === Number(this.selectedCustomer) && x.City===this.selectedCity && x.Area===this.selectedArea
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }
    
    

    

    
  }

  getVmanagerByCity(val:any){
    this.status=true
    this.Vmanager=[]
    this.http.getManagerFromCity(val).pipe(first()).subscribe((response)=>{
      let data=JSON.parse(JSON.stringify(response))

      for(let i of data){
        this.Vmanager.push(i.FirstName)
      }

    })
    
  }

  getAreaByCity(val:any){
    this.area=[]
    let filtered=this.backupAllTask.filter((x)=>{
      return x.City===val
    })

    for(let i of filtered){
      this.area.push(i.Area)
    }

    let uniqueArea = Array.from(new Set(this.area));
    this.area=uniqueArea
    

  

  }

  getTasksAll(){

    let Role = this.http.getSessionToken()
    let name = this.http.getSessionTokenName()

    if(Role==='VManeger'){
      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found"){
          return alert("No Data")
        }

        let filterData = data.filter((x:any)=>{
          return x.VenderManager===name.toLowerCase() && x.VenderPlanner !== ''
        })

        // let filterVenderPlanner=filterData.filter((x:any)=>{
        //   return x.VenderPlanner === ''
        // })

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
          return (x.VenderPlanner===name) || x.final_approval_vplanner==='true'
        })

      

        console.log(filterData)

        for(let i of filterData){
          this.alltask.push(i)
          this.city.push(i.City)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of filterData){
            this.backupAllTask.push(i)
          }
  
        }
        let uniqueCity = Array.from(new Set(this.city));
        this.city=uniqueCity

        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
      })

      

    }else if(Role === 'FieldWorker'){

      this.http.getWorkerAssigned({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
  
        if(data==="No Data Found"){
          return alert("No Data")
        }


        console.log(data)

        for(let i of data){
          this.alltask.push(i)
          this.city.push(i.City)
          
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of data){
            this.backupAllTask.push(i)
          }
  
        }
        let uniqueCity = Array.from(new Set(this.city));
        this.city=uniqueCity

        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
      })

      

    }else{

      this.alltask=[]
      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        
        let filtered = data.filter((x:any)=>{
          return x.VenderManager !== ''
        })

        for(let i of filtered){
          console.log(i.filled)
          this.alltask.push(i)
          this.city.push(i.City)
          
          this.MRU.push(i.MRU)
        }
        if(this.backupAllTask.length===0){
          for(let i of filtered){
            this.backupAllTask.push(i)
          }
        }
        let uniqueCity = Array.from(new Set(this.city));
        this.city=uniqueCity
        let uniqueMru = Array.from(new Set(this.MRU));
        this.MRU=uniqueMru
    })
      
    }
  }

}
