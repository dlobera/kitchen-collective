import { Router } from 'express'
import * as apiCtrl from '../controllers/api.js'

const router = Router()

//GET localhost:3000/api/recipes
router.get('/recipes', apiCtrl.index)

//POST localhost:3000/api/recipes
router.post('/recipes', apiCtrl.create)


export {
  router
}