import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/brands/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly brandsService =inject(BrandsService)
  brands:IBrand[]=[]
  ngOnInit(): void {
   this.getBrandsData()
    
  }
  getBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brands=res.data
      }
    })
  }
}
