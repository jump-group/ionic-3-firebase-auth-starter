
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'resetpassword'
})
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

    //Metodo per inviare la mail di reset password
    resetPassword(){
      if (!this.resetPasswordForm.valid){
        console.log(this.resetPasswordForm.value);
      } else {
        this.authProvider.resetPassword(this.resetPasswordForm.value.email)
        .then((user) => {
          let alert = this.alertCtrl.create({
            message: "Ti è appena stata mandata una mail di recupero password. Controlla la tua casella di posta.",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => { this.navCtrl.pop(); }
              }
            ]
          });
          alert.present();
    
        }, (error) => {
          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          errorAlert.present();
        });
      }
    }

}


