import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // Verifica se o usuário e a senha foram preenchidos corretamente
    if (this.username === 'usuario' && this.password === 'senha') {
      // Navega para a página de vendas
      this.router.navigate(['/vendas']);
    } else {
      // Exibe uma mensagem de erro
      alert('Usuário ou senha inválidos.');
    }
  }

}
