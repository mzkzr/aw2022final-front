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
			<h1>{productor.nombre}</h1>
			<hr/>
			<h3>{productor.localidad}</h3>
			<h4>{productor.provincia}</h4>
			<br/>
			<h5><b>Domicilio:</b> {productor.domicilio}</h5>
			<h5><b>CUIT:</b> {productor.cuit}</h5>
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