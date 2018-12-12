# Readme Template firebase-auth
La seguente app rappresenta un template che include le funzionalità:
- registrazione
- login 
- logout
- recupero password.

**Nota bene:** 
Questa versione dell'app utilizza `Firebase` versione `5.5.6.`
Affinchè l'app venga correttamente compilata per la produzione, può essere necessario effettuare un downgrade a `4.12.1`

## Funzionamento
Per collegare l'applicazione con il proprio database di Firebase, è necessario modificare il file `app/credentials.ts` inserendo i dati richiesti (apiKey, authDomain etc...). Tali dati si recuperano su Firebase nel pannello del database scegliendo l'opzione *"Aggiungi Firebase all'applicazione web"*

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