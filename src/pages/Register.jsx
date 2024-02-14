import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
	const { setUser } = useAuth();
	const [nameError, setNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [telefonoError, setTelefonoError] = React.useState('');
	// register user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword, telefono } = e.target.elements;
		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: cpassword.value,
			telefono: telefono.value
		};
		try {
			const resp = await axios.post('/register', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/profile" />;
			}
		} catch (error) {
			if (error.response.status === 422) {
				if (error.response.data.error.name) {
					setNameError(error.response.data.error.name[0]);
				} else {
					setNameError('');
				}
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
				if (error.response.data.error.telefono) {
					setTelefonoError(error.response.data.error.telefono[0]);
				} else {
					setTelefonoError('');
				}
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
						className="w-8 h-8 mr-2"
						src="https://images.vexels.com/media/users/3/127081/isolated/preview/cd0b81a1b9e0bbca6951210691403ebe-flecha-casas-icono-de-bienes-raices.png"
						alt="logo"
					/>
					Inmobiliaria
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Crear Cuenta
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#"
							method="post"
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Nombre
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Jhone Doe"
									required
								/>
								{nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
							</div>
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
									placeholder="name@company.com"
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
							<div>
								<label
									htmlFor="cpassword"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Confirmar Contraseña
								</label>
								<input
									type="password"
									name="password_confirmation"
									id="cpassword"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="telefono"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Teléfono
								</label>
								<input
									type="text"
									name="telefono"
									id="telefono"
									pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
									placeholder="123-456-7890"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
								{telefonoError && (
									<p className="text-sm text-red-600">{telefonoError}</p>
								)}
							</div>

							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Comenzar
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								¿Ya tienes una cuenta?{' '}
								<Link
									to="/"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Iniciar Sesión
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}