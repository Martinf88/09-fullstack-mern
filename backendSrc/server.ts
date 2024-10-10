import express, { Express } from 'express'
import { router as animalFactsRouter } from './routes/animalFacts.js'

const app: Express = express()
const port: number = Number(process.env.PORT || 4242)

//Middleware
app.use('/', express.static('dist/'))
app.use('/', express.json())


// router middleware
app.use('/api/animal-facts', animalFactsRouter)

//Eventuella routes



// starta server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})