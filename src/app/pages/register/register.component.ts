import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { log } from 'console';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  msgError:string=""
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)

registerForm:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
  rePassword:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
}, { validators : this.confirmPassword})
submitForm():void{
  
 if(this.registerForm.valid){
  this.isLoading=true
  this.authService.sendRegisterForm(this.registerForm.value).subscribe({
    next:(res)=>{
      this.isLoading=false
      console.log(res);
      if(res.message==='success'){
        this.router.navigate(['/login'])
      }
      
    },
    error:(err)=>{
      this.isLoading=false
      this.msgError = err.error.message;
      
      console.log(err);
      
    }
  })
 }
 else{
  this.registerForm.markAllAsTouched()
 }







  
}
confirmPassword(group: AbstractControl){
  const password = group.get('password')?.value
  const rePassword = group.get('rePassword')?.value
  return password === rePassword ? null : {mismatch:true}
}
}
