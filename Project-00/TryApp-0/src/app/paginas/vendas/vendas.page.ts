import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendasPage implements OnInit {
  //aqui ao inves de var
  selectedValue: any;
  nomeDoUsuario: any;
  //
  public venda3: number = 0;
  public qtd3: any[] = [];
  public venda6: number = 0;
  public qtd6: any[] = [];
  public venda12: number = 0;
  public qtd12: any[] = [];

  public periodoSelecionado: string = '';

  faturamento: string = '';
  quantidade_vendas: string = '';

  //tabelas
  exibirTabela3 = false;
  exibirTabela6 = false;
  exibirTabela12 = false;
  public vendas3: any[] = [];
  public vendas6: any[] = [];
  public vendas12: any[] = [];

  constructor(public http: HttpClient, public cookieService: CookieService) {}

  ngOnInit() {
    const selectedValue = this.cookieService.get('selectedValue');
    if (selectedValue) {

      this.mudandoDadosUsuario(Number(selectedValue));
      this.obterVendadoServidor3(this.nomeDoUsuario);
    this.obterVendadoServidor6(this.nomeDoUsuario);
    this.obterVendadoServidor12(this.nomeDoUsuario);
    }
  }


  mudandoDadosUsuario(selectedValue: number) {
    switch (selectedValue) {

      case 0:
        this.nomeDoUsuario = 'VendasLucas';
        break;
      case 1:
        this.nomeDoUsuario = 'VendasLuan';
        break;
      case 2:
        this.nomeDoUsuario = 'VendasArthur';
        break;
      case 3:
        this.nomeDoUsuario = 'VendasVinicius';
        break;
      default:
        return;
    }

  }

  obterVendadoServidor3(nomeDoUsuario: string) {
    this.http.get('http://15.229.117.8:8000/vendas').subscribe((response: any) => {
      // Armazena os dados de vendas do usuário selecionado
      this.vendas3 = response[this.nomeDoUsuario].slice(9, 12);
      // Calcula a soma das vendas
      this.qtd3 = this.vendas3.reduce((total: number, venda: any) => total + venda.vendas, 0);
      this.venda3 = this.vendas3.reduce((total: number, venda: any) => total + venda.valor, 0);
    });
  }

  obterVendadoServidor6(nomeDoUsuario: string) {
    this.http.get('http://15.229.117.8:8000/vendas').subscribe((response: any) => {
      // Armazena os dados de vendas do usuário "Arthur"
      this.vendas6 = response[this.nomeDoUsuario].slice(6, 12);
      // Calcula a soma das vendas
      this.qtd6 = this.vendas6.reduce((total: number, venda: any) => total + venda.vendas, 0);
      this.venda6 = this.vendas6.reduce((total: number, venda: any) => total + venda.valor, 0);
    });
  }

  obterVendadoServidor12(nomeDoUsuario: string) {
    this.http.get('http://15.229.117.8:8000/vendas').subscribe((response: any) => {
      // Armazena os dados de vendas do usuário "Arthur"
      this.vendas12 = response[this.nomeDoUsuario].slice(0, 12);
      // Calcula a soma das vendas
      this.qtd12 = this.vendas12.reduce((total: number, venda: any) => total + venda.vendas, 0);
      this.venda12 = this.vendas12.reduce((total: number, venda: any) => total + venda.valor, 0);
    });
  }




  onClickInformacoes3() {
    this.exibirTabela3 = !this.exibirTabela3;
  }

  onClickInformacoes6() {
    this.exibirTabela6 = !this.exibirTabela6;
  }

  onClickInformacoes12() {
    this.exibirTabela12 = !this.exibirTabela12;
  }

  onPeriodoChange(event: any) {
    this.periodoSelecionado = event.detail.value;
    this.exibirTabela3 = false;
    this.exibirTabela6 = false;
    this.exibirTabela12 = false;
    switch (this.periodoSelecionado) {
      case '3 meses':
        this.faturamento = `R$${this.venda3.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        this.quantidade_vendas = `${this.qtd3}`;
        break;
      case '6 meses':
        this.faturamento = `R$${this.venda6.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        this.quantidade_vendas = `${this.qtd6}`;
        break;
      case '1 ano':
        this.faturamento = `R$${this.venda12.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        this.quantidade_vendas = `${this.qtd12}`;
        break;
      default:
        this.faturamento = '';
        this.quantidade_vendas = '';
        break;
    }
  }
}
