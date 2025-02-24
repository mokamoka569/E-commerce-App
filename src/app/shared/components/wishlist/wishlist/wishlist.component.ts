import { Component, inject } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../../interfaces/wishlist/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe,TranslatePipe ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService)

  wishlistDetails:IWishlist[]=[]
  ngOnInit(): void {
    
   this.getWishlistData()
    
  }
  getWishlistData():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishlistDetails=res.data
        console.log(this.wishlistDetails);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeData(id:string):void{
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistDetails=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
}
