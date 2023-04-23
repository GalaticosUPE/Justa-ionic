import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonButton } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recebiveis',
  templateUrl: './recebiveis.page.html',
  styleUrls: ['./recebiveis.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class RecebiveisPage implements OnInit {
  //public botaoJaClicado: boolean = false;
  public adiantar: number = 0;
  public saldo: number = 0;
  public qtdvendas: number = 0;
  public juros: number = 0;
  public juros_percentual: number = 0;
  public valor_taxa: number =0;
  exibirTabela = false;
  @ViewChild('botaoInformacoes', { static: false }) botaoInformacoes?: IonButton;
  constructor(private http: HttpClient) {}


  obterVendadoServidor() {
    this.http.get('http://15.229.69.12:8000/vendas')
      .subscribe((response: any) => {
        //O quanto o usuário "Arthur" pode adiantar
        this.adiantar= response.VendasArthur[12].valor
      });
  }

  saldoEmConta(){
    this.http.get('http://15.229.69.12:8000/users')
    .subscribe((response:any)=>{
      //pegando o saldo do usuário "Arthur"
      this.saldo = response.Users[2].saldo;
    })
  }

  qtdDeVendas(){
    this.http.get('http://15.229.69.12:8000/vendas')
    .subscribe((response:any)=>{
      this.qtdvendas = response.VendasArthur[12].vendas;
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
    })
  }
  ngOnInit() {
    this.obterVendadoServidor();
    this.saldoEmConta();
    this.qtdDeVendas();
    }

    /*botaoClicado(){
      if (!this.botaoJaClicado) {
        const confirmar = window.confirm('Você tem certeza?');
        if (confirmar) {
          this.saldo += this.adiantar;
          this.botaoJaClicado = true;
        }
      } else {
        alert('O adiantamento já foi realizado, volte em 30 dias');
      }
    }*/

    onClickInformacoes() {
      // Altera o valor da variável de controle para mostrar ou ocultar a tabela
      this.exibirTabela = !this.exibirTabela;
    }


    onPeriodoChange(event: any) {
      const periodoSelecionado = event.detail.value;
      switch (periodoSelecionado) {
        case '1 mes':
          this.valor_taxa = this.adiantar * (this.juros) - this.adiantar
          break;
        case '2 meses':
          this.valor_taxa = this.adiantar * (this.juros ** 2) - this.adiantar
          break;
        case '3 meses':
          this.valor_taxa = this.adiantar * (this.juros ** 3) - this.adiantar
          break;
        default:
          this.valor_taxa = 0;
          break;
      }
    }


  }


