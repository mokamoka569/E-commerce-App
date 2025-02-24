import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService)

  cartDetails:ICart = {} as ICart



  ngOnInit(): void {
   
    this.getCartData()
  }
  getCartData():void{
    this.cartService.getLoggedUserData().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeItem(id:string):void{

    Swal.fire({
      title: "Are you sure Deleted product",
      text: "Are You Sure Deleted product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next:(res)=>{
            console.log(res);
            this.cartDetails = res.data
            this.cartService.cartNumber.next(res.numOfCartItems)
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            });
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
       
      }
    });





   
  }



  updateCount(id:string,count:number):void{
    this.cartService.updateCartProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  clearItem():void{

    Swal.fire({
      title: "Are you sure Deleted Cart",
      text: "Are you sure Deleted Cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearUserCart().subscribe({
          next:(res)=>{
            console.log(res);
            if(res.message=='success'){
              this.cartDetails = {} as ICart
              this.cartService.cartNumber.next(0)
              Swal.fire({
                title: "Deleted!",
                text: "Your Cart has been deleted.",
                icon: "success"
              });
            }
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
        
      }
    });






   
  }
}
