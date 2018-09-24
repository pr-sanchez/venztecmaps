import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(public authService: AuthService, globalService: GlobalService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
  }

  logout(){
    this.authService.logout();
  }


}
