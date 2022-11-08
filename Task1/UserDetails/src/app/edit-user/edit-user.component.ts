import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  alert: boolean = false;
  userData: any;
  constructor(private user: UserserviceService, private route: ActivatedRoute) { }

  editUser = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    streetNumber: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
    this.user.getUser(this.route.snapshot.params['id']).subscribe((result) => {
      this.userData = result;
      this.editUser = new FormGroup({
        id: new FormControl(this.userData.id),
        firstName: new FormControl(this.userData.firstName, Validators.required),
        lastName: new FormControl(this.userData.lastName, Validators.required),
        email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
        phone: new FormControl(this.userData.phone, [
          Validators.required, 
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        streetNumber: new FormControl(this.userData.streetNumber, [Validators.required, Validators.maxLength(150)]),
        city: new FormControl(this.userData.city),
        state: new FormControl(this.userData.state),
        userName: new FormControl(this.userData.userName, Validators.required),
        password: new FormControl(this.userData.password, [Validators.required, Validators.minLength(6)])
      })
    })
  }

  editUserSubmit() {
    this.user.updateUser(this.route.snapshot.params['id'], this.editUser.value).subscribe((result)=>{
      this.alert = true;
      setTimeout( () =>{
        this.alert = false;
      },2000)
    })
  }

}
