import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(prods:any[],klma:string): any[] {
    return prods.filter((item)=>item.title.toLowerCase().includes(klma.toLowerCase()));
  }

}
