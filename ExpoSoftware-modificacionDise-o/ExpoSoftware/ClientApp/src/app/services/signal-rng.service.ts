import { Injectable, EventEmitter, Inject } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { AspectoEvaluar } from "../comite/gestion-preguntas/models/aspecto-evaluar";



@Injectable({
  providedIn: "root"
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<AspectoEvaluar>();
  signalReceivedDos = new EventEmitter<AspectoEvaluar>();
  baseUrl:string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl+"signalHub") //use your api adress here and make sure you use right hub name.
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
        this.borrarSignalEvent();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("PreguntaRegistrado", (data: AspectoEvaluar) => {
      this.signalReceived.emit(data);
    });
  }

  private borrarSignalEvent(){
    this.hubConnection.on("BorrarRegistro", (data: AspectoEvaluar) => {
      this.signalReceivedDos.emit(data);
    });
  }

}