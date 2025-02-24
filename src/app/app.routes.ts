import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

// Define routes for standalone components
export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },

  // Auth routes (no lazy loading as they're simple pages)
  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],
    title: 'Auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {path:'forgot',loadComponent:()=>import('./shared/components/forgot/forgot/forgot.component').then((m)=>m.ForgotComponent)},
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  // Main routes with lazy loading for components
  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    title: 'Blank',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories',
      },
      {path:'details/:id',loadComponent:()=>import('./pages/details/details.component').then((m)=>m.DetailsComponent)},
      {path:'allorders',loadComponent:()=>import('./pages/allorders/allorders.component').then((m)=>m.AllordersComponent)},
      {path:'checkout/:id',loadComponent:()=>import('./pages/checkout/checkout.component').then((m)=>m.CheckoutComponent)},
      {path:'checkcash/:id',loadComponent:()=>import('./shared/components/checkCash/check-cash/check-cash.component').then((m)=>m.CheckCashComponent)},
      {path:'product/:id',loadComponent:()=>import('./shared/components/product/product/product.component').then((m)=>m.ProductComponent)},
      {path:'category/:id',loadComponent:()=>import('./shared/components/catigory/categoriey-details/categoriey-details.component').then((m)=>m.CategorieyDetailsComponent)},
      {path:'wishlist',loadComponent:()=>import('./shared/components/wishlist/wishlist/wishlist.component').then((m)=>m.WishlistComponent)},
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then((m) => m.NotfoundComponent),
        title: 'Not Found',
      },
    ],
  },
];
