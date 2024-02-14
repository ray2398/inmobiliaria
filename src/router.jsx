import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import Home from './pages/Home';
// import Profile from './pages/Profile';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/home',
				element: <Home />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			// {
			// 	path: '/admin',
			// 	element: <Profile />,
			// },
		],
	},
]);

export default router;