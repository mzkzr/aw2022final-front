import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
			<h1>{cerveceria.nombre}</h1>
			<hr/>
			<h3>{cerveceria.localidad}</h3>
			<h4>{cerveceria.provincia}</h4>
			<br/>
			<h5><b>Domicilio:</b> {cerveceria.domicilio}</h5>
			{cerveceria.horario_atención ? <div><h5><b>OG:</b> {cerveceria.horario_atención}</h5></div> : <></>}
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
