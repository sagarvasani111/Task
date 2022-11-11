import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { PaginationService } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'streetAddress', 'city', 'state', 'userName', 'password', 'operations']
  dataSource!: MatTableDataSource<any>;
  apiResponse: any = [];
  data: any;

  page: number = 1;
  count: number = 0;
  pageSize: number = 10;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  sortOrder: string = 'asc';
  totalUser: any;

  pageNo: any = 1;
  pageNumber: boolean[] = [];
  users = [];
  pageField = [];
  paginationData: number | undefined;  
  userPerPage:any=5;
  exactPageList: any;
  temppage: number | undefined;
  searchCount:number | any = 0;
  searchVal = "";

  constructor(private user: UserserviceService, private router: Router, private paginator : PaginationService) {
  }

  ngOnInit(): void {    
    this.pageNumber[0] = true;
    this.user.temppage = 0
    this.data = this.getUsers();
  }

  getUsers() {
    this.user.getList(this.page, this.userPerPage, this.sortOrder).subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(this.apiResponse);
      this.apiResponse = result;
      console.log(this.apiResponse);
      this.getAllUserCount();
    }
    )
  }

  deleteUser(id: any) {
    this.user.deleteUser(id).subscribe((result: any) => {
      confirm("Do you really want to delete this user?")
      this.ngOnInit();
    })
  }

  editUser(id: any) {
    this.user.getUser(id).subscribe((result) => {
      console.log(result)
    })
  }

  filterData($event: any) {
    this.searchVal = $event.target.value;
    if ($event.target.value.length > 2) {
      this.user.getSearchData(this.page, this.userPerPage, this.sortOrder,$event.target.value).subscribe((result)=>{
        
        this.apiResponse = result;
        this.getAllSearchCount($event.target.value);
        console.log(this.searchCount);
      });
    }
    else {
      this.ngOnInit();
    }

  }

  getAllUserCount() {
    this.user.getAllCount().subscribe((res) => {
      this.totalUser = res;
      this.totalNoOfPages();
    })
  }

  showUserByPageNum(page: any, i: any) {
    this.users = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.page = page;
    if(this.searchCount != 0 && this.searchVal.length >2){
      debugger;
      this.user.getSearchData(this.page, this.userPerPage, this.sortOrder,this.searchVal).subscribe((result)=>{
        this.apiResponse = result;
        this.getAllSearchCount(this.searchVal);
        console.log(this.searchCount);
      });
    }
    else{
      this.getUsers();
    }
 
  }

  //Method For Pagination  

  totalNoOfPages() {
    this.paginationData = Number(this.totalUser / this.userPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
     this.user.exactPageList = this.exactPageList;
    }
     else {
      this.exactPageList = Number(tempPageData);
      this.user.exactPageList = this.exactPageList;
    }
    this.user.pageOnLoad();
    this.pageField = this.user.pageField;
  }
  
  getAllSearchCount(event:any){
    this.user.getSearchDataCount(event).subscribe((res) => {
      this.totalUser = res;
      this.searchCount = res;
      this.totalNoOfPages();
      
    })
   
  }


}
