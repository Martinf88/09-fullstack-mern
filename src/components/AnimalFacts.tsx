import { useState } from "react"
import { AnimalFact } from "../data/AnimalFact"

function AnimalFacts() {
	const [facts, setFacts] = useState<AnimalFact[]>([])

	const handleGetAll = async () => {
		const response: Response = await fetch('/api/animal-facts')
		const data = await response.json()
		console.log('data from api: ', data);
		
		setFacts(data)
	}
	
	return (
		<section className="container animal-facts__section">
			<button onClick={handleGetAll}>fetch from API</button>
			<div className="animal-facts__wrapper">
				{facts.map(fact => (
					<div className="animal-facts__card" key={fact._id}>
						<strong><h2><span> {fact.score} </span>{fact.species}</h2></strong>
						<p className="animal-facts__description">
							{fact.factoid}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default AnimalFacts