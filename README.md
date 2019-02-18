
# Readme Template firebase-auth

## ENG
The following app for Ionic 3 uses Firebase's database and authentication service and include the following features:
- Registration.
- Login.
- Logout.
- Password Recovery.
- Change user email.
- Change user password.
- Easy email and password validation.

When a user sign-in to the application, a record is created in the database under the `/userProfile` (editable) tree with the field `uid` (unique) as the key. So, it is possible to store all the user informations at this identifier.

### How to start
- Clone the repository.
- Position yourself within the newly cloned project.
- Run ```npm install``` to install all the dependencies.
- Connect your Firebase database to the application by editing the file `src/app/credentials.ts` entering the requested fields (apiKey, authDomain etc...). These data are retrieved on Firebase site, under the database panel by choosing the option *"Add Firebase to the web application"*

```
export const firebaseConfig = {
	fire: {
        apiKey: "xxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxxxxxxxxxx.firebaseapp.com",
        databaseURL: "https://xxxxxxxxxxxxxxxxxxxx.firebaseio.com",
        projectId: "xxxxxxxxxxxxxxxxxxxx",
        storageBucket: "xxxxxxxxxxxxxxxxxxxx.appspot.com",
        messagingSenderId: "xxxxxxxxxxxxxxxxxxxx"
	}
};
```
- Go to Firebase Auth panel -> Access methods -> enable `Email/password access`.
- Run ```ionic serve``` command.

:exclamation: :exclamation:
This app uses `Firebase 5.5.6`. It can be necessary to downgrade the firebase version to `4.12.1` in order to create the production .apk/.ipa

## ITA
La seguente app per Ionic 3 utilizza il servizio di autenticazione e database di Firebase includendo le funzionalità:
- Registrazione
- Login 
- Logout
- Recupero password
- Cambio email
- Cambio password
- Validazione password ed email

Quando un utente si registra nell'applicazione, viene creato un record all'interno del database nell'albero `/userProfile` (modificabile), con il campo `uid` (univoco) come chiave. E' possibile quindi inserire sotto tale identificatore tutte le informazione dell'utente.

### Funzionamento
- Clonare la repository.
- Posizionarsi all'interno del progetto appena clonato.
- Eseguire il comando ```npm install``` per installare tutte le dipendenze.
- Collegare il proprio database Firebase all'applicazione modificando il file `src/app/credentials.ts` inserendo i dati richiesti (apiKey, authDomain etc...). Tali dati si recuperano su Firebase nel pannello del database scegliendo l'opzione *"Aggiungi Firebase all'applicazione web"*

```
export const firebaseConfig = {
	fire: {
        apiKey: "xxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxxxxxxxxxx.firebaseapp.com",
        databaseURL: "https://xxxxxxxxxxxxxxxxxxxx.firebaseio.com",
        projectId: "xxxxxxxxxxxxxxxxxxxx",
        storageBucket: "xxxxxxxxxxxxxxxxxxxx.appspot.com",
        messagingSenderId: "xxxxxxxxxxxxxxxxxxxx"
	}
};
```
- Andare su Firebase -> Sviluppo -> Authentication -> Metodo di accesso -> `abilitare "Email/password"`.
- Eseguire ```ionic serve```

:exclamation: :exclamation:
Questa versione dell'app utilizza `Firebase` versione `5.5.6.`
Affinchè l'app venga correttamente compilata per la produzione, può essere necessario effettuare un downgrade a `4.12.1`
