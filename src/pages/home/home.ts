import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { User, AuthCredential } from '@firebase/auth-types';
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

  changePw(){
    let alert = this.alertCtrl.create({
      title: 'Change password',
      message: "Insert old and new password",
      inputs: [
        {
        name: "newPw", 
        placeholder: "New password",
        type: 'password'
        },
      { name: 'oldPw',
        placeholder: 'Old corrente', 
        type: 'password' }
      ],
      buttons: [
        { text: "Cancel" },
          {
            text: "Confirm",
            handler: data => {
              this.changePasswordOnDB(data.newPw, data.oldPw, this.user_email,this.user);
            }
          }
      ]
    });
    alert.present();
  }

  changePasswordOnDB(newPw: string, oldPw: string, user_email: string,user){
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(user_email,oldPw);
    this.user.reauthenticateWithCredential(credential).then(user => {
      this.user.updatePassword(newPw).then(user => {
        this.toastProvider.presentToast("Password modified successfully");
      });
    })
    .catch(error => {
      this.toastProvider.presentToast("'Current password' field don't match with the current one. Retry.");
    });
  }

  changeEmail(){
    let alert = this.alertCtrl.create({
      title: 'Change email',
      inputs: [
        {
        name: "newEmail",
        placeholder: "New mail",
        },
      { name: 'password', placeholder: 'Current password', type: 'password' }
      ],
      buttons: [
        { text: "Cancel" },
          {
            text: "Confirm",
            handler: data => {
              this.changeEmailOnDB(data.newEmail, data.password, this.user_email, this.user, this.user_id);
            }
          }
      ]
    });
    alert.present();
  }

   //Funzione per cambiare la mail dell'utente sul database e sul pannello di autenticazione di Firebase
   changeEmailOnDB(newEmail: string, password: string, user_email: string, user, user_id){
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(user_email,password);
    //reauthenticateWithCredential(credential) -> metodo di firebase per riautenticare l'utente (necessario per il cambio mail)
    //in automatico il metodo manda una email alla mail vecchia per segnalare il cambiamento.
    this.user.reauthenticateWithCredential(credential).then(user => { 
      this.user.updateEmail(newEmail).then(user => {
   
        //Aggiorniamo il campo email in chiaro del nuovo albero
        var updates = {};
        updates["/userProfile/"+user_id+"/email"] = newEmail;
        firebase.database().ref().update(updates);
        this.user.sendEmailVerification(); //necessario che l'utente riverifichi la mail dopo l'avvenuto cambiamento, per poter successivamente riloggare.
        this.toastProvider.presentToast("Cambiamento avvenuto con successo! Ti è stata inviata una mail di conferma alla nuova email, per favore clicca sul link di verifica per poterti successivamente loggare con le nuove credenziali.");
      });
    })
    .catch(error => {
    console.error(error);
    });
  }
}
