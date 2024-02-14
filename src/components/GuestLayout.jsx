import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLayout() {
	const { user } = useAuth();

	// Si el usuario ha iniciado sesión, redirija a la página de perfil
	if (user) {
		return <Navigate to="/home" />;
	}
	return (
		<>
			<Outlet />
		</>
	);
}