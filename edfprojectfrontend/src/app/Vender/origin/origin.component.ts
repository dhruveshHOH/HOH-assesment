import { Component, OnInit } from '@angular/core';
import { UserlogicService } from 'src/app/services/userlogic.service';
import { first } from 'rxjs';



@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {

  status:any = false

  InputData:any={
    
    OriginId:'',
    OriginName:'',
    
  }

  originIdName:any[]=[]

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {
    this.service.getOriginId()
    this.getOriginIdAndName()
  }


  getOriginIdAndName(){
    this.originIdName=[]
    this.service.getOriginIdAndName().pipe(first()).subscribe((response)=>{
      var data = JSON.parse(JSON.stringify(response));
      //console.log(data)
      //this.city = data.details
      for(let i of data){
        this.originIdName.push(i)
      }
      //this.websiteList = data.details
      let filterd=this.originIdName.filter((item,
        index) => this.originIdName.indexOf(item) === index)

        this.originIdName=filterd
        
        console.log(this.originIdName)
    
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

    console.log(this.InputData)
    
    if(this.InputData.OriginId==='' || this.InputData.OriginName===''){
      return alert("please Fill All Detail")
    }
    this.service.registerOrigin(this.InputData)
    this.getOriginIdAndName()
    this.status=false
    
    

  }

}
