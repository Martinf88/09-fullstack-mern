import { MongoClient, Db, Collection, WithId, UpdateResult, ObjectId } from "mongodb";
import { AnimalFact } from "../models/AnimalFact";

const con: string | undefined = process.env.CONNECTION_STRING

async function connectToDatabase(): Promise<[Collection<AnimalFact>, MongoClient]> {
	if( !con ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}

	const client: MongoClient = await MongoClient.connect(con)
	const db: Db = client.db('exercises')
	const col: Collection<AnimalFact> = db.collection<AnimalFact>('animalFacts')
	
	return [col, client]
}

async function getFacts(): Promise<WithId<AnimalFact>[]> {
	const [col, client]: [Collection<AnimalFact>, MongoClient] = await connectToDatabase()

	const result: WithId<AnimalFact>[] = await col.find({}).toArray()
	await client.close()
	return result
}

async function updateFact(id: string, updatedFact: AnimalFact) {
	const [col, client] = await connectToDatabase()

	const result: UpdateResult<AnimalFact> = await col.updateOne({ _id: new ObjectId(id) }, {$set: updatedFact})
	await client.close()

	return result
}

export { getFacts, updateFact }