import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { ApiMethods } from './api-methods';
import { Directories } from './dirs';

@Component({
  selector: 'app-api-interface',
  templateUrl: './api-interface.component.html',
  styleUrls: ['./api-interface.component.css']
})
export class ApiInterfaceComponent {

  constructor(private apiMethods: ApiMethods){}

  @Input() inputFile: string ="";
  
  ngOnInit(){
    this.UpdateInfo();
  }
  
  currentPath: string = "";
  files: string[] = [];


  UpdateInfo(){
    this.apiMethods.GetPwd().then(res => this.currentPath = res);
    this.apiMethods.GetFolders()
    .then(folders => this.files = folders);
  }
  
  async Open(folderName:string){
    this.apiMethods.OpenFolder(folderName);
    // this.UpdateInfo();
  }

  GoBack(){
    this.apiMethods.Back();
    // this.UpdateInfo();
  }

  Update(){
    this.UpdateInfo();
    console.log(this.files);
    console.log(this.currentPath);
  }

  Download(fileName: string){
    this.apiMethods.Download(fileName);
  }

  Delete(fileName:string){
    this.apiMethods.Delete(fileName);
  }
}

