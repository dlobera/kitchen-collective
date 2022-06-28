import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/recipe/:id
router.get('/:id', recipesCtrl.show)


// POST localhost:3000/recipes
router.post('/', isLoggedIn, recipesCtrl.create)

//POST localhost:3000/search
router.post('/search', isLoggedIn, recipesCtrl.recipeSearch)



export {
  router
}