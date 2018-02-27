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
    this.udpSender.sendMsg("{\"sensor\":\"gps\",\"seq\":1447,\"devid\":\"jameyu\",\"msgtype\":\"corrpt\",\"data\":{\"lat\":23.051195,\"lng\":112.455558,\"alt\":22.200000,\"date\":\"20180227\",\"time\":\"06:23:26\"}}");
  }

}
