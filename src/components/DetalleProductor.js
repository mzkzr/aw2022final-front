import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import botellita from '../assets/images/botellita.png'

export const DetalleProductor = () => {
	const params = useParams(),
		  [productor, setProductor] = useState({}),
		  [cervezas, setCervezas] = useState([])

	useEffect(() => {
		const fetchProductor = async () => {
			const response = await fetch("https://aw2022final.herokuapp.com/api/productores/"+params.id),
				data = await response.json()

			setProductor(data.data)
		}

		const fetchCervezas = async () => {
			const response = await fetch('https://aw2022final.herokuapp.com/api/cervezas?productor_id=' + params.id),
				data = await response.json()

			setCervezas(data.data)
	 	}

		fetchProductor()
		fetchCervezas()
	}, [params.id])

  	return (
		<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<div className="col-md-3 col-sm-12">
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
					<br/>
				</div>
				<div className="col-md-8 col-sm-12 row item-list">
					{productor.media && productor.media.length && productor.media.map(imagen =>
						<div key={imagen.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
							<a href={"https://aw2022final.herokuapp.com"+imagen.original_url}  target='_blank' rel='noreferrer'>
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
								<div style={{textAlign:'center'}}>
									{cerveza.media && cerveza.media.length
										? <img className='thumb_galeria' src={"https://aw2022final.herokuapp.com"+cerveza.media[0].original_url} alt={cerveza.media[0].full_name} width={128} height={128}/>
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
