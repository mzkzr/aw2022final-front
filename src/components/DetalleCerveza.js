import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GaleriaImagenes } from './GaleriaImagenes'

export const DetalleCerveza = () => {
	const params = useParams(),
		[cerveza, setCerveza] = useState({}),
		[cervecerias, setCervecerias] = useState([])

	useEffect(() => {
		const fetchCerveza = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervezas/"+params.id),
				data = await response.json()

			setCerveza(data.data)
		}

		const fetchCervecerias = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias?cerveza_id="+params.id),
				data = await response.json()

			setCervecerias(data.data)
		}

		fetchCerveza()
		fetchCervecerias()
	}, [params.id])

  	return (
    	<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<h1>{cerveza.nombre}</h1>
				<hr/>
				<div className="col-md-4 col-sm-12">
					<h3><b>Productor:</b> <a href={"/detalleProductor/"+cerveza.productor_id}>{cerveza.productor}</a></h3>
					<br/>
					<h5><b>IBU:</b> {cerveza.ibu}</h5>
					<h5><b>ABV:</b> {cerveza.abv}</h5>
					{cerveza.srm ? <div><h5><b>SRM:</b> {cerveza.srm}</h5></div> : <></>}
					{cerveza.og ? <div><h5><b>OG:</b> {cerveza.og}</h5></div> : <></>}
				</div>
				<div className="col-md-8 col-sm-12">
					<GaleriaImagenes media = {cerveza.media}/>
				</div>
			</div>
			<br/>			
			{cerveza.descripcion ? <div><br/><p className="desc-cerveza"><b><i>"{cerveza.descripcion}"</i></b></p></div> : <></>}
			{cervecerias.length > 0 &&
				<div>
					<hr/><hr/><br/>
					<h2>Cervecerías que la comercializan</h2>
					<hr/>
					<div className='row item-list'>
						{cervecerias.map(cerveceria =>
							<div key={cerveceria.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
								<div className='card datos_tarjeta'>
									<div className='card-header'>
										<a href={"/detalleCerveceria/"+cerveceria.id}>{cerveceria.nombre}</a>
									</div>
									<div className='card-body'>
										Provincia: {cerveceria.provincia}<br/>
										Localidad: {cerveceria.localidad}<br/>
										Domicilio: {cerveceria.domicilio}<br/>
										{cerveceria.horario_atención ? <div>Horario de atención: {cerveceria.horario_atencion}</div> : <></>}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			}
		</div>
  	)
}
