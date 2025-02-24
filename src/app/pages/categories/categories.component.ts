import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService)
   

 categoryData:ICategory[]=[]
  ngOnInit(): void {
    this.getCategoriesData()
    
  }


 
  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoryData = res.data
      }
    })
  }
}
