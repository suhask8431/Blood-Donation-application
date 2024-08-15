class Auth {

    constructor(){
        this.authenticated = false;
    }

    login(cb){
        this.authenticated = true;
        console.log(this.authenticated+"login success!!!")
        cb();
    }

    logout(cb){
        this.authenticated = false;
        console.log(this.authenticated+"logout success!!!")

        cb();
    }

    isAuthenticated(){
        console.log(this.authenticated+"login staus")
        return this.authenticated;

    }

}
export default new Auth();
