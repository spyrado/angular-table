import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCollapseTable]'
})
export class TableCollapseDirective {

  @Input() appCollapseTable: HTMLElement;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
    ) {}

  @HostListener('click')
  toggle() {
    this.toggleCollapse();
  }

  toggleCollapse() {
    // debugger;
    if (!this.appCollapseTable.classList.contains('table--show')) {
      this.renderer2.addClass(this.appCollapseTable, 'table--show');
      this.renderer2.addClass(this.elementRef.nativeElement, 'up');
    } else {
      this.renderer2.removeClass(this.appCollapseTable, 'table--show');
      this.renderer2.removeClass(this.elementRef.nativeElement, 'up');
    }
  }
}
