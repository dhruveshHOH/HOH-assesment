import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserlogicService } from '../services/userlogic.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data:any={
    FirstName:'',
    Role:''
  }

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {

    
    this.service.getSessionToken()
    this.data.FirstName = this.service.name
    this.data.Role = this.service.user
    console.log(this.data)

  }




}
