import * as Signalr from '@microsoft/signalr';

class SignalrService{
    connection=null;
    baseUrl=import.meta.env.VITE_API_URL;

    startConnection(){
        if(this.connection){
            return Promise.resolve();
        }
        this.connection=new Signalr.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/chathub`)
        .withAutomaticReconnect()
        .configureLogging(Signalr.LogLevel.Error)  // changed from information to error, change back if necessary
        .build();

        return this.connection.start();
    }

    stopConnection(){
        if(this.connection){
            this.connection.stop();
        }
    }

    on(eventName,callback){
        if(this.connection){
            this.connection.on(eventName,callback);
        }
    }

    off(eventName){
        if(this.connection){
            this.connection.off(eventName)
        }
    }

    send(eventName,...args){
        if(this.connection){
            return this.connection.invoke(eventName,...args);
        }
    }
    isConnected() {
        return this.connection && this.connection.state === "Connected";
    }
}

export default new SignalrService();