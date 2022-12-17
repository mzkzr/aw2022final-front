import React from 'react'
import logo from '../assets/images/lupulo.png'
import cervezas from '../assets/images/img-cervezas.jpg'
import cerveceria from '../assets/images/img-cerveceria.jpg'
import productor from '../assets/images/productor.jpg'

export const Inicio = () => {
    return (
        <div className="main-body">
            <div id="panel-bienvenida">
                <img src={logo} alt="lupulo" width="128"/>
                <br/>
                <h1><i>"Encuentra esa cerveza que estás buscando"</i></h1>
                <br/>
                <h5><i>
                    Al igual que tu, somos fanáticos de ese maravilloso elixir llamado <b>cerveza</b>.<br/>
                    Es por eso que queremos ayudarte a encontrar la cerveza que mejor se adapte a tus gustos.
                </i></h5>            
            </div>
			<br/><hr/><br/>
            <div className='panel-front row'>
				<div className='col-md-5 col-sm-12'>
					<img src={cervezas} alt="cervezas" />
				</div>
				<div className='panel-text col-md-6 col-sm-12'>
					<h4>Explora las diferentes carateriscticas que le dan a cada variedad de cerveza su sabor y aroma particular</h4>
				</div>
            </div>
			<br/><hr/><br/>
            <div className='panel-front row'>
				<div className='col-md-5 col-sm-12 order-sm-2'>
					<img src={cerveceria} alt="cerveceria" />
				</div>
				<div className='panel-text col-md-6 col-sm-12'>
					<h4>Descubre cervecerias y entérate de la variedad de cervezas que ofrece cada una de ellas</h4>
				</div>
            </div>
			<br/><hr/><br/>
			<div className='panel-front row'>
				<div className='col-md-5 col-sm-12'>
					<img src={productor} alt="productor" />
				</div>
				<div className='panel-text col-md-6 col-sm-12'>
					<h4>Infórmate de quién produce tus cervezas favoritas, y que otras variedades tiene en su catálogo</h4>
				</div>
            </div>
			<br/>
        </div>
    )
}
