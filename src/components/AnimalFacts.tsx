import { useState } from "react"
import { AnimalFact } from "../data/AnimalFact"

function AnimalFacts() {
	const [facts, setFacts] = useState<AnimalFact[]>([])
	const [edit, setEdit] = useState<string | null>(null)
	const [formData, setFormData] = useState<Partial<AnimalFact>>({species: '', factoid: '', score: 0})

	const handleGetAll = async () => {
		const response: Response = await fetch('/api/animal-facts')
		const data = await response.json()
		console.log('data from api: ', data);
		
		setFacts(data)
	}

	const handleEdit = (fact: AnimalFact) => {
		setEdit(fact._id)
		setFormData({ species: fact.species, factoid: fact.factoid, score: fact.score })
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target

		setFormData(prevFormData => ({
			...prevFormData,
			[name]: name === 'score' ? parseInt(value, 10) || 0 : value
		}))
	}

	
	const handleUpdate = async (id: string) => {
		try {
			const response = await fetch(`/api/animal-facts/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify(formData)
			})

			if(!response.ok) {
				throw new Error("Failed to update: " + response.statusText);
				
			}

			const updatedFact = await response.json()
			
			setFacts(prevFacts => prevFacts.map(fact => fact._id === id ? updatedFact : fact))
			
			setEdit(null)
			console.log('Edit is...: ' + edit);
			
		} catch (error) {
			console.error('Error updating fact: ', error);
		}
	}


	return (
		<section className="bg-slate-300 text-white font-semibold px-4">
			<div className="flex justify-center py-4">
				<button className="bg-red-400 text-white px-4 py-2 rounded" onClick={handleGetAll}>fetch from API</button>
			</div>
			<div className="grid gap-4 grid-cols-2">
				{facts.map(fact => (
					<div className="flex flex-col justify-between  bg-slate-50 text-slate-600 border-2 border-white rounded p-3 text-center" key={fact._id}>
						{edit === fact._id ? (
							<>
								<input 
									type="text"
									name="species"
									value={formData.species as string}
									onChange={handleInputChange}
									className="border p-2 mb-2 w-full" 
								/>
								<textarea
									name="factoid"
									value={formData.factoid as string}
									onChange={handleInputChange}
									className="border p-2 mb-2 w-full"
								/>
								<input 
									type="number"
									name="score"
									value={formData.score || ''}
									onChange={handleInputChange}
									className="border p-2 mb-2 w-full"

								/>
								<button onClick={() => handleUpdate(fact._id)} className="bg-red-400 text-white px-4 py-2 rounded">
									Save Change
								</button>
							</>
						) : (
							<>
								<strong><h2><span> {fact.score}p </span>{fact.species}</h2></strong>
								<p>
									{fact.factoid}
								</p>
								<button onClick={() => handleEdit(fact)} className="bg-red-400 text-white px-4 py-2 rounded">Edit</button>
							</>
						)}
					</div>
				))}
			</div>
		</section>
	)
}

export default AnimalFacts