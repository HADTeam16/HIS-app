import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
    private stompClient: any;

    constructor() {}

    connect() {
        const serverUrl = 'http://localhost:8008/ws';
        const ws = new SockJS(serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, function (frame) {
            that.stompClient.subscribe('/topic/appointments', (message) => {
                if (message.body) {
                    // Handle the message
                    console.log(message.body);
                }
            });
        });
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }
}
