import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly formBuilder =inject(FormBuilder)
  private readonly activatedRoute =inject(ActivatedRoute)
  private readonly ordersService =inject(OrdersService)
  myToken:any = localStorage.getItem('userToken')
  checkOutForm !:FormGroup
  cartId:string=''
  ngOnInit(): void {
   this.initForm()
   this.getCartId()
    console.log(this.myToken);
    
  }

  initForm():void{
    this.checkOutForm=this.formBuilder.group({
      details:[null,[Validators.required]],
      phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null,[Validators.required]]
    })
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
       this.cartId= param.get('id') !
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  submitForm():void{
    this.cartId
    console.log(this.checkOutForm.value);
    this.ordersService.checkOutPayment( this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status == 'success'){
          open(res.session.url,'_self')
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
