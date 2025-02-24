import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)



  myToken:any = localStorage.getItem('userToken') 
  constructor(private httpClient:HttpClient) { }
  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',

      {
        "productId": id
      },
  
    )
  }
  getLoggedUserData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,
    
    )
  }
  
  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    
    )
  }



  
  updateCartProductQuantity(id:string,newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
     
    )
  }




  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,
   
    )
  }
}
