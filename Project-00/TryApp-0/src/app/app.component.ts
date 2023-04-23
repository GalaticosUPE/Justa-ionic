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
  public nome: any[] = [];
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Vendas', url: '/vendas', icon: 'receipt' },
    { title: 'Empréstimos', url: '/folder/emprestimos', icon: 'cash' },
    { title: 'Recebíveis', url: '/recebiveis', icon: 'wallet' },
    { title: 'Conta', url: '/folder/conta', icon: 'person' },
  ];
  public labels = ['Rendimentos', 'Informações'];

  constructor(private http: HttpClient) {}


  obterNomeDoServidor() {
    this.http.get('http://localhost:8000/users') // Faz a requisição HTTP para o servidor
      .subscribe((response: any) => {
        // Escolhendo o usuário "Arthur"
        this.nome = response.Users[1].nome;
      });
  }


//Chamando
  ngOnInit() {
    this.obterNomeDoServidor();

  }


}
