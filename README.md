
# Readme Template firebase-auth
#ENG
work in progress

#ITA
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
- Eseguire il comando ```npm install```
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


