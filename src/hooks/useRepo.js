import { db } from '../db/config.js'
import { onValue, push, ref, remove, set, update } from 'firebase/database'
import { useMemo } from 'react'
import { useCallback } from 'react'


export const useRepo = schema => {
    
    const save = useCallback(data => {
        const dbRef = ref(db, schema)
        push(dbRef, data)
        // set(newData, data)
    }, [schema])
    
    const saveWithId = useCallback((id, data) => {
        const dataRef = ref(db, `${schema}/${id}`)
        set(dataRef, data)
    }, [schema])

    const getOne = useCallback(id => {
        return new Promise((resolve, reject) => {
            const dataRef = ref(db, `${schema}/${id}`)
        
            return onValue(dataRef, snapshot => {
                const data = snapshot.val()
                
                if (!data) reject()
                
                resolve(data)
            }, {
                onlyOnce: true
            })
        
        })
    }, [schema])

    const updateById = useCallback((id, data) => {
        const dataRef = ref(db, `${schema}/${id}`)
        
        if (data === Object(data))
            update(dataRef, data)
        else
            set(dataRef, data)
    }, [schema])

    const deleteById = useCallback(id => {
        const dataRef = ref(db, `${schema}/${id}`)
        remove(dataRef)
    }, [schema])

    const listen = useCallback(setter => {
        const dbRef = ref(db, schema)
        return onValue(dbRef, snapshot => {
            const data = snapshot.val()
            setter(data)
        })
    }, [schema])

    return useMemo(() => ({
        save, saveWithId, getOne, listen, update: updateById, delete: deleteById
    }), [save, saveWithId, getOne, listen, updateById, deleteById])

}