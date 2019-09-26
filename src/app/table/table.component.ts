import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { PriceHelper } from '../helpers/price/PriceHelper';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChildren('childTitlesView') childTitlesView: QueryList<HTMLElement>;
  @Input() public titles: object[] = [];
  @Input() public childTitles: object[] = [];
  @Input() public hasCheckbox: boolean;
  @Input() public hasCollapse: boolean;
  @Input() public data: any[];
  @Input() public hasDuplicate: boolean;
  @Input() public tableChildPropertyName: string;
  @Input() public dontShowParentColumn: string[];
  @Input() public dontShowChildColumn: string[];
  @Output() selectedItems = new EventEmitter<object[]>();
  public colLenght = 0;
  public masterSelected = false;
  private dataReturn: any[];
  private columnName: any;
  private childsSeleceted = 0;
  private index = 0;


  constructor() { }

  ngOnInit() {
    this.validateTable();
    this.countCol();
    this.valueToBRL();
  }

  private validateTable(): any {
    if (this.hasCollapse && !this.tableChildPropertyName) {
      throw new Error(
        `
        If you need a Collapsable table, please pass child table as a param of tableChildPropertyName
        Like the exemple bellow:

        Your JSON Object
        data = {
          prop1: 'date1'
          childTableExemple: [ <---
            {
              childProp: 'item'
            }
          ]
        }

        HTML:
        <lib-exemple-table
          [data]="data"
          [hasCollapse]="true"
          [tableChildPropertyName]="'childTableExemple'">
        <lib-exemple-table>
        `
      );
    } else if (!this.hasCollapse && this.tableChildPropertyName) {
      throw new Error(
        `
        If you need a Child table, please pass 'true' as a param of hasCollapse
        Like the exemple bellow:

        Your JSON Object
        data = {
          prop1: 'date1'
          childTableExemple: [ <---
            {
              childProp: 'item'
            }
          ]
        }

        HTML:
        <lib-exemple-table
          [data]="data"
          [hasCollapse]="true"
          [tableChildPropertyName]="'childTableExemple'">
        <lib-exemple-table>
        `
      );
    }
  }

  private countCol() {
    if (this.hasCheckbox && this.hasCollapse) {
      this.colLenght += 2;
    } else if (this.hasCheckbox || this.hasCollapse) {
      this.colLenght += 1;
    }
    this.colLenght += this.titles.length;
  }

  checkUncheckAll() {
    this.data.forEach(data => {
      data.isSelected = this.masterSelected;
      if (this.hasChildTable()) {
        data[this.tableChildPropertyName].forEach(child => {
          child.isSelected = this.masterSelected;
        });
      }
    });

    this.getCheckedItemList();
  }

  checkChildTable(inputCheck: HTMLInputElement) {
    if (this.tableChildPropertyName) {
      if (inputCheck.checked) {
        this.data[inputCheck.id][this.tableChildPropertyName].forEach(child => {
          child.isSelected = true;
        });
      } else {
        this.data[inputCheck.id][this.tableChildPropertyName].forEach(child => {
          child.isSelected = false;
        });
      }
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.data.every(item => item.isSelected === true);

    if (this.tableChildPropertyName) {
     for (let i = 0; i < this.data.length; i++) {
      this.masterSelected = this.data[i][this.tableChildPropertyName].every(child => child.isSelected === true);
      if (!this.masterSelected) {
        break;
      }
     }
    }
  }

  /*
    Verifica todos os itens que foram checkados
    E emite um evento passando o json dos itens checkados.
  */
  getCheckedItemList() {
    this.dataReturn = [];
    this.index = 0;
    if (this.hasChildTable()) {
      this.data.forEach((data) => {
        this.childsSeleceted = 0;
        const clone = this.cloneLineAndRemovesYourChilds(data);
        this.dataReturn.push(clone);
        data[this.tableChildPropertyName].forEach(child => {
          this.pushChildIfSelected(data, child);
        });
        this.removeLastLineIfAllChildrenIsUnselected();
      });
    } else {
      this.data.forEach((data) => {
        if (data.isSelected) {
          const clone = this.cloneLineAndRemovesYourChilds(data);
          this.dataReturn.push(clone);
        }
      });
    }
    this.isAllSelected();
    this.selectedItems.emit(this.dataReturn);
  }

  removeLastLineIfAllChildrenIsUnselected() {
    if (this.childsSeleceted === 0) {
      this.dataReturn.pop();
    } else {
      this.index++;
    }
  }
  pushChildIfSelected(data: any, child: any) {
    if (child.isSelected) {
      this.dataReturn[this.index][this.tableChildPropertyName].push(child);
      this.childsSeleceted++;
      if (this.childsSeleceted === data[this.tableChildPropertyName].length) {
        data.isSelected = true;
      }
    } else {
      data.isSelected = false;
    }
  }

  cloneLineAndRemovesYourChilds(data) {
    const clone = JSON.parse(JSON.stringify(data));
    if (this.hasChildTable()) { clone[this.tableChildPropertyName] = []; }
    return clone;
  }

  hasChildTable() {
    if (!this.tableChildPropertyName) {
      // console.error('@Input() tableChildPropertyName is undefined');
      return false;
    } else if (!this.hasCollapse) {
      // console.error('@Input() hasCollapse is undefined');
      return false;
    } else {
      return true;
    }
  }

  sortable(tableName) {

    if (/^data/gi.test(tableName)) {
      this.dataSortable(tableName);
    } else {
      this.normalSortable(tableName);
    }
    this.columnName = tableName;
  }

  normalSortable(tableName) {
    if (tableName === this.columnName) {
      this.data = this.data.reverse();
    } else {
      this.data = this.data.sort((a, b) => {
        if ( a[tableName] < b[tableName] ) {
          return -1;
        }
        if ( a[tableName] > b[tableName] ) {
          return 1;
        }
        return 0;
      });
    }
  }

  dataSortable(tableName) {
    if (tableName === this.columnName) {
      this.data.reverse();
    } else {
      this.data.sort((a, b) => {
        return (this.textToDate(a[tableName]) as any) - (this.textToDate(b[tableName]) as any);
      });
    }
  }

  sortableChilds(tableName, element: HTMLElement) {
    const tr = element.parentNode.parentNode as HTMLElement;
    this.childTitlesView.forEach((child: any) => {
      if (tr.id == child.nativeElement.id) {
        this.sortChilds(tableName, tr.id);
       }
    });
  }

  sortChilds(tableName, index) {
    if (/^data/gi.test(tableName)) {
      if (tableName === this.columnName) {
        this.data[index][this.tableChildPropertyName].reverse();
      } else {
        this.data[index][this.tableChildPropertyName].sort((a, b) => {
          return (this.textToDate(a[tableName]) as any) - (this.textToDate(b[tableName]) as any);
        });
      }
    } else {

      if (tableName === this.columnName) {
        this.data[index][this.tableChildPropertyName].reverse();
      } else {
        this.data[index][this.tableChildPropertyName].sort((a, b) => {
          if ( a[tableName] < b[tableName] ) {
            return -1;
          }
          if ( a[tableName] > b[tableName] ) {
            return 1;
          }
          return 0;
        });
      }
    }
    this.columnName = tableName;
  }

  private textToDate(date): Date {
    return new Date(date.split('/').reverse().join());
  }

  public trackByFn(index, item) {
    if (!item) { return null; }
    return index;
  }

  private valueToBRL(): any {
    this.data.forEach((item, index) => {
      if (item.hasOwnProperty('valor')) {
        item.valor = PriceHelper.numberToBRL(item.valor);
      }
      if (this.hasChildTable()) {
        this.data[index][this.tableChildPropertyName].forEach(item => {
          if (item.hasOwnProperty('valor')) {
            item.valor = PriceHelper.numberToBRL(item.valor);
          }
        });
      }
    });
  }
}
