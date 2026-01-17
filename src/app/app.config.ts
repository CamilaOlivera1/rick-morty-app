import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseConfig } from '../environment/firebase-configs';
import { routes } from './app.routes'; // Importamos las rutas
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Agregamos las rutas aquí
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => {
        console.log('Firebase fue inicializado correctamente.');
        return initializeApp(firebaseConfig);
      }),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
    )
  ]
};
