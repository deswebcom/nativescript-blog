export class User{
    username:string;
    password:string;
    token?:string;

    constructor(_username : string, _password:string){
        this.username = _username;
        this.password = _password;
    }
}