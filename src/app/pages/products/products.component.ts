import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productService = inject(ProductService)
  private readonly activatedRoute = inject(ActivatedRoute)
 private readonly cartService=inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
  products:IProduct[]=[]
  ngOnInit(): void {
   this.getProductData()
  }





  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status=='success'){
          this.toastrService.success(res.message,'FreshCart')
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



  getProductData():void{
    this.productService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products = res.data
      }
    })
  }

  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status=='success'){
          this.toastrService.success(res.message,'FreshCart')

        }
        
      }
    })
  }
}
