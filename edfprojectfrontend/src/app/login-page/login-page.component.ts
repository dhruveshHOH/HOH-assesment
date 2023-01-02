import { Component, OnInit } from '@angular/core';
import { UserlogicService } from '../services/userlogic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginData:any={
    FirstName:'',
    Password:''
  }

  constructor(public router:Router,private service : UserlogicService) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.loginData.FirstName==='' || this.loginData.Password===''){
      return alert("Please Enter All Detail")
    }else{
      this.service.login(this.loginData)
    }
  }
}
