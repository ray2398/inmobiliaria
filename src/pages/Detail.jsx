import React, { useEffect, useState, useRef  } from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom'
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from '@arcgis/core/WebMap';
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { geocode } from "@esri/arcgis-rest-geocoding";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic.js";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import Swal from 'sweetalert2'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});
	const mapDiv = useRef(null);
	const [openModal, setOpenModal] = useState(false);
  	const [codigo, setCodigo] = useState('');
	

	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get(`/inmuebles/${id}`);
				if (resp.status === 200) {
					setProduct(resp.data);
				}

				if (mapDiv.current) {
					const apiKey = "AAPK534a571e8fc44f8f8af9439dc7bc0e177yc8zNVPrWckbWnbtUSZ-wWIxanY-Ic2Z7DLDFZcpJbMJdhetbYty1jocVsWneNC";
		
					const authentication = ApiKeyManager.fromKey(apiKey);
					/**
					 * Initialize application
					 */
					const map = new ArcGISMap({
						basemap: "topo-vector"
					});
					geocode({
						address: resp.data.direccion,
						authentication
					}).then((response) => {
						const view = new MapView({
							map,
							container: 'map-view',
							center: [response.candidates[0].location.x, response.candidates[0].location.y],
							zoom: 15,
						});
		
						const point = new Point({
							longitude: response.candidates[0].location.x,
							latitude: response.candidates[0].location.y,
						});
						const markerSymbol = new PictureMarkerSymbol({
							url: "https://static.arcgis.com/images/Symbols/Basic/RedStickpin.png",
							width: "64px",
							height: "64px"
						});
						const pointGraphic = new Graphic({
							geometry: point,
							symbol: markerSymbol
						});
						view.graphics.removeAll();
						view.graphics.add(pointGraphic);
						return () => view.goTo({target: point, zoom: 15}) && view.destroy()
					});
				}
			} catch (error) {
				if (error.response.status === 500) {
					setProduct([]);
                    navigate('/home');
				}
			}
		})();
	}, []);

	const onCloseModal = () => {
		setOpenModal(false);
    	setCodigo('');
	};

	const generarCodigo = async (id) => {
		try {
			const resp = await axios.get(`/codigos/${id}`);
			if (resp.status === 200) {
				Swal.fire({
					title: "Tu código es:",
					icon:"info",
					text: resp.data.codigo
				});
			}
		} catch (error) {
			if (error.response.status === 500) {
				console.log("Error")
			}
		}
    }

	const validarCodigo = async () => {
		try {
			if(codigo != ''){
				const resp = await axios.get(`/codigos/${codigo}/edit`);
				if (resp.status === 200) {
					Swal.fire({
						title: "Estatus",
						icon:"success",
						text: resp.data.message
					});
					setCodigo('');
					onCloseModal();
				}
			}else{
				Swal.fire({
					title: "Estatus",
					icon:"info",
					text: 'El código es requerido'
				});
			}
		} catch (error) {
			if (error.response.status === 500) {
				Swal.fire({
					title: "Estatus",
					icon:"error",
					text: 'Código Inválido'
				});
			}
		}
    }
	
	return (
		<>
			<div className="text-2xl font-bold text-slate-600">{product.nombre} - { product.movimiento === '1' ?  'Venta':'Renta'}</div>
			<hr className="bg-slate-400 h-1 w-full my-4" />
			<div className="flex items-center">
				<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>generarCodigo(product.id)}>Generar Código</button>
				<Button color="blue" size="lg" onClick={() => setOpenModal(true)}>Validar Código</Button>
			</div>
			<div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700" >
				<img className="h-auto max-w-full mx-auto" src={product.imagen} alt="image Inmueble"></img>
				<div className="flex items-center">
					<svg className="w-6 h-6 text-gray-800 dark:text-gray mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
						<path d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z" />
					</svg>
					{product.descripcion}
				</div>
				<div className="flex items-center my-5">
					<svg className="w-6 h-6 text-gray-800 dark:text-gray mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
						<path d="M5 9a7 7 0 1 1 8 7v5a1 1 0 1 1-2 0v-5a7 7 0 0 1-6-7Zm6-1c.2-.3.6-.5 1-.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.4.2-.8.4-1Z"/>
					</svg>
					{product.direccion}
				</div>
				<div className="flex items-center">
					<div id="map-view" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
				</div>
			</div>	
			<Modal show={openModal} size="md" onClose={onCloseModal} popup>
				<Modal.Header />
				<Modal.Body>
				<div className="space-y-6">
					<h3 className="text-xl font-medium text-gray-900 dark:text-white">Validar Código</h3>
					<div>
					<div className="mb-2 block">
						<Label htmlFor="codigo" value="Código" />
					</div>
					<TextInput
						id="codigo"
						value={codigo}
						onChange={(event) => setCodigo(event.target.value)}
						required
					/>
					</div>
					<div className="w-full">
						<Button color="success" size="lg" onClick={() => validarCodigo()}>Validar</Button>
					</div>
				</div>
				</Modal.Body>
			</Modal>
		</>
	);
}