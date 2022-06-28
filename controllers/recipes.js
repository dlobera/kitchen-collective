import { Profile } from "../models/profile.js"
import axios from "axios"
import { Recipe } from "../models/recipe.js"
import res from "express/lib/response"

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: "Recipes",
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
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

function newRecipe(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/new', {
      title: 'Add Recipe',
      recipes: recipes,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}


function recipeSearch(req, res) {
  axios.get('')
  res.render('recipes/search', {
    title: 'Search Results',
    search: req.body.search ? req.body.search : null
  })
}


export {
  index,
  create,
  show,
  newRecipe as new,
  recipeSearch,
}