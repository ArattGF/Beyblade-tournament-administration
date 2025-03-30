import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { HeaderComponent } from '../../components/header/header.component';


@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private socket: Socket;

  apiUrl:string = environment.apiUrl;

  constructor() {
    this.socket = io(this.apiUrl.slice(0, -1),{
      withCredentials: true, // Asegúrate de que esto esté habilitado si usas cookies o encabezados de autenticación
      transports: ["polling", "websocket"],
    });

    this.socket.on('connect', () => {
      HeaderComponent.showAlert("Conexión establecida")
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
   }

   onPlayersUpdate(callback: (data: any )=> void){
    this.socket.on('new-player', callback)
   } 

   onSetsUpdate(callback: (groupUpdated: any) => void) {
    this.socket.on('update-set', callback)

  }
   disconnect() {
    this.socket.disconnect();
  }
}
