import mongoose from 'mongoose'

const Schema = mongoose.Schema


const commentSchema = new Schema({
  comment: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  image: String,
  ingredients: String,
  recipeUrl: String,
  prepTime: Number,
  contributedBy: String,
  comments: [commentSchema],
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export {
  Recipe
}