import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  article;
  constructor(private productsService: ProductsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getOneArticle(productId).subscribe({
      next: (response: any) => {
        this.article = response.data;
        console.log(this.article);
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

}
