import { Products } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ShowProductComponent implements OnInit {

  total = 0;
  nbProduct = 6;
  articles: Products[] = [];
  productDialog: boolean = false;
  category!: string;
  idProduct: number = 0;
  form  = {};
  constructor(private productService: ProductsService,private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.form = {
      article_name: new FormControl ('', Validators.required),
      article_description: new FormControl ('',Validators.required),
      article_price: new FormControl ('',Validators.required),
      article_quantity: new FormControl ('',Validators.required),
      article_category: new FormControl ('', Validators.required),
      article_picture: new FormControl ('', Validators.required),
    }
  }

  getFromControl(name: string){
    return this.form[name];
  }

  paginate(event: any){
    console.log(event.page);
    this.productService.GetArticles(event.page).subscribe({
      next: (response: any) => {
        this.articles = response.data;
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.productService.GetArticles(0).subscribe({
      next: (response: any) => {
        this.total = response.count;
        this.articles = response.data;
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

  //méthode appelée lors de la modification du produit
  editProduct(product: Products): void {
    this.form["article_name"].value = product.article_name;
    this.form["article_description"].value = product.article_description;
    this.form["article_price"].value = product.article_price;
    this.form["article_quantity"].value = product.article_quantity;
    this.form["article_picture"].value = product.article_picture;
    this.form["article_category"].value = product.article_category;

    this.idProduct = product.id;
    this.productDialog = true;
  }

  deleteProduct(product: Products): void {
    this.confirmationService.confirm({
      message: 'voulez-vous vraiment supprimer cet article?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.productService.deleteArticle(product.id).subscribe({
            next: (response: any) => {
              this.articles = this.articles.filter(a => a.id != product.id); //retirer le produit supprimer à l'instant t
              this.messageService.add({severity:'success', summary:'Suppression', detail: response.message});
            },
            error : (error: any) => {
              console.log(error);
              this.messageService.add({severity:'error', summary:'Error', detail: error.error.message});
            }
          })
      }
    });
  }

  addProduct(): void {
    this.idProduct = 0;
    this.productDialog = true;
  }

  hideDialog() {
    this.resetProduct();
    this.idProduct = 0;
    this.productDialog = false;
  }

  //création de produit
  saveProduct() {
    const product = {
      article_name: this.form["article_name"].value,
      article_description: this.form["article_description"].value,
      article_price: this.form["article_price"].value,
      article_quantity: this.form["article_quantity"].value,
      article_picture: this.form["article_picture"].value,
      article_category: this.form["article_category"].value,
    } as Products

    if (this.idProduct > 0) {
      product.id = this.idProduct;
      this.productService.updateArticle(product).subscribe({
        next: (response: any) => {
          let index = this.articles.findIndex(a => a.id == this.idProduct);
          this.articles[index] = response.data;
          this.idProduct = 0;
          this.productDialog = false;
          this.resetProduct();
          this.messageService.add({severity:'success', summary:'Mise à jour', detail: response.message});
        },
        error : (error: any) => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message});
        }
      })
    }
    else{

      console.log(product);

      this.productService.createArticle(product).subscribe({
        next: (response: any) => {
          this.articles.push(response.data);
          this.productDialog = false;
          this.resetProduct();
          this.messageService.add({severity:'success', summary:'Création', detail: response.message});
        },
        error : (error: any) => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message});
        }
      })
    }
  }

  resetProduct() {
    this.form["article_name"].value = '';
    this.form["article_description"].value = '';
    this.form["article_price"].value = '';
    this.form["article_quantity"].value = '';
    this.form["article_picture"].value = '';
    this.form["article_category"].value = '';
  }
}
