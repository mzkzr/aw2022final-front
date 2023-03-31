import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const DetalleCerveza = () => {
	const params = useParams(),
		[cerveza, setCerveza] = useState({}),
		[cervecerias, setCervecerias] = useState([])

	useEffect(() => {
		const fetchCerveza = async () => {
			const response = await fetch("http://localhost:8000/api/cervezas/"+params.id),
				data = await response.json()

			setCerveza(data.data)
		}

		const fetchCervecerias = async () => {
			const response = await fetch("http://localhost:8000/api/cervecerias?cerveza_id="+params.id),
				data = await response.json()

			setCervecerias(data.data)
		}

		fetchCerveza()
		fetchCervecerias()
	}, [params.id])

  	return (
    	<div className="main-body">
			<div className="row" style={{justifyContent: "space-between"}}>
				<div className="col-3">
					<h1>{cerveza.nombre}</h1>
					<hr/>
					<h3><b>Productor:</b> <a href={"/detalleProductor/"+cerveza.productor_id}>{cerveza.productor}</a></h3>
					<br/>
					<h5><b>IBU:</b> {cerveza.ibu}</h5>
					<h5><b>ABV:</b> {cerveza.abv}</h5>
					{cerveza.srm ? <div><h5><b>SRM:</b> {cerveza.srm}</h5></div> : <></>}
					{cerveza.og ? <div><h5><b>OG:</b> {cerveza.og}</h5></div> : <></>}
				</div>
				<div className="row item-list col-8">
					{cerveza.media && cerveza.media.map(imagen =>
						<div key={imagen.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
							<img src={imagen.original_url} alt={imagen.file_name}/>
						</div>
					)}
				</div>
			</div>
			<br/>			
			{cerveza.descripcion ? <div><br/><p className="desc-cerveza"><b><i>"{cerveza.descripcion}"</i></b></p></div> : <></>}
			<hr/><hr/><br/>
			<h2>Cervecerías que la comercializan</h2>
			<hr/>
			<div className='row item-list'>
				{cervecerias.map(cerveceria =>
					<div key={cerveceria.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
						<div className='card'>
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
  	)
}
