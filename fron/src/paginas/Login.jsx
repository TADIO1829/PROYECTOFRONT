import axios from 'axios'
import { useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import AuthContext from '../context/AuthProvider'

const Login = () => {
    const navigate = useNavigate()
    const {setAuth} = useContext(AuthContext)
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`
            const respuesta= await axios.post(url,form)
            localStorage.setItem('token',respuesta.data.token)
            setAuth(respuesta.data)
            navigate('/dashboard')
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:false})
            setform({})
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }

    return (
        <>
            <div className="w-1/3 h-screen bg-[url('/public/images/nino.jpeg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>

            <div className="w-2/3 h-screen bg-orange-500 flex justify-center items-center">
                
                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-black-900">Bienvenido</h1>
                    <small className="text-black-400 block my-4 text-sm"></small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input type="email"
                            name='email'
                            value={form.email || ""} onChange={handleChange}
                            className="block w-full rounded-md border border-black -300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input type="password" placeholder="********************" 
                            name='password'
                            value={form.password || ""} onChange={handleChange}
                            className="block w-full rounded-md border border-black-300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-blue-900  text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>

                    </form>
                    

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" className="underline text-sm text-black-900 hover:text-black-900">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/register" className="underline text-sm text-black-900 hover:text-black-900">Registrar</Link>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Login