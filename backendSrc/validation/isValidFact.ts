import Joi from 'joi'
import { AnimalFact } from "../models/AnimalFact";

type ValidationResult =
  | { success: false; error: string; value?: undefined }
  | { success: true; value: AnimalFact; error?: undefined };

const factSchema: Joi.ObjectSchema<AnimalFact> = Joi.object<AnimalFact>({
	species: Joi.string().required(),
	factoid: Joi.string().required(),
	score: Joi.number().integer().greater(0).required().strict()
})



function isValidFact(fact: AnimalFact): ValidationResult {
    const { error, value } = factSchema.validate(fact); // Validate the input against the schema

    if (error) {
        return {
            success: false,
            error: error.message // Return the error message from Joi
        };
    }

    return {
        success: true,
        value: value || fact
    };
}


export default isValidFact