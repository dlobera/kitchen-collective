import { Profile } from "../models/profile.js"
import { Recipe } from "../models/recipe.js"
import axios from "axios"


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
  console.log('new recipe')
  res.render('recipes/new', {
      title: 'Add a Recipe',
    })
  }
  



function recipeSearch(req, res) {
  axios.get('')
  res.render('recipes/search', {
    title: 'Search Results',
    search: req.body.search ? req.body.search : null
  })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    res.render('recipes/edit', {
      recipe: recipe,
      title: 'Edit Recipe'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}


function update(req, res) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(recipe =>{
    res.redirect(`/recipes/${recipe._id}`)
  })
  .catch ( error => {
    console.log(error)
    res.redirect("/recipes") 
})
}

function deleteRecipe(req, res) {
Recipe.findByIdAndDelete(req.params.id)
.then(() => {
  res.redirect("/recipes")
})
.catch (err => {
  console.log(error)
  res.redirect("/recipes") 
})
}





export {
  index,
  create,
  show,
  newRecipe as new,
  recipeSearch,
  edit,
  update,
  deleteRecipe as delete,
}