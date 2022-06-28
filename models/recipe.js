import mongoose from 'mongoose'

const Schema = mongoose.Schema


const ingredientSchema = new Schema({
  ingredient: [String],
})

const commentSchema = new Schema({
  comment: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  image: String,
  ingredients: [ingredientSchema],
  preparation: String,
  recipeUrl: String,
  prepTime: Number,
  contributedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema],
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export {
  Recipe
}