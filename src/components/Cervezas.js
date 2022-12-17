import React, { useState, useEffect } from 'react'

export const Cervezas = () => {	 
	const [cervezas, setCervezas] = useState([]),
		[nombre, setNombre] = useState(""),
		[abv_min, setAbvMin] = useState(""),
		[abv_max, setAbvMax] = useState(""),
		[ibu_min, setIbuMin] = useState(""),
		[ibu_max, setIbuMax] = useState(""),
		[srm_min, setSrmMin] = useState(""),
		[srm_max, setSrmMax] = useState(""),
		[og_min, setOgMin] = useState(""),
		[og_max, setOgMax] = useState("")

	useEffect(() => {
		let params = ""

		params += nombre !== "" ? "nombre=" + nombre + "&" : ""
		params += abv_min !== "" ? "abv_min=" + abv_min  + "&" : ""
		params += abv_max !== "" ? "abv_max=" + abv_max  + "&" : ""
		params += ibu_min !== "" ? "ibu_min=" + ibu_min  + "&" : ""
		params += ibu_max !== "" ? "ibu_max=" + ibu_max  + "&" : ""
		params += srm_min !== "" ? "srm_min=" + srm_min  + "&" : ""
		params += srm_max !== "" ? "srm_max=" + srm_max  + "&" : ""
		params += og_min !== "" ? "og_min=" + og_min  + "&" : ""
		params += og_max !== "" ? "og_max=" + og_max  + "&" : ""

		const fetchCervezas = async () => {
		   	const response = await fetch('http://localhost:8000/api/cervezas?' + params),
		   		data = await response.json()

			setCervezas(data.data)
		}

		fetchCervezas()
	}, [nombre, abv_min, abv_max, ibu_min, ibu_max, srm_min, srm_max, og_min, og_max])

	const handleKeyDown = (input, e) => {
		if (e.key === 'Enter') {
			let value = e.target.value

			switch(input) {
				case 'nombre':
					setNombre(value)
					break
				case 'abv_min':
				  	setAbvMin(value)
					break
				case 'abv_max':
				  	setAbvMax(value)
					break
				case 'ibu_min':
					setIbuMin(value)
					break
				case 'ibu_max':
					setIbuMax(value)
					break
				case 'srm_min':
					setSrmMin(value)
					break
				case 'srm_max':
					setSrmMax(value)
					break
				case 'og_min':
					setOgMin(value)
					break
				case 'og_max':
					setOgMax(value)
					break
				default:
			}
		}
	}

  	return (
    	<div className="main-body">
			<h1>Cervezas</h1>
			<hr/>
			<div className="filtros row g-3">
				<div className="col-auto">
					<label htmlFor="nombre">Nombre</label>
					<input id="nombre" name="nombre" className="form-control" onKeyDown={e => handleKeyDown('nombre', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="abv_min">ABV min.</label>
					<input id="abv_min" name="abv_min" className="form-control" onKeyDown={e => handleKeyDown('abv_min', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="abv_max">ABV max.</label>
					<input id="abv_max" name="abv_max" className="form-control" onKeyDown={e => handleKeyDown('abv_max', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="ibu_min">IBU min.</label>
					<input id="ibu_min" name="ibu_min" className="form-control" onKeyDown={e => handleKeyDown('ibu_min', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="ibu_max">IBU max.</label>
					<input id="ibu_max" name="ibu_max" className="form-control" onKeyDown={e => handleKeyDown('ibu_max', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="srm_min">SRM min.</label>
					<input id="srm_min" name="srm_min" className="form-control" onKeyDown={e => handleKeyDown('srm_min', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="srm_max">SRM max.</label>
					<input id="srm_max" name="srm_max" className="form-control" onKeyDown={e => handleKeyDown('srm_max', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="og_min">OG min.</label>
					<input id="og_min" name="og_min" className="form-control" onKeyDown={e => handleKeyDown('og_min', e)}/>
				</div>
				<div className="col-auto">
					<label htmlFor="og_max">OG max.</label>
					<input id="og_max" name="og_max" className="form-control" onKeyDown={e => handleKeyDown('og_max', e)}/>
				</div>
			</div>
			<hr/>
			<div className='row item-list'>
				{cervezas.map(cerveza =>
					<div key={cerveza.id} className='col-sm-12 col-md-auto'>
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
