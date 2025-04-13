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
    this.socket = io(this.apiUrl);

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

  onUpdateBracket(callback: (groupUpdated: any) => void) {
    this.socket.on('update-bracket', callback)
  }

  onInitializeBracket(callback: (groupUpdated: any) => void) {
    this.socket.on('initialize-bracket', callback)
  }

   disconnect() {
    this.socket.disconnect();
  }
}
