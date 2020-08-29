export class User {
    id:string;
    name:string;
    password:string;
    firstLastName:string;
    members:string;
    constructor(name?:string,password?:string,firstLastName?:string,members?:string) {
        this.name=name;
        this.password = password;
        this.firstLastName = firstLastName;
        this.members = members;
    }

}
