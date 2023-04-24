import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

let selectedValue: number = 0

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
    { title: 'Vendas', url: '/vendas', icon: 'receipt' },
    { title: 'Empréstimos', url: '/emprestimos', icon: 'cash' },
    { title: 'Recebíveis', url: '/recebiveis', icon: 'wallet' },
  ];
 

  constructor(public http: HttpClient, public cookieService: CookieService) {}

  TrocaConta(event: any) {
    const selectedValue = event.detail.value;
    this.obterNomeDoServidor(selectedValue);
    this.cookieService.set('selectedValue', selectedValue); // armazenando o valor em um cookie
  }
  
  obterNomeDoServidor(selectedValue: number) {
    this.http.get('http://15.229.117.8:8000/users')
      .subscribe((response: any) => {
        // Escolhendo o usuário selecionado
        this.nome = response.Users[selectedValue].nome;
      });
  }
  
  entrar() {
    location.reload();
  }

  ngOnInit() {
    const selectedValue = this.cookieService.get('selectedValue');
    if (selectedValue) {
      this.obterNomeDoServidor(Number(selectedValue));
    }
  }
}
