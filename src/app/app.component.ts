import { Component } from '@angular/core';
import { TableData } from './table/data/table.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public titles = [
    {
      name: 'NOTA',
      property: 'nota'
    },
    {
      name: 'CLIENTE',
      property: 'cliente'
    },
    {
      name: 'DATA DE EMISSÃO',
      property: 'dataEmissao'
    },
    {
      name: 'STATUS',
      property: 'status'
    },
  ];
  public childTitles = [
    {
      name: 'DUPLICATA',
      property: 'numero'
    },
    {
      name: 'VENCIMENTO',
      property: 'dataVencimento'
    },
    {
      name: 'VALOR',
      property: 'valor'
    },
    {
      name: 'STATUS',
      property: 'status'
    },
  ];
  public data = TableData;
  public tableChildPropertyName = 'duplicatas';


  constructor() { }

  public onSelect(data: any[]) {
    console.log(data);
  }

}
