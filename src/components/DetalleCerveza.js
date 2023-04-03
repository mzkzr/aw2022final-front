import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GaleriaImagenes } from './GaleriaImagenes'
import { ListaCervecerias } from './ListaCervecerias'

export const DetalleCerveza = () => {
	const params = useParams(),
		  [cerveza, setCerveza] = useState({})

	useEffect(() => {
		const fetchCerveza = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervezas/"+params.id),
				data = await response.json()

			setCerveza(data.data)
		}

		fetchCerveza()
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
					{cerveza.srm ? <h5><b>SRM:</b> {cerveza.srm}</h5> : <></>}
					{cerveza.og ? <h5><b>OG:</b> {cerveza.og}</h5> : <></>}
				</div>
				<div className="col-md-8 col-sm-12">
					<GaleriaImagenes media = {cerveza.media}/>
				</div>
			</div>
			<br/>			
			{cerveza.descripcion ? <><br/><p className="desc-cerveza"><b><i>"{cerveza.descripcion}"</i></b></p></> : <></>}
			<ListaCervecerias/>
		</div>
  	)
}
