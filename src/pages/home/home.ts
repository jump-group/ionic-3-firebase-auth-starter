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
      message: 'Vuoi davvero effettuare il logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
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

  changePw(){
    let alert = this.alertCtrl.create({
      title: 'Cambio password',
      message: "Inserisci la vecchia e nuova password",
      inputs: [
        {
        name: "newPw", 
        placeholder: "Nuova password",
        type: 'password'
        },
      { name: 'oldPw',
        placeholder: 'Password corrente', 
        type: 'password' }
      ],
      buttons: [
        { text: "Cancel" },
          {
            text: "Conferma",
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
        this.toastProvider.presentToast("Password modificata con successo.");
      });
    })
    .catch(error => {
      this.toastProvider.presentToast("Il campo -password corrente- non corrisponde alla password attuale. Riprovare.");
    });
  }

  changeEmail(){
    let alert = this.alertCtrl.create({
      title: 'Cambio email',
      //message: "Per cambiare mail, inserisci la nuova mail e la password corrente",
      inputs: [
        {
        name: "newEmail",
        placeholder: "Nuova mail",
        },
      { name: 'password', placeholder: 'Password corrente', type: 'password' }
      ],
      buttons: [
        { text: "Cancel" },
          {
            text: "Conferma",
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
