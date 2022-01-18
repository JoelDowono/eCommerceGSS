import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderModelArticle } from 'src/app/models/order-article';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  orders: OrderModel[] = [];
  totalAmount = 0;
  topSaleArticle: {value:OrderModelArticle, quantity: number} = {value:null,quantity:0};
  articles: Map<number,{value:OrderModelArticle, quantity: number}> = new Map();

  basicData: any;

  basicOptions: any;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response)=> {
        this.orders = response.data;
        this.orders.map(o => o.createdAt = new Date(o.createdAt) )
        this.buildReports();
      },
      (error)=> {}
    )

    /*this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#FFA726',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };*/

    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
  }

  buildReports() {
    for(let order of this.orders) {
      this.totalAmount += order.order_price;
      for(let article of order.Articles) {
        if(this.articles.has(article.id)){
          let savedValue = this.articles.get(article.id);
          savedValue.quantity += article.OrderArticle.quantity;
        } else {
          this.articles.set(article.id,{value:article,quantity:article.OrderArticle.quantity})
        }
      }

    }

    const articleArray = Array.from(this.articles.values());
    for(let value of articleArray) {
      if(value.quantity > this.topSaleArticle.quantity) this.topSaleArticle = value;
    }

    let labels = new Array(6);
    let montantDataSet = new Array(6).fill(0);
    let quantityDataSet = new Array(6).fill(0);
    for(let i =0; i <6; i++) {
        let date = new Date();
        date.setMonth(date.getMonth() - i);
        let label = ("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear();
        labels[i] = label;
        for(let order of this.orders) {
          if(order.createdAt.getMonth() === date.getMonth() && order.createdAt.getFullYear() === date.getFullYear()) {
            montantDataSet[i] += order.order_price;
            quantityDataSet[i] += 1;
          }
        }

    }

    this.basicData = {
      labels: labels,
      datasets: [
          {
              label: 'Montant des commandes',
              backgroundColor: '#42A5F5',
              data: montantDataSet
          },
          {
              label: 'Quantite des commandes',
              backgroundColor: '#FFA726',
              data: quantityDataSet
          }
      ]
  };

  console.log(this.basicData)

  }

  editOrder(order: OrderModel) {
    // à faire
  }


}
