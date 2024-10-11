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
		<section className="bg-green-300 text-white font-semibold px-4">
			<div className="flex justify-center py-4">
				<button className="bg-red-400 text-white px-4 py-2 rounded font-semibold" onClick={handleGetAll}>fetch from API</button>
			</div>
			<div className="grid gap-4 grid-cols-2">
				{facts.map(fact => (
					<div className="border-2 border-black rounded p-3 text-center" key={fact._id}>
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