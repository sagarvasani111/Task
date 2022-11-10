import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  url = "https://localhost:44324/api/Users";
  temppage: any = 0;
  pageField:any = [];
  exactPageList: any;

  pageOnLoad(){
    debugger;
    if (this.temppage == 0) {
      this.pageField = [];
      for (var a = 0; a < this.exactPageList; a++) {
        this.pageField[a] = this.temppage + 1;
        this.temppage = this.temppage + 1;
      }

    }
    else{
      this.temppage =0;
      this.pageField = [];
      for (var a = 0; a < this.exactPageList; a++) {
        this.pageField[a] = this.temppage + 1;
        this.temppage = this.temppage + 1;
      }
    }
  }

  constructor(private http: HttpClient) {
    
  }


  getList(pageNo: number, pageSize: number, sortOrder: string) {
    return this.http.get(this.url + '/GetAllUser?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder);
  }

  updateUser(id: any, data: any) {
    return this.http.put(`${this.url + "/UpdateUser?id="}` + id, data);
  }

  addUser(data: any) {
    return this.http.post(this.url + "/AddUser", data)
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.url + "/DeleteById?id="}` + id)
  }

  getUser(id: any) {
    return this.http.get(`${this.url + "/GetUserById?id="}` + id)
  }

  getAllCount() {
    return this.http.get(this.url + "/GetAllUserCount")
  }

  getSearchData(searchTerm:any){
    return this.http.get(this.url + "/GetUserBySearch?name=" + searchTerm)
  }

  getSearchDataCount(searchTerm:any){
    return this.http.get(this.url + "/GetUserBySearchCount?name=" + searchTerm)
  }

}
