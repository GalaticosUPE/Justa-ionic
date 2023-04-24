import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonButton } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recebiveis',
  templateUrl: './recebiveis.page.html',
  styleUrls: ['./recebiveis.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class RecebiveisPage implements OnInit {

  public selectedValue: string = '';



  //Variáveis
  public botaoJaClicado: boolean = false;
  public adiantar: number = 0;
  public saldo: number = 0;
  public qtdvendas: number = 0;
  public juros: number = 1.02;
  public juros_percentual: number = 2;
  public valor_taxa: number = 0;
  exibirTabela = false;
  valor_digitado: number | null = null;
  valorDigitado: number = 0;
  periodoSelecionado: string = '';
  public num: number =0;

  @ViewChild('botaoInformacoes', { static: false }) botaoInformacoes?: IonButton;

  constructor(public http: HttpClient, public cookieService: CookieService) {}

  ngOnInit() {
    this.selectedValue = this.cookieService.get('selectedValue');
    console.log(this.selectedValue);
    this.mudandoDadosUsuario(this.selectedValue);
    console.log(this.qtdvendas);
    console.log(this.adiantar);
    this.saldoEmConta(this.num);

  }

  async mudandoDadosUsuario(selectedValue: string) {
    const response:any = await this.http.get('http://15.229.117.8:8000/vendas').toPromise();
    switch (selectedValue) {
      case '0':
        this.num = 0;
        this.qtdvendas = response.VendasLucas[11].vendas;
        this.adiantar = response.VendasLucas[11].valor;
        break;
      case '1':
        this.num = 1;
        this.qtdvendas = response.VendasLuan[11].vendas;
        this.adiantar = response.VendasLuan[11].valor;
        break;
      case '2':
        this.num = 2;
        this.qtdvendas = response.VendasArthur[11].vendas;
        this.adiantar = response.VendasArthur[11].valor;
        break;
      case '3':
        this.num = 3;
        this.qtdvendas = response.VendasVinicius[11].vendas;
        this.adiantar = response.VendasVinicius[11].valor;
        break;
      default:
        return;
    }
      if (this.qtdvendas >= 1 && this.qtdvendas <= 4) {
        this.juros = 1.02;
        this.juros_percentual = 2;
      } else if (this.qtdvendas >= 5 && this.qtdvendas <= 7) {
        this.juros = 1.015;
        this.juros_percentual = 1.5;
      } else if (this.qtdvendas >= 8 && this.qtdvendas <= 14) {
        this.juros = 1.01;
        this.juros_percentual = 1;
      } else {
        this.juros = 1;
        this.juros_percentual = 0;
      }
    }


  saldoEmConta(num: number){
    this.http.get('http://15.229.117.8:8000/users')
    .subscribe((response:any)=>{
      //pegando o saldo do usuário "Arthur"
      this.saldo = response.Users[this.num].saldo;
    })
  }



    botaoClicado() {
      if (this.valor_digitado !== null) {
        if (isNaN(this.valorDigitado)) {
          alert('Por favor, digite um valor numérico válido.');
        } else if (this.valorDigitado === 0) {
          alert('Por favor, digite um valor maior que zero.');
        } else if (this.valorDigitado <= this.adiantar) {
          const confirmar = window.confirm('Você tem certeza que deseja adiantar o valor digitado?');
          if (confirmar) {
            this.saldo += this.valorDigitado;
            this.adiantar -= this.valorDigitado;
          }
        } else {
          alert('O valor digitado é maior do que o permitido.');
        }
      } else {
        alert('Por favor, digite um valor.');
      }
    }


    onClickInformacoes() {
      this.exibirTabela = !this.exibirTabela;
    }

    atualizarValorDigitado(event: any) {
      this.valor_digitado = parseFloat(event.target.value);
    }



    onPeriodoChange(event: any) {
      const periodoSelecionado = event.detail.value;
      this.valorDigitado = Number(this.valor_digitado);
      switch (periodoSelecionado) {
        case '1 mes':
          this.valor_taxa = this.valorDigitado * (this.juros) - this.valorDigitado
          break;
        case '2 meses':
          this.valor_taxa = this.valorDigitado * (this.juros ** 2) - this.valorDigitado
          break;
        case '3 meses':
          this.valor_taxa = this.valorDigitado * (this.juros ** 3) - this.valorDigitado
          break;
        case '4 meses':
          this.valor_taxa = this.valorDigitado * (this.juros ** 4) - this.valorDigitado
          break;
        case '5 meses':
          this.valor_taxa = this.valorDigitado * (this.juros ** 5) - this.valorDigitado
          break;
        case '6 meses':
          this.valor_taxa = this.valorDigitado * (this.juros ** 6) - this.valorDigitado
          break;
        default:
          this.valor_taxa = 0;
          break;
      }
    }
  }


