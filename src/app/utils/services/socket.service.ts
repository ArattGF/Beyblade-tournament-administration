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
     this.socket = io('https://hidrobladers-api.vercel.app', {
      path: '/socket.io',
      withCredentials: true,
      transports: ['websocket', 'polling'],
      extraHeaders: {
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
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
