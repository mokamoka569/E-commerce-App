import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from  '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { log } from 'console';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
  private readonly authService =inject(AuthService)
  private readonly router = inject(Router)

  step:number = 1;
  isSubmit:boolean=false

  subEmail:Subscription=new Subscription
  subCode:Subscription=new Subscription
  subReset:Subscription=new Subscription



  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })


  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  })




  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])  ,
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  })





  verifyEmailSubmit():void{
    if(this.verifyEmail.valid){
      this.isSubmit=true
       this.subEmail=          this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          this.isSubmit=false
          if(res.statusMsg=='success'){
            this.step = 2
          }
        },
        error:(err)=>{
          this.isSubmit=false
          console.log(err);
          
        }
      })
    }
  }





  verifyCodeSubmit():void{
    if(this.verifyCode.valid){
      this.isSubmit=true
       this.subCode=          this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          this.isSubmit=false
          if(res.status=='Success'){
            this.step = 3
          }
        },
        error:(err)=>{
          this.isSubmit=false
          console.log(err);
          
        }
      })
    }
  }








  resetPasswordSubmit():void{
    if(this.resetPassword.valid){
      this.isSubmit=true
       this.subReset=          this.authService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          this.isSubmit=false
         localStorage.setItem('userToken',res.token)
         this.authService.saveTokenData()
         this.router.navigate(['/home'])
        },
        error:(err)=>{
          this.isSubmit=false
          console.log(err);
          
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subEmail.unsubscribe()
    this.subCode.unsubscribe()
    this.subReset.unsubscribe()
  }
}
