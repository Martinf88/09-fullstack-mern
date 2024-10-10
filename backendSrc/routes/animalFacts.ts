import express, { Router, Response, Request } from 'express'
import { getFacts, updateFact } from '../database/animalCollection.js'
import { ObjectId, WithId } from 'mongodb'
import { AnimalFact } from '../models/AnimalFact.js'
import isValidFact from '../validation/isValidFact.js'

const router: Router = express.Router()


// Använd "_" som variabelnamn om en parameter inte används
router.get('/', async (_, res: Response) => {
	const facts: WithId<AnimalFact>[] = await getFacts()
	// Om ett Error kastas kommer Express fånga det och svara med statuskod 500
	res.send(facts)
})

router.put('/:id', async (req: Request, res: Response) => {
	const id: string = req.params.id;
	console.log("Updating fact with id:", id);
  
	// Kontrollera om id är en giltig MongoDB ObjectId
	if (!ObjectId.isValid(id)) {
	  res.status(400).send("Invalid ID format");
	  return;
	}
  
	// TODO: validera body
	const fact: AnimalFact = req.body;
  
	// Validera fact med isValidFact, och använd rätt struktur för valideringsresultatet
	const validationResult = isValidFact(fact);
	if (!validationResult.success) {
	  res.status(400).send(validationResult.error);
	  return;
	}
  
	try {
	  const result = await updateFact(id, fact);
  
	  // Kontrollera om något dokument matchade och uppdaterades
	  if (result.matchedCount === 0) {
		res.status(404).send("No fact found with the given ID");
		return;
	  }
  
	  res.sendStatus(204);  // Framgång, men ingen data returneras
	} catch (error) {
	  console.error("Error updating fact:", error);
	  res.status(500).send("An error occurred while updating the fact");
	}
  });

export { router }