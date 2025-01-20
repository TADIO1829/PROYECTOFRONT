import { useContext, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem('token');

    useEffect(() => {
        // Si no hay token, redirige al login
        if (!autenticado) {
            window.location.href = '/login'; // Redirige a la página de login si no está autenticado
        }
    }, [autenticado]);

    return (
        <div className='md:flex md:min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-orange-500'>

            <div className='md:w-1/5 bg-orange-400 px-5 py-4 rounded-lg shadow-lg'>

                <h2 className='text-4xl font-extrabold text-center text-blue-900'>¡Bienvenidos al Centro Infantil!</h2>

                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_YK-NZieffUedUvrKV_GCWMqXPSi5SIIyA&s" 
                    alt="img-client" 
                    className="m-auto mt-8 p-1 border-4 border-blue-900 rounded-full shadow-md" 
                    width={120} 
                    height={120} 
                />

                <p className='text-blue-700 text-center my-4 text-sm font-semibold'>
                    <span className='bg-green-500 mx-2 w-3 h-3 inline-block rounded-full'></span>
                    Hola, {auth?.nombre}
                </p>
                <hr className="mt-5 border-blue-900" />

                <ul className="mt-5 space-y-4">
                    <li className="text-center">
                        <Link 
                            to='/dashboard' 
                            className={`${urlActual === '/dashboard' ? 'text-white bg-blue-900 px-4 py-2 rounded-lg' : 'text-blue-900'} text-xl block mt-2 hover:bg-blue-700 hover:text-white transition-all duration-300`}
                        >
                            Perfil
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link 
                            to='/dashboard/listar' 
                            className={`${urlActual === '/dashboard/listar' ? 'text-white bg-blue-900 px-4 py-2 rounded-lg' : 'text-blue-900'} text-xl block mt-2 hover:bg-blue-700 hover:text-white transition-all duration-300`}
                        >
                            Listar
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link 
                            to='/dashboard/crear' 
                            className={`${urlActual === '/dashboard/crear' ? 'text-white bg-blue-900 px-4 py-2 rounded-lg' : 'text-blue-900'} text-xl block mt-2 hover:bg-blue-700 hover:text-white transition-all duration-300`}
                        >
                            Crear
                        </Link>
                    </li>
                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-white rounded-lg shadow-md'>
                <div className='bg-blue-900 py-2 flex justify-between items-center px-6'>
                    <div className='text-md font-semibold text-white'>
                        ¡Hola, {auth?.nombre}!
                    </div>
                    <div>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" 
                            alt="img-client" 
                            className="border-4 border-orange-400 rounded-full" 
                            width={50} 
                            height={50} 
                        />
                    </div>
                    <div>
                        <Link 
                            to='/' 
                            className="text-white bg-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 transition-all duration-300" 
                            onClick={() => { localStorage.removeItem('token'); }}
                        >
                            Salir
                        </Link>
                    </div>
                </div>

                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>

                <div className='bg-blue-900 h-12'>
                    <p className='text-center text-white leading-[2.9rem]'>Todos los derechos reservados &copy; 2025</p>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;