import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import {} from "bootstrap-icons/font/bootstrap-icons.css"
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  	<App/>
)

serviceWorkerRegistration.register()
