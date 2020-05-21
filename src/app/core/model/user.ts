export class User {
    id:string;
    name:string;
    password:string;
    first_Last_name:string;
    constructor(name?:string,password?:string,first_last_name?:string) {
        this.name=name;
        this.password = password;
        this.first_Last_name = first_last_name;
    }

}
