import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private user: UserserviceService) { }
  alert: boolean = false;
  isExist:boolean = false;

  addUser = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
    streetNumber: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    city: new FormControl(''),
    state: new FormControl(''),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void {
  }

  addNewUserSubmit() {
    if (this.addUser.valid) {
      this.user.addUser(this.addUser.value).subscribe(
        (result) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000)
        }, (error: any) => {
          console.log(error);
          if (error.status == 404) {
            this.isExist = true;
            setTimeout(() => {
              this.isExist = false;
            }, 2000)
          }
        },
        () => {
          console.log("Finally clause");
        }
      )

      this.addUser.reset({});
    }
  }

}
