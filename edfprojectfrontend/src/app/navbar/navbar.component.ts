import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserlogicService } from '../services/userlogic.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private appComp : AppComponent, private router : Router, private service : UserlogicService) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear()
    this.appComp.Role=null
    this.router.navigateByUrl('/login')
    
  }

}
