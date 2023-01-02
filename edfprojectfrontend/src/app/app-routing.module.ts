import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AllTasksComponent } from './ManageCi/all-tasks/all-tasks.component';
import { AssignTaskComponent } from './ManageCi/assign-task/assign-task.component';
import { AssignedTaskComponent } from './ManageCi/assigned-task/assigned-task.component';
import { CompleteTaskComponent } from './ManageCi/complete-task/complete-task.component';
import { ApprovedRejectTaskComponent } from './ManageCi/JES/approved-reject-task/approved-reject-task.component';
import { ApprovedTaskComponent } from './ManageCi/JES/approved-task/approved-task.component';
import { RejectedTaskComponent } from './ManageCi/JES/rejected-task/rejected-task.component';
import { PendingvpVericationComponent } from './ManageCi/pendingvp-verication/pendingvp-verication.component';
import { RejectedVpComponent } from './ManageCi/rejected-vp/rejected-vp.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { JEComponent } from './Vender/je/je.component';
import { OriginComponent } from './Vender/origin/origin.component';
import { VenderFieldWorkerComponent } from './Vender/vender-field-worker/vender-field-worker.component';
import { VenderManagerComponent } from './Vender/vender-manager/vender-manager.component';
import { VenderPlannerComponent } from './Vender/vender-planner/vender-planner.component';

const routes: Routes = [{
  path:'',
  component :DashboardComponent,
  children:[]

},{
  path:'upload',
  component:UploadExcelComponent
},{
  path:'upload_data',
  component:UploadDataComponent
},{
  path:'login',
  component:LoginPageComponent
},{
  path:'vendermanager',
  component:VenderManagerComponent
},{
  path:'venderplanner',
  component:VenderPlannerComponent
},{
  path:'venderfieldworker',
  component:VenderFieldWorkerComponent
},{
  path:'jes',
  component:JEComponent
},{
  path:'origin',
  component:OriginComponent
},{
  path:'alltasks',
  component:AllTasksComponent
},{
  path:'assigntask',
  component:AssignTaskComponent
},{
  path:'assignedtask',
  component:AssignedTaskComponent
},{
  path:'pendingvp',
  component:PendingvpVericationComponent
},{
  path:'completetask',
  component:CompleteTaskComponent
},{
  path:'rejectedvp',
  component:RejectedVpComponent
},{
  path:'approvereject',
  component:ApprovedRejectTaskComponent
},{
  path:'approvetask',
  component:ApprovedTaskComponent
},{
  path:'rejectedtask',
  component:RejectedTaskComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
