export class User {
    id:string;
    name:string;
    password:string;
    firstLastName:string;
    constructor(name?:string,password?:string,firstLastName?:string) {
        this.name=name;
        this.password = password;
        this.firstLastName = firstLastName;
    }

}
