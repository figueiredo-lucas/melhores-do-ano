import { ref, set, onValue } from 'firebase/database'
import { db } from './config'

// salvar dados do usuário
export function saveUserData(uid, data) {
    return set(ref(db, 'users/' + uid), data)
}

// ouvir mudanças no usuário
export function listenUserData(uid, callback) {
    const userRef = ref(db, 'users/' + uid)
    onValue(userRef, snapshot => {
        callback(snapshot.val())
    })
}