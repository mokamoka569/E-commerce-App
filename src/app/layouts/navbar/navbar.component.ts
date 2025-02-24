import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin=input<boolean>(true)
  private readonly authService=inject(AuthService)
  private readonly cartService=inject(CartService)
  private readonly wishlistService=inject(WishlistService)
  private readonly mytranslateService=inject(MytranslateService)
  private readonly translateService=inject(TranslateService)
  countCart!:number

  countWish!:number
  ngOnInit(): void {
   this.cartService.cartNumber.subscribe({
    next:(value)=>{
      this.countCart=value
      this.cartService.getLoggedUserData().subscribe({
        next:(res)=>{
          this.cartService.cartNumber.next(res.numOfCartItems)
        }
      })
    }
   })
  
  }
  sendLogOut():void{
    this.authService.logOut()
  }

  change(lang:string):void{
    this.mytranslateService.changeTranslate(lang)
  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}
