import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import botellita from '../assets/images/botellita.png'

export const DetalleCerveceria = () => {
	const params = useParams(),
		[cerveceria, setCerveceria] = useState({}),
		[cervezas, setCervezas] = useState([])

	useEffect(() => {
		const fetchCerveceria = async () => {
			const response = await fetch("http://localhost:8000/api/cervecerias/"+params.id),
				data = await response.json()

			setCerveceria(data.data)
		}

		const fetchCervezas = async () => {
			const response = await fetch('http://localhost:8000/api/cervezas?cerveceria_id=' + params.id),
				data = await response.json()

		 	setCervezas(data.data)
	 	}

		 fetchCerveceria()
		fetchCervezas()
	}, [params.id])


  	return (
    	<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<div className="col-md-3 col-sm-12">
					<h1>{cerveceria.nombre}</h1>
					<hr/>
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
				<div className="col-md-8 col-sm-12 row item-list">
					{cerveceria.media && cerveceria.media.length && cerveceria.media.map(imagen =>
						<div key={imagen.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
							<img className='thumb_galeria' src={imagen.original_url} alt={imagen.file_name} width={256} height={256}/>
						</div>
					)}
				</div>
			</div>

			<br/><hr/><hr/><br/>
			<h2>Cervezas que comercializa</h2>
			<hr/>
			<div className='row item-list'>
				{cervezas.map(cerveza =>
					<div key={cerveza.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
						<div className='card'>
							<div className='card-header'>
								<a href={"/detalleCerveza/"+cerveza.id}>{cerveza.nombre}</a>
							</div>
							<div className='card-body'>
								<div style={{textAlign:'center'}}>
									{cerveza.media && cerveza.media.length
										? <img className='thumb_galeria' src={cerveza.media[0].original_url} alt={cerveza.media[0].full_name} width={128} height={128}/>
										: <img className='thumb_galeria' src={botellita} alt="botellita.png" width={128} height={128}/>}
								</div>
								<hr/>
								IBU: {cerveza.ibu}<br/>
								ABV: {cerveza.abv}<br/>
								SRM: {cerveza.srm}<br/>
								OG: {cerveza.og}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
  	)
}
