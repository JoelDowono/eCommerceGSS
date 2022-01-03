import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AvatarModule } from 'primeng/avatar';
import { StorageService } from './services/storage.service';
import { GuardGuard } from './services/guard.guard';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';




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
import { from } from 'rxjs';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './components/politique-de-confidentialite/politique-de-confidentialite.component';
import { ConditionsGeneralesDeVenteComponent } from './components/conditions-generales-de-vente/conditions-generales-de-vente.component';
import { CartService } from './services/cart.service';
import { BadgeModule  } from 'primeng/badge';
import {InputNumberModule} from 'primeng/inputnumber';

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
  {path:'dashboard', component: DashboardComponent, canActivate: [GuardGuard],
  children: [
    {path:'',component: DeleteProductModalComponent},
    {path:'products',component: ShowProductComponent}
  ]},
  {path:'mentions-legales', component: MentionsLegalesComponent},
  {path:'politique-de-confidentialite', component: PolitiqueDeConfidentialiteComponent},
  {path:'conditions-generales-de-vente', component: ConditionsGeneralesDeVenteComponent},
  {path:'shop/cart', component: CartComponent},
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
    ShowProductComponent,
    MentionsLegalesComponent,
    PolitiqueDeConfidentialiteComponent,
    ConditionsGeneralesDeVenteComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    PaginatorModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    RadioButtonModule,
    AvatarModule,
    MenuModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    DataViewModule,
    BadgeModule,
    InputNumberModule,
    InputTextModule
  ],
  providers: [
    StorageService,
    CartService,
    GuardGuard,
    {
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorInterceptor,
			multi: true
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
