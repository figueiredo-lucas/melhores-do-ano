import { useNavigate } from 'react-router-dom'
import { useSimpleAuth } from '../hooks/useSimpleAuth'
import { useState } from 'react'
import { toast } from 'react-toastify'
// import logo from '../assets/melhoresdoanologo.jpg'

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
        <section className='h-screen flex justify-center items-center flex-col'>
            <div className='w-[45%] '>
                <img src="images/melhoresdoanologo.png" alt="Melhores do Ano Logo" className="mb-4" />
            </div>
            <div className='flex justify-center flex-col items-center gap-2 mb-64'>
                {/* <h1>Login</h1> */}
                <input
                    className="input"
                    type="text"
                    placeholder="Digite seu nome"
                    onChange={(e) => setName(e.target.value)} />
                <button
                    className="btn btn-primary w-full"
                    onClick={handleLogin}
                    disabled={!name.trim()}>
                    Entrar
                </button>
            </div>
        </section>
    )
}

export default Login