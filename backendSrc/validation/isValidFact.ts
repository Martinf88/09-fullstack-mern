
import { AnimalFact } from "../models/AnimalFact";

type ValidationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
	success: true;
	value: AnimalFact;
}

interface ValidationFailure {
	success: false;
	error: string;
}



function isValidFact(fact: AnimalFact): ValidationResult {

	if(!fact.species || typeof fact.species !== 'string' || fact.species.trim() === '') {
		return {
			success: false,
			error: "Species is invalid or missing"
		}
	}
	if(typeof fact.score !== 'number' || fact.score < 0) {
		return {
			success: false,
			error: 'Score must be a non-negative number'
		}
	}
	if (!fact.factoid || typeof fact.factoid !== 'string' || fact.factoid.trim() === "") {
		return {
			success: false,
			error: "Fact text is invalid or missing"
		};
	}

	return {
		success: true,
		value: fact
	};

}


export default isValidFact