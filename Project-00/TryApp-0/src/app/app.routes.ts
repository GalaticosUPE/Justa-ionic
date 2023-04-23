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
  },
  {
    path: 'recebiveis',
    loadComponent: () => import('./paginas/recebiveis/recebiveis.page').then( m => m.RecebiveisPage)
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/not-found/not-found.page').then( m => m.NotFoundPage)
  },  {
    path: 'loans',
    loadComponent: () => import('./paginas/loans/loans.page').then( m => m.LoansPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./paginas/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'conta',
    loadComponent: () => import('./paginas/conta/conta.page').then( m => m.ContaPage)
  },



];
