import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { first } from 'rxjs';
import { UserlogicService } from 'src/app/services/userlogic.service';
@Component({
  selector: 'app-vender-field-worker',
  templateUrl: './vender-field-worker.component.html',
  styleUrls: ['./vender-field-worker.component.css']
})
export class VenderFieldWorkerComponent implements OnInit {

  status:any = false
  passwordStatus:any = false

  filterInput:any={
    City:'',
    Area:'',
    VManage:'',
    VPlanner:'',
    FirstName:''
  }

  InputData:any={
    FirstName:'',
    Mobile:'',
    Area:'',
    City:'',
    VenderManager:'',
    VenderPlanner:'',
    Username:'',
    Password:'',
    confirmPassword:''
  }

  passwordchange:any={
    Password:'',
    confirmPassword:''
  }
  passId:any

  city:any[]=[]
  area:any[]=[]
  vManager:any[]=[]
  vplanner:any[]=[]
  fieldWorker:any[]=[]

  backupworkerlist:any[]=[]

  constructor(private service:UserlogicService) { }

  ngOnInit(): void {
    this.getCity()
    this.getWorkerlist()

  }

  filterDropdown(){

    let filtered=this.backupworkerlist.filter((x)=>{
      return x.FirstName.toLowerCase()===this.filterInput.FirstName &&
      x.VenderManager.toLowerCase()===this.filterInput.VManage &&
      x.VenderPlanner.toLowerCase()===this.filterInput.VPlanner &&
      x.Area.toLowerCase() === this.filterInput.Area
    })

    if(filtered.length !==0){
      this.fieldWorker=[]
      for(let i of filtered){
        this.fieldWorker.push(i)
      }
    }else{
      return alert('No Found')
    }
  }

  passstatus(val:any){
    this.passId=val
    if(this.passwordStatus===false){
      this.passwordStatus=true
    }else{
      this.passwordStatus=false
    }
  }

  changePass(){
    console.log(this.passwordchange)
    if(this.passwordchange.Password==='' || this.passwordchange.confirmPassword===''){
      return alert('Please Fill All Detail')
    }
    if(this.passwordchange.Password === this.passwordchange.confirmPassword){
      this.service.updatePass(this.passId,this.passwordchange)
      this.passwordStatus=false
    }
    
  }

  open(){
    if(this.status===false){
      this.status=true
    }else{
      this.status=false
    }
  }

  getWorkerlist(){
    this.service.getFieldWorker().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));

      for(let i of data){
        this.fieldWorker.push(i)
      }

      if(this.backupworkerlist.length===0){
        for(let i of data){
          this.backupworkerlist.push(i)
        }
      }
    })
  }

  getCity(){
    this.service.getCity().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      
      for(let i of data.details){
        this.city.push(i.City)
      }
    
      let filterd=this.city.filter((item,
        index) => this.city.indexOf(item) === index)

      this.city=filterd
    })
  }

  getVmanagerByCity(val:any){

    this.vManager=[]
    this.service.getManagerFromCity(val).pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
     
      for(let i of data){
        this.vManager.push(i)
      }
      this.getVplannerByManager(this.vManager[0].FirstName)
    })
    

  }

  getVplannerByManager(val:any){

    this.vplanner=[]
    this.service.getplannerByManager(val).pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response))
      for(let i of data){
        this.vplanner.push(i.FirstName)
      }
    })
    console.log(this.vplanner)
  }


  getarea(val:any){
    this.area=[]
    this.service.getArea(val).pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      for(let i of data){
        this.area.push(i.Area)
      }
    })
  }

  submit(){

    console.log(this.InputData)

    if(this.InputData.City===''){
      this.InputData.City= this.city[0]
    }else{
      this.InputData.Area = this.area[0]
      this.InputData.VenderManager=this.vManager[0].FirstName
    }

    if(this.InputData.VenderPlanner===''){
      this.InputData.VenderPlanner=null
    }else{
      this.InputData.VenderPlanner=this.vplanner[0]
    }
    console.log(this.InputData)
    if(this.InputData.FirstName==='' || this.InputData.Mobile==='' || this.InputData.VenderManager=='' ||
    this.InputData.City==='' || this.InputData.Area==='' || this.InputData.VenderPlanner==='' || this.InputData.Username==='' || this.InputData.Password==='' || this.InputData.confirmPassword===''){
      return alert("please Fill All Detail")
    }

    this.service.regFieldWorker(this.InputData)
    this.status=false
  }
 
  }


