import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { details } from 'src/app/services/city';
import { UserlogicService } from 'src/app/services/userlogic.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-vender-manager',
  templateUrl: './vender-manager.component.html',
  styleUrls: ['./vender-manager.component.css']
})
export class VenderManagerComponent implements OnInit {

  status:any = false
  passwordStatus:any = false
  origin:any[]=[]



  InputData:any={
    FirstName:'',
    Mobile:'',
    OriginId:'',
    City:'',
    Username:'',
    Password:'',
    confirmPassword:''
  }

  FilterInput:any={
    managerInput:'',
    CityInput:''
  }

  passwordchange:any={
    Password:'',
    confirmPassword:''
  }
  passId:any
  city: any[]=[]

  backupvManager:any[]=[]
  vManager:any[]=[]

  dropdownVmanager:any[]=[]

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {

    this.getCity()
    this.service.getOriginId()
    this.getVmanager()
    this.origin = this.service.origin
    
    
  }


  FilterList(){
    let filterd=this.backupvManager.filter((x)=>{
      return x.City.toLowerCase()=== this.FilterInput.CityInput.toLowerCase() && x.FirstName.toLowerCase()===this.FilterInput.managerInput.toLowerCase()
    })

    if(filterd.length !==0){
      this.vManager=[]
      for(let i of filterd){
        this.vManager.push(i)
      }
    }else{
      return alert('No User Found')
    }
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

  

  getVmanager(){
    this.vManager=[]
    this.service.getVmanager().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      //this.city = data.details
      for(let i of data){
        this.vManager.push(i)
      }
      if(this.backupvManager.length === 0){
        for(let i of data){
          this.backupvManager.push(i)
        }
      }

      
      
      
      let filterd=this.vManager.filter((item,
        index) => this.vManager.indexOf(item) === index)

      this.vManager=filterd
    
        
    })
  }

  //To open and close Dialog Box
  open(){
    if(this.status===false){
      this.status=true
    }else{
      this.status=false
    }
    
  }

  submit(){
    if(this.InputData.City===''){
      this.InputData.City= this.city[0]
    }

    if(this.InputData.OriginId===''){
      this.InputData.OriginId=this.origin[0]
    }
    
    if(this.InputData.FirstName==='' || this.InputData.Mobile==='' || this.InputData.OriginId=='' ||
    this.InputData.City==='' || this.InputData.Username==='' || this.InputData.Password==='' || this.InputData.confirmPassword===''){
      return alert("please Fill All Detail")
    }
    if(this.InputData.Password !== this.InputData.confirmPassword){
      return alert("Password And Confirm Password Are not Correct")
    }
    this.service.registerVenderManeger(this.InputData)
    this.getVmanager()
    this.status=false

    
    //Sending Vender Data To BackEnd
  }
}
