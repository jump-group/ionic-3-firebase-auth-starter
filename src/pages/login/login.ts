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

import * as firebase from 'firebase/app';

import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

import { EmailValidator } from '../../validators/email'; 
import { AuthData } from '../../providers/auth/auth'; 
import { ToastProvider } from '../../providers/toast/toast'; 

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
      //Validate password and email
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

  showPassword() {
    this.showPass = !this.showPass; 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

   //Only users that confirmed the email can login.
   checkIfEmailVerified(){
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //YES USER | NO EMAIL VERIFIED 
        if (!user.emailVerified) {
          this.toastProvider.presentToast('To login you must click on the confermation link sent by email.');
          unsubscribe();
        } else {
          //YES USER | YES EMAIL VERIFIED 
          this.navCtrl.setRoot(HomePage);
          unsubscribe();
        }
      } else {
        //NO USER
        this.navCtrl.setRoot(LoginPage);
        unsubscribe();
      }  
    });
  }
}
