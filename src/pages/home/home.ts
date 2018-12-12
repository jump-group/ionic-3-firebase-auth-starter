import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';

import firebase from 'firebase';

import { LoginPage } from '../login/login'; //Per recupero dati utente

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData,
    public alertCtrl: AlertController,
    ) {

  }

    //Alert che appare quando si vuole effettuare il logout
    logoutUser(){
      let alert = this.alertCtrl.create({
        title: 'Logout',
        message: 'Vuoi davvero effettuare il logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          },
          {
            text: 'Conferma',
            handler: () => {
              this.navCtrl.setRoot(LoginPage);
              firebase.auth().signOut();
            }
          }
        ]
      });
      alert.present();
    }

}
