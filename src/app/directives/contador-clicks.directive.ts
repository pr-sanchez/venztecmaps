import {Directive, HostListener, HostBinding} from "@angular/core";

@Directive({
  selector: 'li[contar-clicks]'
})

export class ContarClicksDirective{
  clickN = 0;
  @HostBinding('style.opacity') opacity: number = .1;
  //host listeners, me va a ayudar a cuando agregue una directiva a mi
  //elemento de html, con esto, puedo escuchar los eventos de una manera mas sencilla

  @HostListener('click', ['$event.target']) onClick(btn){
    console.log('a', btn, "Número de clicks:", this.clickN++);
    this.opacity += .1;
  } //eventos de html, mouseover etc

}

//siempre despues de declarar una directiva se lleva a app module ts
