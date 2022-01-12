import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData:any = {
    username: '',
    password: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit = () => {
    console.log(this.loginData);
    
  }

}
