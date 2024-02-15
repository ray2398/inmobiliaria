import React, { useEffect, useState  } from 'react';
import axios from '../axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


export default function Home() {

    const { user } = useAuth();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get(`/inmuebles/own/${user.id}`);
				if (resp.status === 200) {
					setProducts(resp.data);
				}
			} catch (error) {
				if (error.response.status === 500) {
					setProducts([]);
				}
			}
		})();
	}, []);
	
	return (
		<>
			<div className="text-2xl font-bold text-slate-600">Mis Inmuebles</div>
			<hr className="bg-slate-400 h-1 w-full my-4" />
			<div className="grid grid-cols-1 gap-12 md:grid-cols-1 my-4">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dirección
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Movimiento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.length > 0 && (
                                    products.map((row, key)=>(
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={key}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.nombre}</th>
                                            <td className="px-6 py-4">{row.direccion}</td>
                                            <td className="px-6 py-4">{row.descripcion}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { row.movimiento === '1' ?  'Venta':'Renta'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                    <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Editar</button>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>deleteProduct(row.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
			</div>
		</>
	);
}