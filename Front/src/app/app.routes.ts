import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductViewComponent } from './product-view/product-view.component';

export const routes: Routes = [
    {
        path : "" , component:LoginComponent
    } , 
    {
        path : "product" , component : ProductsComponent
    } , 
    {
            path:"product/:id" , component:ProductViewComponent    
    },
    {
        path : "login"  ,component : LoginComponent
    },
    {
        path : "register"  ,component : RegisterComponent
    } ,

    {
        path : "**"  ,component : NotFoundComponent
    }
];
