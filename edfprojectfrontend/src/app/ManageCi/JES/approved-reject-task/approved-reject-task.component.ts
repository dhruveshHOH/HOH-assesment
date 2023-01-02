import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserlogicService } from 'src/app/services/userlogic.service';

@Component({
  selector: 'app-approved-reject-task',
  templateUrl: './approved-reject-task.component.html',
  styleUrls: ['./approved-reject-task.component.css']
})
export class ApprovedRejectTaskComponent implements OnInit {
  assignStatus:any=false
  status:any=false
  Vmanager:any[]=[]
  Vplanner:any[]=[]


  city:any[]=[]
  area:any[]=[]
  alltask:any[]=[]

  checkedBox:any[]=[]
  checkedAll:Boolean=false

  backupAllTask:any[]=[]



  vplannerData:any={
    Vmanager:'',
    City:'',
    id:'',
    Vplanner:''
  }
  p: number = 1;

  selectedArea:any=''
  selectedCity:any=''
  selectedCustomer:any=''
  selectedCable:any=''



  constructor(private http:UserlogicService) { }

  ngOnInit(): void {

    this.getCity()
    this.WorkerTask()

  }

  approve(){
    if(this.checkedBox.length===0){
      return alert('Please Select Task')
    }
    this.http.updateJesTaskApproval({id:this.checkedBox})
    this.WorkerTask()
  }

  Reject(){
    if(this.checkedBox.length===0){
      return alert('Please Select Task')
    }
    this.http.updateJesTaskReject({id:this.checkedBox})
    this.WorkerTask()
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

  WorkerTask(){
    let name = this.http.getSessionTokenName()
    this.Vplanner=[]
    this.http.getNotAprovedAndReject().subscribe((response)=>{
      let data=JSON.parse(JSON.stringify(response))

      
      console.log(data)
      for(let i of data){
        this.Vplanner.push(i)
        
      }

      if(this.backupAllTask.length===0){
        for(let i of data){
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

  submit(){
    
    if(this.selectedArea==='Select'){
      this.selectedArea=''
    }

    if(this.selectedCity==='Select'){
      this.selectedCity=''
    }

    
    if(this.selectedArea==='' && this.selectedCity==='' && this.selectedCustomer==='' && this.selectedCable===''){
      return alert("Please Fill All Detail")
    }

    if(this.selectedCity!=='' && this.selectedCustomer==='' && this.selectedArea!=='' && this.selectedCable!==''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity && x.Area.trim()===this.selectedArea && x.ci_neutral_cable===this.selectedCable
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.Vplanner=filtered
    }else if(this.selectedCity==='' && this.selectedCustomer!=='' && this.selectedArea==='' && this.selectedCable!==''){
      
      let filtered= this.backupAllTask.filter((x)=>{
        
        return x.CustomerId === Number(this.selectedCustomer) && x.ci_neutral_cable===this.selectedCable
      })
      
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.Vplanner=filtered
    }else if(this.selectedCity!=='' && this.selectedCustomer==='' && this.selectedArea==='' && this.selectedCable!==''){
      let filtered= this.backupAllTask.filter((x)=>{
        return x.City===this.selectedCity && x.ci_neutral_cable===this.selectedCable
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.Vplanner=filtered
    }else{
      
      let filtered= this.backupAllTask.filter((x)=>{
        return x.CustomerId === Number(this.selectedCustomer) && x.City===this.selectedCity && x.Area.trim()===this.selectedArea && x.ci_neutral_cable===this.selectedCable
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.Vplanner=filtered
    }

  }

  getAreaByCity(val:any){
    
    this.area=[]
    let filtered=this.Vplanner.filter((x)=>{
      return x.City===val
    })
    console.log(filtered)

    for(let i of filtered){
      this.area.push(i.Area)
    }

    let uniqueArea = Array.from(new Set(this.area));
    this.area=uniqueArea

  

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

}
