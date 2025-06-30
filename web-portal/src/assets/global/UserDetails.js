class User{
    id=null;
    setId(id){
        this.id=id;
        sessionStorage.setItem("userId",id);
    }

    getId(){
        this.id= sessionStorage.getItem("userId");
    }
}

export default new User();  