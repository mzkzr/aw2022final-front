import React, { useState, useEffect } from 'react'

export const Cervecerias = () => {
	const [cervecerias, setCervecerias] = useState([]),
		[provincia_id, setProvincia] = useState(""),
		[provincias, setProvincias] = useState([]),
		[localidad_id, setLocalidad] = useState(""),
		[localidades, setLocalidades] = useState([])

	useEffect(() => {
		const fetchCervecerias = async () => {
		   	const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias"),
		   		data = await response.json()

			setCervecerias(data.data)
		}

		const fetchProvincias = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/provincias"),
				data = await response.json()

			setProvincias(data.data)
	 	}

		fetchCervecerias()
		fetchProvincias()
	}, [])
	
	useEffect(() => {
		const fetchCervecerias = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias?provincia_id="+provincia_id),
				data = await response.json()

			setCervecerias(data.data)
		}

		const fetchLocalidades = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/localidades?provincia_id="+provincia_id),
				data = await response.json()

			setLocalidades(data.data)
		}

		fetchCervecerias()

		if (provincia_id !== "") {
			fetchLocalidades()
		} else {
			setLocalidad("")
			setLocalidades([])
		}
	}, [provincia_id])

	
	useEffect(() => {
		const fetchCervecerias = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias?localidad_id="+localidad_id),
				data = await response.json()

			setCervecerias(data.data)
		}

		fetchCervecerias()
	}, [localidad_id])

  	return (
    	<div className="main-body">
			<h1>Cervecerías</h1>
			<hr/>
			<div className="filtros row g-3">
				<div className="col-auto">
					<label htmlFor="provincia">Provincia</label>
					<select id="provincia" className="form-select" value={provincia_id} onChange={e => setProvincia(e.target.value)}>
						<option value="">Todas</option>
						{provincias.map(provincia =>
							<option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
						)}
					</select>
				</div>
				<div className="col-auto">
					<label htmlFor="localidad">Localidad</label>
					<select id="localidad" className="form-select" onChange={e => setLocalidad(e.target.value)}>
						<option value="">Todas</option>
						{localidades.map(localidad =>
							<option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
						)}
					</select>
				</div>
			</div>
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
