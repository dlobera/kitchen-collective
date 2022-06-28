import { Profile } from "../models/profile.js"
import { Recipe } from "../models/recipe.js"

function recipeSearch(req, res) {
  res.render('recipes/search', {
    title: 'Search Results',
    search: req.body.search ? req.body.search : null
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.tasty = !!req.body.tasty
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    res.render('recipes/show', {
      recipe,
      title: "recipe"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export {
  recipeSearch,
  create,
  show,
}