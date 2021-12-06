import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';




import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FeaturesComponent } from './features/features.component';
import { PartnersComponent } from './partners/partners.component';
import { AccountComponent } from './account/account.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { AddOrEditProductModalComponent } from './components/add-or-edit-product-modal/add-or-edit-product-modal.component';



export const ROUTES : Routes = [
  {path:'home', component: HomeComponent},
  {path:'account', component: AccountComponent},
  {path:'wishlist', component: WishlistComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'shop', component: ShopComponent},
  {path:'cart', component: CartComponent},
  {path:'single-product/id', component: SingleProductComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'notfoud', component: NotfoundComponent},
  {path:'', component: HomeComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'contact', component: ContactComponent},
  {path:'**', redirectTo: 'notfound', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShopComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    FeaturesComponent,
    PartnersComponent,
    AccountComponent,
    NavigationComponent,
    WishlistComponent,
    CheckoutComponent,
    ForgotpasswordComponent,
    ContactComponent,
    DashboardComponent,
    DeleteProductModalComponent,
    AddOrEditProductModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
