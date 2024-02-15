import React, { useState } from "react";
import axios from '../axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function Add() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [description, setDescription] = useState("")
    const [movimiento, setMovimiento] = useState("")
    const [validationError,setValidationError] = useState({})

    const [nombreError, setNombreError] = useState('');
    const [direccionError, setDireccionError] = useState('')
    const [descripcionError, setDescripcionError] = useState('')
    const [movimientoError, setMovimientoError] = useState('')

    const createProduct = async (e) => {
        e.preventDefault();
        const formData = {
            nombre: nombre,
            direccion: direccion,
            description: description,
            movimiento: movimiento,
            user_id: user.id
        }
    
        await axios.post(`/inmuebles`, formData).then(()=>{
          Swal.fire({
            icon:"success",
            text: "Inmueble Creado"
          })
          navigate("/Admin")
        }).catch(({response})=>{
          if (response.status === 422) {
            if (response.data.error.nombre) {
              setNombreError(response.data.error.nombre[0]);
            } else {
              setNombreError('');
            }
            if (response.data.error.direccion) {
              setDireccionError(response.data.error.direccion[0]);
            } else {
              setDireccionError('');
            }
            if (response.data.error.descripcion) {
              setDescripcionError(response.data.error.descripcion[0]);
            } else {
              setDescripcionError('');
            }
            if (response.data.error.movimiento) {
              setMovimientoError(response.data.error.movimiento[0]);
            } else {
              setMovimientoError('');
            }
          }else{
            Swal.fire({
              text: response.data.message,
              icon:"error"
            })
          }
        })
      }

	return (
		<>
            <div className="text-2xl font-bold text-slate-600">Crear Inmueble</div>
            <hr className="bg-slate-400 h-1 w-full my-4" />
            <div className="w-full p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                <form onSubmit={createProduct}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 my-4">
                        <div className="mb-5">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Nombre</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Casa Verde" required value={nombre} onChange={(event)=>{
                              setNombre(event.target.value)
                            }}/>
                            {nombreError && (
                                <p className="text-sm text-red-600">{nombreError}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Dirección</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Benito Juarez #20, Centro, Ciudad de México, 93540" required value={direccion} onChange={(event)=>{
                              setDireccion(event.target.value)
                            }}/>
                            {direccionError && (
                                <p className="text-sm text-red-600">{direccionError}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Descripción</label>
                            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                            {descripcionError && (
                                <p className="text-sm text-red-600">{descripcionError}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="movimiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Selecciona una Opción</label>
                            <select id="movimiento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={movimiento} onChange={(event)=>{
                              setMovimiento(event.target.value)
                            }}>
                                <option value="">Elija una Opción</option>
                                <option value="1">Venta</option>
                                <option value="2">Renta</option>
                            </select>
                            {movimientoError && (
                                <p className="text-sm text-red-600">{movimientoError}</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                </form>
            </div>
		</>
	);
}