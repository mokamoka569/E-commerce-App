import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken:any =localStorage.getItem('userToken')

  constructor(private httpClient:HttpClient) { }
  checkOutPayment(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      },
      {
        headers:{
          token:this.myToken
        }
      }

    )
  }
  getUserOrders(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }
  getAllOrders():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`)
  }

  createCashOrder(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      {
        "shippingAddress":data
           
    }
    )
  }
}
