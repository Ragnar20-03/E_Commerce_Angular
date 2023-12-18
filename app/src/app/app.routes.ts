import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ViewProductComponent } from './view-product/view-product.component';

export const routes: Routes = [
    {
        path : "" , component : LoginComponent
    },    {
        path : "products" , component : ProductsComponent
    },   {
        path : "products/:pid" , component : ViewProductComponent
    },    {
        path : "login" , component : LoginComponent
    },    {
        path : "register" , component : RegisterComponent
    },    {
        path : "cart" , component : CartComponent
    },
];
