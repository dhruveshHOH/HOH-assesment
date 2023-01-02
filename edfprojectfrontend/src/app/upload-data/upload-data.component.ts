import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { UserlogicService } from '../services/userlogic.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  excelFiles:any

  data:any[]=[]

  finalDataFormat:any={
    ConsumerID:'',
    InstallationNumber:'',
    City:'',
    Area:'',
    MRU:'',
  }

  finalData:any[]=[]

  constructor(private http:UserlogicService) { }

  ngOnInit(): void {
  }

  uploadData(){
    this.finalData=[]
    this.data=[]
    if(this.excelFiles===undefined){
      return alert("Please Select File")
    }
    let data:DataTransfer = <DataTransfer>(this.excelFiles.target)
    

    const reader:FileReader = new FileReader()

    reader.readAsBinaryString(data.files[0])

    reader.onload=(x:any)=>{
      let store:String = x.target.result
      const results: XLSX.WorkBook = XLSX.read(store,{type:'binary'})
      const wsname: string = results.SheetNames[0];
      const ws: XLSX.WorkSheet = results.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      for(let i of data){
        this.data.push(i)
      }

      for(let i of this.data){
        this.finalData.push(i)
      }
      this.http.regCiData(this.finalData)
      
      
      
  }

  

}

uploadDuplicate(){
  this.finalData=[]
  this.data=[]
  
  if(this.excelFiles===undefined){
    return alert("Please Select File")
  }
  let data:DataTransfer = <DataTransfer>(this.excelFiles.target)
  

  const reader:FileReader = new FileReader()

  reader.readAsBinaryString(data.files[0])

  reader.onload=(x:any)=>{
    let store:String = x.target.result
    const results: XLSX.WorkBook = XLSX.read(store,{type:'binary'})
    const wsname: string = results.SheetNames[0];
    const ws: XLSX.WorkSheet = results.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws);
    
    for(let i of data){
      this.data.push(i)
    }

    for(let i of this.data){
      this.finalData.push(i)
    }
    
    this.http.regDuplicateCiData(this.finalData)
    
}



}


}



