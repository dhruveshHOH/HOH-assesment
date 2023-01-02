import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserlogicService } from 'src/app/services/userlogic.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rejected-vp',
  templateUrl: './rejected-vp.component.html',
  styleUrls: ['./rejected-vp.component.css']
})
export class RejectedVpComponent implements OnInit {

  status:any=false
  Vmanager:any[]=[]
  Vplanner:any[]=[]
  ExportStatus:any=false

  city:any[]=[]
  area:any[]=[]
  alltask:any[]=[]

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



  constructor(private http:UserlogicService) { }

  ngOnInit(): void {

    this.getCity()
    this.RejectedWorkerTask()

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

  RejectedWorkerTask(){
    let name = this.http.getSessionTokenName()

    this.http.getRejectedWorker({Vplanner:name}).subscribe((response)=>{
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
