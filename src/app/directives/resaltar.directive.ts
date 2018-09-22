//decorador, es algo propio de typescript
import {Directive, OnInit, ElementRef, Renderer2, Input} from "@angular/core";

@Directive({
  selector: '[resaltar]'
})

export class ResaltarDirective implements OnInit{
  constructor(private elRef: ElementRef, private renderer: Renderer2){}
  @Input('resaltar') plan : string = "";
  ngOnInit(){
    if(this.plan == 'pagado'){
      this.renderer.setStyle(this.elRef.nativeElement, 'background', 'yellow');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
    }
    else{
      this.renderer.setStyle(this.elRef.nativeElement, 'background', 'rgba(#2fa0f2, 0.5)');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
    }
  }
}
