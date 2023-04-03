import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ListaCervecerias = () => {
    const params = useParams(),
		  [cervecerias, setCervecerias] = useState([])

    useEffect(() => {
        const fetchCervecerias = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL+"/api/cervecerias?cerveza_id="+params.id),
                data = await response.json()

            setCervecerias(data.data)
        }

        fetchCervecerias()
    }, [params.id])

    return (
        <>
            {cervecerias.length > 0 &&
				<>
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
										{cerveceria.horario_atención ? <>Horario de atención: {cerveceria.horario_atencion}</> : <></>}
									</div>
								</div>
							</div>
						)}
					</div>
				</>
			}
        </>
    )
}