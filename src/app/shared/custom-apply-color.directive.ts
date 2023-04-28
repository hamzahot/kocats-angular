import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector : '[applyColor]'
})
export class CustomApplyColorDirective{

    @Input("applyColor")color?: string;

    constructor(private elementRef: ElementRef){}

    @HostListener('mouseover')
    onMouseOver(){
        this.elementRef.nativeElement.style.color = this.color;
        this.elementRef.nativeElement.style.cursor = 'pointer';
    }

    @HostListener('mouseout')
    onMouseOut(){
        this.elementRef.nativeElement.style.color  = '';
    }

}