import { getMyIDAPI } from "../apiConsumer/identityAPI";

class User{
    id=null;

    async getId(){
        const result=await getMyIDAPI()
        this.id=result.data;
    }
}

export default new User();  