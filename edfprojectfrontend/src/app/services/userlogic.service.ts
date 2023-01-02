import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'


import { Observable } from 'rxjs';
import { CityResp, Vplanner,Area,
   Vmanager, orginidAndPlanner, JEs,
   getManagerByCity, getplannerBymanager,
    getFieldWorker,alltask, assignedtask ,
    Unassignedtask,getdata,workerData} from './city';

@Injectable({
  providedIn: 'root'
})
export class UserlogicService {

  city:any[]=[]
  area:any

  data:any= {
    City:[],
    Area:[]
  }

  user:any
  name:any
  origin:any=[]
  baseUrl:any = "http://localhost:3000/"
  constructor(private http : HttpClient) { }

  getuser(){

    return this.user

  }

  getCity():Observable<CityResp>{
    return this.http.get<CityResp>(this.baseUrl+'getcity')

  }

  getArea(val:any):Observable<Area>{
    console.log(val)
    return this.http.get<Area>(`http://localhost:3000/getarea/${val}`)
  }

  getVmanager():Observable<Vmanager>{
    return this.http.get<Vmanager>(this.baseUrl+'getvmanager')
  }

  getVplanner():Observable<Vplanner>{
    return this.http.get<Vplanner>(this.baseUrl+'getvplanner')
  }

  getOriginIdAndName():Observable<orginidAndPlanner>{
    return this.http.get<orginidAndPlanner>(this.baseUrl+'getorigin')
  }

  getJes():Observable<JEs>{
    return this.http.get<JEs>(this.baseUrl+'getjes')
  }

  getManagerFromCity(val:any):Observable<getManagerByCity>{
    return this.http.get<getManagerByCity>(`http://localhost:3000/getvmanagerfromcity/${val}`)
  }

  getplannerByManager(val:any):Observable<getplannerBymanager>{
    return this.http.get<getplannerBymanager>(`http://localhost:3000/getvplannerfromanager/${val}`)
  }

  getFieldWorker():Observable<getFieldWorker>{
    return this.http.get<getFieldWorker>(this.baseUrl+'getworker')
  }

  getVplannerFromVmanagerAndCity(body:any):Observable<getdata>{
    return this.http.post<getdata>(this.baseUrl+'getvplannerfromvmcity',body)

  }

  registerCityAndArea(val:any){
    console.log(val)
    this.http.post(this.baseUrl+'regcityarea',val).subscribe((response)=>{
      return alert(response)
    })
    
  }

  getSessionToken(){
    let val=sessionStorage.getItem('Key')
    if(val){
      this.user=JSON.parse(val).Role
      this.name = JSON.parse(val).FirstName
      return JSON.parse(val).Role
    }else{
      return null
    }
    
  }

  getSessionTokenName(){
    let val=sessionStorage.getItem('Key')
    if(val){
      
      return JSON.parse(val).FirstName
    }else{
      return null
    }
    
  }

  getOriginId(){
    this.origin=[]
    this.http.get(this.baseUrl+'getorigin').subscribe((response)=>{
      if(response){
        let data = JSON.stringify(response)
        for(let i in JSON.parse(data)){
          this.origin.push(JSON.parse(data)[i].OriginId)
        }
       
      }
    })
  }

  getAllTask():Observable<alltask>{
    return this.http.get<alltask>(this.baseUrl+'getalltask')
    
  }
  getUnAssignedTask():Observable<Unassignedtask>{
    return this.http.get<Unassignedtask>(this.baseUrl+'getunassign')
  }

  getAssignedTask(body:any):Observable<assignedtask>{
    return this.http.post<assignedtask>(this.baseUrl+'getassignedtask',body)
  }

  getWorkerAssign(body:any):Observable<workerData>{
    return this.http.post<workerData>(this.baseUrl+'getworkertask',body)
  }

  getWorkerAssigned(body:any):Observable<workerData>{
    return this.http.post<workerData>(this.baseUrl+'getassignedworkertask',body)
  }

  getCompleteWorker(body:any):Observable<workerData>{
    return this.http.post<workerData>(this.baseUrl+'getcompleteworkertask',body)
  }

  getApprovedJesWorker():Observable<workerData>{
    return this.http.get<workerData>(this.baseUrl+'getVplannerApprovedTask')
  }

  getWorkerByVplanner(body:any):Observable<assignedtask>{
    console.log(body)
    return this.http.post<assignedtask>(this.baseUrl+'getworkerbyvplanner',{Vplanner:body})
  }

