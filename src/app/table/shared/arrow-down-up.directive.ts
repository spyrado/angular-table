import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appArrowDownUp]',
})
export class ArrowDownUpDirective {
    private hasDisplay = false;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer2: Renderer2
    ) {}

    @HostListener('click')
    onclick() {
        const arrows = this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('.table__title--arrow-down');

        arrows.forEach(arrow => {
            arrow.classList.remove('table--active');
        });

        if (!this.hasDisplay) {
            this.renderer2.addClass(this.elementRef.nativeElement, 'table--active');
            this.hasDisplay = true;
        } else {
            this.renderer2.removeClass(this.elementRef.nativeElement, 'table--active');
            this.hasDisplay = false;
        }
    }
}
