import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['ahmed.m@gmail.com', [Validators.required, Validators.email]],
    password: ['Aa@12345', Validators.required]
  });
  token: any
  isLoading: boolean = true;
  errmessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: AuthService
  ) { }

  ngOnInit(): void {
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginDoctor(this.loginForm.value).subscribe({
        next: (data => {
          this.errmessage = `*${data.message}`
          if (data.actionCompleted) {
            this.token = localStorage.setItem("currentDoctor", data.token)
            setTimeout(() => {
              window.location.reload()
            }, 500)
            this.router.navigate(['/home'])
          }
        }),
        error: (err => {
          console.log(err)
          this.router.navigate(['/login'])
        })
      })

    }
  }

}     
