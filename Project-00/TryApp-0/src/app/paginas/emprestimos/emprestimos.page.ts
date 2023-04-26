import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.page.html',
  styleUrls: ['./emprestimos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class EmprestimosPage implements OnInit {

  public selectedValue: string = '';

  public vendas: any[] = [];
  public media_mensal: number = 0;
  public limite: number = 0;
  public juros: number = 1.03;
  public periodoSelecionado: string = '';
  valor_digitado: number | null = null;
  valorDigitado: number = 0;
  public valor_final: number = 0;
  public botaoJaClicado: boolean = false;
  public meses: number = 0;
  exibirTabela = false;

  constructor(public http: HttpClient, public cookieService: CookieService) { }

  ngOnInit() {
    this.selectedValue = this.cookieService.get('selectedValue');
    this.mudandoDadosUsuario(this.selectedValue);
  }


  async mudandoDadosUsuario(selectedValue: string) {
    const response:any = await this.http.get('http://15.229.117.8:8000/vendas').toPromise();
    switch (selectedValue) {
      case '0':
        this.vendas = response.VendasLucas.slice(0, 12);
        this.media_mensal = (this.vendas.reduce((total: number, venda: any) => total + venda.valor, 0))/12;
        break;
      case '1':
        this.vendas = response.VendasLuan.slice(0, 12);
        this.media_mensal = (this.vendas.reduce((total: number, venda: any) => total + venda.valor, 0))/12;
        break;
      case '2':
        this.vendas = response.VendasArthur.slice(0, 12);
        this.media_mensal = (this.vendas.reduce((total: number, venda: any) => total + venda.valor, 0))/12;
        break;
      case '3':
        this.vendas = response.VendasVinicius.slice(0, 12);
        this.media_mensal = (this.vendas.reduce((total: number, venda: any) => total + venda.valor, 0))/12;
        break;
      default:
        return;
    }

    }



  onClickInformacoes() {
    this.exibirTabela = !this.exibirTabela;
  }

  botaoClicado() {
    if (!this.botaoJaClicado) {
      if (this.valor_digitado !== null) {
        if (isNaN(this.valorDigitado)) {
          alert('Por favor, digite um valor numérico válido.');
        } else if (this.valorDigitado === 0) {
          alert('Por favor, digite um valor maior que zero.');
        } else if (this.valorDigitado <= this.limite) {
          const confirmar = window.confirm(`Confirmar empréstimo?`);
          if (confirmar) {
            /*somar valor no saldo do servidor
            atribuir valor a ser pago do empréstimo no servidor ;*/
            this.botaoJaClicado = true;
          }
        } else {
          alert('O valor digitado é maior do que o permitido.');
        }
      } else {
        alert('Por favor, digite um valor.');
      }
    } else {
      alert('O empréstimo já foi realizado'); // Mensagem de alerta caso o botão já tenha sido clicado
    }
  }


  atualizarValorDigitado(event: any) {
    this.valor_digitado = parseFloat(event.target.value);
    this.valorDigitado = Number(this.valor_digitado);
    this.valor_final = this.valorDigitado * (this.juros ** this.meses);
  }

  onPeriodoChange(event: any) {
    this.periodoSelecionado = event.detail.value;
    switch (this.periodoSelecionado) {
      case '1 mes':
        this.limite = this.media_mensal;
        this.meses = 1;
        break;
      case '2 meses':
        this.limite = this.media_mensal * 2;
        this.meses = 2;
        break;
      case '3 meses':
        this.limite = this.media_mensal * 3;
        this.meses = 3;
        break;
      case '4 meses':
        this.limite = this.media_mensal * 4;
        this.meses = 4;
        break;
      case '5 meses':
        this.limite = this.media_mensal * 5;
        this.meses =5;
        break;
      case '6 meses':
        this.limite = this.media_mensal * 6;
        this.meses = 6;
        break;
      default:
        this.limite = 0;
        this.meses = 0;
        break;
    }

    }
  }


