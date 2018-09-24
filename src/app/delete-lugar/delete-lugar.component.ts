import { Component, OnInit } from '@angular/core';
import { LugaresService } from "../services/lugares.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ɵgetDOM as getDOM } from '@angular/platform-browser';


@Component({
  selector: 'app-delete-lugar',
  templateUrl: './delete-lugar.component.html',
  styleUrls: ['./delete-lugar.component.css']
})
export class DeleteLugarComponent implements OnInit {
  id: any;
  lugarName: any;
  lugarDescripcion: any;
  constructor(private lugaresService: LugaresService, private router:Router, private route:ActivatedRoute) { }


  ngOnInit() {
    // get the lugar ID
    this.id = this.route.snapshot.params['id'];
    this.lugaresService.getDetallesLugar(this.id).subscribe(lugar => {
      this.lugarName = lugar.nombre;
      this.lugarDescripcion = lugar.descripcion;
    });
  }

  removeLugar(){
    console.log(this.id);
    this.lugaresService.deleteLugar(this.id);
    alert("Place deleted succesfully!");
    this.router.navigate(['/lugares'])
  }

}
