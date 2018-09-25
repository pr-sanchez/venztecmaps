import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable()
export class GlobalService {
  userRoles: Array<string>; // roles of currently logged in user
  constructor(private auth: AuthService, private router:Router, private route:ActivatedRoute) {
    auth.user$.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
    .subscribe()
  }

    ///// Authorization Logic /////

  get canView(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  view() {
    if ( this.canView ) {
      return this.router.navigate(['/reservaciones'])
    }
    else console.log('action prevented!')
  }

  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
}
