import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);

	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');

	// Inicio de Sesión
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/home" />;
			}
		} catch (error) {
			if (error.response.status === 422) {
				if (error.response.data.error.email) {
					setEmailError(error.response.data.error.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.error.password) {
					setPasswordError(error.response.data.error.password[0]);
				} else {
					setPasswordError('');
				}
			}
			if (error.response.status === 401) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
					<img
						className="w-12 h-12 mr-2"
						src="https://images.vexels.com/media/users/3/127081/isolated/preview/cd0b81a1b9e0bbca6951210691403ebe-flecha-casas-icono-de-bienes-raices.png"
						alt="logo"
					/>
					Inmobiliaria
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Iniciar Sesión
						</h1>
						{error && (
							<div
								className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
								role="alert">
								<svg
									aria-hidden="true"
									className="flex-shrink-0 inline w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"></path>
								</svg>
								<span className="sr-only">Info</span>
								<div>{error}</div>
							</div>
						)}

						<form
							className="space-y-4 md:space-y-6"
							action="#"
							method="post"
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Correo Electrónico
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="nombre@inmobiliaria.com"
									required
								/>
								{emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Contraseña
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
								{passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
							</div>

							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Iniciar
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								¿Aún no tienes una cuenta?{' '}
								<Link
									to="/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Registrarse
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}