// ProtectedRoute.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ user, children }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login', { replace: true })

    }, [user, navigate])

    return children
}
