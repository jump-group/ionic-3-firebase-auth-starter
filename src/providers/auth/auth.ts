import { Injectable } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { User, AuthCredential } from '@firebase/auth-types';
import firebase from 'firebase';

import { ToastProvider } from '../../providers/toast/toast';

@Injectable()
export class AuthData {
  
  public signupForm: FormGroup;
  
  constructor(
    public alertCtrl: AlertController,
    public toastProvider: ToastProvider) {
  }

  // Login/Logout User
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /*logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }*/

  // Signup User
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
        .database()
        .ref('/userProfile')
        .child(newUser.user.uid)
        .set({ 
          email: email,
          data_registrazione: new Date().getTime(), });
      });
  }

  // Password utilities
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  changePw(user: User){
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
        placeholder: 'Old password', 
        type: 'password' }
      ],
      buttons: [
        { text: "Cancel" },
          {
            text: "Confirm",
            handler: data => {
              this.changePasswordOnDB(data.newPw, data.oldPw, user);
            }
          }
      ]
    });
    alert.present();
  }

  changePasswordOnDB(newPw: string, oldPw: string, user: User){
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(user.email, oldPw);
    user.reauthenticateWithCredential(credential).then(x => {
      user.updatePassword(newPw).then(y => {
        this.toastProvider.presentToast("Password modified successfully");
      });
    })
    .catch(error => {
      this.toastProvider.presentToast("'Current password' field don't match with the current one. Retry.");
    });
  }

  // Email utilities
  changeEmail(user: User){
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
              this.changeEmailOnDB(data.newEmail, data.password, user);
            }
          }
      ]
    });
    alert.present();
  }

  changeEmailOnDB(newEmail: string, password: string, user: User){
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(user.email,password);
    user.reauthenticateWithCredential(credential).then(x => { 
      user.updateEmail(newEmail).then(y => {
        var updates = {};
        updates["/userProfile/"+user.uid+"/email"] = newEmail;
        firebase.database().ref().update(updates);
        user.sendEmailVerification();
        this.toastProvider.presentToast("Mail changed successfully! A confirmation email has been sent to your new email. Please click on the verification link to be able to log in with the new credentials.");
      });
    })
    .catch(error => {
    console.error(error);
    });
  }
}