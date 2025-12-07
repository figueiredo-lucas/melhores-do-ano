import { useNavigate } from 'react-router-dom'
import { useSimpleAuth } from '../hooks/useSimpleAuth'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const { user, login } = useSimpleAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleLogin = async () => {
        try {

            await login(name)
            navigate('/')

        } catch (err) {

            console.error(err)
            toast.error('E tu lá existe, disgrasa?')

        }
    }

    if (user) {
        navigate('/')
        return null
    }

    return (
        <div>
            <h1>Login</h1>
            <input
                className="input"
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)} />
            <button
                className="btn btn-primary"
                onClick={handleLogin}
                disabled={!name.trim()}>
                Entrar
            </button>
        </div>
    )
}

export default Login