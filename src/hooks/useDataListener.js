import { useEffect } from 'react'

import { db } from '../db/config.js'
import { onValue, ref } from 'firebase/database'
import { useState } from 'react'


export const useDataListener = (schema) => {

    const [getter, setter] = useState({})
    
    useEffect(() => {
        const dbRef = ref(db, schema)
        const unsubscribe = onValue(dbRef, snapshot => {
            const data = snapshot.val()
            console.log(`Data updated for schema: ${schema}`, data)
            setter(data)
        })

        return () => {
            unsubscribe()
        }
    }, [schema, setter])
    
    return getter

}