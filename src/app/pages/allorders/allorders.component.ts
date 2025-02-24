import { CartItem } from './../../shared/interfaces/orders/iorders';
import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { jwtDecode } from "jwt-decode";
import { IOrders } from '../../shared/interfaces/orders/iorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
  private readonly ordersService = inject(OrdersService)

  userData: any;
  userOrders:IOrders[]=[]

  ngOnInit(): void {
    this.saveTokenData()
    console.log(this.userData);
    this.getData()

  }

  // getAllOrders(): void {



  //   this.ordersService.getUserOrders(this.userData).subscribe({
  //     next: (res) => {
  //       console.log(res);


  //     },
  //     error: (err) => {
  //       console.log(err);

  //     }
  //   })
  // }

  getData():void{
    this.ordersService.getAllOrders().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.userOrders=res.data
      }
      
    })
  }
  saveTokenData(): void {
    this.userData = jwtDecode(JSON.stringify(localStorage.getItem('userToken')))
  }
}
