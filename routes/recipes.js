import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/recipes
router.get('/', recipesCtrl.index)

//GET localhost:3000/recipes/new
router.get('/new', recipesCtrl.new)

//GET localhost:3000/recipe/:id
router.get('/:id', recipesCtrl.show)

//GET localhost:3000/recipes/:id/edit
router.get('/:id/edit', recipesCtrl.edit)

// POST localhost:3000/recipes
router.post('/', isLoggedIn, recipesCtrl.create)

//POST localhost:3000/search
router.post('/search', isLoggedIn, recipesCtrl.recipeSearch)

//PUT localhost:3000/recipes/:id
router.put('/:id', isLoggedIn, recipesCtrl.update)

//DELETE localhost:3000/recipes/:id
router.delete('/:id', isLoggedIn, recipesCtrl.delete)



export {
  router
}