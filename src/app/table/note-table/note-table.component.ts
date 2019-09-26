import { Component, OnInit } from '@angular/core';
import { TableData } from '../data/table.data';
import { Note } from 'src/app/core/utils/interfaces/note';
import { Duplicate, DuplicateSelected } from 'src/app/pages/duplicate/shared/duplicate';
import { PriceHelper } from 'src/app/core/helpers/price/PriceHelper';

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.scss']
})
export class NoteTableComponent implements OnInit {

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
  public duplicatas: Duplicate[];
  public note: Note[];
  public duplicateSelected: DuplicateSelected;

  constructor() { }

  ngOnInit() {
  }

  public onSelect(notes: Note[]) {
    console.log(notes);
    if (notes.length === 0) {
      this.duplicateSelected = null;
      return;
    }
    this.getDuplicatesSelected(notes);
  }

  getDuplicatesSelected(notes: Note[]) {
    let selecteds = 0;
    let amount = 0;
    if (!notes) { return; }
    notes.forEach(note => {
      note.duplicatas.forEach(duplicate => {
        selecteds++;
        amount += PriceHelper.brlToNumber(duplicate.valor as unknown as string);
      });
    });
    amount = PriceHelper.numberToBRL(amount) as unknown as number;
    this.duplicateSelected = { selecteds, amount };
  }

  amountDuplicatesSelecteds() {
    if (!this.duplicateSelected) { return; }
    return this.duplicateSelected.selecteds > 1 ? 's' : '';
  }

}
