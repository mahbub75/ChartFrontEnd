import {Router} from '@angular/router';

export class StaticMethods {
    static f :Router;
    constructor(private router:Router) {
      StaticMethods.f = this.router
    }

static route(){

}

}
