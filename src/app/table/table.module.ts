import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCollapseDirective } from './shared/table-collapse.directive';
import { KeysPipe } from './shared/keys-pipe';
import { FormsModule } from '@angular/forms';
import { ArrowDownUpDirective } from './shared/arrow-down-up.directive';


@NgModule({
  declarations: [
    TableComponent,
    TableCollapseDirective,
    KeysPipe,
    ArrowDownUpDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
