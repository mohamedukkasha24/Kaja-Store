import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'breakfast-cereals',
    loadComponent: () => import('./pages/breakfast-cereals/breakfast-cereals.page').then( m => m.BreakfastCerealsPage)
  },
  {
    path: 'rice-product',
    loadComponent: () => import('./pages/rice-product/rice-product.page').then( m => m.RiceProductPage)
  },
  {
    path: 'dairy-products',
    loadComponent: () => import('./pages/dairy-products/dairy-products.page').then( m => m.DairyProductsPage)
  },
  {
    path: 'masala-spices',
    loadComponent: () => import('./pages/masala-spices/masala-spices.page').then( m => m.MasalaSpicesPage)
  },
  {
    path: 'instant-foods',
    loadComponent: () => import('./pages/instant-foods/instant-foods.page').then( m => m.InstantFoodsPage)
  },
  {
    path: 'bread-jam',
    loadComponent: () => import('./pages/bread-jam/bread-jam.page').then( m => m.BreadJamPage)
  },
  {
    path: 'papads-fryums',
    loadComponent: () => import('./pages/papads-fryums/papads-fryums.page').then( m => m.PapadsFryumsPage)
  },
  {
    path: 'sauces-ketchup',
    loadComponent: () => import('./pages/sauces-ketchup/sauces-ketchup.page').then( m => m.SaucesKetchupPage)
  },
  {
    path: 'baby-foods',
    loadComponent: () => import('./pages/baby-foods/baby-foods.page').then( m => m.BabyFoodsPage)
  },
  {
    path: 'staples',
    loadComponent: () => import('./category/staples/staples.page').then( m => m.StaplesPage)
  },
  {
    path: 'beverages',
    loadComponent: () => import('./category/beverages/beverages.page').then( m => m.BeveragesPage)
  },
  {
    path: 'fruits-and-vegetables',
    loadComponent: () => import('./category/fruits-and-vegetables/fruits-and-vegetables.page').then( m => m.FruitsAndVegetablesPage)
  },
  {
    path: 'snacks-and-namkeens',
    loadComponent: () => import('./category/snacks-and-namkeens/snacks-and-namkeens.page').then( m => m.SnacksAndNamkeensPage)
  },
  {
    path: 'chilled-and-dairyfoods',
    loadComponent: () => import('./category/chilled-and-dairyfoods/chilled-and-dairyfoods.page').then( m => m.ChilledAndDairyfoodsPage)
  },
  {
    path: 'ready-to-cook',
    loadComponent: () => import('./category/ready-to-cook/ready-to-cook.page').then( m => m.ReadyToCookPage)
  },
  {
    path: 'babycare',
    loadComponent: () => import('./category/babycare/babycare.page').then( m => m.BabycarePage)
  },
  {
    path: 'ready-to-eat',
    loadComponent: () => import('./category/ready-to-eat/ready-to-eat.page').then( m => m.ReadyToEatPage)
  },
  {
    path: 'household-essentials',
    loadComponent: () => import('./category/household-essentials/household-essentials.page').then( m => m.HouseholdEssentialsPage)
  },
  {
    path: 'cleaningneeds',
    loadComponent: () => import('./category/cleaningneeds/cleaningneeds.page').then( m => m.CleaningneedsPage)
  },
  {
    path: 'femininecare',
    loadComponent: () => import('./category/femininecare/femininecare.page').then( m => m.FemininecarePage)
  },
  {
    path: 'personalcare',
    loadComponent: () => import('./category/personalcare/personalcare.page').then( m => m.PersonalcarePage)
  },
  {
    path: 'stationaries',
    loadComponent: () => import('./category/stationaries/stationaries.page').then( m => m.StationariesPage)
  },
  {
    path: 'skincare',
    loadComponent: () => import('./category/skincare/skincare.page').then( m => m.SkincarePage)
  },
  {
    path: 'oralcare',
    loadComponent: () => import('./category/oralcare/oralcare.page').then( m => m.OralcarePage)
  },
  {
    path: 'mensgrooming',
    loadComponent: () => import('./category/mensgrooming/mensgrooming.page').then( m => m.MensgroomingPage)
  },
  {
    path: 'creams-and-lotions',
    loadComponent: () => import('./category/creams-and-lotions/creams-and-lotions.page').then( m => m.CreamsAndLotionsPage)
  },
  {
    path: 'crockeries',
    loadComponent: () => import('./category/crockeries/crockeries.page').then( m => m.CrockeriesPage)
  },
  {
    path: 'healthcare',
    loadComponent: () => import('./category/healthcare/healthcare.page').then( m => m.HealthcarePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'admin-category',
    loadComponent: () => import('./admin-category/admin-category.component').then( m => m.AdminCategoryComponent)
  },
];
