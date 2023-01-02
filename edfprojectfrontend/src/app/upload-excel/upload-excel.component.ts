import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { UserlogicService } from '../services/userlogic.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {

  cityArea:any={}
  filtered:any=[]
  city:any=[]
  area:any=[]
  
  count:any=0
  constructor(private service: UserlogicService) { }

  ngOnInit(): void {
    
  }


  uploadExcel(val:any){
    let data:DataTransfer = <DataTransfer>(val.target)
    console.log(data.files)

    const reader:FileReader = new FileReader()

    reader.readAsBinaryString(data.files[0])

    reader.onload=(x:any)=>{
      let store:String = x.target.result
      const results: XLSX.WorkBook = XLSX.read(store,{type:'binary'})
      const wsname: string = results.SheetNames[0];
      const ws: XLSX.WorkSheet = results.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      
      let sameArea=''
      for(let i in data){
        this.city.push([JSON.parse(JSON.stringify(data[i])).city,JSON.parse(JSON.stringify(data[i])).area])
      }

      for(let i=0; i<this.city.length;i++){
        for(let j=i+1; j<this.city.length;j++){
          if(this.city[i][0]=== this.city[j][0] && this.city[i][1]=== this.city[j][1]){
            this.city.splice(j,1)
          }
        }
      }
      
      

      console.log(this.city)
      
  
      
      
      this.service.registerCityAndArea(this.city)
      

    }

  }

}
