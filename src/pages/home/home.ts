import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { User} from '@firebase/auth-types';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public currentUser: User;
  user = firebase.auth().currentUser;

  public user_id;
  public user_email;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData,
    public alertCtrl: AlertController,
    public toastProvider: ToastProvider) {
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          this.user_id = user.uid;
          this.user_email = user.email;
        }
      });
  }

  changePw(){
    this.authProvider.changePw(this.user);
  }

  changeEmail(){
    this.authProvider.changeEmail(this.user);
  }

  logoutUser(){
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
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
