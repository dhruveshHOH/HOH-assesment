import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { MaincontainerComponent } from './maincontainer/maincontainer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { VenderManagerComponent } from './Vender/vender-manager/vender-manager.component';
import { VenderPlannerComponent } from './Vender/vender-planner/vender-planner.component';
import { VenderFieldWorkerComponent } from './Vender/vender-field-worker/vender-field-worker.component';
import { JEComponent } from './Vender/je/je.component';
import { OriginComponent } from './Vender/origin/origin.component';
import { UserlogicService } from './services/userlogic.service';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { AllTasksComponent } from './ManageCi/all-tasks/all-tasks.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AssignTaskComponent } from './ManageCi/assign-task/assign-task.component';
import { AssignedTaskComponent } from './ManageCi/assigned-task/assigned-task.component';
import { PendingvpVericationComponent } from './ManageCi/pendingvp-verication/pendingvp-verication.component';
import { CompleteTaskComponent } from './ManageCi/complete-task/complete-task.component';
import { RejectedVpComponent } from './ManageCi/rejected-vp/rejected-vp.component';
import { ApprovedRejectTaskComponent } from './ManageCi/JES/approved-reject-task/approved-reject-task.component';
import { ApprovedTaskComponent } from './ManageCi/JES/approved-task/approved-task.component';
import { RejectedTaskComponent } from './ManageCi/JES/rejected-task/rejected-task.component';



@NgModule({
  declarations: [
    AppComponent,
    MaincontainerComponent,
    NavbarComponent,
    SidebarComponent,
    LoginPageComponent,
    DashboardComponent,
    UploadExcelComponent,
    VenderManagerComponent,
    VenderPlannerComponent,
    VenderFieldWorkerComponent,
    JEComponent,
    OriginComponent,
    UploadDataComponent,
    AllTasksComponent,
    AssignTaskComponent,
    AssignedTaskComponent,
    PendingvpVericationComponent,
    CompleteTaskComponent,
    RejectedVpComponent,
    ApprovedRejectTaskComponent,
    ApprovedTaskComponent,
    RejectedTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [UserlogicService,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
