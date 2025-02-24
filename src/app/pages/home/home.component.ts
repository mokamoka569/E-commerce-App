import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { log } from 'console';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products:IProduct[]=[]
  categories:ICategory[]=[]
  text:string=''
  private readonly productService=inject(ProductService)
  private readonly categoriesService=inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

  
  getProductData():void{
    this.productService.getAllProduct().subscribe({
      next:(res)=>{
        this.products = res.data
        console.log(res.data);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
     })
  }
  getCategoryData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories=res.data
        console.log(res.data);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnInit(): void {
   this.getProductData();
   this.getCategoryData();
    
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    navSpeed: 700,
    navText: ['next', 'previous'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true,
  }
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl:true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: false
  }
  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status=='success'){
          this.toastrService.success(res.message,'FreshCart')
          this.cartService.cartNumber.next(res.numOfCartItems)
          console.log(this.cartService.cartNumber.getValue());
          
          
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        if(res.status=='success'){
          this.toastrService.success(res.message,'FreshCart')
          
        }
        
      }
    })
  }
}
