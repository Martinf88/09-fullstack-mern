import { MongoClient, Db, Collection, WithId } from "mongodb";
import { AnimalFact } from "../models/AnimalFact";

const con: string | undefined = process.env.CONNECTION_STRING

async function getFacts(): Promise<WithId<AnimalFact>[]> {
	if( !con ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}

	const client: MongoClient = await MongoClient.connect(con)
	const db: Db = await client.db('exercises')
	const col: Collection<AnimalFact> = db.collection<AnimalFact>('animalFacts')

	const result: WithId<AnimalFact>[] = await col.find({}).toArray()
	return result
}

export { getFacts }