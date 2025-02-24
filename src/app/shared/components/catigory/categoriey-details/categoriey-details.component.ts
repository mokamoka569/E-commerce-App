import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { ICategory } from '../../../interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoriey-details',
  imports: [CarouselModule],
  templateUrl: './categoriey-details.component.html',
  styleUrl: './categoriey-details.component.scss'
})
export class CategorieyDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly categoriesService = inject(CategoriesService)


  idCategory:string|null=''
  detailsCate:ICategory|null=null
  ngOnInit(): void {
    this.getDetailsCategory()
    
  }

 

  getDetailsCategory():void{
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get('id'));
        this.idCategory=p.get('id')
        this.categoriesService.getSpecificCategories(this.idCategory !).subscribe({
          next:(res)=>{
            console.log(res);
            this.detailsCate = res.data
          }
        })
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
