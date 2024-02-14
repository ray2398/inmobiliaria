import React, { useEffect, useState  } from 'react';
import axios from '../axios';

export default function Home() {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/inmuebles');
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

	const usePagination = (items, page = 1, perPage = 8) => {
		const [activePage, setActivePage] = useState(page)
		const pageSizes = [0, 8, 16, 32, 64];
		const totalPages = 4;
		const offset = pageSizes[activePage]
		const paginatedItems = items.slice(pageSizes[activePage-1], offset)
		return {
			activePage,
			nextPage: ()=> setActivePage(p => p < totalPages ? p + 1 : p),
			previousPage: ()=> setActivePage(p => p > 1 ? p - 1 : p),
			totalPages,
			totalItems: items.length,
			items: paginatedItems,
		}
	}

	const { activePage, nextPage, previousPage, totalPages, items } = usePagination(products);
	
	return (
		<>
			<div className="text-2xl font-bold text-slate-600">Inmuebles</div>
			<hr className="bg-slate-400 h-1 w-full my-4" />
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 my-4">
			{
				products.length > 0 && (
					items.map((row, key)=>(
						<div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700" key={key}>
							<img className="h-auto max-w-xs" src={row.imagen} alt="image Inmueble"></img>
							{row.nombre}
						</div>
					))
				)
			}
			</div>
			<div className="flex flex-col items-center">
				<span className="text-sm text-gray-700 dark:text-gray-400">
					Página <span className="font-semibold text-gray-900 dark:text-gray">{activePage}</span> de <span className="font-semibold text-gray-900 dark:text-gray">{totalPages}</span>
				</span>
				<div className="inline-flex mt-2 xs:mt-0">
					<button onClick={previousPage} disabled={activePage <= 1} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Anterior
					</button>
					<button onClick={nextPage}
					disabled={activePage >= totalPages} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Siguiente
					</button>
				</div>
			</div>
		</>
	);
}