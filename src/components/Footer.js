import React from 'react'
import cervecita from '../assets/images/cervecita.png'

export const Footer = () => {
	return (
		<div id="page-footer">
			<div id='footer-content' className="row" style={{"gap":"3rem"}}>
				<div className="d-none d-sm-block col-1" style={{textAlign: "center"}}>
					<img src={cervecita} alt="cervecita"/>
				</div>
				<div id="links-interes" className="col-md-auto col-sm-12">
					<p><u>LINKS</u></p>
					<p>Contáctenos</p>
					<p>Sobre nosotros</p>
					<p>Blog</p>
				</div>
				<div className="col-md-4 col-sm-12">
					<p><u>Suscríbase para recibir novedades</u></p>
					<div className="row" style={{"gap":"1rem"}}>
						<input id="input-suscr" className="form-control col-md col-sm-auto" style={{borderRadius:"1rem"}} aria-label="Suscribirse"></input>
						<button type="button" className="btn btn-primary col-auto" style={{borderRadius:"1rem"}}>Suscribirse</button>
					</div>	
				</div>
				<div className="col-md-3 col-sm-12">
					<p><u>NUESTRAS REDES</u></p>
					<div id="redes-list" className='row'>
						<i className="bi bi-instagram col-auto"></i>
						<i className="bi bi-facebook col-auto"></i>
						<i className="bi bi-twitter col-auto"></i>
						<i className="bi bi-telegram col-auto"></i>
						<i className="bi bi-discord col-auto"></i>
						<i className="bi bi-pinterest col-auto"></i>
						<i className="bi bi-tiktok col-auto"></i>
						<i className="bi bi-youtube col-auto"></i>
					</div>
				</div>
			</div>
		</div>
	)
}
