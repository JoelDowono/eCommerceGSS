import { Products } from './products';
export interface OrderArticle {
  product: Products;
  quantity: number;
}

export interface OrderModel {
  createdAt: any;
  id: number;
  order_adress: string;
  order_price: number;
  order_status: string;
  updatedAt: any;
  userId: number;
  Articles: OrderModelArticle[]
}

export interface OrderModelArticle {
  article_category: number;
  article_created: string;
  article_description: string;
  article_name: string;
  article_picture: string;
  article_price: string;
  article_quantity: number;
  id: number;
  OrderArticle: OrderArticleModel;
}

export interface OrderArticleModel{
  quantity: number;
  orderArticle_created?: any;
  OrderId: number;
  ArticleId: number;
}


