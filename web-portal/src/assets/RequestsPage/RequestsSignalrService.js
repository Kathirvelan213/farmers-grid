import * as Signalr from '@microsoft/signalr';

class RequestsSignalrService{
    connection=null;
    baseUrl=import.meta.env.VITE_API_URL;

    async start(){
        if(this.connection){return;}
        this.connection=new Signalr.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/requestshub`)
            .withAutomaticReconnect()
            .configureLogging(Signalr.LogLevel.Error)
            .build();
        await this.connection.start();
    }
    on(event,cb){ if(this.connection){ this.connection.on(event,cb); } }
    off(event){ if(this.connection){ this.connection.off(event); } }
}

export default new RequestsSignalrService();


