import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Pagine custom
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { AuthData } from '../providers/auth/auth';
import { ToastProvider } from '../providers/toast/toast'; //Per toast

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage, 
    RegistrationPage, 
    ResetpasswordPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      //Used to prevent the form from moving when the input is focused.
      scrollAssist: false, 
      autoFocusAssist: false, 
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ResetpasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    ToastProvider,
  ]
})
export class AppModule {}
