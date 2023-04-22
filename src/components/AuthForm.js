import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import '../assets/css/AuthForm.css'

export const AuthForm = () => {
	let [authMode, setAuthMode] = useState("signin"),
		navigate = useNavigate()

  	const changeAuthMode = () => {
    	setAuthMode(authMode === "signin" ? "signup" : "signin")
  	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (authMode === "signin") {
			let url = process.env.REACT_APP_API_URL+"/api/login?email=" + e.target.email.value + "&password=" + e.target.password.value

			fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					Swal.fire('Exito', 'Usuario logueado', 'success')
					.then(function() {
						localStorage.setItem("token", data.data.token)
						localStorage.setItem("email", e.target.email.value)
						localStorage.setItem("name", data.data.name)
						localStorage.setItem("authenticated", true)
						navigate("/")
						window.location.reload(true)
					})
				} else {
					Swal.fire('Error', 'Nombre de usuario y/o contraseña incorrectos', 'error')
				}				
			})
		} else {
			let url = process.env.REACT_APP_API_URL+"/api/register",
				params = {
					name: e.target.name.value,
					email: e.target.email.value,
					password: e.target.password.value,
					confirm_password: e.target.confirm_password.value
				},
				options = {
					method: "POST",
					headers: {
						"Content-Type": "text/plain",
						"Accept": "application/json"
					},
					body: JSON.stringify(params)
				}

			fetch(url, options)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					Swal.fire('Exito', 'Usuario creado', 'success')
					.then(function () {
						navigate("/")
						window.location.reload(true)
					})
				} else {
					Swal.fire('Error', data.message, 'error')
				}
			})
		}
	}

  	if (authMode === "signin") {
		return (
			<div className="Auth-form-container">
				<form className="Auth-form" onSubmit={e => handleSubmit(e)}>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Ingresar</h3>
						<div className="text-center">
							¿Aun no está registrado?{" "}
							<span className="link-primary" onClick={changeAuthMode}>Registrarse</span>
						</div>
						<div className="form-group mt-3">
							<label>Email</label>
							<input
								id="email"
								name="email"
								type="email"
								className="form-control mt-1"
								placeholder="Ingrese su email"
								required
							/>
						</div>
						<div className="form-group mt-3">
							<label>Contraseña</label>
							<input
								id="password"
								name="password"
								type="password"
								className="form-control mt-1"
								placeholder="Ingrese su contraseña"
								required
							/>
						</div>
						<br/>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">Ingresar</button>
						</div>
					</div>
				</form>
			</div>
		)
  	}

  	return (
		<div className="Auth-form-container">
			<form className="Auth-form" autoComplete="off" onSubmit={e => handleSubmit(e)}>
				<meta name="csrf-token" content="{{ csrf_token() }}"/>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Registro de Usuario</h3>
					<div className="text-center">
						¿Ya se encuentra registrado?{" "}
						<span className="link-primary" onClick={changeAuthMode}>Ingresar</span>
					</div>
					<div className="form-group mt-3">
						<label>Nombre</label>
						<input
							id="name"
							name="name"
							type="text"
							className="form-control mt-1"
							placeholder="Ingrese un nombre"
							required
						/>
					</div>
					<div className="form-group mt-3">
						<label>Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control mt-1"
							placeholder="Ingrese su email"
							required
						/>
					</div>
					<div className="form-group mt-3">
						<label>Contraseña</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control mt-1"
							placeholder="Ingrese una contraseña"
							required
						/>
					</div>
					<div className="form-group mt-3">
						<label>Confirmación de Contraseña</label>
						<input
							id="confirm_password"
							name="confirm_password"
							type="password"
							className="form-control mt-1"
							placeholder="Repita la contraseña ingresada"
							required
						/>
					</div>
					<br/>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">Registrar</button>
					</div>
				</div>
			</form>
		</div>
  	)
}
