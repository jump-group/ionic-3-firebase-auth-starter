import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { ToastProvider } from '../../providers/toast/toast';

import firebase from 'firebase'; // Per permettere di registrarmi su firebase
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  
  public signupForm: FormGroup;
  public loading: Loading;

  //Per la funzione mostra/nascondi pw
  public type = 'password';
  public showPass = false;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastProvider: ToastProvider,
  ) {
    this.signupForm = formBuilder.group({
      //Validazione per i campi della form.
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      confirm_password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
    }, {validator: this.authProvider.matchingPasswords('password', 'confirm_password')});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  //Registrazione utente -> Richiama funzione in authProvider
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email,this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          var user = firebase.auth().currentUser;
          user.sendEmailVerification();
          this.toastProvider.presentToast("Ti è stata inviata una mail di conferma, per favore clicca sul link presente nella mail per poter effettuare l'accesso.");
          this.navCtrl.setRoot(LoginPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            //se si mette "message: error" si vede il messaggio di default in inglese.
            //Questo è il caso in cui la mail sia già presente.
            message: "Questa mail è già stata utilizzata",
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  //Per la funzione mostra/nascondi pw
  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
}

}
