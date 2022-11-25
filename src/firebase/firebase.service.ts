import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, ref, getDownloadURL } from "firebase/storage";
import { Config } from './config';

@Injectable()
export class FirebaseService {
  public appFirebase: FirebaseApp;
  public storage: FirebaseStorage;

  constructor() {
    try {
        this.appFirebase = initializeApp({
            apiKey: process.env.apiKey,
            appId: process.env.appId,
            authDomain: process.env.authDomain,
            measurementId: process.env.measurementId,
            messagingSenderId: process.env.messagingSenderId,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
          });
        } catch (err) {
        // ignoramos a mensagem "already exists" que
        // não é um erro real quando estamos recarregando a quente
        if (!/already exists/.test(err.message)) {
        console.error('Erro de inicialização do Firebase', err.stack)
        }
    }
    
    this.storage = getStorage(this.appFirebase, "gs://eufiscal-app.appspot.com");
  }

  public getFotoUrl(id:string){
    return getDownloadURL(ref(this.storage, id));
 } 
//  const file = getStorage().bucket(process.env.GS_BUCKET).file(fileName);
}