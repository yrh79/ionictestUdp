import { Injectable } from '@angular/core';
import { StorageServiceProvider, Config } from '../storage-service/storage-service';

declare var chrome;

/*
  Generated class for the UdpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UdpServiceProvider {

  erlangserver: string;
  erlangport: number;
  username: string;
  password: string;

  config: Config;

  connected: boolean;
  socketId;

  constructor(private storageProvider: StorageServiceProvider) {
    this.storageProvider.getConfig().then((config) => {
      this.config = config;
      this.erlangserver = this.config.erlangserver;
      this.erlangport = this.config.erlangport;
      this.username = this.config.username;
      this.password = this.config.password;

      console.log(JSON.stringify(this.config));

    }
    );
  }

  connectUdp() {
    console.log("connecting udp server.");

    chrome.sockets.udp.create({}, (createInfo) => this.onCreateSuccess(createInfo));
  }

  onCreateSuccess(createInfo) {
    console.log("Connect seccess!");
    this.socketId = createInfo.socketId;
    chrome.sockets.udp.bind(createInfo.socketId, "0.0.0.0", 0, (result) => this.onBindComplete(result));
    chrome.sockets.udp.onReceive.addListener((info) => this.onReceive(info));
  }

  onReceive(info) {
    console.log(JSON.stringify(info));

    console.log(this.arrayBuffer2str(info.data));
  }

  onBindComplete(result) {
    if (result >= 0) {
      console.log("bind success!");
      this.connected = true;
    }
    else {
      this.connected = false;
      console.log("bind failed");
    }
  }

  sendMsg(data) {
    console.log("sending message: " + data);
    var buf = this.str2ab(data);
    chrome.sockets.udp.send(this.socketId, buf, this.erlangserver, this.erlangport, (sendInfo) => this.onSendCallback(sendInfo));
  }

  arrayBuffer2str(buf) {
    var str = '';
    var ui8 = new Uint8Array(buf);
    for (var i = 0; i < ui8.length; i++) {
      str = str + String.fromCharCode(ui8[i]);
    }
    return str;
  }

  str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  

  onSendCallback(sendInfo) {
    console.log(JSON.stringify(sendInfo));
  }

}
