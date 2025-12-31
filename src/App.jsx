import { HashRouter, Routes, Route } from 'react-router-dom'
import { useWireValue } from '@forminator/react-wire'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoute'
import * as store from './store'
import Admin from './pages/Admin'
import Result from './pages/Result'
import Initial from './pages/Initial'

function App() {

    const user = useWireValue(store.user)

    /**
     * O que fazer no app:
     * 
     * Tela para mostrar perguntas, uma a uma com rostos das pessoas que estão online flutuando no cantinho
     *   * Ação de passar para a pergunta seguinte ou anterior
     *   * Ação para mostrar os resultados quando todos votarem
     *   * Animação para mostrar os resultados
     * Tela para o Login que a pessoa coloca só o nome
     * Tela para cada pessoa votar. Mostra a pergunta e a cara de cada um com o nome do lado para o voto
     * Tela com os resultados gerais e possibilidade de baixar o png de cada badge
     */


    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/initial" element={<Initial />} />
                <Route path="/result" element={<Result />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute user={user}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <ToastContainer position="bottom-right" hideProgressBar={true} pauseOnFocusLoss={false} />
        </HashRouter>
    )
}

export default App