  getVplannerApproved(body:any):Observable<assignedtask>{
    return this.http.post<assignedtask>(this.baseUrl+'getvplannerapprove',body)
  }

  getRejectedWorker(body:any):Observable<assignedtask>{
    return this.http.post<assignedtask>(this.baseUrl+'getRejectedVplanner',body)
  }

  getNotAprovedAndReject():Observable<assignedtask>{
    return this.http.get<assignedtask>(this.baseUrl+'getNotAprovedAndReject')
  }

  getJesApproved():Observable<assignedtask>{
    return this.http.get<assignedtask>(this.baseUrl+'getjesAprovedTask')
  }

  getJesRejected():Observable<assignedtask>{
    return this.http.get<assignedtask>(this.baseUrl+'getjesRejectedTask')
  }

  login(val:any){
    this.http.post(this.baseUrl+"login",val).subscribe((response)=>{
      var res = JSON.parse(JSON.stringify(response))
      
      if(res=="Invalid Crediential"){
        
        return alert("Invalid Crediential")
      }else{
        var ress =JSON.stringify(response)
        sessionStorage.setItem('Key',ress)
        this.user=JSON.parse(ress).Role
        setTimeout(()=>{
          window.location.href='/'
        },500)
        return Swal.fire({
          position: 'top',
          icon: 'success',
          title: `SucessFully LOGGED In ${this.user=JSON.parse(ress).Role}`,
          showConfirmButton: false,
          timer: 1500
        })

      }
      
    })
  }

  regWorkerTask(val:any){
    this.http.post(this.baseUrl+'regworkertask',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  regFieldWorker(val:any){

    this.http.post(this.baseUrl+'regfw',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })

  }


  registerVenderManeger(val:any){

    this.http.post(this.baseUrl+'regVender',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  registerVplanner(val:any){
    this.http.post(this.baseUrl+'vplanner',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  registerJes(val:any){
    this.http.post(this.baseUrl+'regjes',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  registerOrigin(val:any){
    this.http.post(this.baseUrl+'regorigin',val).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  regCiData(val:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
     });
    this.http.post(this.baseUrl+'regdata',val,{headers:headers}).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  regDuplicateCiData(val:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'checkData'
     });
    this.http.post(this.baseUrl+'regdata',val,{headers:headers}).subscribe((response)=>{
      return Swal.fire({
        position: 'top',
        icon: 'success',
        title: response,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  //////////////////////UPDATE SECTION

  updatePass(id:any,body:any){
    this.http.put(`http://localhost:3000/changepass/${id}`,body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateDataVmanager(body:any){
    this.http.post(this.baseUrl+'updatevmanager',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateDataVplanner(body:any){
    this.http.post(this.baseUrl+'updatevplanner',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateDataWorker(body:any){
    this.http.post(this.baseUrl+'updatefieldworker',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateAssignedToAssign(body:any){
    this.http.post(this.baseUrl+'assignedtounassign',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateAssignedToAssignVplanner(body:any){
    this.http.post(this.baseUrl+'assignedtounassignvplanner',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateAssignedToAssignWorker(body:any){
    this.http.post(this.baseUrl+'assignedtounassignworker',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateAssignedToWorkerFlag(body:any){
    this.http.post(this.baseUrl+'updateworkerflagTofalse',body).subscribe((response)=>{
      return alert(response)
    })
  }

  ApproveAllWorker(body:any){
    this.http.post(this.baseUrl+'approveworker',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateVplannerVerification(body:any){
    this.http.post(this.baseUrl+'updateStatus',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateWorkerAssignToAssigned(body:any){
    this.http.post(this.baseUrl+'updateworkerflag',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateRejectFlag(body:any){
    this.http.post(this.baseUrl+'updatesinglerejectedstatus',body).subscribe((response)=>{
      return alert(response)
    })
  }


  updateJesTaskApproval(body:any){
    this.http.post(this.baseUrl+'approveJesTask',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateJesTaskApprovalFromReject(body:any){
    this.http.post(this.baseUrl+'approveJesFromRejectTask',body).subscribe((response)=>{
      return alert(response)
    })
  }

  updateJesTaskReject(body:any){
    this.http.post(this.baseUrl+'RejectJesTask',body).subscribe((response)=>{
      return alert(response)
    })
  }

}


