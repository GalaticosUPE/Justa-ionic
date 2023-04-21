import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, HttpClientModule],
})
export class AppComponent {
<<<<<<< Updated upstream
=======
  public nome: any[] = [];
>>>>>>> Stashed changes
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Vendas', url: '/folder/vendas', icon: 'receipt' },
    { title: 'Empréstimos', url: '/folder/emprestimos', icon: 'cash' },
    { title: 'Recebíveis', url: '/folder/recebiveis', icon: 'wallet' },
    { title: 'Conta', url: '/folder/conta', icon: 'person' },
  ];
  public labels = ['Rendimentos', 'Informações'];
<<<<<<< Updated upstream
  /// aqui as labels. ainda não sei como associar uma coisa a elas
  constructor() {}
=======

  constructor(private http: HttpClient) {} // Injete o HttpClient no construtor


  obterNomeDoServidor() {
    this.http.get('http://localhost:8000/vendas') // Faz a requisição HTTP para o servidor
      .subscribe((response: any) => {
        // Obtém o nome do primeiro item do array 'Venda' do JSON retornado pelo servidor
        this.nome = response.Venda[1].nome;
      });
  }


  ngOnInit() {
    this.obterNomeDoServidor();
  }
  // Chame o método obterNomeDoServidor() em algum evento ou momento apropriado
>>>>>>> Stashed changes
}
