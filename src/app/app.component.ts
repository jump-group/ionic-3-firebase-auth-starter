import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app'; 
import { firebaseConfig } from './credentials';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login'; // If user is not logged
import { HomePage } from '../pages/home/home'; // If user is logged

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    
      firebase.initializeApp(firebaseConfig.fire);

      //Check if user it's logged or not
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.rootPage = LoginPage; //If user not logged
          unsubscribe();
        } else {
          this.rootPage = HomePage; //If user is logged
          unsubscribe();
        }
      });

    this.initializeApp();
  } 

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

