import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles: any;
  articleSub: any;

  constructor(private productService: ProductsService) { }


  ngOnInit(): void {

  }

}
