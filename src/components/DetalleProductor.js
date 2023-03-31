import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const DetalleProductor = () => {
	const params = useParams(),
		  [productor, setProductor] = useState({}),
		  [cervezas, setCervezas] = useState([])

	useEffect(() => {
		const fetchProductor = async () => {
			const response = await fetch("http://localhost:8000/api/productores/"+params.id),
				data = await response.json()

			setProductor(data.data)
		}

		const fetchCervezas = async () => {
			const response = await fetch('http://localhost:8000/api/cervezas?productor_id=' + params.id),
				data = await response.json()

			setCervezas(data.data)
	 	}

		fetchProductor()
		fetchCervezas()
	}, [params.id])

  	return (
		<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<div className="col-3">
					<h1>{productor.nombre}</h1>
					<hr/>
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
				</div>
				<div className="col-8 row item-list">
					{productor.media && productor.media.map(imagen =>
						<div key={imagen.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
							<a href={imagen.original_url}  target='_blank' rel='noreferrer'>
								<img className='thumb_galeria' src={imagen.original_url} alt={imagen.file_name} width={256} height={256}/>
							</a>
						</div>
					)}
				</div>
			</div>
			<br/><hr/><hr/><br/>
			<h2>Cervezas que produce</h2>
			<hr/>
			<div className='row item-list'>
				{cervezas.map(cerveza =>
					<div key={cerveza.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
						<div className='card'>
							<div className='card-header'>
								<a href={"/detalleCerveza/"+cerveza.id}>{cerveza.nombre}</a>
							</div>
							<div className='card-body'>
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