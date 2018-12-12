import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { FormGroup} from '@angular/forms';

@Injectable()
export class AuthData {
  
  public signupForm: FormGroup; //Serve per la funzione matching password
  
  constructor() {

  }

  // Effettuare il login con email e password (check nel servizio di autenticazione di Firebase)
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Inserisce nel database i dati dell'utente registrato
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

  // Reset della password
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Logout dell'utente
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

    //Metodo per controllare che le password inserite siano identiche, altrimenti non permette di registrarsi.
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



}