import React from 'react'
import logo from '../assets/images/lupulo.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './Inicio';
import { Cervezas } from './Cervezas';
import { Cervecerias } from './Cervecerias';
import { Productores } from './Productores';
import { AuthForm } from './AuthForm';
import { DetalleProductor } from './DetalleProductor';
import { DetalleCerveza } from './DetalleCerveza';
import { DetalleCerveceria } from './DetalleCerveceria';

export const Navbar = () => {
	class Login extends React.Component {
		render() {
			if (localStorage.getItem("authenticated")) {
				const acronym = localStorage.getItem("name").split(/\s/).reduce((response, word)=> response += word.slice(0, 1), '')

				return (
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="javascript.void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Mi Usuario
						</a>
						<ul className="dropdown-menu" style={{padding: "1rem"}}>
							<li>
								<div id="circle-avatar" className="text-center mx-auto mb-4">
									<span>{acronym}</span>
								</div>
							</li>
							<li><h5 className="text-center mb-0">{localStorage.getItem("name")}</h5></li>
							<li><p className="text-center mb-2">{localStorage.getItem("email")}</p></li>
							<li><hr className="dropdown-divider"/></li>
							<li><a href="/" className="dropdown-item" style={{textAlign: "center"}} onClick={logout}>Salir</a></li>
						</ul>
					</li>
				)
			}
		
			return (
				<li className="nav-item">
					<a className="nav-link" href="/login">Ingresar</a>
				</li>
			)
		}
	}

	const logout = () => {
		localStorage.clear()
	}

  	return (
		<Router>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<img src={logo} alt="lupulo" width="32" title="La Buena Birra"/>
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="/">Inicio</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/cervezas">Cervezas</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/cervecerias">Cervecerias</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/productores">Productores</a>
							</li>
							<Login/>
						</ul>
					</div>
				</div>
			</nav>
			<Routes>
				<Route exact path='/' element={<Inicio/>}></Route>
				<Route exact path='/cervezas' element={<Cervezas/>}></Route>
				<Route exact path='/cervecerias' element={<Cervecerias/>}></Route>
				<Route exact path='/productores' element={<Productores/>}></Route>
				<Route exact path='/login' element={<AuthForm/>}></Route>
				<Route path='/detalleProductor/:id' element={<DetalleProductor/>}></Route>
				<Route path='/detalleCerveza/:id' element={<DetalleCerveza/>}></Route>
				<Route path='/detalleCerveceria/:id' element={<DetalleCerveceria/>}></Route>
			</Routes>
		</Router>
  	)
}
