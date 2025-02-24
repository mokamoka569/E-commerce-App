import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product/product.service';
import { IProduct } from '../../../interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product',
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private activatedRoute =inject(ActivatedRoute)
  private productService =inject(ProductService)
    private readonly cartService=inject(CartService)
    private readonly toastrService = inject(ToastrService)
  
  specificProducts:IProduct|null=null
  
  idProduct:string|null=''

  getDataDetails():void{
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get('id'));
        
        this.idProduct=p.get('id')
        this.productService.getSpecificProduct(this.idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.specificProducts=res.data
            
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.getDataDetails()
    
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
   items:2,
  }
}
