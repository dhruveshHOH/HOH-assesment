import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-vender-planner',
  templateUrl: './vender-planner.component.html',
  styleUrls: ['./vender-planner.component.css']
})
export class VenderPlannerComponent implements OnInit {

  status:any = false
  passwordStatus:any = false
  InputData:any={
    FirstName:'',
    Mobile:'',
    venderManager:'',
    City:'',
    Username:'',
    Password:'',
    confirmPassword:''
  }

  FilterInput:any={
    managerInput:'',
    CityInput:'',
    plannerInput:''
  }

  passwordchange:any={
    Password:'',
    confirmPassword:''
  }
  passId:any

  origin:any
  city:any[]=[]

  backupvplanner:any[]=[]
  vmanager:any[]=[]
  vplanner:any[]=[]

  dropdownVmanager:any[]=[]

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {
    this.service.getOriginId()
    this.getVenderPlanner()
    this.getVenderManager()
    this.origin = this.service.origin
    this.getCity()


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

  filterManagerDropdown(val:any){

    this.service.getManagerFromCity(val).subscribe((response)=>{

      var data = JSON.parse(JSON.stringify(response));
      this.dropdownVmanager=[]
      for(let i of data){
        this.dropdownVmanager.push(i)
      }
      let filterd=this.vmanager.filter((item,
        index) => this.vmanager.indexOf(item) === index)

      this.vmanager=filterd
    })
  }

  FilterList(){
    let filterd=this.backupvplanner.filter((x)=>{
      return x.City.toLowerCase()=== this.FilterInput.CityInput.toLowerCase() &&
       x.FirstName.toLowerCase()===this.FilterInput.plannerInput.toLowerCase() &&
      x.VenderManager.toLowerCase() === this.FilterInput.managerInput
    })
    

    if(filterd.length !==0){
      this.vplanner=[]
      for(let i of filterd){
        this.vplanner.push(i)
      }
    }else{
      return alert('No User Found')
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

  getVmanagerByCity(val:any){

    this.vmanager=[]
    this.service.getManagerFromCity(val).pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
     
      for(let i of data){
        this.vmanager.push(i)
      }
    })
  }

  getVenderManager(){
    this.service.getVmanager().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      //this.city = data.details
      for(let i of data){
        this.vmanager.push(i.FirstName)
      }
      //this.websiteList = data.details
      let filterd=this.vmanager.filter((item,
        index) => this.vmanager.indexOf(item) === index)
      this.vmanager=filterd
      console.log(this.vmanager)
    
    })
  }

  getVenderPlanner(){
    this.vplanner=[]
    this.service.getVplanner().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      //this.city = data.details
      for(let i of data){
        this.vplanner.push(i)
      }
      if(this.backupvplanner.length === 0){
        for(let i of data){
          this.backupvplanner.push(i)
        }
      }
      let filterd=this.vplanner.filter((item,
        index) => this.vplanner.indexOf(item) === index)

        this.vplanner=filterd
        console.log(this.vplanner)
    })
    
  }

  open(){
    console.log(this.status)
    if(this.status===false){
      this.status=true
    }else{
      this.status=false
    }
  }

  submit(){
    if(this.InputData.venderManager===''){
      this.InputData.venderManager=this.vmanager[0]
    }

    if(this.InputData.City===''){
      this.InputData.City=this.city[0]
    }
   
    if(this.InputData.FirstName==='' || this.InputData.Mobile==='' || this.InputData.venderManager=='' ||
    this.InputData.City==='' || this.InputData.Username==='' || this.InputData.Password==='' || this.InputData.confirmPassword===''){
      return alert("please Fill All Detail")
    }
    if(this.InputData.Password !== this.InputData.confirmPassword){
      return alert("Password And Confirm Password Are not Correct")
    }
    this.status=false

    this.service.registerVplanner(this.InputData)
    this.getVenderPlanner()
  }

}
