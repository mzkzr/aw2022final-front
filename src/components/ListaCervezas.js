import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import botellita from '../assets/images/botellita.png'

export const ListaCervezas = (props) => {
    const params = useParams(),
		  [cervezas, setCervezas] = useState([])

	useEffect(() => {
		const fetchCervezas = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervezas?productor_id="+params.id),
				data = await response.json()

			setCervezas(data.data)
	 	}

		fetchCervezas()
	}, [params.id])

    return (
        <div>
            {cervezas.length > 0 &&
                <div>
                    <br/><hr/><hr/><br/>
                    <h2>{props.titulo}</h2>
                    <hr/>
                    <div className='row item-list'>
                        {cervezas.map(cerveza =>
                            <div key={cerveza.id} className='col-sm-12 col-md-auto d-md-flex align-items-stretch'>
                                <div className='card datos_tarjeta'>
                                    <div className='card-header'>
                                        <a href={"/detalleCerveza/"+cerveza.id}>{cerveza.nombre}</a>
                                    </div>
                                    <div className='card-body'>
                                        <div style={{textAlign:'center'}}>
                                            {cerveza.media && cerveza.media.length > 0
                                                ? <img src={cerveza.media[0].original_url} alt={cerveza.media[0].full_name} width={256} height={256}/>
                                                : <img src={botellita} alt="botellita.png" width={256} height={256}/>}
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
            }
        </div>
    )
}