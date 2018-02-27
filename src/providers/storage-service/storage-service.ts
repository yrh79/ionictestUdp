import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class Config {

  erlangserver: string;
  erlangport: number;
  username: string;
  password: string;

  constructor() {
    this.erlangserver = "54.200.148.83";
    this.erlangport = 7900;
    this.username = "";
    this.password = "";
  }
}
/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  private config: Config;

  constructor(private storage: Storage) {
    // console.log('Hello StorageServiceProvider Provider');
    this.config = new Config();
  }

  saveConfig(erlangserver: string, erlangport: number, username: string, password: string) {
    this.config = new Config();

    this.config.erlangserver = erlangserver;
    this.config.erlangport = erlangport;
    this.config.username = username;
    this.config.password = password;

    this.storage.set('config', this.config);
  }

  getConfig() {
    return this.storage.get('config').then((res) => {
      this.config = res == null ? new Config() : res; return this.config;
    });

  }

}
