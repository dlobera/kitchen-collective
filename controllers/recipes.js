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
  if (req.body.ingredients) {
    req.body.ingredients = req.body.ingredients.split(', ')
  }
  console.log(req.body);
  Recipe.create(req.body)
  .then(recipe => {
    recipe.ingredients.push(req.body.ingredients)
    recipe.save()
    .then(recipe => {
      res.redirect('/recipes')
    })
  })
 
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .populate('owner')
  .then(recipe => {
    console.log('show',recipe);
    res.render('recipes/show', {
      recipe,
      title: "recipe",
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
  axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.search}&app_id=${process.env.API_ID}}&app_key=${process.env.API_KEY}`)
  .then(response => {
    console.log(response.data.hits);
  })
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
Recipe.findById(req.params.id)
.then(recipe => {
  if (recipe.owner.equals(req.user.profile._id)) {
    recipe.delete()
    .then(() => {
  res.redirect("/recipes")
})
  } else {
    throw new Error ("NOT AUTHORIZED")
  }
  })
  .catch (error => {
  console.log(error)
  res.redirect("/recipes") 
})
}


function createComment(req, res) {
  console.log('create comment*******');
  Recipe.findById(req.params.id)
  .then(recipe => {
    console.log(recipe)
    recipe.comments.push(req.body)
    recipe.save()
    .then(() => {
      res.redirect(`/recipes/${recipe._id}`)
    })
  })
  .catch ( error => {
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
  createComment,
}