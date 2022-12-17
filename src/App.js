import './assets/css/App.css'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ToTop } from './components/ToTop'

function App() {
  	return (
		<div className="App">
			<Navbar/>
			<Footer/>
			<ToTop/>
		</div>
  	)
}

export default App