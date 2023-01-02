import { Component, OnInit } from '@angular/core';
import { UserlogicService } from './services/userlogic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'edfprojectfrontend';

  Role:any

  constructor(private service : UserlogicService) { }

  ngOnInit(): void {
    console.log(this.service.getSessionToken())
    this.Role = this.service.getSessionToken()

  }
}
