import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  userAuthenticated: Boolean = false;

  constructor(private fb: FormBuilder, public loginService: LoginService, private router: Router,
    private _snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  getEmailErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
  }

  login() {
    this.loginService.getJSON().subscribe(data => {
      const userData = data.accounts[0];
      this.userAuthenticated = userData.username === this.loginForm.controls['email'].value && userData.password === this.loginForm.controls['password'].value;
      console.log('userAuthenticated: ', this.userAuthenticated);
      if (this.userAuthenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.openSnackBar('Invalid Credentials!', 'End now');
      }

    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
