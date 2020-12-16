import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formModel = {
    username: '',
    password: '',
  };

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) this.router.navigateByUrl('');
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
        window.location.reload();
      },
      (err) => {
        this._snackBar.open('Login failed', 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }
}
