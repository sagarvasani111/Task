import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  url = "https://localhost:44324/api/Users";
  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(this.url + '/GetAllUser');
   }

  updateUser(id: any, data: any){
    return this.http.put(`${this.url + "/UpdateUser?id="}` + id,data);
  }

  addUser(data:any){
    return this.http.post(this.url + "/AddUser", data)
  }

  deleteUser(id: any){
    return this.http.delete(`${this.url + "/DeleteById?id="}` + id)
  }

  getUser(id:any){
    return this.http.get(`${this.url + "/GetUserById?id="}` + id)
  }
 
}
