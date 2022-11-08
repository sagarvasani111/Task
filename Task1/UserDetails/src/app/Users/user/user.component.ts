import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'streetAddress', 'city', 'state', 'userName', 'password', 'operations']
  dataSource!: MatTableDataSource<any>;
  apiResponse: any = [];
  filterString: string = '';
  data: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private user: UserserviceService, private router: Router) {
  }

  ngOnInit(): void {
    this.data = this.user.getList().subscribe((result: any) => {
      for (var i = 0; i < 5; i++) {
        this.apiResponse.push(result[i]);
        this.dataSource = new MatTableDataSource(this.apiResponse);
        this.dataSource.paginator = this.paginator;
        
      }
      console.log(this.apiResponse)
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
    if ($event.target.value.length > 2) {
      this.dataSource.filter = $event.target.value;
    }
    else {
      this.dataSource.filter = this.apiResponse.value;
    }

  }

  nextCall() {
    const length = this.apiResponse.length;
    console.log(length);
    setTimeout(() => {
      const p: any = ''
        .repeat(5)
        .split('')
        .map((s, i) => s + i + length);
    }, 1000);
    this.data = this.user.getList().subscribe((result: any) => {
      // this.apiResponce = result;
      for (var i = length; i < length + 5; i++) {
        result[i].enableEdit = false;
        this.apiResponse.push(result[i]);
        this.dataSource = new MatTableDataSource(this.apiResponse);
        this.dataSource.paginator = this.paginator;
      }
      console.log('Response', this.apiResponse);
    });
  }


}
