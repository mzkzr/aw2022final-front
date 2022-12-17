import React, { useState, useEffect } from "react"

export const Productores = () => {
  	const [productores, setProductores] = useState([]),
		[provincia_id, setProvincia] = useState(""),
		[provincias, setProvincias] = useState([]),
		[localidad_id, setLocalidad] = useState(""),
		[localidades, setLocalidades] = useState([])

	useEffect(() => {
		const fetchProductores = async () => {
		   	const response = await fetch("http://localhost:8000/api/productores"),
		   		data = await response.json()

			setProductores(data.data)
		}

		const fetchProvincias = async () => {
			const response = await fetch("http://localhost:8000/api/provincias"),
				data = await response.json()

			setProvincias(data.data)
	 	}

		fetchProductores()
		fetchProvincias()
	}, [])
	
	useEffect(() => {
		const fetchProductores = async () => {
			const response = await fetch("http://localhost:8000/api/productores?provincia_id="+provincia_id),
				data = await response.json()

			setProductores(data.data)
		}

		const fetchLocalidades = async () => {
			const response = await fetch("http://localhost:8000/api/localidades?provincia_id="+provincia_id),
				data = await response.json()

			setLocalidades(data.data)
		}

		fetchProductores()

		if (provincia_id !== "") {
			fetchLocalidades()
		} else {
			setLocalidad("")
			setLocalidades([])
		}
	}, [provincia_id])

	
	useEffect(() => {
		const fetchProductores = async () => {
			const response = await fetch("http://localhost:8000/api/productores?localidad_id="+localidad_id),
				data = await response.json()

			setProductores(data.data)
		}

		fetchProductores()
	}, [localidad_id])

  	return (
    	<div className="main-body">
			<h1>Productores</h1>
			<hr/>
			<div className="filtros row g-3">
				<div className="col-auto">
					<label htmlFor="provincia">Provincia</label>
					<select id="provincia" className="form-select" onChange={e => setProvincia(e.target.value)}>
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
			<div className="row item-list">
				{productores.map(productor =>
					<div key={productor.id} className="col-sm-12 col-md-auto d-md-flex align-items-stretch">
						<div className="card">
							<div className="card-header">
								<a href={"/detalleProductor/"+productor.id}>{productor.nombre}</a>
							</div>
							<div className="card-body">
								Provincia: {productor.provincia}<br/>
								Localidad: {productor.localidad}<br/>
								Domicilio: {productor.domicilio}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
  	)
}