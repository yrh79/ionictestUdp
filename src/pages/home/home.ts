import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UdpServiceProvider } from '../../providers/udp-service/udp-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private udpSender: UdpServiceProvider) {
    this.udpSender.connectUdp();
    console.log("constructor(), after connectUdp()");
  }

  onSend() {
    console.log("onSend()");
    this.udpSender.sendMsg("p");
  }

}
