import { Recipe } from "../models/recipe.js"

function create(req, res) {
  Recipe.create(req.body)
  .then(recipe => {
    res.json(recipe)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function index(req, res) {
  Ingredient.find({})
  .then(ingredients => {
    res.json(ingredients)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

export {
  create,
  index,
}