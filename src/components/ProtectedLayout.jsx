import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();

	// Si el usuario no ha iniciado sesión, redirija a la página de inicio de sesión
	if (!user) {
		return <Navigate to="/" />;
	}

	// logout user
	const handleLogout = async () => {
		try {
			const resp = await axios.post('/logout');
			if (resp.status === 200) {
				localStorage.removeItem('user');
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
				<div className="container flex flex-wrap items-center justify-between mx-auto">
					<a href="/" className="flex items-center">
						<img
							src="https://images.vexels.com/media/users/3/127081/isolated/preview/cd0b81a1b9e0bbca6951210691403ebe-flecha-casas-icono-de-bienes-raices.png"
							className="h-6 mr-3 sm:h-9"
							alt="Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Inmobiliaria
						</span>
					</a>
					<button
						data-collapse-toggle="navbar-default"
						type="button"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"></path>
						</svg>
					</button>
					<div className="hidden w-full md:block md:w-auto" id="navbar-default">
						<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<NavLink
									to="/home"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
									}>
									Inicio
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/admin"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
									}>
									Administración de Inmuebles
								</NavLink>
							</li>
							{/* <li>
								<NavLink
									to="/profile"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
									}>
									Profile
								</NavLink>
							</li> */}
							<li>
								<a
									onClick={handleLogout}
									href="#"
									className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="container flex justify-center flex-col items-center mt-10">
				<Outlet />
			</main>
		</>
	);
}