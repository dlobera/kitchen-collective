import { Profile } from "../models/profile.js"

function recipeSearch(req, res) {
  res.render('recipes/rearch', {
    title: 'Search Results',
    search: req.body.search ? req.body.search : null
  })
}

export {
  recipeSearch
}