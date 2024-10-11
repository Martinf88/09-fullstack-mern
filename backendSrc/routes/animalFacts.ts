import express, { Router, Response, Request } from 'express'
import { addNewFact, getFacts, updateFact } from '../database/animalCollection.js'
import { ObjectId, WithId } from 'mongodb'
import { AnimalFact } from '../models/AnimalFact.js'
import isValidFact from '../validation/isValidFact.js'


const router: Router = express.Router()


// Använd "_" som variabelnamn om en parameter inte används
router.get('/', async (_, res: Response) => {
	try {
        const facts: WithId<AnimalFact>[] = await getFacts();
        res.send(facts);
    } catch (error) {
        console.error('Error retrieving facts:', error);
        res.sendStatus(500); // Handle any potential errors
    }
})

router.post('/', async (req: Request, res: Response) => {
    const validationResult = isValidFact(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error }); // Handle validation error
    }

    const newFact: AnimalFact = validationResult.value; // Extract validated value

    try {
        await addNewFact(newFact); // Await the async operation
        return res.sendStatus(201); // Send a 201 Created status
    } catch (error) {
        console.error('Error adding item:', error);
        return res.sendStatus(500); // Send a 500 Internal Server Error status
    }
});

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

	  const updatedFact = { ...fact, _id: id };
  
	  res.status(200).json(updatedFact);  // Framgång, men ingen data returneras
	} catch (error) {
	  console.error("Error updating fact:", error);
	  res.status(500).send("An error occurred while updating the fact");
	}
  });

export { router }