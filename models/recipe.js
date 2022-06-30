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
  ingredients: [String],
  preparation: String,
  recipeUrl: String,
  prepTime: Number,
  servingSize: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema],
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export {
  Recipe
}