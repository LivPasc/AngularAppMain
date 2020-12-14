import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formModel = {
    username: '',
    password: ''
  }

  constructor(private service: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('');
  }


  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value))
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
        window.location.reload();
      },
      err => {
        if (err.status == 400)
         console.log("smth went wrong");
        else
          console.log(err);
      }
    );

  }
}
