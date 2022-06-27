import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new mongoose.Schema({
  recipeName: String,
  image: String,
  recipeUrl: String,
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  recipes: [recipeSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
