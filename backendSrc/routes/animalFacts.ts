import express, { Router, Response } from 'express'
import { getFacts } from '../database/animalCollection.js'
import { WithId } from 'mongodb'
import { AnimalFact } from '../models/AnimalFact.js'

const router: Router = express.Router()


// Använd "_" som variabelnamn om en parameter inte används
router.get('/', async (_, res: Response) => {
	const facts: WithId<AnimalFact>[] = await getFacts()
	// Om ett Error kastas kommer Express fånga det och svara med statuskod 500
	res.send(facts)
})

export { router }