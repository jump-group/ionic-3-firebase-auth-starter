import { Component } from '@angular/core';
import { 
  FormBuilder, 
  Validators, 
  FormGroup 
} from '@angular/forms';

import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  AlertController,
  NavParams,
} from 'ionic-angular';

import * as firebase from 'firebase/app'; // Connessione a firebase

// Pagine custom
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

import { EmailValidator } from '../../validators/email'; // Per controllare che la mail rispetti la sua struttura
import { AuthData } from '../../providers/auth/auth'; // Per gestire autenticazione utente

import { ToastProvider } from '../../providers/toast/toast'; // Per toast di avvisi

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  //Per funzione mostra/nascondi password
  public type = 'password';
  public showPass = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthData,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastProvider: ToastProvider,
  ) {
    this.loginForm = formBuilder.group({
      //Per validare email e password nella form di login.
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.checkIfEmailVerified(); 
          //this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
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

  goToSignup(): void {
    this.navCtrl.push(RegistrationPage);
  }
  
  goToResetPassword(): void {
    this.navCtrl.push(ResetpasswordPage);
  }

  //Funzione mostra/nasconde password: 
  //cambia il tipo del campo di input in base a se clicco o meno l'icona dell'occhio.
  showPassword() {
    this.showPass = !this.showPass; 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

   //Serve per permette il login, ad utenti iscritti tramite email/pw, solo a chi ha confermato la mail di verifica.
   checkIfEmailVerified(){
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //Se c'è utente ma non ha cliccato sulla mail...
        if (!user.emailVerified) {
          this.toastProvider.presentToast('Per accedere è necessario confermare la registrazione cliccando sul link nella email di verifica inviata.');
          unsubscribe();
        } else {
          //Se l'utente c'è ed ha verificato la mail...
          this.navCtrl.setRoot(HomePage);
          unsubscribe();
        }
      } else {
        //Se l'utente non c'è vede la welcomepage...
        this.navCtrl.setRoot(LoginPage);
        unsubscribe();
      }  
    });
  }

}
