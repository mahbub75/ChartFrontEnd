import {NavigationExtras, Router} from '@angular/router';

export class BasicClass {
static route:Router;
    constructor(public route ?:Router) {
        BasicClass.route = route;
    }
 static async router(commands: any[], extras?: NavigationExtras){
    await BasicClass.route?.navigate(commands, extras);

}
}

