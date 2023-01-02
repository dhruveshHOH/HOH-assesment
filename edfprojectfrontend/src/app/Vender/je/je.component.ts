import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-je',
  templateUrl: './je.component.html',
  styleUrls: ['./je.component.css']
})
export class JEComponent implements OnInit {

  status:any = false
  selectedCity:any

  InputData:any={
    FirstName:'',
    Mobile:'',
    Area:'',
    City:'',
    Username:'',
    Password:'',
    confirmPassword:''
  }

  city:any[]=[]
  area:any[]=[]
  Jes:any[]=[]
  

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {

    this.getCity()
    this.getJEs()


   

    

    

  }

  getJEs(){

    this.Jes=[]
    this.service.getJes().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
     
      for(let i of data){
        this.Jes.push(i)
      }
    
    })

    //console.log(this.Jes)

  }

  getCity(){
     //////TO Get City
     this.service.getCity().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      //this.city = data.details
      for(let i of data.details){
        this.city.push(i.City)
      }
      //this.websiteList = data.details
      let filterd=this.city.filter((item,
        index) => this.city.indexOf(item) === index)

      this.city=filterd
    })
    ////ENd
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

  open(){
    if(this.status===false){
      this.status=true
    }else{
      this.status=false
    }
  }

  submit(){

    this.status=false

    if(this.InputData.City===''){
      this.InputData.City= this.city[0]
    }else{
      this.InputData.Area=this.area[0]
    }
    
    if(this.InputData.FirstName==='' || this.InputData.Mobile==='' || this.InputData.Area=='' ||
    this.InputData.City==='' || this.InputData.Username==='' || this.InputData.Password==='' || this.InputData.confirmPassword===''){
      return alert("please Fill All Detail")
    }
    if(this.InputData.Password !== this.InputData.confirmPassword){
      return alert("Password And Confirm Password Are not Correct")
    }
    this.service.registerJes(this.InputData)
    this.status=false
    
    

  }

}
