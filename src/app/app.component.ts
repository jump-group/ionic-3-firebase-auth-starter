import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app'; // per collegamento a firebase
import { firebaseConfig } from './credentials';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login'; // Da usare come pagina di apertura dell'app se non sei un utente loggato.
import { HomePage } from '../pages/home/home'; // Da usare come pagina di apertura dell'app se l'utente è loggato.

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    ) {
    
      firebase.initializeApp(firebaseConfig.fire); //per collegamento a firebase
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Serve a verificare se c'è un utente loggato oppure no quando si apre l'app. 
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = LoginPage; //Se utente non presente.
        unsubscribe();
      } else {
        this.rootPage = HomePage; //Se utente presente va nella bacheca.
        unsubscribe();
      }
    });

    this.initializeApp();

    
  } //fine costruttore

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

}

