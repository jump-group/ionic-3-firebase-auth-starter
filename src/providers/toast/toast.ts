import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { FormGroup} from '@angular/forms';

import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {


  constructor(
      public toastCtrl:ToastController,
    ) {}

    //Toast per visualizzare i messaggi
    presentToast(messageErr: string) {
        let toast = this.toastCtrl.create({
          message: messageErr,
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      }


}

