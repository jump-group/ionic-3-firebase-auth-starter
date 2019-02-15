
# Readme Template firebase-auth

# ENG
The following app for Ionic 3 uses Firebase's database and include the following features:
- Registration.
- Login.
- Logout.
- Password Recovery.

**Nota:** 
This app uses `Firebase 5.5.6`
It can be necessary to downgrade the firebase version to `4.12.1` in order to create the production .apk/.ipa

## How to start
- Clone the repository.
- Position yourself within the newly cloned project.
- Run ```npm install``` to install all the dependencies.
- Connect your Firebase database to the application by editing the file `app/credentials.ts` entering the requested fields (apiKey, authDomain etc...). These data are retrieved on Firebase site, under the database panel by choosing the option *"Add Firebase to the web application"*

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

# ITA
La seguente app per Ionic 3 utilizza il servizio di Firebase includendo le funzionalità:
- Registrazione
- Login 
- Logout
- Recupero password.

**Nota bene:** 
Questa versione dell'app utilizza `Firebase` versione `5.5.6.`
Affinchè l'app venga correttamente compilata per la produzione, può essere necessario effettuare un downgrade a `4.12.1`

## Funzionamento
- Clonare la repository.
- Posizionarsi all'interno del progetto appena clonato.
- Eseguire il comando ```npm install``` per installare tutte le dipendenze.
- Collegare il proprio database Firebase all'applicazione modificando il file `app/credentials.ts` inserendo i dati richiesti (apiKey, authDomain etc...). Tali dati si recuperano su Firebase nel pannello del database scegliendo l'opzione *"Aggiungi Firebase all'applicazione web"*

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


