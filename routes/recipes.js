import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

router.post('/search', recipesCtrl.recipeSearch)

export {
  router
}