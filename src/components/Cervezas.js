import React, { useState, useEffect, useRef } from 'react'
import botellita from '../assets/images/botellita.png'

export const Cervezas = () => {	 
	const [cervezas, setCervezas] = useState([]),
		  [productores, setProductores] = useState([]),
		  [form, setForm] = useState(""),
		  rowRef = useRef(null)

	useEffect(() => {
		const fetchProductores = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/productores"),
				data = await response.json()

			setProductores(data.data)
		}

		fetchProductores()
	}, [])

	useEffect(() => {
		let params = ""

		if (form) {
			params += form.nombre !== "" ? "nombre=" + form.nombre + "&" : ""
			params += form.productor !== "" ? "productor_id=" + form.productor + "&" : ""
			params += form.abv_min !== "" ? "abv_min=" + form.abv_min  + "&" : ""
			params += form.abv_max !== "" ? "abv_max=" + form.abv_max  + "&" : ""
			params += form.ibu_min !== "" ? "ibu_min=" + form.ibu_min  + "&" : ""
			params += form.ibu_max !== "" ? "ibu_max=" + form.ibu_max  + "&" : ""
			params += form.srm_min !== "" ? "srm_min=" + form.srm_min  + "&" : ""
			params += form.srm_max !== "" ? "srm_max=" + form.srm_max  + "&" : ""
			params += form.og_min !== "" ? "og_min=" + form.og_min  + "&" : ""
			params += form.og_max !== "" ? "og_max=" + form.og_max  + "&" : ""
		}
		
		const fetchCervezas = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervezas?"+params),
				data = await response.json()

			setCervezas(data.data)
		}

		fetchCervezas()
	}, [form])

	useEffect(() => {
		const cards = rowRef.current.querySelectorAll(".card")
		let maxWidth = 0
		cards.forEach((card) => {
			const width = card.getBoundingClientRect().width
			if (width > maxWidth) {
				maxWidth = width
			}
		})
	
		cards.forEach((card) => {
		  	card.style.width = `${maxWidth}px`
		})
	}, [cervezas])

	const handleSubmit = (e) => {
		if (e.type === 'submit') {
			e.preventDefault()

			const data = new FormData(e.target),
				json_data = Object.fromEntries(data.entries())

			setForm(json_data)
		} else {
			setForm("")
		}
	}

  	return (
    	<div className="main-body">
			<h1>Cervezas</h1>
			<hr/>
			<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
				Filtros
			</button>
			<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasExampleLabel">Filtros de búsqueda</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<form onSubmit={e => handleSubmit(e)}>
						<div className="filtros row g-3">
							<div className="col-12">
								<label htmlFor="nombre">Nombre</label>
								<input id="nombre" name="nombre" className="form-control"/>
							</div>
							<div className="col-12">
								<label htmlFor="productor">Productor</label>
								<select id="productor" name="productor" className="form-select">
									<option value="">Todos</option>
									{productores.map(productor =>
										<option key={productor.id} value={productor.id}>{productor.nombre}</option>
									)}
								</select>
							</div>
							<div className="col-6">
								<label htmlFor="abv_min">ABV min.</label>
								<input id="abv_min" name="abv_min" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="abv_max">ABV max.</label>
								<input id="abv_max" name="abv_max" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="ibu_min">IBU min.</label>
								<input id="ibu_min" name="ibu_min" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="ibu_max">IBU max.</label>
								<input id="ibu_max" name="ibu_max" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="srm_min">SRM min.</label>
								<input id="srm_min" name="srm_min" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="srm_max">SRM max.</label>
								<input id="srm_max" name="srm_max" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="og_min">OG min.</label>
								<input id="og_min" name="og_min" className="form-control"/>
							</div>
							<div className="col-6">
								<label htmlFor="og_max">OG max.</label>
								<input id="og_max" name="og_max" className="form-control"/>
							</div>
							<div className="col">
								<div className="row" style={{justifyContent:"space-evenly"}}>
									<button className="btn btn-primary col-5" type="submit">Filtrar</button>
									<button className="btn btn-info col-5" type="reset" id="limpiar-filtros" onClick={e => handleSubmit(e)}>Limpiar filtros</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>			
			<hr/>
			<div className="row row-cols-1 row-cols-md-auto item-list" ref={rowRef}>
				{cervezas.map(cerveza =>
					<div key={cerveza.id} className='col'>
						<div className='card'>
							<div className='card-header'>
								<a href={"/detalleCerveza/"+cerveza.id}>{cerveza.nombre}</a>
							</div>
							<div className='card-body'>
								<div style={{textAlign:'center'}}>
									{cerveza.media && cerveza.media.length
										? <img src={cerveza.media[0].original_url} alt={cerveza.media[0].full_name} width={256} height={256}/>
										: <img src={botellita} alt="botellita.png" width={256} height={256}/>}
								</div>
								<hr/>
								<b>Productor: {cerveza.productor}</b><br/>
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
