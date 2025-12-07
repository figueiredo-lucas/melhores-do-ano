// ProtectedRoute.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ user, children }) => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (!user) navigate('/login', { replace: true })

    }, [user])

    return children
}
