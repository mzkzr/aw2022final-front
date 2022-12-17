import React from 'react'
import cervecita from '../assets/images/cervecita.png'

export const Footer = () => {
	return (
		<div id="page-footer">
			<div id='footer-content' className="row" style={{"gap":"3rem"}}>
				<div className="d-none d-sm-block col-2" style={{textAlign: "center"}}>
					<img src={cervecita} alt="cervecita"/>
				</div>
				<div id="links-interes" className="col-auto">
					<p><u>LINKS</u></p>
					<p>Contáctenos</p>
					<p>Sobre nosotros</p>
					<p>Blog</p>
				</div>
				<div className="col">
					<p><u>Suscríbase para recibir novedades</u></p>
					<div className="row" style={{"gap":"1rem"}}>
						<input id="input-suscr" className="form-control col-md col-sm-auto" style={{borderRadius:"1rem"}} aria-label="Suscribirse"></input>
						<button type="button" className="btn btn-primary col-auto" style={{borderRadius:"1rem"}}>Suscribirse</button>
					</div>	
				</div>
				<div className="col-auto">
					<p><u>NUESTRAS REDES</u></p>
					<div id="redes-list" className='row'>
						<i className="bi bi-instagram col"></i>
						<i className="bi bi-facebook col"></i>
						<i className="bi bi-twitter col"></i>
						<i className="bi bi-telegram col"></i>
						<i className="bi bi-discord col"></i>
						<i className="bi bi-pinterest col"></i>
						<i className="bi bi-tiktok col"></i>
						<i className="bi bi-youtube col"></i>
					</div>
				</div>
			</div>
		</div>
	)
}
