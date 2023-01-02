import { Component, OnInit } from '@angular/core';
import { UserlogicService } from '../services/userlogic.service';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  count:any

  constructor(private http: UserlogicService) { }

  ngOnInit(): void {

    this.getTaskCount()
  }

  getTaskCount(){
    let name = this.http.getSessionTokenName()
    let Role = this.http.getSessionToken()
    if(Role==='Vplanner'){
      this.http.getAllTask().subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        let filtered = data.filter((x:any)=>{
  
          return x.VenderPlanner=== name
        })
        this.count=filtered.length
        
      })
    }

    if(Role==='Admin'){
      this.http.getAllTask().subscribe((response)=>{
        let data=JSON.parse(JSON.stringify(response))
        let filtered = data.filter((x:any)=>{
  
          return x.VenderPlanner!==''
        })
        this.count=filtered.length
        
      })
    }

  }

}
