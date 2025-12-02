import express from 'express'
import { getRestaurants,getRestaurantByID } from '../controllers/restaurantController.js'

const router=express.Router()

//get all the restaurants
router.get("/",getRestaurants)

//get the restaurants by ID so as to display the menu of a particular restaurant
router.get("/:id",getRestaurantByID)

export default router