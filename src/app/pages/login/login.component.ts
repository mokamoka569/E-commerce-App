import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { log } from 'console';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean=false;
  msgError:string=""
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)

loginForm:FormGroup=new FormGroup({
  
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
 
})
submitForm():void{
  
 if(this.loginForm.valid){
  this.isLoading=true
  this.authService.sendLoginForm(this.loginForm.value).subscribe({
    next:(res)=>{
      this.isLoading=false
      console.log(res);
      if(res.message==='success'){
        localStorage.setItem('userToken',res.token)
        this.authService.saveTokenData()
        this.router.navigate(['/home'])
      }
      
    },
    error:(err)=>{
      this.isLoading=false
      this.msgError = err.error.message;
      
      console.log(err);
      
    }
  })
 }







  
}
  
}
