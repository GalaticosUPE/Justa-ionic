import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendasPage implements OnInit {
  public venda3: number = 0;
  public qtd3: any[] = [];
  public venda6: number = 0;
  public qtd6: any[] = [];
  public venda12: number = 0;
  public qtd12: any[] = [];

  faturamento: string = '';
  quantidade_vendas: string = '';

  constructor(private http: HttpClient) {}


  obterVendadoServidor3() {
    this.http.get('http://15.229.69.12:8000/vendas')
      .subscribe((response: any) => {
        //Vendas do usuário "Arthur"
        const vendas = response.VendasArthur.slice(9, 12); // Obtém os primeiros 4 itens do array 'Venda'
        const soma = vendas.reduce((total:number, venda:any) => total + venda.valor, 0);
        const somaqtd = vendas.reduce((total:number, venda:any)=>total +venda.vendas,0);
        this.qtd3 = somaqtd;  // Calcula a soma das vendas
        this.venda3 = soma;

      });
  }
  obterVendadoServidor6() {
    this.http.get('http://15.229.69.12:8000/vendas')
      .subscribe((response: any) => {
        const vendas = response.VendasArthur.slice(6, 12); // Obtém os primeiros 4 itens do array 'Venda'
        const soma = vendas.reduce((total:number, venda:any) => total + venda.valor, 0);
        const somaqtd = vendas.reduce((total:number, venda:any)=>total +venda.vendas,0);
        this.qtd6 = somaqtd  // Calcula a soma das vendas
        this.venda6 = soma;
        this.venda6.toFixed(2).replace('.', ',');
      });
  }
  obterVendadoServidor12() {
    this.http.get('http://15.229.69.12:8000/vendas')
      .subscribe((response: any) => {
        const vendas = response.VendasArthur.slice(0, 12); // Obtém os primeiros 4 itens do array 'Venda'
        const soma = vendas.reduce((total:number, venda:any) => total + venda.valor, 0);
        const somaqtd = vendas.reduce((total:number, venda:any)=>total +venda.vendas,0);
        this.qtd12 = somaqtd; // Calcula a soma das vendas
        this.venda12 = soma;
        this.venda12.toFixed(2).replace('.', ',');
      });
  }





  ngOnInit() {
    this.obterVendadoServidor3();
    this.obterVendadoServidor6();
    this.obterVendadoServidor12();

  }

  onPeriodoChange(event: any) {
    const periodoSelecionado = event.detail.value;
    switch (periodoSelecionado) {
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
