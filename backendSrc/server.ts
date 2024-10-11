import express, { Express, Request, Response, NextFunction } from 'express'
import { router as animalFactsRouter } from './routes/animalFacts.js'
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express()
const port: number = Number(process.env.PORT || 4242)

//Middleware
app.use('/', express.static('dist/'))
app.use('/', express.json())

app.use('/', (req: Request, _: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`, req.body);
	next()
})


// router middleware
app.use('/api/animal-facts', animalFactsRouter)




// starta server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})