import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CartComponent implements OnInit {

  deliveryAddress: string = "";

  constructor(public cartService: CartService,private messageService: MessageService, private confirmationService: ConfirmationService,
    private orderService: OrdersService,
    private storage: StorageService) { }

  ngOnInit(): void {
  }

  deleteProductFromCart(product) {
    this.cartService.removeArticleFromCart(product);
  }

  buy(){
    let user = this.storage.getUser();
    if(!user || !user.id) {
      this.messageService.add({severity:'warn', summary:'Connection', detail: "Veuillez vous connecter pour poursuivre vos achats"});
    } else {
      this.createCommand(user.id);
    }
  }

  createCommand(userId){
    this.confirmationService.confirm({
      message: 'voulez-vous vraiment effectuer cette commande?',
      accept: () => {
        const order = {order_adress: this.deliveryAddress, order_price:0 }
        const orderArticles: {id: number, quantity: number}[] = []

        let orderPackage = {
          order: order,
          articles: orderArticles,
          id_user: userId
        }

        for(let article of this.cartService.articles) {
          order.order_price += article.product.article_price * article.quantity;
          orderPackage.articles.push({id:article.product.id, quantity: article.quantity})
        }

        this.orderService.createOrder(orderPackage).subscribe(
          (reponse)=> {
            this.deliveryAddress = "";
            this.cartService.clearCart();
            this.messageService.add({severity:'success', summary:'Commande enregistrée', detail: "Votre commande a bien été enregistée."});
          },
          (error)=> {
            this.messageService.add({severity:'error', summary:'Erreur', detail: "Une erreur inattendue, veuillez réessayer"});
          }
        )

      }})
  }

  getTotal() {
    let total = 0;
    for(let article of this.cartService.articles) {
      total += article.product.article_price * article.quantity;
    }
    return total;
  }
}
