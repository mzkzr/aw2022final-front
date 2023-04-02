import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ListaCervezas } from './ListaCervezas'
import { GaleriaImagenes } from './GaleriaImagenes'

export const DetalleCerveceria = () => {
	const params = useParams(),
		[cerveceria, setCerveceria] = useState({})

	useEffect(() => {
		const fetchCerveceria = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias/"+params.id),
				data = await response.json()

			setCerveceria(data.data)
		}

		fetchCerveceria()
	}, [params.id])

  	return (
    	<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<h1>{cerveceria.nombre}</h1>
				<hr/>
				<div className="col-md-4 col-sm-12">
					<h3>{cerveceria.localidad}</h3>
					<h4>{cerveceria.provincia}</h4>
					<br/>
					<h5><b>Domicilio:</b> {cerveceria.domicilio}</h5>
					{cerveceria.horario_atención ? <div><h5><b>OG:</b> {cerveceria.horario_atención}</h5></div> : <></>}
					{cerveceria.telefono ? <h5><b>Teléfono:</b> {cerveceria.telefono}</h5> : <></>}
					{cerveceria.email ? <h5><b>Email:</b> {cerveceria.email}</h5> : <></>}
					<br/>
					<div className="row">
						{cerveceria.instagram ? <a href={cerveceria.instagram} className="col-auto" title="Instagram" target='_blank' rel='noreferrer'>
													<i className="bi bi-instagram" style={{fontSize: "2.25rem", color: "#f401c6"}}></i></a> : <></>}
						{cerveceria.facebook ? <a href={cerveceria.facebook} className="col-auto" title="Facebook" target='_blank' rel='noreferrer'>
													<i className="bi bi-facebook" style={{fontSize: "2.25rem"}}></i></a> : <></>}
						{cerveceria.youtube ? <a href={cerveceria.youtube} className="col-auto" title="Youtube" target='_blank' rel='noreferrer'>
													<i className="bi bi-youtube" style={{fontSize: "2.25rem", color: "red"}}></i></a> : <></>}
					</div>
				</div>
				<div className="col-md-8 col-sm-12">
					<GaleriaImagenes media = {cerveceria.media}/>
				</div>
			</div>
			<ListaCervezas titulo = "Cervezas que comercializa"/>
		</div>
  	)
}
