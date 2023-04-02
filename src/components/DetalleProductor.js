import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GaleriaImagenes } from './GaleriaImagenes'
import { ListaCervezas } from './ListaCervezas'

export const DetalleProductor = () => {
	const params = useParams(),
		  [productor, setProductor] = useState({})

	useEffect(() => {
		const fetchProductor = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/productores/"+params.id),
				data = await response.json()

			setProductor(data.data)
		}

		fetchProductor()
	}, [params.id])

  	return (
		<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<h1>{productor.nombre}</h1>
				<hr/>
				<div className="col-md-4 col-sm-12">
					<h3>{productor.localidad}</h3>
					<h4>{productor.provincia}</h4>
					<br/>
					<h5><b>Domicilio:</b> {productor.domicilio}</h5>
					{productor.telefono ? <h5><b>Teléfono:</b> {productor.telefono}</h5> : <></>}
					{productor.email ? <h5><b>Email:</b> {productor.email}</h5> : <></>}
					<br/>
					<div className="row">
						{productor.instagram ? <a href={productor.instagram} className="col-auto" title="Instagram" target='_blank' rel='noreferrer'>
													<i className="bi bi-instagram" style={{fontSize: "2.25rem", color: "#f401c6"}}></i></a> : <></>}
						{productor.facebook ? <a href={productor.facebook} className="col-auto" title="Facebook" target='_blank' rel='noreferrer'>
													<i className="bi bi-facebook" style={{fontSize: "2.25rem"}}></i></a> : <></>}
						{productor.youtube ? <a href={productor.youtube} className="col-auto" title="Youtube" target='_blank' rel='noreferrer'>
													<i className="bi bi-youtube" style={{fontSize: "2.25rem", color: "red"}}></i></a> : <></>}
					</div>
					<br/>
				</div>
				<div className="col-md-8 col-sm-12">
					<GaleriaImagenes media = {productor.media}/>
				</div>
			</div>
			<ListaCervezas titulo = "Cervezas que produce"/>
		</div>
  	)
}