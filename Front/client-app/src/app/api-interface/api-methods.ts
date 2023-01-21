import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Directories } from './dirs';
@Injectable({
  providedIn: 'root'
})
export class ApiMethods
{
    readonly Url :string  = "http://localhost:3000";
    
    constructor(private http:HttpClient) { }; 

    resp: string[] = [];
    public GetFolders():Promise<string[]>
    {
        var resp = this.http.get<string[]>(this.Url + "/api/dirs").toPromise()
        .then(response => {
            console.log(response as string[]);
            return response as string[];
            });
        return resp;
    }

    public Back():Promise<string[]>
    {
        var resp = this.http.get<string[]>(this.Url + "/api/back").toPromise()
            .then(response => {
                console.log(response as string[]);
                return response as string[];
            });
        return resp;
    }

    public async OpenFolder(folder:string):Promise<string>
    {
        console.log(`Send request on ${this.Url}/api/open?file=${folder}`)
        var request = `${this.Url}/api/open?file=${folder}`;
        var resp = this.http.post<string>(request, folder).toPromise().then(response => {
            console.log(response as string);
            return response as string;
        });
        return resp
    }

    public GetPwd():Promise<string>
    {
        var resp = this.http.get<string>(this.Url + "/api/pwd").toPromise().then(response => 
            {
                console.log(response as string);
                return response as string
            });;
        return resp;
    }

    public Download(file: string): void
    {
        var resp = this.http.get<File>(this.Url + `/api/download?file=${file}`).toPromise().then(response => 
            {
                console.log((response as File).text);
                return response as File
            });
    }

    public Delete(file: string): void
    {
        this.http.get<string>(this.Url + `/api/delete?file=${file}`).toPromise().then(response => 
            {
                console.log(response as string);
                return response as string
            });
    }
}