import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import config from './../config.js'

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)