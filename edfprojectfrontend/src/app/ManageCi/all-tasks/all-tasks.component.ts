import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  spinnerStatus:any=true

  JesStatus:any=false

  p: number = 1;
  alltask:any[]=[]
  city:any[]=[]
  area:any[]=[]
  MRU:any[]=[]

  backupAllTask:any[]=[]

  selectedCity:any=''
  selectedArea:any=''
  selectedCustomer:any=''

  constructor(private http:UserlogicService) { }

  ngOnInit(): void {

    this.getTasksAll()
    this.getCity()

    if(this.http.getSessionToken()==='jes'){
      this.JesStatus=true
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
        return x.CustomerId === Number(this.selectedCustomer) && x.City===this.selectedCity && x.Area===this.selectedArea
      })
      if(filtered.length===0){
        return alert("No Data Found")
      }
      this.alltask=filtered
    }
    
    

    

    
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

    console.log(this.area)

  }

  getTasksAll(){
    this.alltask=[]
    let Role = this.http.getSessionToken()
    let name = this.http.getSessionTokenName()
    
    if(Role==='VManeger'){

      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        console.log(data)
        if(data==="No Data Found"){
          return alert("No Data")
        }

        let filterData = data.filter((x:any)=>{
          return x.VenderManager === name.toLowerCase()
        })

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
      this.spinnerStatus=false

        
    }else if(Role === 'Vplanner'){
      this.http.getAssignedTask({name:name}).pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        this.spinnerStatus=false
        console.log(data)
        if(data==="No Data Found"){
          return alert("No Data")
        }

        let filterData = data.filter((x:any)=>{
          return x.VenderPlanner.toLowerCase() === name.toLowerCase()
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
    }else if(Role === 'FieldWorker'){
      console.log("hello")
      this.http.getFieldWorker().pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        this.spinnerStatus=false
        console.log(data)
        if(data==="No Data Found"){
          return alert("No Data")
        }

        

        // let filterVenderPlanner=filterData.filter((x:any)=>{
        //   return x.VenderPlanner === ''
        // })

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
    }else if(Role === 'jes'){
      this.http.getApprovedJesWorker().pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        this.spinnerStatus=false

        if(data==="No Data Found"){
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

      this.http.getAllTask().pipe(first()).subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))

        this.spinnerStatus=false
  
        if(data==="No Data Found"){
          return alert("No Data")
        }

        
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


  exportExcel(){
   
    
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(this.alltask);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.writeFile(workBook, 'temp2.xlsx');
  }

}
