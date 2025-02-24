import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductService } from '../../core/services/product/product.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  idProduct:string|null=''
  detailsProduct:IProduct|null=null
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly productService=inject(ProductService)
  private readonly cartService=inject(CartService)
  private readonly toastrService = inject(ToastrService)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get('id'));
        this.idProduct=p.get('id')
        this.productService.getSpecificProduct(this.idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
        
      }
    })
    
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:2,
    nav: false
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
}
