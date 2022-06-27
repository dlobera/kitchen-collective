import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: String
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export {
  Recipe
}