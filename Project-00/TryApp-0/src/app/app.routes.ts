import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/home',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'vendas',
    loadComponent: () => import('./paginas/vendas/vendas.page').then( m => m.VendasPage)
  },  {
    path: 'recebiveis',
    loadComponent: () => import('./paginas/recebiveis/recebiveis.page').then( m => m.RecebiveisPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },


];
