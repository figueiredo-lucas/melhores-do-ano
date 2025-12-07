import { useEffect } from 'react'

import { db } from '../db/config.js'
import { onValue, ref } from 'firebase/database'


export const useDataListener = (schema, setter) => {

    useEffect(() => {
        const dbRef = ref(db, schema)
        onValue(dbRef, snapshot => {
            const data = snapshot.val()
            setter(data)
        })
    }, [schema, setter])

}