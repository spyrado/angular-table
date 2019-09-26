import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTableComponent } from './note-table.component';
import { TableModule } from '../table.module';

@NgModule({
  declarations: [
    NoteTableComponent,
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    NoteTableComponent
  ]
})
export class NoteTableModule { }
