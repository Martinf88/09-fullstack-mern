import './styles/App.css'
import './styles/animalFacts.css'
import AnimalFacts from './components/AnimalFacts'
import Header from './components/Header'

function App() {

	return (
		<>
			<Header/>
			<main>
				<AnimalFacts/>
			</main>
		</>
	)
}

export default App