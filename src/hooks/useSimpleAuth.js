import { useState } from 'react'
import { useWireState } from '@forminator/react-wire'
import { useRepo } from './useRepo'
import * as store from '../store'

export const useSimpleAuth = () => {
    const [user, setUser] = useWireState(store.user)
    const [loading, setLoading] = useState(true)
    const userRepo = useRepo('users')

    const login = async (name) => {
        setLoading(true)
        setUser(null)
        
        try {
            
            const user = await userRepo.getOne(name)
            userRepo.update(`${user.name}/active`, true)
            
            setUser(user)
            
        } finally {
            setLoading(false)
        }
        
    }

    const logout = async () => {
        userRepo.update(`${user.name}/active`, false)
        setUser(null)
    }

    return { user, loading, login, logout }
}
